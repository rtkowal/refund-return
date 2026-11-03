import type { Metadata } from "next";
import { Pillar } from "@/components/Pillar";
import { REG_Z } from "@/lib/generator/defs";

export const metadata: Metadata = { title: 'Chargebacks: how to dispute a card charge', description: 'How to dispute a credit or debit card charge: the credit card billing-error process, its 60-day deadline, and how debit and payment apps differ.', alternates: { canonical: "/chargebacks/" } };

export default function Page() {
  return <Pillar h1={'How to dispute a credit or debit card charge (chargeback)'} lead={'A chargeback is when your card issuer reverses a charge. For credit cards, federal law gives you a formal billing-error process with a deadline. Debit cards and payment apps work differently.'} laws={[REG_Z]} tools={[{ href: '/generator/chargeback-letter/', label: 'Credit card dispute letter' }, { href: '/generator/refund-request/', label: 'Ask the store for a refund first' }]} sections={[
    { h2: 'Credit card vs debit card', body: <><p>For a <strong>credit card</strong>, the Fair Credit Billing Act lets you dispute billing errors, such as goods not delivered as agreed, by writing to your card issuer. The deadline runs from the statement that first showed the charge.</p><p>For a <strong>debit card</strong>, the federal error rules (Regulation E) cover things like unauthorized transfers and wrong amounts. A dispute about a store not delivering what you paid for is usually handled under your card network&apos;s and bank&apos;s own rules, not federal law, so ask your bank how it handles merchant disputes.</p></> },
    { h2: 'Before you dispute', body: <><ul><li>Ask the store in writing first, and keep the reply (or the lack of one).</li><li>Collect the order confirmation, tracking, photos and messages.</li><li>Note the statement date: for credit cards, your 60-day window starts there.</li></ul></> },
    { h2: 'PayPal, Klarna, Afterpay and Affirm', body: <><p>Payment apps and buy-now-pay-later services run their own dispute processes. Check the provider&apos;s help center for its time limits before you start.</p></> }
  ]} />;
}
