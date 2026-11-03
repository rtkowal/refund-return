# 03 — Consumer-law matrix (DRAFT, US-first). Every row needs attorney review before indexing.

Rules:
- The citation is always the official source.
- Secondary sources are used only to find the official text, and are marked (2°).
- A ⚠ means the item is unverified or the sources conflict, so I need to check the primary text (via the Apify fetch) before publishing.

## US federal
| Topic | What it gives the consumer | Citation | Status |
|---|---|---|---|
| **No general right to return** | US federal law has no general right to return goods. Returns are store policy, with narrow exceptions. | — (an absence of law; cite FTC consumer guidance) | Framing for every brand page |
| FTC Cooling-Off Rule | 3 days to cancel sales made at the buyer's home or a temporary location (the $25 / $130 thresholds). Doesn't cover online sales. | 16 CFR 429, https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-429 | Thresholds ⚠ verify the current text |
| Mail, Internet or Telephone Order Rule | The seller must ship within the stated time, or within 30 days if none is stated. On a delay, the seller must offer a choice to cancel, and a cancelled order must be refunded promptly. This is the legal basis for "order never arrived" letters. | 16 CFR 435, https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-435 | Core to the "never arrived" generator |
| Fair Credit Billing Act / Reg Z §1026.13 | A credit-card billing-error dispute, including goods not delivered as agreed, must be sent in writing within 60 days of the statement. The card issuer must investigate. | https://www.consumerfinance.gov/rules-policy/regulations/1026/13/ | Core to the chargeback generator |
| Reg Z §1026.12(c) | Claims and defenses against the card issuer for a quality dispute (the $50 / 100-mile / good-faith limits) | https://www.consumerfinance.gov/rules-policy/regulations/1026/12/ | ⚠ verify |
| EFTA / Reg E §1005.11 | Error resolution for debit cards and EFTs: report within 60 days of the statement. **"I'm unhappy with the merchant" is not an error under Reg E.** Debit "chargebacks" for merchant disputes run on the card network's rules, not on federal law. | https://www.consumerfinance.gov/rules-policy/regulations/1005/11/ | Important caveat. Most competitor pages get this wrong. |
| ROSCA | Online negative-option sales need clear disclosure, express informed consent, and a simple way to cancel. The FTC enforces it. | 15 U.S.C. §§8401–8405 | Live |
| FTC Negative Option ("click-to-cancel") Rule | The 2024 rule was **vacated in full by the 8th Circuit in July 2025** (*Custom Communications, Inc. v. FTC*). The FTC issued an **ANPRM in March 2026** (2°: [BCLP](https://www.bclplaw.com/en-US/events-insights-news/im-not-dead-yet-is-the-demise-of-the-ftcs-click-to-cancel-exaggerated.html), [NCL](https://nclnet.org/ncl-urges-ftc-to-revive-click-to-cancel-in-new-proceeding/)). | https://www.ftc.gov/legal-library/browse/rules/negative-option-rule | ⚠ Confirm the ANPRM in the Federal Register. A Truth in Advertising timeline gives conflicting dates and is **not to be used**. **Never write "click-to-cancel is the law."** |
| DOT automatic refund rule | Airlines must give an automatic cash refund for a cancellation or a "significant change": more than 3 hours domestic, more than 6 hours international. Refunds are due within 7 business days for card purchases and 20 calendar days for other payment methods. | 14 CFR 260, https://www.ecfr.gov/current/title-14/chapter-II/subchapter-A/part-260 | Effective 2024-08-12 with compliance from 2024-10-28 (2°). ⚠ Check eCFR for any amendment since. |

## US states: method plus a first verified-risk example
The source of truth is each state's legislature site. FindLaw and Nolo are a cross-check only. Fields per state:
- the disclosure statute
- the default rule when no policy is posted
- restocking-fee disclosure
- the auto-renewal law
- the AG complaint URL
- the small-claims limit

**Example of why the attorney gate matters: CA Civ. Code §1723.**
- Secondary sources disagree: some say a 30-day refund, others say 7 days ([DCA guide S-6](https://www.dca.ca.gov/publications/legal_guides/s_6.shtml), [CA AG](https://www.oag.ca.gov/consumers/general/refund_policies)).
- My reading of the structure: the **7-day** figure is the trigger. A seller whose policy is stricter than a full refund or exchange within 7 days (with proof of purchase) must post that policy conspicuously.
- The **30-day** figure is the remedy. If the seller doesn't post it, the buyer can return within 30 days for a full refund.
- So both numbers are right, but they do different jobs. Most pages that cite one number are misleading.
- ⚠ Confirm against the text on leginfo.legislature.ca.gov.

States with return-policy disclosure laws (per the brief and FindLaw (2°)): CA, CT, FL, HI, IA, MD, MA, MN, NJ, NY (GBL §218-a), OH, RI, UT, VA. AZ has a restocking-fee rule only. Every one needs primary verification. The other 36 states plus DC get a page that explains there is no specific statute, plus their UDAP act, AG contact and small-claims limit. **Those pages are thin.** I recommend a single `/laws/us/` page with a state table for the 36 + DC, and full pages only for the ~15 disclosure states. This changes the brief's "51 state pages."

## International: later phase, status notes only
| Jurisdiction | Key instruments | Status note |
|---|---|---|
| UK | CRA 2015 (30-day short-term right to reject); CCR 2013 (14-day cancellation for distance sales); UK261 (£220/£350/£520) | DMCC Act subscription regime: the government confirmed **January 2027** on 2026-08-09 (2°: [SH Legal](https://shlegal.com/insights/subscription-reforms-brought-forward-to-january-2027-is-your-business-ready/), [Brodies](https://brodies.com/insights/commercial-contracts-and-outsourcing/the-dmcca-subscription-contracts-the-timeline-just-got-shorter/)). Earlier reports said spring 2027. ⚠ Confirm with the DBT/SI text. |
| EU/IE | EU261 (€250/€400/€600 by distance); Consumer Rights Act 2022 (IE) | Later phase |
| AU | ACL consumer guarantees (no change-of-mind right) | Later. "change of mind return policy" gets 10 searches/mo in AU. |
| CA | Provincial consumer acts; APPR (air) | Later |
| NZ / SG / IN | CGA 1993; CPFTA lemon law; CPA 2019 | Later |
