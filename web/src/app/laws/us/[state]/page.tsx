import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getState, stateLaws, publicFacts } from "@/lib/laws";

export const dynamicParams = false;
export function generateStaticParams() { return stateLaws().map((l) => ({ state: l.state! })); }
type Props = { params: Promise<{ state: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = getState((await params).state); if (!l) return {};
  const full = `${l.name} refund and return law (${l.citation})`;
  return { title: full.length <= 70 ? full : `${l.name} refund and return law`, description: `What ${l.name} law says about store refund policies, from the official text of ${l.citation}.`,
    alternates: { canonical: `/laws/us/${l.state}/` }, robots: l.reviewedBy ? undefined : { index: false, follow: true } };
}

export default async function StateLaw({ params }: Props) {
  const l = getState((await params).state); if (!l) notFound();
  return (
    <article className="max-w-3xl space-y-6">
      <nav aria-label="Breadcrumb" className="text-sm text-muted"><Link href="/">Home</Link> › <Link href="/laws/us/">US laws</Link> › {l.name}</nav>
      <h1 className="text-3xl font-bold">{l.name} refund and return law</h1>
      <p className="text-muted">{l.citation}</p>
      {!l.reviewedBy && <p className="text-sm text-warn">Draft: awaiting review by a US-licensed reviewer. Always check the official text.</p>}
      <ul className="list-disc space-y-2 pl-5">{publicFacts(l).map((t) => <li key={t}>{t}</li>)}</ul>
      <p><a className="underline" href={l.url} rel="noopener" target="_blank">Read the official text of {l.citation}</a></p>
      <div className="rounded-xl border border-line bg-surface p-5">
        <h2 className="font-semibold">Store won&apos;t give you a refund?</h2>
        <p className="mt-1 text-muted">Write a refund request that cites the store&apos;s own policy.</p>
        <Link href="/generator/refund-request/" className="mt-3 inline-block rounded-lg bg-accent px-5 py-3 font-medium text-accent-ink">Write my letter</Link>
      </div>
      <p className="text-xs text-muted">Information, not legal advice.</p>
    </article>
  );
}
