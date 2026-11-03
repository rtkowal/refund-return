import type { Metadata } from "next";
import Link from "next/link";
import { federalLaws, stateLaws, publicFacts } from "@/lib/laws";

export const metadata: Metadata = {
  title: "US refund and return laws: federal rules and state laws",
  description: "What US federal rules and state laws say about refunds, posted return policies, shipping deadlines and card disputes, with links to the official text.",
  alternates: { canonical: "/laws/us/" }, robots: { index: false, follow: true }, // attorney review gate
};

export default function LawsUS() {
  const fed = federalLaws(), states = stateLaws();
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">US refund and return laws</h1>
        <p className="text-lg">There is no general federal right to return something you bought in a store. Returns are mostly store policy. But federal rules cover specific situations, and some states require stores to post their refund policy.</p>
        <p className="text-sm text-warn">Draft: these summaries are awaiting review by a US-licensed reviewer. Always check the official text linked below.</p>
      </header>
      <section aria-labelledby="fed">
        <h2 id="fed" className="mb-3 text-xl font-semibold">Federal rules</h2>
        <div className="space-y-4">
          {fed.map((l) => (
            <div key={l.id} className="rounded-xl border border-line bg-surface p-4">
              <h3 className="font-semibold">{l.name} <span className="font-normal text-muted">({l.citation})</span></h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">{publicFacts(l).slice(0, 4).map((t) => <li key={t}>{t}</li>)}</ul>
              <p className="mt-2 text-sm"><a className="underline" href={l.url} rel="noopener" target="_blank">Official text</a></p>
            </div>
          ))}
        </div>
      </section>
      <section aria-labelledby="states">
        <h2 id="states" className="mb-3 text-xl font-semibold">States with refund-policy laws</h2>
        <ul className="grid gap-2 sm:grid-cols-3">
          {states.map((l) => <li key={l.id}><Link className="block rounded-lg border border-line bg-surface px-4 py-3 hover:border-accent" href={`/laws/us/${l.state}/`}>{l.name}<span className="block text-xs text-muted">{l.citation}</span></Link></li>)}
        </ul>
        <p className="mt-3 text-sm text-muted">Other states are not covered yet. Your state attorney general&apos;s consumer office can tell you which rules apply.</p>
      </section>
    </article>
  );
}
