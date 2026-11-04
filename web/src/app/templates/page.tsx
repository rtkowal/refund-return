import type { Metadata } from "next";
import Link from "next/link";
import { getGenerator } from "@/lib/generator/defs";
import { TEMPLATE_SLUGS } from "@/lib/generator/templates";
export const metadata: Metadata = { title: "Free refund and complaint letter templates", description: "Copy-and-paste templates for refund requests, card disputes, cancellations, airline refunds, flight compensation and demand letters.", alternates: { canonical: "/templates/" } };
export default function Templates() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Letter templates</h1>
      <ul className="grid gap-2 sm:grid-cols-2">{TEMPLATE_SLUGS.map((s) => <li key={s}><Link className="block rounded-lg border border-line bg-surface px-4 py-3 hover:border-accent" href={`/templates/${s}/`}>{getGenerator(s)!.title.replace(/ Generator$/, "")}</Link></li>)}</ul>
    </div>
  );
}
