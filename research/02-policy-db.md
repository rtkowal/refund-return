# 02 — Policy database: schema and pipeline (DRAFT v1, 2026-11-03)

Input: Apify batch 1 (`scrape-2026-11-03/`, 110 fetches, 71 usable). Pilot extraction: `pilot-extractions.json` (Costco, Walmart), hand-extracted by Claude from the snapshot and pending human review.

## Design principles
1. **One fact = one row with provenance.** Every field value links to `snapshot_id` (the URL, SHA-256, Apify run and dataset) and to a `quote`: the exact sentence it came from, stored internally and never republished.
2. **Field-level review state:** `extracted → reviewed → published`. A brand page is indexable only when the *core fields* are `reviewed` and `last_verified_at` is under 30 days old (under 7 days from Nov to Jan).
3. **Policy is scoped, not flat.** Real policies vary by channel (in-store / online / marketplace), category (Costco electronics 90 days; Walmart phones 14 days) and season (Walmart's holiday window). So the schema is `brand → policy_rule[]`, with each rule carrying its scope. A single "return window" column would be wrong for most of the top 20 brands.

## Tables (Postgres / Supabase)
```
brands(id, slug, name, category, official_policy_url, returns_portal_url,
       us_search_volume, tier, indexable bool, last_verified_at)

snapshots(id, brand_id NULL, source_url, loaded_url, fetched_at, sha256,
          apify_run_id, apify_dataset_id, storage_path, quality)

policy_rules(id, brand_id, snapshot_id,
  scope_channel    enum(any, in_store, online, marketplace_3p, app),
  scope_category   text NULL,          -- 'electronics', 'wireless phones', 'diamonds ≥1ct'
  scope_season     daterange NULL,     -- purchase window for holiday rules
  rule_type        enum(window, exclusion, fee, receipt, refund_method,
                        refund_timing, exchange, price_adjustment, membership, holiday),
  window_days      int NULL, window_anchor enum(purchase, receipt, delivery) NULL,
  window_until     date NULL,          -- holiday "returnable until Jan 31"
  fee_amount / fee_pct / fee_desc NULL,
  value_text       text,               -- our own normalized wording
  quote            text,               -- verbatim source sentence (internal only)
  status           enum(extracted, reviewed, published, stale, disputed),
  extracted_by     enum(llm, human), reviewed_by, reviewed_at)

policy_changes(id, brand_id, rule_id, old_value, new_value, detected_at,
               snapshot_from, snapshot_to, published_news_id NULL)

laws(id, jurisdiction, citation, official_url, snapshot_id, summary,
     reviewed_by, reviewed_at)       -- attorney gate (owner decision 2)
```
The core fields that gate `indexable`: the default window (with anchor), at least one exclusion list, refund method, official URL, and the returns portal URL.

## Pipeline
1. **Fetch:** Apify `website-content-crawler`, owner-run for now; later Apify Schedules → webhook `/api/ingest`. Weekly, daily Nov–Jan.
2. **Snapshot:** store the Markdown in Supabase Storage. If the SHA-256 is unchanged since the last fetch, **stop here** (no LLM cost).
3. **Extract:** a cheap-tier Claude model with a zod schema produces `policy_rules[]`. Each rule must include a verbatim `quote`, and the pipeline rejects any rule whose quote isn't a substring of the snapshot (an anti-hallucination check).
4. **Diff:** compare against the published rules, field by field.
5. **Review queue:** every new or changed rule goes to human review. A change to a `window`, `fee` or `holiday` rule also creates a draft `/news/` item.
6. **Publish:** ISR revalidate the brand page; stamp `last_verified_at`.
7. **Stale guard:** if the fetch fails, or quality drops to `thin`/`blocked` for 2 runs, mark the brand's rules `stale` and show "last verified {date}" prominently. After 30 days, `noindex`.

## Batch 1 findings that shape the design
- **Bot walls are a real cost.** 7 of the top 40 (Target, TJ Maxx, Marshalls, Dick's, Lowe's, Ulta, Walgreens) failed even with residential proxies. Some of those retries appear in `05-retries/`; check each one's quality in `manifest.csv`. **Manual verification is a first-class path**: `extracted_by=human` with a screenshot.
- **Several brand pages are just a navigation shell** (Best Buy came back `thin`). The extractor has to read the help *article*, not the hub page. That calls for per-brand URL curation, so `brand-official-urls.json` becomes a reviewed table.
- **Exceptions are the content.** Costco's page alone has 15 exception bullets. Those are the long-tail answers that win (see 01: facet SERPs and PAA).

## Unit economics (estimate, to be verified on the first automated run)
- 200 brands, fetched weekly (~860 fetches/mo), plus daily in Nov–Jan.
- Most fetches hit the unchanged-hash short-circuit, so LLM extraction runs only on pages that changed.
- Apify costs come from the owner's batch-1 runs ($2–8 cap per run). The real per-fetch cost should be read from the run logs before scheduling.
