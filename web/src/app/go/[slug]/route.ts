import { NextResponse } from "next/server";
import { getBrand } from "@/lib/brands";
/** Outbound link layer: destinations swap centrally later (affiliate/partner). */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const b = getBrand((await params).slug);
  if (!b) return NextResponse.redirect(new URL("/brands/", _req.url), 302);
  const res = NextResponse.redirect(b.returnsPortalUrl ?? b.officialPolicyUrl, 302);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  // Outbound-click event (no PII): shows in Vercel runtime logs; query with `outbound_click`.
  const from = new URL(_req.url).searchParams.get("from")?.slice(0, 60) ?? "unknown";
  console.log(JSON.stringify({ event: "outbound_click", brand: b.slug, placement: from, affiliate: false, ts: new Date().toISOString() }));
  return res;
}
