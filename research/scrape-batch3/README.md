# refund-return.com: Apify scrape, batch 3 (final manual batch), 2026-11-03

Same format as batches 1–2. `manifest.csv` has the columns `batch,source_url,title,quality,chars,fetched_at,apify_run_id,apify_dataset_id,sha256,file,use`, and each Markdown file carries YAML front matter (source_url, loaded_url, fetched_at, apify_run_id, apify_dataset_id, sha256, quality). **182 manifest rows, 74 with `use=yes`.** `use=yes` means the page contains policy text, not just navigation, a login page, a store locator or a bot wall.

## Summary
| Folder | Targets | Usable | Failed | Cost (est.) |
|---|---|---|---|---|
| 13-cancel | 20 services (+8 terms pages) | 17 services | 3: Paramount+ (help centre is a JS app with no article), Planet Fitness (FAQ accordion is empty; cancellation is club-specific), YouTube Premium (page fetched but thin; re-check) | ~$1.10 |
| 14-facets | 6 (Walmart no-receipt skipped; see below) | 5: Target price match, Best Buy price match, Best Buy return policy (covers open-box; the dedicated open-box page is 404), Costco return policy (covers mattresses), Costco freight returns | 1: Home Depot (bot wall) | ~$0.35 |
| 15-law | 2 | 1: **940 CMR 3.00 PDF from mass.gov, incl. §3.13** | 1: **N.J.S.A. 56:8-2.15** (official text not reachable; see below) | ~$0.10 |
| 16-airlines | 3 | 1: easyJet help-centre terms page | 2: Spirit (**ceased operations May 2, 2026**, not fetched); easyJet General Conditions of Carriage (404 from a GB residential IP) | ~$0.10 |
| 17-brands-fix | 54 brands (48 unique URLs; Aerie and American Eagle share ae.com) | 27 | 21 | ~$2.00 |
| 18-blocked | 5 | 0 | 5 → `blocked-fallback.json` (unverified AI Overview text + cited URLs) | ~$0.10 |
| **Total** | | **74 pages** | | **≈ $4–6 (est.)** |

**About the cost figures:** Apify's public run endpoint shows compute units, but not the USD charge for website-content-crawler runs. Compute units across the five crawler runs total ≈6.0 CU (≈$2.40 at $0.40/CU) plus US/GB residential proxy traffic. The google-search-scraper runs cost $0.25 + $0.07 (reported). The first SERP call timed out on the device bridge; if it also ran, add ≈$0.25. **Well under the $20 cap; no run went over $4.** Check exact charges in the Apify console → Billing.

## Notes and decisions
- **Spirit Airlines:** the Google news results (Guardian, CBS, CNN, Flightradar24) report that Spirit ceased all operations on 2026-05-02. The contract of carriage was therefore not fetched, as instructed; the queued URLs returned errors. See `16-airlines/spirit-status.json`. Recommendation: keep only an "airline shut down — how to get your money back" page (card chargeback, DOT, bankruptcy claims) instead of a standard airline page.
- **N.J.S.A. 56:8-2.15:** the NJ Legislature's statute database (`lis.njleg.state.nj.us` NXT gateway) has no stable per-section URL, Google indexes only search-result pages, and `pub.njleg.state.nj.us/statutes/TITLE56.pdf` returns 404. Batch 2 already has the NJ Division of Consumer Affairs refund-disclosure brief (official). **Action:** copy the section text from the NJ Legislature site manually, or have the attorney supply it.
- **940 CMR 3.13:** the mass.gov PDF was saved by the crawler to Apify key-value store `YONXqcIDwzAUw8ndG` (key `file-8f91bf8-download`, run `Uc8WOn9zWYgL0A3bA`) and the text was extracted with pdftotext. §3.13 "Pricing and Refund, Return and Cancellation Privileges" is included.
- **Walmart no-receipt facet:** not fetched separately. Batch 2's corporate.walmart.com/policies (105k chars) should cover it; Claude Code should confirm during extraction.
- **Brands without a public return policy:** Publix → saved the official "Publix Guarantee" page (satisfaction guarantee, no return window). Albertsons and Safeway → only the "Fresh Guarantee" (produce money-back) page is public; no general return policy was found. Trader Joe's → no return-policy page found (the FAQ URL is 404); their satisfaction guarantee isn't published as a policy page. Big Lots → FAQ only (the chain is in wind-down; check its status before publishing).
- **17-brands-fix, still failing (21):** bot walls (PerimeterX/Akamai "Press & Hold") on Ann Taylor, LOFT, Belk, Vans, The North Face, Ralph Lauren, Estee Lauder and Restoration Hardware; wrong or removed URLs on Fossil (410), Mattress Firm, O'Reilly, Uniqlo, Vitamin Shoppe and Torrid (timeout); JS shells on Hoka, AliExpress, Finish Line and Ninja Kitchen; Crate & Barrel and Banana Republic pages not displayed. Each target got one Chrome retry, per the rules. **No further attempts.**
- **18-blocked:** website-content-crawler with `playwright:chrome`, US residential, 20s wait and retries failed on all 5 (Marshalls "something went wrong", Ulta waiting room, Home Depot/Adidas/Dick's no content). `blocked-fallback.json` holds the fresh AI Overview text and cited URLs for each brand, marked `unverified`, for manual verification.

## Apify runs (batch 3)
| Purpose | Run ID | Dataset ID | Actor |
|---|---|---|---|
| Official-URL discovery, 100 queries (+ Spirit news, blocked AI Overviews) | Hme1WyBLTwDrRRcTM | tcZuy393zzeyNnYCz | apify/google-search-scraper |
| Fetch: folders 13–16 + 17 (part 1) | Uc8WOn9zWYgL0A3bA | 8cSJN8Sz2Nzqqwp6I (KV: YONXqcIDwzAUw8ndG) | apify/website-content-crawler (firefox, US residential) |
| Fetch: folder 17 (part 2) | te4KP4vEIqKaIvFVh | NcXiC0nJsalFboeyO | apify/website-content-crawler (firefox, US residential) |
| 18-blocked attempt | DvN3L0A81HJLIWGRB | VSydijltJUJvean08 | apify/website-content-crawler (chrome, 20s wait) |
| easyJet GCC (GB) | ZbUBtU337KxEmUeYd | B4akwk3UQHQz2Iog9 | apify/website-content-crawler (chrome, GB residential) |
| URL re-discovery for failures | SSVgZeaG9GZ3canN9 | H2I9hrDTzQS7Khxf0 | apify/google-search-scraper |
| Single Chrome retry (blocked/thin) | eOw16fKOqV49VIlfU | KHNgxptiCww8vAOGL | apify/website-content-crawler (chrome, session pool, 15s wait) |

Other files: `targets-urls.json` (targets → chosen official URLs), `fetch-map.json`, `raw-serp/` (full SERP JSON), `16-airlines/spirit-status.json`, `18-blocked/blocked-fallback.json`.
