import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
// Milestone 1: static pages only. Brand/law/cancel URLs are added from the DB, gated on `indexable`.
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about/", "/methodology/", "/editorial-policy/"].map((p) => ({ url: `${SITE.url}${p}` }));
}
