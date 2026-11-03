import Link from "next/link";

const NAV = [
  { href: "/brands/", label: "Stores" },
  { href: "/refunds/", label: "Refunds" },
  { href: "/chargebacks/", label: "Chargebacks" },
  { href: "/cancel/", label: "Cancel" },
  { href: "/flights/", label: "Flights" },
  { href: "/generator/", label: "Letter templates" },
  { href: "/laws/us/", label: "Laws" },
  { href: "/methodology/", label: "How we verify" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          refund<span className="text-accent">·</span>return
        </Link>
        <nav aria-label="Main" className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-ink">{n.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
