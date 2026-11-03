import Link from "next/link";
import type { Metadata } from "next";
import { Pillar } from "@/components/Pillar";

export const metadata: Metadata = { title: 'How to cancel a subscription', description: 'Cancel in a way you can prove: in writing or through the official cancellation page, and keep the confirmation.', alternates: { canonical: "/cancel/" } };

export default function Page() {
  return <Pillar h1={'How to cancel a subscription or membership'} lead={'Cancel in a way you can prove: in writing or through the official cancellation page, and keep the confirmation.'} laws={[]} tools={[{ href: '/generator/cancel-subscription/', label: 'Cancellation letter' }, { href: '/generator/regulator-complaint/', label: 'Complaint draft for the FTC or your state AG' }, { href: '/generator/chargeback-letter/', label: 'Card dispute letter' }]} sections={[
    { h2: 'A cancellation you can prove', body: <><ul><li>Use the company&apos;s official cancellation page or address.</li><li>Save the confirmation email or a screenshot with the date.</li><li>Check your next statement. If you&apos;re charged again, dispute it with your card issuer (see <Link href="/chargebacks/">chargebacks</Link>).</li></ul></> },
    { h2: 'If they keep charging you', body: <><p>Send a written cancellation that asks for confirmation and an end to charges, then file a complaint with the FTC or your state attorney general if it continues.</p></> }
  ]} />;
}
