# 00 — Phase 1 summary for CHECKPOINT 1 (2026-11-03)

Inputs:
- Ahrefs (10,335 units, logged in 00-status.md)
- Owner's Apify batch 1 (110 fetches, 71 usable, 40-SERP sample)
- Web search for program terms and secondary legal sources (all marked)

## Strongest counterargument to this business
- **The core query class is already answered for free by Google.** 40/40 "[brand] return policy" SERPs show an AI Overview. Reddit is in the top 10 on 39/40 and #1 on 12/40. Target has 76k searches but its #1 page receives about 400 visits.
- **The core product doesn't monetize directly.** Brands pay nothing for returns traffic.
- **The highest-value monetizable lead is UK/EU flights,** and that's outside the US-first market order.
- If the facet thesis below is wrong, the site becomes a cost centre with display RPM.

## Why it can still work (evidence, not hope)
- **Facets are winnable at near-zero authority.** walmartdesk.com, at domain rating 1, ranks #8 for "walmart return without receipt" (5.2k) with ~1.3k visits/mo, and is cited in the AIO. Facet KD is 0–14 across the top 250.
- **Verified, scoped data beats the AIO on edge cases.** Walmart alone has 5 distinct windows by channel and category, plus a holiday rule.
- **Subscription cancellation is large** (5–34k per service) and held by fintech content (Rocket Money, Privacy.com), not by authority sites.
- **UK "flight delay compensation" is 8.8k at KD 0**, against KD 71 in the US, and AirHelp pays 15% of its fee per successful claim.

## Go / no-go
| Vertical | Verdict |
|---|---|
| Brand returns (facet-led, verified data only) | GO |
| Subscription cancellation | GO |
| Flights: DOT refunds + UK261/EU261 compensation | GO |
| Marketplace disputes (Amazon, eBay, Etsy, Temu, Shein, TikTok Shop) | GO |
| Seller return-policy generator (Shopify, Amazon first) | GO, small; credibility + links, not revenue |
| Event tickets | CONDITIONAL: 2 pages, no generator |
| BNPL | NO-GO as a vertical (one section) |
| Digital goods (Apple, Steam, Google Play) | NO-GO |

## Recommended launch scope (changes vs. the brief are in bold)
- **Generators (8):**
  1. Return/refund request
  2. Order never arrived (16 CFR 435)
  3. Credit-card chargeback (Reg Z, 60 days)
  4. Subscription cancellation (ROSCA + state law)
  5. US airline refund (14 CFR 260)
  6. **UK261/EU261 compensation claim**
  7. Demand letter (the best standalone keyword: 1.8k, KD 16)
  8. Regulator complaint
  - Plus the seller policy generator.
- **Brand pages: 200 seeded, indexed only when verified.** Target about 60 indexable at launch. Full facet sub-pages for the top 20 brands only. Batch 1 gave 27/40 usable, so verified coverage, not page count, is the constraint.
- **`/cancel/[service]/`: top 20 services.**
- **Law: federal pillar + ~15 state pages + one `/laws/us/` table** (approved). Not 51 pages.
- **Pillars (5):** refunds, returns, chargebacks (incl. BNPL and debit/Reg E caveats), cancellations, flight rights.
- The `/news/` policy-change feed and the holiday-deadline table as link assets.

## Monetization ranking
1. **Flight-claim referrals:** AirHelp 15% of fee per successful claim (official); ClaimCompass €15–21/claim (conflicting); Compensair €5–25 (stale). Only EU/UK-departing flights qualify.
2. **Display:** Mediavine Journey from 1,000 sessions/mo (2°), later Raptive at 25k pageviews. Weak RPM, but it starts earliest.
3. **Cancellation-fintech affiliates:** plausible, terms not yet researched.
4. **Replacement-purchase affiliates** on return pages (Amazon Associates, Impact, CJ).
5. **Seller-side SaaS referrals:** weak. Loop has no commission program; ReturnGO's 10% is unverified.
6. **Data licensing:** after 6+ months of fresh data.
7. **Paid escalation** (certified mail via Lob or Click2Mail): later, needs pricing research.

**Brand "File your return" clicks: not monetizable (confirmed).** We track them anyway as intent data.

## Verified vs. open
- **Verified against primary text:**
  - CA Civ. §1723: 7-day trigger, 30-day remedy, exclusions
  - 16 CFR 429: $25/$130
  - 16 CFR 435: 30/50 days
  - 14 CFR 260: ≥3h/≥6h; 7 business / 20 calendar days
  - DoNotPay order: approved 2025-01-16, announced 2025-02-11
- **Open (⚠):**
  - The FTC 2026 ANPRM in the Federal Register
  - DMCC commencement (Jan 2027?)
  - The other ~13 state statutes
  - Reg Z §1026.12(c) limits
  - Every affiliate rate (confirm in partner dashboards)
  - Mail-return fees (re-snapshot)

## Decisions needed at CP1
1. Approve this scope and these go/no-go verdicts.
2. **Attorney reviewer budget:** get quotes. Nothing is indexable without them.
3. Buy Ahrefs units (option c) for the UK flight set, facet expansion for the top 20 brands, and the cancel-[service] set. **Estimate ~15–20k units.**
4. **Attach the GitHub repo.** It's still local-only.
5. **Apify batch 2:**
   - Fix the bot-wall brands
   - corporate.walmart.com/policies
   - UK261 data.xml
   - BA, Virgin Atlantic, easyJet, Ryanair
   - 13 state statutes
   - Brands 41–200
6. Owner's Shopify-merchant input for 07.
