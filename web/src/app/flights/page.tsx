import type { Metadata } from "next";
import { Pillar } from "@/components/Pillar";
import { DOT, EU261 } from "@/lib/generator/defs";

export const metadata: Metadata = { title: 'Flight refunds and compensation', description: 'In the US you can get a refund when an airline cancels or significantly changes your flight. Flights covered by EU or UK rules can also earn fixed compensation.', alternates: { canonical: "/flights/" } };

export default function Page() {
  return <Pillar h1={'Flight cancelled or delayed: refunds and compensation'} lead={'In the US you can get a refund when an airline cancels or significantly changes your flight. Flights covered by EU or UK rules can also earn fixed compensation.'} laws={[DOT, EU261]} tools={[{ href: '/generator/airline-refund/', label: 'Airline refund request (US)' }, { href: '/generator/flight-compensation/', label: 'EU261 / UK261 compensation claim' }, { href: '/generator/regulator-complaint/', label: 'DOT complaint draft' }]} sections={[
    { h2: 'Refund vs compensation', body: <><p>A <strong>refund</strong> gives back what you paid when the airline cancels or significantly changes your flight and you don&apos;t accept the alternative. <strong>Compensation</strong> is an extra fixed payment under EU and UK rules for long delays, cancellations at short notice, or being bumped. The airline can refuse compensation when the cause was an extraordinary circumstance.</p></> },
    { h2: 'Which rules apply', body: <><ul><li>US domestic flights: the DOT refund rule.</li><li>Flights departing the EU, or arriving in the EU on an EU airline: EU Regulation 261/2004.</li><li>Flights departing the UK, or arriving in the UK on a UK or EU airline: the UK version of Regulation 261/2004.</li></ul></> }
  ]} />;
}
