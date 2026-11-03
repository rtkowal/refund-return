# refund-return.com: Apify scrape, batch 4 (gap fill), 2026-11-03

Same format as batches 1–3: `manifest.csv` (`batch,source_url,title,quality,chars,fetched_at,apify_run_id,apify_dataset_id,sha256,file,use`) plus one Markdown file per page in `19-gapfill/`, with YAML front matter. `use=yes` only when the page itself states the return window or the refund rules. **23 page fetches, 10 usable, covering 7 of the 10 brands.**

| Brand | URL | Usable | Chars | Note |
|---|---|---|---|---|
| Target | target.com/returns; /help/articles/returns-exchanges/returns; /help/article/000061980; /help/articles/policies-guidelines/return-policy | no | 108–241 | Bot wall ("press & hold") with Chrome + US residential proxy. **Still missing** |
| Nike | nike.com/help/a/returns-policy | yes | 723 | 60-day window (short page) |
| Nike | nike.com/help/a/return-exceptions | yes | 1,651 | Exceptions (14-/7-day items) |
| Bath & Body Works | customercare.bathandbodyworks.com … Store-Purchase-Return-Policy | yes | 5,727 | Store-purchase returns |
| Bath & Body Works | customercare.bathandbodyworks.com … Website-Purchase-Return-Policy | yes | 10,735 | Online-purchase returns |
| American Eagle | ae.com/us/en/content/help/return-policy | no | 908 | Only the accordion questions; the answers never render, even with a click selector. **Still missing** |
| TJ Maxx | tjmaxx.tjx.com … return-policy-for-items-purchased-online/2400118, easy-returns/2400097, Return-Policy/2400087, m.tjmaxx FAQs | no | 147 | "Something went wrong" bot page. **Still missing** |
| Walgreens | walgreens.com/topic/help/shophelp/returns_help_main.jsp | yes | 1,773 | 30 days with receipt; hearing aids 45 days |
| Apple | apple.com/shop/help/returns_refund | no | 1,743 | Hub page, no window stated, so its link was followed once ↓ |
| Apple | apple.com/legal/sales-support/sales-policies/retail_us.html | yes | 9,604 | U.S. Sales & Refund Policy: 14 days from receipt; 14-day price protection |
| REI | rei.com/help?a=Returns-and-Exchanges-FAQ… | no | 112 | Empty shell |
| REI | rei.com/help/returns | yes | 6,806 | Members 1 year (365 days), non-members 90 days; outdoor electronics 90 days |
| Zara | zara.com/us/en/help-center/HowToReturn | yes | 2,168 | 30 days from shipment (online) / from purchase (store) |
| Zara | zara.com/us/en/help-center/ReturnSpecialConditions | yes | 1,779 | Item-specific refund rules |
| Ross | rossstores.com/contact-us/ | yes | 11,059 | The contact page carries the "Ross Return Policy" section: full refund within 30 days with receipt; older than 30 days → exchange or store credit |
| Ross | rossstores.com/faqs/ | no | 108 | 404 |

**Still missing: Target, American Eagle, TJ Maxx.** All three use bot walls or client-side rendering that defeated Chrome + residential proxies in batches 1–4. Use the AI Overview text in batch 1's `raw-serp/` as unverified interim data, and verify manually.

## Apify runs
| Purpose | Run ID | Dataset ID | Actor | Cost |
|---|---|---|---|---|
| URL discovery (10 × `site:<domain> return policy`, US) | cV5j8Syp77bvsfCoF | asBm9u0HYIgKsxO6q | apify/google-search-scraper | $0.03 |
| Fetch (18 URLs) | hohO3k9gttpmBnRkX | ZGxR9GhZLfZH4k9d0 | apify/website-content-crawler (playwright:chrome, US residential, 15s wait) | 0.37 CU + proxy |
| Follow-up fetch (5 URLs) | DbomDhoA44kinfTa0 | wD8sVMabZuJAfWQKj | apify/website-content-crawler (chrome, click-expand selector) | 0.11 CU + proxy |

**Estimated total ≈ $0.30–0.60, well under the $4 cap.** Exact charges are in the Apify console → Billing.
