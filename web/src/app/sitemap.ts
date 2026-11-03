import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { allBrands } from "@/lib/brands";
import { isIndexable } from "@/lib/policy-schema";
import { GENERATORS } from "@/lib/generator/defs";
// Milestone 1: static pages only. Brand/law/cancel URLs are added from the DB, gated on `indexable`.
export default function sitemap(): MetadataRoute.Sitemap {
  const brands = allBrands().filter((b) => isIndexable(b)).map((b) => `/brands/${b.slug}/`);
  const tools = ["/generator/", ...GENERATORS.map((g) => `/generator/${g.slug}/`)];
  const pillars = ["/sellers/", "/sellers/return-policy-generator/", "/holiday-return-deadlines/", "/privacy/", "/refunds/", "/returns/", "/chargebacks/", "/cancel/", "/flights/"];
  // Law pages are excluded until attorney-reviewed (noindex).
  return ["/", "/brands/", "/about/", "/methodology/", "/editorial-policy/", ...pillars, ...tools, ...brands].map((p) => ({ url: `${SITE.url}${p}` }));
}
