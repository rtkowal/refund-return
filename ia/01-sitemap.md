# Phase 2 — Information architecture (v1, 2026-11-03)

This takes the brief's URL plan and changes it to fit the approved CP1 scope. Every change has its reason in brackets.

```
/                                 hub: brand/service search · "What happened?" generator entry · popular cases · this week's policy changes
/brands/                          A–Z + filters (category, window ≥60d, free mail returns, holiday extension)
/brands/[brand]/                  HUB: verified fact card (scoped rules) · facet links · generator embed · escalation path · FAQ from PAA
/brands/[brand]/[facet]/          ONLY where demand ≥1k/mo or a PAA cluster exists [AIO owns the head term; facets win]
                                  facets: no-receipt · electronics · holiday · opened-items · price-adjustment · marketplace-sellers · [category]
/cancel/                          subscriptions hub (ROSCA, state auto-renewal, card-block fallback)
/cancel/[service]/                top 20 services [CP1: GO]
/flights/                         flight rights hub [renamed from /travel/: the vertical is flights only at launch]
/flights/us-refund-rule/          14 CFR 260 explainer + refund letter
/flights/uk261/  /flights/eu261/  compensation explainers + claim-firm partner exit [UK261 approved]
/flights/[airline]-refund/        airlines with demand (AA, United, Spirit, Delta, Southwest, Frontier, JetBlue) + BA, Virgin, easyJet, Ryanair
/marketplaces/[platform]/         amazon-a-to-z · ebay-money-back-guarantee · etsy · temu · shein · tiktok-shop  [one hub each, not per-brand pages]
/chargebacks/                     pillar: credit (Reg Z) vs debit (network rules) vs PayPal vs BNPL section
/chargebacks/[visa|mastercard|amex|discover|paypal]/
/refunds/  /returns/              pillars (refund vs return vs exchange; refund-not-received; timing)
/laws/us/                         federal pillar + 50+DC table (statute or "none", AG link, small-claims limit)
/laws/us/[state]/                 ~15 disclosure states only [approved]
/generator/                       index of 8 generators
/generator/[type]/                refund-request · never-arrived · chargeback-letter · cancel-subscription · airline-refund · flight-compensation · demand-letter · regulator-complaint
/templates/[type]/                static, no-JS versions of each (crawlable fallback)
/sellers/                         merchant hub
/sellers/return-policy-generator/ + /sellers/[shopify|amazon]-return-policy/ at launch [others later]
/holiday-return-deadlines/        link asset: table built from DB holiday rules [new]
/news/  (+ RSS)                   policy-change feed generated from policy_changes
/compare/[a]-vs-[b]-return-policy/  DEFERRED: no demand measured yet
/best/[category]-stores-with-best-return-policy/  DEFERRED to post-launch: needs ≥30 verified brands per category
/glossary/ /about/ /methodology/ /editorial-policy/ /updates/ /llms.txt
/go/[brand]  /go/partner/[id]     server redirect layer (noindex, rel=sponsored when affiliate)
```

## Indexation rules (the scaled-content guard)
| Page type | Indexable when |
|---|---|
| /brands/[brand]/ | core rules `reviewed` AND verified within 30 days (7 days Nov–Jan) |
| /brands/[brand]/[facet]/ | the facet has ≥1 reviewed rule specific to that facet. Otherwise it is **not generated at all**, not just noindexed |
| /laws/…, /generator/…, /templates/… | `reviewed_by` set (owner decision 2) |
| /cancel/[service]/ | official cancel path verified within 30 days |
| everything else | editorial review |

## Internal linking
- Each brand hub links to its facets, the matching generator (pre-filled with `?brand=`), the state law page if the user's state is known, and the chargebacks pillar.
- Each facet links up to its hub and across to the same facet for 3 peer brands (e.g. "no-receipt at Target / Walmart / Home Depot").
- Each generator's result screen shows the escalation path: brand portal → chargeback → regulator → demand letter.

## Coverage today (from Apify batches 1+2)
- **Brands:** batch 1 gave 27 of 40 usable. Batch 2 recovered Target, TJ Maxx, Walgreens, Lowe's, IKEA, REI and CVS, and added ~106 of the 160 brands in 41–200. That is roughly 140 brands with a usable source.
- **Still blocked:** Marshalls, Home Depot, Adidas, Dick's, Ulta. Home Depot and Ulta are top-10 by volume; they need a manual verification path.
- **State statutes:** all 15 fetched from official sources. The MA 940 CMR 3.00 text appears in batch 2 and still needs checking that §3.13 is inside it. NJ needs N.J.S.A. 56:8-2.15 from the official site.
- **Flights:** US rule ✅, UK261 full text ✅, BA/Virgin/Ryanair ✅, easyJet partial, Spirit missing.
