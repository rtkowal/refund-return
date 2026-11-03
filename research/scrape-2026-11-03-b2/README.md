# refund-return.com: Apify scrape, batch 2 (2026-11-03)

This scrape was run from Cowork through the owner's Apify account, with each run capped at about $3–4. It is a handoff to Claude Code: put this folder at `/research/scrape-2026-11-03-b2/`, next to batch 1.

## Contents
- `manifest.csv`: one row per page, with the source URL, `quality` (`ok`, `thin`, `blocked`, `empty`), `use` (yes/no), character count, fetch time, Apify run and dataset IDs, SHA-256 and the file path. **243 pages, 147 usable.**
- `06-…` to `12-…/`: the Markdown files, with front matter.
- `brands-41-200-urls.json`: the official policy URL chosen for each of the 160 brands. `b.txt` is the brand list.
- `brands-41-200-coverage.json`: which brands have a usable page and which don't.
- `raw-serp/`: Google results (AI Overviews, People Also Ask) for 160 brands, the state-statute searches and the UK airline searches.
- `apify-errors.json`: failed URLs with HTTP codes.

## What was done
| Task | Result |
|---|---|
| Retry bot-walled brands (unblocker) | ✅ Target, TJ Maxx, Walgreens, Lowe's, IKEA, REI, CVS (PDF), TikTok Shop seller policy. ❌ **Still blocked:** Marshalls, Home Depot, Adidas (Akamai), Dick's (geo/GDPR wall), Ulta. Two different unblockers failed on these, including "thorough" mode |
| Walmart corporate policy page | ✅ corporate.walmart.com/policies |
| UK261 | ✅ legislation.gov.uk `/eur/2004/261/data.xml` (full text) + the CAA delays and cancellations page |
| British Airways, Virgin Atlantic, easyJet, Ryanair | ✅ BA General Conditions of Carriage (full); ✅ Virgin Atlantic CoC article 11 (refunds); ✅ Ryanair T&Cs + 2 refund help articles; ⚠️ easyJet: only the help-centre page. The General Conditions page is blocked; retry from a GB residential IP with longer waits |
| 13 remaining state statutes | ✅ AZ (A.R.S. 44-1377), CT (ch. 735a incl. §42-110aa), FL (§501.142), HI (§481B-5.5), IA (§714H.3 + §714.16, PDF), MD (Com. Law §14-1319 + AG FAQ), MA (consumer guide only; the **940 CMR 3.13 text is still missing**), MN (§325F.80), NJ (Consumer Affairs refund-disclosure brief; **cite N.J.S.A. 56:8-2.15 from the official site**), OH (OAC 109:4-3-02), RI (§6-27-9), UT (Utah Code 13-11-4), VA (§59.1-200). Citations came from FindLaw's state table; every text is from an official source. **Have the attorney confirm each citation is the right section** |
| Brands 41–200 | ✅ ~106 of 160 have a usable page; 54 are missing (see the coverage file: mostly wrong URLs chosen from SERPs, plus some JS-heavy sites). JetBlue CoC PDF extracted (118k chars) |

## Caveats
- **Brands 41–200 are not ranked by search volume.** The Ahrefs API units ran out (6 left; the query needed 3,000), and Semrush had no API units either. The 160 brands are a hand-picked list of large US retailers and brands. When the Ahrefs units refill, re-rank them with `keywords-explorer-overview` for "[brand] return policy" (US) and drop the brands with low volume.
- Some chosen URLs are the wrong page (a contact page, an international site, or a third party). Check `quality` and the content before extraction. Flagged examples: Albertsons (store locator), Big Lots (privacy page), Safeway (general FAQ), Publix (no policy URL found).
- The 1,500-character Target page may contain only part of the policy. Verify it before using it.
- The Spirit contract of carriage was not retrieved (page error). Spirit's status as a carrier should be checked before building pages for it.

## Next steps for Claude Code
1. Re-rank the 160 brands with Ahrefs once the units refill; then fix the URLs for the 54 missing brands. Re-run Google search with `site:` plus "return policy", then crawl through Apify.
2. For the 5 Akamai/geo-blocked retailers: try `apify/website-content-crawler` with `playwright:chrome`, a US residential session pool and cookies kept between requests. If that fails, use the interim facts from the AI Overview text in `raw-serp/` (marked unverified), and re-verify later.
3. Fetch the 940 CMR 3.13 text (mass.gov) and N.J.S.A. 56:8-2.15 (NJ legislature).
4. Extract every `use=yes` file into the policy schema, with a human or attorney review flag.

## Apify runs (batch 2)
| Batch | Run ID(s) | Dataset ID(s) | Actor |
|---|---|---|---|
| 06 blocked retail, Walmart, UK261, BA | 14ymTuHeKHMDeSDld, tmUBsmyRiM6leEZSg (+ hard retry 3faRdxcsxYyVdPRc7, hfO3jdzhpzNUAWaEf) | wDsvcfsPYBogbSCK6, fWRm0mg49HqlSscyO | get_anything/web-unblocker, scrapers_lat/gen5-website-unblocker |
| 07 UK airlines | 7nBW0BEg40pN71Vmc | ldaKStMuAZyaNuTaF | website-content-crawler (GB residential) |
| 08 state statutes | 74pyNi9PADn69gs4L, ailqkRW2SRF9vueBD | wotYbEM50GZZ02A7Z, obUWyjkuFO3UmkANQ | web-unblocker, website-content-crawler |
| 09 PDFs (IA, NJ, CVS, JetBlue) | 1gewS4vzhLpDwVyZN | rJibG4W8Bu6ZRhdgy | memo23/pdf-text-extractor |
| 10–11 brands 41–200 | 432rq9ixpKzLXR6yU, O2glRgE29zL4MxTey | TJLTSZFhsPtDs9jji, 4cbFgdZUvb1tQMYFP | website-content-crawler (US residential) |
| 12 brand retries | a1RDVqKHolQTpskYp | 0E1jwGlAHpZew3mhQ | gen5-website-unblocker |
| SERPs | 8a89gYjBiteh6gp43, 0mzU5fzMHpTMkPIni, zTEq6kz4jnlYtf67A, TQmfSXIbJnLOutRFL | vXRFnZRTM9YLxtAKu, SUNc8dYx0hqnegmtv, 7CC9QtAXeJugzIsIG, lVlksre4osc0pWWr6 | google-search-scraper |
