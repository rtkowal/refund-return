import { NextResponse } from "next/server";
import { getBrand } from "@/lib/brands";
/** Outbound link layer: destinations swap centrally later (affiliate/partner). */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const b = getBrand((await params).slug);
  if (!b) return NextResponse.redirect(new URL("/brands/", _req.url), 302);
  const res = NextResponse.redirect(b.returnsPortalUrl ?? b.officialPolicyUrl, 302);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}
