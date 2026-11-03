import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "For online sellers", description: "Free tools for online sellers: a return policy generator checked against platform rules and state laws.", alternates: { canonical: "/sellers/" } };
export default function Sellers() {
  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-3xl font-bold">For online sellers</h1>
      <p className="text-muted">A clear return policy cuts disputes and chargebacks.</p>
      <Link href="/sellers/return-policy-generator/" className="inline-block rounded-lg bg-accent px-5 py-3 font-medium text-accent-ink">Create your return policy</Link>
    </div>
  );
}
