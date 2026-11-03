import Link from "next/link";
import type { Law } from "@/lib/generator/defs";

export type PillarProps = {
  h1: string; lead: string;
  sections: { h2: string; body: React.ReactNode }[];
  laws?: Law[]; tools: { href: string; label: string }[];
};

export function Pillar({ h1, lead, sections, laws = [], tools }: PillarProps) {
  return (
    <article className="max-w-3xl space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{h1}</h1>
        <p className="text-lg">{lead}</p>
      </header>
      {sections.map((s) => (
        <section key={s.h2} className="prose-rr"><h2>{s.h2}</h2>{s.body}</section>
      ))}
      {laws.length > 0 && (
        <section aria-labelledby="rules" className="space-y-3">
          <h2 id="rules" className="text-xl font-semibold">The rules, from the official text</h2>
          {laws.map((l) => (
            <div key={l.cite} className="rounded-xl border border-line bg-surface p-4">
              <p>{l.text}</p>
              <p className="mt-1 text-sm"><a className="underline" href={l.url} rel="noopener" target="_blank">{l.cite}</a></p>
            </div>
          ))}
        </section>
      )}
      <section className="rounded-xl border border-line bg-surface p-5">
        <h2 className="text-xl font-semibold">Letters for this</h2>
        <ul className="mt-2 space-y-1">{tools.map((t) => <li key={t.href}><Link className="underline" href={t.href}>{t.label}</Link></li>)}</ul>
      </section>
      <p className="text-xs text-muted">Information, not legal advice. Rules can change; check the linked official text.</p>
    </article>
  );
}
