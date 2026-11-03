import type { MetadataRoute } from "next";
import { SITE, SITE_INDEXABLE } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return SITE_INDEXABLE
    ? { rules: [{ userAgent: "*", allow: "/", disallow: ["/go/", "/api/"] }], sitemap: `${SITE.url}/sitemap.xml` }
    : { rules: [{ userAgent: "*", disallow: "/" }] };
}
