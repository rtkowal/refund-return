import Link from "next/link";

const POPULAR = [
  { href: "/brands/walmart/", label: "Walmart return policy" },
  { href: "/brands/costco/", label: "Costco return policy" },
  { href: "/brands/amazon/", label: "Amazon return policy" },
  { href: "/brands/best-buy/", label: "Best Buy return policy" },
  { href: "/brands/lowes/", label: "Lowe's return policy" },
  { href: "/holiday-return-deadlines/", label: "Holiday return deadlines 2026" },
  { href: "/generator/refund-request/", label: "Write a refund request letter" },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Get your money back. Know the rules first.
        </h1>
        <p className="max-w-2xl text-lg text-muted">
          Store return policies checked against the official source, the consumer laws that can
          go further, and a letter you can send in minutes. No sign-up.
        </p>
        <form action="/brands/" method="get" role="search" className="flex max-w-xl gap-2">
          <label htmlFor="q" className="sr-only">Which store or service?</label>
          <input id="q" name="q" placeholder="Which store or service?"
            className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-4 py-3" />
          <button className="rounded-lg bg-accent px-5 py-3 font-medium text-accent-ink">Search</button>
        </form>
      </section>

      <section aria-labelledby="popular">
        <h2 id="popular" className="mb-3 text-xl font-semibold">Popular right now</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {POPULAR.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="block rounded-lg border border-line bg-surface px-4 py-3 hover:border-accent">
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-line bg-surface p-6">
        <h2 className="text-xl font-semibold">Write a refund or complaint letter</h2>
        <p className="mt-1 text-muted">Describe what happened, answer a few questions, and get a letter that cites the rules that may apply.</p>
        <Link href="/generator/" className="mt-4 inline-block rounded-lg bg-accent px-5 py-3 font-medium text-accent-ink">Start a letter</Link>
      </section>
    </div>
  );
}
