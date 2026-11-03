import type { Metadata } from "next";
import Link from "next/link";
import { GENERATORS } from "@/lib/generator/defs";
export const metadata: Metadata = { title: "Free letter templates for refunds, disputes and complaints", alternates: { canonical: "/generator/" } };
export default function Generators() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Letter templates</h1>
      <p className="text-muted">Describe your situation and get a letter you can edit and send yourself. Free, no sign-up.</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {GENERATORS.map((g) => (
          <li key={g.slug}><Link href={`/generator/${g.slug}/`} className="block h-full rounded-xl border border-line bg-surface p-4 hover:border-accent">
            <span className="font-semibold">{g.h1}</span><span className="mt-1 block text-sm text-muted">{g.intro}</span></Link></li>
        ))}
      </ul>
    </div>
  );
}
