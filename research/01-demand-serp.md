# 01 — Demand & SERP reality (PRELIMINARY: US only, 42 keywords, 2 SERPs)

Status: partial. Ahrefs budget is the binding constraint (see `00-status.md`). Data: Ahrefs Keywords Explorer + SERP Overview, US, pulled 2026-11-03. Raw rows: `keywords.csv`.

## What the data says so far

**1. "[brand] return policy" is a big, easy-to-rank, AI-Overview-saturated head.**
- 20 brands sampled = **~559k US searches/month**. Top: Target 76k, Walmart 61k, Costco 53k, Amazon 43k, Home Depot 43k, Sephora 37k.
- Keyword Difficulty is 0–22 on all 20. Low-DR sites already rank: on "target return policy", purchy.ai (DR 8) is #10 and expensemonkey.io (DR 18) is #9.
- **An AI Overview appears on 20/20 (100%)** of these SERPs.

**2. How much does the AI Overview absorb? Proxy estimate, not a measurement.**
Ahrefs can't attribute clicks to the AIO itself, so I'm using three proxies:
- Clicks per search (CPS) runs 0.60–0.97 (median ≈0.79). So about 20% of searches end with no click at all.
- The AIO's cited sources are mostly the **brand's own help pages**. On "target return policy", 9 of the ~10 unique AIO citations are target.com; the rest are Facebook and Instagram. On "costco return policy", 4 of 6 are third-party (ConsumerAffairs, Yahoo Finance, erika.com, YouTube).
- **Traffic potential vs. volume is the tell.** Target has 76k volume but TP of only 400; Shein has 15k volume and TP of 30. When the #1 page's total traffic is tiny compared with the query's volume, the clicks are spread across AIO citations, Reddit and the brand. In the Target SERP, Reddit's organic #2 gets about 35k/mo.

**My working estimate:** for the head "[brand] return policy" query, a new third-party site in positions 3–10 can realistically win **1–5% of searches**. The AIO plus the official page take most of the clicks. **The head term alone does not justify the cost of a brand directory.**

**3. What does justify it: the sub-question long tail and adjacent high-TP terms.**
- Google's own PAA boxes carry the long tail: "Target return policy for opened electronics", "return after 30 days", "Costco $20 rule", "return a couch after 5 years". The low-DR sites that rank are exactly the ones answering these sub-questions.
- Adjacent terms have high TP and very low KD: "walmart return without receipt" (5.2k vol, KD 1, TP 14k), "target price adjustment" (6.7k, KD 1, TP 19k), "best buy price adjustment" (KD 7, TP 14k).
- Cancellation intent is large: "cancel planet fitness membership" 34k (TP 69k), "cancel amazon prime" 16k (TP 40k, KD 35).
- **Implication for the IA:** a brand page should be a hub of verified sub-answers (receipt, electronics, opened items, price adjustment, holiday window). `/brands/[brand]/[facet]/` pages should be gated on PAA/long-tail evidence. Don't publish one thin "return policy" page per brand.

**4. The generic "letter / refund" heads are weak.**
- "refund letter template" gets 60 searches; "refund not received" 30; "return without receipt" (generic) 150; "dot refund rule" 10.
- "demand letter template" (1.8k, KD 16, CPC $1.24) is the one solid generator-intent head.
- "how to get a refund" has volume 250, but its parent topic is "apple refund" (TP 125k). **Refund demand is brand-led** ("apple refund", "american airlines refund"), not generic.
- **Implication:** generators should be embedded on brand and airline pages and reached from there. A standalone `/generator/` URL won't pull meaningful organic traffic.

**5. Flights:** "flight delay compensation" is KD 71 (AirHelp's turf); "eu261" is 1.3k at KD 26. Airline-specific refund queries look like the opening, and that needs the next pull.

**6. Seller generator:** "return policy generator" 200 (KD 54, CPC $1.73), "shopify return policy" 200 (KD 36). Small and contested. This is an affiliate side-asset, not a traffic engine.

## Still to do (needs budget, see 00-status.md)
- 50-SERP ownership sample (≈450 units each → ~22k units). Only 2 are done.
- UK/CA/AU/NZ/IE volumes (`volume-by-country`).
- Matching-terms expansion per brand to size the facet long tail.
- Airline refund and cancel-[service] keyword sets.

---
## Update 2 (2026-11-03): seed list, verticals, facet SERPs, international

### Brand seed list: `brand-seed-us.csv`
- **198 unique brands** from Ahrefs matching-terms on "return policy" (US). I merged spelling variants like "lowes/lowe's" and dropped generic and facet rows.
- 39 brands have ≥5k searches a month, 115 have ≥2k, and the tail reaches 1.4k. **Median KD is 0–1.** This list is the 200-brand seed that SOURCES.md §5 asks for.
- **Facet demand is real.** Facet keywords seen in the top 250: "walmart … without receipt" 6k, "costco mattress" 4.8k, "costco electronics" 3.2k (+2.8k variant), "target … opened items" 1.8k, "best buy open box" 1.9k, "home depot plant" 1.7k, "best buy tv" 1.6k, "ulta … used" 1.5k, "costco furniture/jewelry/tv" 1.4–1.7k. That supports `/brands/[brand]/[facet]/` pages for roughly the top 20 brands only.

### Facet SERP: "walmart return without receipt" (5.2k)
- It has an AI Overview. The AIO cites walmart.com, krocnews, **walmartdesk.com** and Quora.
- **walmartdesk.com has a domain rating of 1, ranks #8, and gets ~1.3k visits a month** while also being cited in the AIO.
- **This is the strongest evidence so far:** a site with almost no authority can capture facet-level traffic and AIO citations by answering one narrow question.

### Airlines: "american airlines refund" (8.2k, KD 28)
- The AIO sits at **position 4, not at the top**. aa.com takes #1, #3 and #5, then Reddit, CBS and NerdWallet. That works out to about 2.5k clicks a month for third parties.
- The AIO cites transportation.gov's refunds page. **This is where DOT-rule content gets cited.**
- Airline refund demand is otherwise small: United 2.2k, Spirit 1.2k, Delta/Southwest 900 each, and every other airline is under 600. The flight vertical is worth more for claim-firm leads than for traffic.

### Subscriptions
- The volume is large: "cancel planet fitness" 34k, "cancel adobe" 11k (TP 39k), "cancel hulu" 15k, "cancel netflix" 9.1k, "cancel spotify" 6.4k, "cancel la fitness" 5.1k.
- The SERPs are owned by the official page plus **Privacy.com and Rocket Money**. Those are fintechs with cancellation products, and they're potential affiliate partners.
- SOURCES.md lists `/cancel/` as "awaiting go/no-go". **The data says go.**

### Digital goods
- "apple refund" has 114k searches but KD 80. "steam refund" has 45k but TP 0, meaning Valve's own help page takes everything. "google play refund" has a CPS of 0.13, which is pure zero-click.
- **No-go** as a traffic play.

### International check (volumes only)
- **UK "flight delay compensation": 8.8k searches, KD 0.** The same term in the US is 4.7k at KD 71. UK261 is the best lead-gen opportunity found so far, but SOURCES.md places the UK in a later phase.
- **UK "cancel amazon prime": 8.9k, KD 1.**
- **Canada:** Canadian Tire 9k, and "flight delay compensation canada" 1.1k (APPR).
- **Australia:** Kmart/Bunnings 4.4k each. Statutory-rights queries ("consumer guarantee" 90) are tiny.
- **Takeaway:** law pages earn links and trust; they won't bring traffic.

SERPs sampled so far: 5 of 50.
