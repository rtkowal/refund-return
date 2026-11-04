import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGenerator } from "@/lib/generator/defs";
import { TEMPLATE_SLUGS, templateText } from "@/lib/generator/templates";

export const dynamicParams = false;
export function generateStaticParams() { return TEMPLATE_SLUGS.map((type) => ({ type })); }
type Props = { params: Promise<{ type: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = getGenerator((await params).type); if (!g) return {};
  const name = g.title.replace(/ (Generator|Letter Generator)$/, "");
  return { title: `${name} template (free)`, description: `A free, copy-and-paste ${name.toLowerCase()} template. Fill in the brackets, or use our guided version to tailor it.`, alternates: { canonical: `/templates/${g.slug}/` } };
}

export default async function Template({ params }: Props) {
  const { type } = await params; const g = getGenerator(type); if (!g) notFound();
  return (
    <article className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">{g.h1.replace(/^Write an? /, "").replace(/^\w/, (c) => c.toUpperCase())}: free template</h1>
      <p className="text-muted">{g.intro} Replace everything in [brackets]. Want it tailored to your situation and the store&apos;s policy? <Link className="underline" href={`/generator/${g.slug}/`}>Use the guided version</Link>.</p>
      <pre className="whitespace-pre-wrap rounded-xl border border-line bg-surface p-5 font-mono text-sm">{templateText(type)}</pre>
      {g.laws.length > 0 && <p className="text-sm">Rule cited: {g.laws.map((l) => <a key={l.cite} className="underline" href={l.url} target="_blank" rel="noopener">{l.cite}</a>)}</p>}
      <p className="text-xs text-muted">A template, not legal advice.</p>
    </article>
  );
}
