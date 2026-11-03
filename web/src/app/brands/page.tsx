import type { Metadata } from "next";
import Link from "next/link";
import { allBrands } from "@/lib/brands";
export const metadata: Metadata = { title: "Store return policies A–Z", alternates: { canonical: "/brands/" } };
export default function Brands() {
  const brands = allBrands();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Store return policies</h1>
      <p className="text-muted">{brands.length} stores, each checked against its official policy page.</p>
      <ul className="grid gap-2 sm:grid-cols-3">
        {brands.map((b) => (
          <li key={b.slug}><Link href={`/brands/${b.slug}/`} className="block rounded-lg border border-line bg-surface px-4 py-3 hover:border-accent">{b.name}</Link></li>
        ))}
      </ul>
    </div>
  );
}
