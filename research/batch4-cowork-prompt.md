Run Apify batch 4 for refund-return.com (a small gap fill), using my connected Apify account. Output it in the same format as batches 1–3 (manifest.csv with batch,source_url,title,quality,chars,fetched_at,apify_run_id,apify_dataset_id,sha256,file,use; one Markdown file per page with YAML front matter; a README listing run and dataset IDs). Zip it as refund-return-scrape-batch4.zip.

RULES
- Official brand domains only. First find each URL with apify/google-search-scraper (US) using: site:<domain> return policy
- Fetch with apify/website-content-crawler, crawlerType "playwright:chrome", US residential proxy, maxCrawlDepth 0, dynamicContentWaitSecs 15, Markdown output.
- use=yes only if the page itself states the return window (number of days) or the refund rules. A page that only links to another page is use=no. In that case, follow the link once and fetch the linked page.
- Cap: $4 total. Stop and tell me if you would go over.

FOLDER 19-gapfill (target the actual returns page, not a help hub)
1. Target: https://www.target.com/returns, and also the Target help article "Returns" (help/articles/returns-exchanges/returns)
2. Nike: nike.com/help/a/returns-policy (and the "Nike return policy" help article if that one is a hub)
3. Bath & Body Works: bathandbodyworks.com return policy page
4. American Eagle: ae.com return policy (the batch 2 page was only a navigation shell)
5. TJ Maxx: tjmaxx.tjx.com return policy (in-store + online)
6. Walgreens: walgreens.com return policy
7. Apple: apple.com/shop/help/returns_refund (needs the section stating the 14-day window)
8. REI: rei.com/help/return-policy (needs the 1-year / 90-day rules)
9. Zara: zara.com/us/en/help-center — the returns article stating the 30-day window
10. Ross Dress for Less: the actual return policy page (not the contact page)

At the end, give me a summary table: brand | URL | usable | chars | note.
