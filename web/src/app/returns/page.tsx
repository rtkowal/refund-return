import Link from "next/link";
import type { Metadata } from "next";
import { Pillar } from "@/components/Pillar";

export const metadata: Metadata = { title: 'How returns work', description: 'A return is about the item; a refund is about the money. Stores decide most return rules themselves, so the details differ a lot from store to store.', alternates: { canonical: "/returns/" } };

export default function Page() {
  return <Pillar h1={'How returns work: windows, receipts and exceptions'} lead={'A return is about the item; a refund is about the money. Stores decide most return rules themselves, so the details differ a lot from store to store.'} laws={[]} tools={[{ href: '/generator/refund-request/', label: 'Return or refund request letter' }]} sections={[
    { h2: 'What usually matters', body: <><ul><li><strong>The window</strong>: often different for electronics, phones or marketplace sellers.</li><li><strong>Proof of purchase</strong>: some stores accept returns without a receipt, often for store credit and with ID.</li><li><strong>Condition and exclusions</strong>: opened items, final-sale and custom goods often can&apos;t be returned.</li><li><strong>Holiday windows</strong>: many stores extend deadlines for gifts bought in the holiday season.</li></ul></> },
    { h2: 'Check your store', body: <><p>We list each store&apos;s rules item by item, with the official source: <Link href="/brands/">browse stores</Link>.</p></> }
  ]} />;
}
