# SOURCES.md: what to scrape for refund-return.com (launch scope)

> A companion to the Claude Code brief. Put it at `/research/SOURCES.md` in the repo.
> **Scope:** US launch only, about 300 targets. **Do not scrape anything listed under "Later phases"** until the owner approves that phase.
> **Rules:** throttle requests (low concurrency, spread out per domain). Store the raw HTML snapshot, a SHA-256 hash and the fetch date. Extract facts into our schema and write the prose ourselves. Never republish third-party text verbatim. Cite only official sources for legal facts.

## 1. US federal law (about 6 sources)
- FTC Cooling-Off Rule (16 CFR 429): https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-429
- FTC Mail, Internet or Telephone Order Rule (16 CFR 435): https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-435
- FTC Negative Option Rule / ROSCA: https://www.ftc.gov/legal-library/browse/rules/negative-option-rule. The click-to-cancel rule was vacated by the 8th Circuit on July 8, 2025; the FTC opened a new ANPRM in 2026; ROSCA is still enforced. Re-verify the status before publishing.
- Reg Z §1026.13, card billing disputes: https://www.consumerfinance.gov/rules-policy/regulations/1026/13/
- Reg E §1005.11, debit/EFT errors: https://www.consumerfinance.gov/rules-policy/regulations/1005/11/
- FTC v. DoNotPay order, our "what not to claim" list: https://www.ftc.gov/legal-library/browse/cases-proceedings/donotpay

## 2. US state law (50 states + DC)
- From each official legislature site: the return-policy disclosure statute (e.g. CA Civ. Code §1723, NY GBL §218-a), the default refund rule when no policy is posted, the restocking-fee disclosure rule, and the automatic-renewal law where one exists.
- The state AG's complaint page (index: https://www.naag.org/find-my-ag/) and the small-claims dollar limit from the state judiciary site.
- FindLaw and Nolo are a cross-check only, never the citation.

## 3. Flights (in launch scope)
- DOT automatic-refund rule (14 CFR 260): https://www.ecfr.gov/current/title-14/chapter-II/subchapter-A/part-260 and https://www.transportation.gov/briefing-room/what-airline-passengers-need-know-about-dots-automatic-refund-rule
- FlightRights.gov dashboard: https://www.flightrights.gov
- DOT complaint form: https://www.transportation.gov/airconsumer/file-consumer-complaint
- Refund pages and contracts of carriage for 10 US airlines: American, Delta, United, Southwest, Alaska, JetBlue, Spirit, Frontier, Allegiant, Hawaiian
- Partner pages for AirHelp, ClaimCompass, Compensair and Skycop (commission terms)
- EU261 (https://eur-lex.europa.eu/eli/reg/2004/261/oj) and UK261 (https://www.legislation.gov.uk/eur/2004/261/contents), only for US travelers on flights from the EU or UK

## 4. Payments (5 sources)
- Visa and Mastercard consumer dispute pages, PayPal Purchase Protection, Klarna and Afterpay returns and disputes help pages.

## 5. Brand policy database (200 brands, the core of the scrape)
- **Seed:** Ahrefs volume for "[brand] return policy" (US), with the top 200 ranked by volume.
- **Per brand:** the official return-policy URL, the returns-portal URL, the price-adjustment policy, the holiday extension, and membership exceptions.
- **Include the marketplaces:** Amazon (Returns Center + A-to-z), eBay Money Back Guarantee, Etsy, Walmart, Temu, Shein, TikTok Shop.
- **Refresh:** re-fetch weekly (daily from November to January). Diff the extracted fields; changes go to human review, then to a `/news/` item.

## 6. Seller-generator sources (4 platforms first)
- Policy and returns rules from: Shopify Help Center, Amazon Seller Central, TikTok Shop Seller University, Etsy Seller Handbook.
- schema.org `MerchantReturnPolicy`: https://schema.org/MerchantReturnPolicy and Google's merchant-listing docs: https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
- Partner pages for Loop, AfterShip, ReturnGO and Redo (commission terms)

## 7. Data API
- CFPB Consumer Complaint Database API: https://www.consumerfinance.gov/data-research/consumer-complaints/ (refund/dispute complaint counts per company, for brand pages)

## Apify setup (mandatory: all scraping goes through Apify)
- **Every fetch of a source page runs through our connected Apify account.** Use the Apify MCP server (`https://mcp.apify.com`, tools such as `call-actor` and `get-dataset-items`) when it is connected in the Claude Code session. Otherwise use the Apify REST API or the `apify-client` SDK with `APIFY_TOKEN` from `.env`.
- **Do not scrape with WebFetch, curl, fetch(), Playwright run locally, or any other direct HTTP client.** WebSearch and WebFetch may be used only to *look up* a source's URL or read one page to check something, never to collect data in bulk.
- Save each run's ID and dataset ID with the snapshot, so every fact traces back to an Apify run.

| Job | Actor | Notes |
|---|---|---|
| Policy pages → clean Markdown | `apify/website-content-crawler` | Playwright for JS-heavy sites; `respectRobotsTxtFile` stays at its default (off); restrict with `includeUrlGlobs` to policy/help paths |
| Pages that fail to render | `apify/playwright-scraper` | Returns portals built on Loop, Narvar and similar |
| Scheduled refresh | Apify Schedules + webhook → `/api/ingest` | Weekly; daily from November to January |

**Pipeline:** fetch → snapshot (Supabase Storage) → LLM extraction into the zod schema → field-level diff → human review → publish (ISR revalidate, `last_verified_at`, change log).
**Budget guard:** log Apify compute units and LLM tokens per run. Ask the owner before any run estimated to go over the agreed cap.

---

## Later phases (do not scrape until the owner approves)
- **International:** UK (CRA 2015, CCR 2013, DMCC Act, CMA, FOS), Canada (provincial acts, CTA APPR), Australia (ACL, ACCC), Ireland (CRA 2022, CCPC), NZ (CGA 1993), Singapore (CPFTA), India (CPA 2019).
- **Verticals awaiting research go/no-go:** subscriptions (`/cancel/`), event tickets, digital goods (Apple, Google Play, Steam), card issuers, other BNPL providers, P2P apps.
- **Other sellers:** eBay, Gumroad, WooCommerce, BigCommerce, Wix, Squarespace.
- **Other:** rail, bus, cruises, vehicle lemon laws.
- **Read and cite, don't scrape:** NRF/Happy Returns, Appriss and Narvar reports. **Use Ahrefs instead of scraping:** competitors (Knoji, Which?, FindLaw, and others).
