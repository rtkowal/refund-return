import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { allBrands } from "@/lib/brands";
import { isIndexable } from "@/lib/policy-schema";
// Milestone 1: static pages only. Brand/law/cancel URLs are added from the DB, gated on `indexable`.
export default function sitemap(): MetadataRoute.Sitemap {
  const brands = allBrands().filter((b) => isIndexable(b)).map((b) => `/brands/${b.slug}/`);
  return ["/", "/brands/", "/about/", "/methodology/", "/editorial-policy/", ...brands].map((p) => ({ url: `${SITE.url}${p}` }));
}
