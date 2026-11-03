import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBrands, getBrand, publicRules } from "@/lib/brands";
import { isIndexable } from "@/lib/policy-schema";
import { SITE_INDEXABLE, SITE } from "@/lib/site";
import { SourceStamp } from "@/components/SourceStamp";
import { AdSlot } from "@/components/AdSlot";

export const dynamicParams = false;
export function generateStaticParams() { return allBrands().map((b) => ({ slug: b.slug })); }

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const b = getBrand((await params).slug);
  if (!b) return {};
  const index = SITE_INDEXABLE && isIndexable(b);
  return {
    title: `${b.name} Return Policy (verified ${b.lastVerifiedAt})`,
    description: `${b.name}'s return windows, exceptions and refund rules, checked against ${new URL(b.officialPolicyUrl).hostname}. Last verified ${b.lastVerifiedAt}.`,
    alternates: { canonical: `/brands/${b.slug}/` },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
  };
}

const LABEL: Record<string, string> = {
  window: "Return window", exclusion: "Not returnable", fee: "Fees", receipt: "Receipt / ID", refund_method: "Refund method",
  refund_timing: "Refund timing", exchange: "Exchanges", price_adjustment: "Price adjustment", membership: "Membership",
  holiday: "Holiday returns", cancellation: "Cancellation",
};

export default async function BrandPage({ params }: Props) {
  const b = getBrand((await params).slug);
  if (!b) notFound();
  const rules = publicRules(b);
  const snap = b.snapshots[rules[0].snapshot];
  const lead = rules.filter((r) => r.type === "window").slice(0, 2);
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
    { "@type": "ListItem", position: 2, name: "Stores", item: `${SITE.url}/brands/` },
    { "@type": "ListItem", position: 3, name: b.name, item: `${SITE.url}/brands/${b.slug}/` },
  ] };

  return (
    <article className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/">Home</Link> › <Link href="/brands/">Stores</Link> › {b.name}
      </nav>
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{b.name} Return Policy</h1>
        <div className="rounded-xl border border-line bg-surface p-4">
          {lead.map((r) => <p key={r.id} className="text-lg">{r.text}</p>)}
          <SourceStamp url={snap.url} verifiedAt={b.lastVerifiedAt} />
        </div>
        {rules.some((r) => r.status === "extracted") && (
          <p className="text-sm text-warn">Draft: these facts are awaiting editorial review.</p>
        )}
      </header>

      <section aria-labelledby="facts">
        <h2 id="facts" className="mb-3 text-xl font-semibold">The rules, item by item</h2>
        <dl className="divide-y divide-line rounded-xl border border-line bg-surface">
          {rules.map((r) => (
            <div key={r.id} className="grid gap-1 p-4 sm:grid-cols-[12rem_1fr]">
              <dt className="font-medium">{LABEL[r.type]}{r.category ? <span className="block text-sm font-normal text-muted">{r.category}</span> : null}</dt>
              <dd>{r.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-xl border border-line bg-surface p-6">
        <h2 className="text-xl font-semibold">Need to ask {b.name} for a refund?</h2>
        <p className="mt-1 text-muted">Answer a few questions and get a letter you can edit and send.</p>
        <Link href={`/generator/refund-request/?brand=${b.slug}`} className="mt-4 inline-block rounded-lg bg-accent px-5 py-3 font-medium text-accent-ink">Write my letter</Link>
      </section>

      <AdSlot id="brand-mid" />

      <section aria-labelledby="escalate">
        <h2 id="escalate" className="mb-2 text-xl font-semibold">If {b.name} says no</h2>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Ask again in writing, citing the policy above.</li>
          <li>Paid by card? You may be able to <Link href="/chargebacks/" className="underline">dispute the charge</Link>.</li>
          <li>Check whether <Link href="/laws/us/" className="underline">your state&apos;s law</Link> gives you more than the store does.</li>
        </ol>
      </section>

      <p className="text-sm text-muted">
        <a href={`/go/${b.slug}/?from=brand-page`} rel="nofollow" className="underline">Start your return on {new URL(b.officialPolicyUrl).hostname.replace(/^www\./, "")}</a>
        {" "}· refund-return.com is not affiliated with {b.name}.
      </p>
    </article>
  );
}
