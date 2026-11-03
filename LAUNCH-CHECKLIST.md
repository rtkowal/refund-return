# Launch checklist — CHECKPOINT 3

Status as of 2026-11-03. ✅ done · ⬜ owner action · ⚠ open risk

## Site & SEO
- ✅ 160 pages pass the SEO audit (`npm run seo-audit`): every page has a title ≤70, a meta description ≤170, exactly one H1, a correct canonical and valid JSON-LD
- ✅ 0 broken internal links (`npm run check-links`)
- ✅ Every brand and law fact is verified verbatim against an official snapshot (`npm run validate`, run on every build)
- ✅ sitemap.xml: static pages, pillars, generators and indexable brands. Law pages are excluded until review.
- ✅ Global kill-switch: `SITE_INDEXABLE=false` → robots `Disallow: /` + noindex everywhere
- ⚠ Core Web Vitals not yet measured with Lighthouse. Static pages are ~105 kB first-load JS; run PageSpeed Insights on the live URL.

## Before flipping `SITE_INDEXABLE=true`
- ⬜ Vercel domains: `www.refund-return.com` → 301 to `refund-return.com`; add `return-refund.com` (+ www) to the project
- ⬜ Reviewer (owner decision 2): brand facts are `status: extracted`. Brand pages index only after review (`isIndexable`), and law pages only after `reviewedBy` is set. Decide the review workflow (PR approvals are fine).
- ⬜ About page: add the operating company name and contact details (placeholder present)
- ⬜ Upstash + Turnstile keys in Vercel (rate limit / bot protection currently in fallback mode)
- ⬜ Enable Vercel Web Analytics (Project → Analytics)
- ⬜ Privacy policy page (CCPA-ready; we store no letter content). Not built yet.
- ⬜ Rotate OPENAI_API_KEY by ~2027-01-02 (60 days)

## After launch
- ⬜ Google Search Console + Bing Webmaster Tools; submit the sitemap. Bing supports IndexNow.
- ⬜ Ahrefs rank tracking for the top 100 keywords (`research/keywords.csv`, `ia/03-top50-urls.csv`)
- ⬜ Apify scheduled refresh (weekly; daily Nov–Jan) → re-run `npm run extract` and open a PR on changes
