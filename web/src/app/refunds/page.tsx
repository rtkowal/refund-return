import Link from "next/link";
import type { Metadata } from "next";
import { Pillar } from "@/components/Pillar";
import { MAIL_ORDER } from "@/lib/generator/defs";

export const metadata: Metadata = { title: 'How refunds work', description: "How to get a refund in the US: check the store's policy, ask in writing, then use card disputes and the law where they apply.", alternates: { canonical: "/refunds/" } };

export default function Page() {
  return <Pillar h1={'How to get a refund: your options, step by step'} lead={"Most refunds in the US come from the store's own policy, not from a general legal right. Start with the store, then use your payment method and the law where they apply."} laws={[MAIL_ORDER]} tools={[{ href: '/generator/refund-request/', label: 'Refund request letter' }, { href: '/generator/order-never-arrived/', label: 'Order never arrived' }, { href: '/generator/demand-letter/', label: 'Final demand letter' }]} sections={[
    { h2: "Step 1: check the store's policy", body: <><p>The policy sets the window, the condition the item must be in, and whether you get money back or store credit. <Link href="/brands/">Look up your store</Link>. We show each rule with its source and the date we checked it.</p></> },
    { h2: 'Step 2: ask in writing', body: <><p>A short, specific letter citing the policy works better than a phone call, and gives you a record.</p></> },
    { h2: 'Step 3: if the store says no', body: <><ul><li>Paid by credit card? You may be able to dispute the charge (see <Link href="/chargebacks/">chargebacks</Link>).</li><li>Never received an online order? Federal rules set shipping deadlines (below).</li><li>Some states require stores to post their refund policy, and give you rights if they don&apos;t (see <Link href="/laws/us/">state laws</Link>).</li></ul></> }
  ]} />;
}
