import type { Metadata } from "next";
import Link from "next/link";
import { allBrands } from "@/lib/brands";

export const metadata: Metadata = {
  title: "Holiday return deadlines 2026: store-by-store",
  description: "Extended holiday return windows for major US stores, taken from each store's own policy page, with the date we last checked.",
  alternates: { canonical: "/holiday-return-deadlines/" },
};

// Skip rule text that names an earlier year: the store's page is stale, so we don't republish it as current.
const STALE = /\b(20(1\d|2[0-5]))\b/;

export default function Holiday() {
  const rows = allBrands().flatMap((b) => {
    const r = b.rules.find((x) => x.type === "holiday" && !STALE.test(x.text));
    return r ? [{ slug: b.slug, name: b.name, text: r.text, url: b.snapshots[r.snapshot].url, verified: b.lastVerifiedAt }] : [];
  });
  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold">Holiday return deadlines 2026</h1>
      <p className="text-lg">Many stores extend their return windows for purchases made in the holiday season. Here is what {rows.length} stores say, taken from each store&apos;s own policy page.</p>
      <p className="text-sm text-muted">Stores change these terms every year. Check the date we verified each one, and the store&apos;s page, before you rely on it.</p>
      <div className="overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b border-line"><th className="p-3">Store</th><th className="p-3">Holiday rule</th><th className="p-3">Source</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug} className="border-b border-line align-top last:border-0">
                <td className="p-3 font-medium"><Link className="underline" href={`/brands/${r.slug}/`}>{r.name}</Link></td>
                <td className="p-3">{r.text}</td>
                <td className="p-3 whitespace-nowrap"><a className="underline" href={r.url} rel="nofollow noopener" target="_blank">{new URL(r.url).hostname.replace(/^www\./, "")}</a><span className="block text-xs text-muted">checked {r.verified}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
