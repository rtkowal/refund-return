Run Apify batch 3 for refund-return.com, using my connected Apify account. It is the final manual batch. Output it in exactly the same format as batches 1 and 2: a manifest.csv with the columns batch,source_url,title,quality,chars,fetched_at,apify_run_id,apify_dataset_id,sha256,file,use; one Markdown file per page with YAML front matter (source_url, loaded_url, fetched_at, apify_run_id, apify_dataset_id, sha256, quality); a README listing the run and dataset IDs; and one zip named refund-return-scrape-batch3.zip.

GENERAL RULES
- For every target, first find the OFFICIAL URL with apify/google-search-scraper (US, query "site:<official domain> <topic>"). Never use third-party sites.
- Fetch with apify/website-content-crawler: maxCrawlDepth 0, Markdown output, saveContentTypes for PDFs, US residential proxy. If a page is blocked or thin, retry once with crawlerType "playwright:chrome", a session pool, and dynamicContentWaitSecs 15.
- Hard cap: $4 per run and about $20 in total. Stop and tell me if you would go over.
- Mark quality as ok, thin, blocked or empty. Set use=yes only when the page actually contains the policy text, not just navigation, a login page or a store locator.

FOLDER 13-cancel: official "how to cancel" pages, 20 services
Planet Fitness, Amazon Prime, Hulu, Adobe, Netflix, Spotify, LA Fitness, SiriusXM, Peloton, Disney+, Max, Paramount+, YouTube Premium, Audible, Kindle Unlimited, Xbox Game Pass, PlayStation Plus, DoorDash DashPass, Walmart+, Crunch Fitness.
Also save the service's cancellation or refund terms page if it is separate from the how-to page.

FOLDER 14-facets: brand sub-question help pages
- Target price match / price adjustment policy
- Best Buy open-box return policy
- Best Buy price match / price adjustment policy
- Costco mattress return policy (and the Costco freight/large-item returns page)
- Walmart return without receipt (only if corporate.walmart.com/policies does not already cover it)
- Home Depot return without receipt

FOLDER 15-law
- N.J.S.A. 56:8-2.15, the official text from the NJ Legislature (pub.njleg.state.nj.us or njleg.state.nj.us)
- 940 CMR 3.13, the official text from mass.gov. Make sure section 3.13 itself is included.

FOLDER 16-airlines
- First, run a Google News search: "Spirit Airlines" status (operating / bankruptcy / ceased flights) as of today. Save the top 5 results to spirit-status.json.
- If Spirit is still operating: fetch the Spirit contract of carriage and the refund help page.
- easyJet General Conditions of Carriage: retry from a GB residential IP with long waits.

FOLDER 17-brands-fix: correct the official return-policy URL, then fetch it, for these 54 brands
Publix, Albertsons, Fossil, BJ's Wholesale, Big Lots, Safeway, JCPenney, Ross, Aerie, Banana Republic, Kay Jewelers, Trader Joe's, LOFT, Torrid, Ann Taylor, Uniqlo, Converse, Levi's, Belk, Under Armour, Finish Line, Vans, American Eagle, Hoka, On Running, The North Face, Columbia Sportswear, Fanatics, New Balance, Tommy Hilfiger, Ralph Lauren, Glossier, Ray-Ban, Estee Lauder, Vitamin Shoppe, AutoZone, Pep Boys, O'Reilly Auto Parts, Depop, Discount Tire, Adorama, Office Depot, KitchenAid, Ninja Kitchen, Sony, B&H Photo, Crate & Barrel, Purple, Mattress Firm, Lenovo, Newegg, Restoration Hardware, ThredUp, AliExpress.
Use the query: site:<brand official domain> "return policy" (US site). If a brand has no public return policy (for example Publix or Trader Joe's, which may only state "satisfaction guarantee"), save whatever the official page says and note it in the README.

FOLDER 18-blocked: last attempt, 5 brands (Marshalls, Home Depot, Adidas, Dick's Sporting Goods, Ulta)
- Use website-content-crawler with playwright:chrome, a US residential session pool, cookies kept between requests, and a 20s wait.
- If it still fails, do NOT keep trying. Instead, in blocked-fallback.json, save the AI Overview text and the cited URLs from a fresh Google search for "<brand> return policy". Mark it unverified. I will verify these 5 brands manually.

At the end, give me a summary table: folder | targets | usable | failed | cost.
