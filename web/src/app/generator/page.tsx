import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Letter templates", alternates: { canonical: "/generator/" } };
export default function Generators() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Letter templates</h1>
      <ul className="space-y-2">
        <li><Link className="underline" href="/generator/refund-request/">Refund or return request</Link></li>
        <li className="text-muted">Coming next: order never arrived, chargeback letter, cancel a subscription, airline refund, flight compensation (UK261/EU261), demand letter, regulator complaint.</li>
      </ul>
    </div>
  );
}
