# Source coverage after Apify batches 1–3 (2026-11-03)

Batch 3: 182 manifest rows, 74 `use=yes`. Spot-checked by Claude:
- 940 CMR 3.13 is present ✅
- Walmart's no-receipt rule is present in batch 2 corporate.walmart.com/policies ✅: a government ID is required and the refund is issued as a gift card
- Spirit's shutdown (2026-05-02) was independently confirmed via NPR/CNN/CBS ✅

| Area | Covered | Gaps → path |
|---|---|---|
| Brands (200 seed) | ~165 with a usable official source (b1 27 + b2 ~113 + b3 27; needs a dedupe check during extraction) | **26 bot-walled or broken** (Home Depot, Ulta, Marshalls, Adidas, Dick's + 21 from 17-brands-fix) → manual verification or drop. No public policy: Publix, Albertsons, Safeway, Trader Joe's (guarantee only). Big Lots is winding down, so check before publishing. |
| Cancel (20) | 17 | Planet Fitness (club-specific; it's the #1 cancel keyword at 34k, so verify manually), Paramount+, YouTube Premium |
| Facets | Target PA, Best Buy PA + open box, Costco mattress + freight, Walmart no-receipt | Home Depot no-receipt → manual |
| State law (15) | 14 official texts | NJ N.J.S.A. 56:8-2.15 → manual copy, or have it supplied |
| Flights | US rule, UK261 + CAA, EU261, AA/Delta/United/Alaska-Hawaiian/Allegiant/Frontier/JetBlue/Southwest, BA, Virgin, Ryanair, easyJet help page | easyJet General Conditions (404). **Spirit is defunct** → one "airline shut down" page |

**Manual verification queue:** 32 items (26 brands, Planet Fitness, Paramount+, YouTube Premium, Home Depot no-receipt, NJ statute, easyJet GCC).
- `blocked-fallback.json` holds unverified AI Overview text for 5 brands. Never publish it as fact.
- **Recommendation:** at launch, drop any of the 26 that are not in the top 60 by volume. Of these, only Home Depot (43k) and Ulta (31k) truly matter.

No further manual Apify batches are planned. Next: extraction of all `use=yes` files into `policy_rules` (Phase 3, milestone 2).
