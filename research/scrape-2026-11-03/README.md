# refund-return.com: Apify scrape, batch 1 (2026-11-03)

This scrape was run from Cowork through the owner's connected Apify account. It is a handoff to Claude Code: put this folder in the repo at `/research/scrape-2026-11-03/`.

## What's in here
- `manifest.csv`: one row per page. Columns: source URL, title, `quality` (`ok`, `short-ok`, `thin`, `blocked`, `pdf-in-kv-store`), `use` (yes/no), character count, fetch time, **Apify run ID and dataset ID**, SHA-256 of the Markdown, and the file path.
- `01-…` to `05-…/`: one Markdown file per page, with YAML front matter (source_url, fetched_at, apify_run_id, apify_dataset_id, sha256, quality).
- `serp-summary.csv`: Google US results for "[brand] return policy" (40 brands). Columns: whether an AI Overview appears, the #1 URL, the top-5 domains, whether Reddit is in the top 10, and the number of People Also Ask questions.
- `brand-official-urls.json`: the official return-policy URL chosen for each of the 40 brands.
- `raw-serp/`: the full Google SERP JSON, including AI Overview text and its cited sources, PAA questions and related queries.

**Totals:** 110 page fetches, **71 usable** (61 `ok` + 10 `short-ok`). Usable pages include: 27 of 40 brands; federal rules (16 CFR 429, 16 CFR 435, Reg Z §1026.13, Reg E §1005.11); DOT 14 CFR 260 (the full refund rule text), the DOT complaint page, FlightRights.gov and the DOT refund explainer; airlines (American, Delta, United, Alaska/Hawaiian, Allegiant, Frontier); payments (PayPal User Agreement, Visa, Mastercard, Klarna, Afterpay dispute); marketplaces (Amazon, eBay Money Back Guarantee, Etsy buyer and seller protection, Temu, Shein); sellers (Amazon Seller Central ×2, the Shopify policies page, schema.org MerchantReturnPolicy, Google merchant-listing docs); and state law (CA Civ. Code §1723, NY GBL §218-a, NAAG's AG directory).

## Key research finding (feeds Phase 1, item 1)
- **40 of 40** "[brand] return policy" SERPs show a Google **AI Overview**.
- **Reddit ranks in the top 10 for 39 of 40** and is **#1 for 12 of 40** (Target, Walgreens, Dick's, J.Crew, Marshalls, eBay, Old Navy, IKEA, Sephora, TJ Maxx, Chewy, Ulta).
- Implication: the head term "[brand] return policy" is close to zero-click and Reddit-dominated. Brand pages must win on things the AI Overview can't give in one line: verified structured data, edge cases (no receipt, holiday, opened items, clearance), the generator, and the escalation path. Treat "[brand] return policy" as a gateway term, and target long-tail queries ("[brand] return without receipt", "[brand] refund not received", "[brand] holiday return deadline"). The PAA and related queries in `raw-serp/` are a ready-made list for this.

## Failures to retry (`use=no`)
| Target | Problem | Suggested fix |
|---|---|---|
| Target, TJ Maxx, Marshalls, Dick's, Lowe's, Ulta, Walgreens | Bot walls (Akamai/PerimeterX/"press & hold") even with US residential proxies | Retry with `apify/website-content-crawler` + `playwright:chrome`, a session pool and longer waits, or use a dedicated unblocker actor. Last resort: copy the facts manually from the page and log it as manual verification |
| Home Depot, Adidas, IKEA (full policy), REI, CVS (PDF) | Wrong or redirected URL, or a PDF | Find the correct URL (CVS policy is a PDF: download it from the run's key-value store) |
| TikTok Shop (buyer policy + Seller University) | JS app shell / 404 | Retry the Seller University article with longer `dynamicContentWaitSecs` |
| JetBlue, Southwest contracts of carriage | PDFs, saved in the key-value store of run `wuOGP1JQ4DIQswjAY` (Markdown is empty) | Pull the PDFs from the run's KV store and extract the text |
| Spirit contract of carriage | URL not found | Search for the current URL (Spirit is in restructuring; check the carrier status too) |
| eCFR `/current/...` pages | eCFR blocks scrapers (use the API) | **Already solved:** use `https://www.ecfr.gov/api/renderer/v1/content/enhanced/{date}/title-{N}?part={P}` (see batch 04) |
| FTC Negative Option and DoNotPay pages | Thin landing pages | Fetch the Federal Register documents via the federalregister.gov API, and the DoNotPay final order PDF from the FTC case page |
| UK261 on legislation.gov.uk | Table-of-contents page only | Fetch `/eur/2004/261/contents` → `/data.xml` (or the individual articles) |

## Still to scrape (launch scope, not done here)
1. **The remaining ~160 brands:** rank them by Ahrefs US volume for "[brand] return policy", then find the URLs (google-search-scraper, as here) and fetch them.
2. **State law for 50 states + DC:** only CA and NY are done. One statute and AG complaint page per state, plus the small-claims limit.
3. Remaining seller platforms (TikTok Shop and Etsy seller-side detail) and the returns-app partner pages (Loop, AfterShip, ReturnGO, Redo).
4. The CFPB complaint database: use its public API directly; it isn't a scrape.

## Apify runs
| Batch | Run ID | Dataset ID | Actor |
|---|---|---|---|
| 01 federal/sellers/brands | BrDSV6rfarU6FOjBB | igZjRvGRrtnhDuTVs | website-content-crawler |
| 02 airlines/payments/marketplaces | UJwOvPM779jZfmfPN | nxDInL80vYIt02A1O | website-content-crawler |
| 03 brands (40) | 4RJ5hKWyv3DAFf0wf | X9gtPArcP6AW03l6u | website-content-crawler (residential) |
| 04 fix-ups + eCFR API | wuOGP1JQ4DIQswjAY | AzWcB0ckTkWf6u1dP | website-content-crawler (residential) |
| 05 bot-wall retries | d4qhpOIPdZ7saP5eV | uftem9ubePzXqYmHa | website-content-crawler (residential, US) |
| SERP brands | bg2yUon3U4umlQ943 | FeeKFenFRX6qWixJg | google-search-scraper |
| SERP fix-ups | YIAsyGZAmLQaxXniA | 0anHB8OAZqPCWlBfr | google-search-scraper |

**Settings used:** `maxCrawlDepth: 0` (only the listed URLs), `respectRobotsTxtFile: false`, Markdown output, PDFs saved via `saveContentTypes`. Cost cap per run: $2–8.
**Next step for Claude Code:** the LLM extraction of `use=yes` files into the policy schema (`research/02-policy-db.md`), with a human-review flag on every field.
