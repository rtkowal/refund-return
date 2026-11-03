import type { Metadata } from "next";
export const metadata: Metadata = { title: "About", alternates: { canonical: "/about/" } };
export default function About() {
  return (
    <article className="prose-rr max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">About refund-return.com</h1>
      <p>refund-return.com is an independent information site. We collect store and service return policies from their official sources, explain the consumer laws that apply, and provide letter templates.</p>
      <p>We are based in Poland and write for shoppers in the United States first. We are not a law firm, and we are not affiliated with any store we cover.</p>
      <p className="text-sm text-muted">[Owner: add the operating company name and contact details before launch.]</p>
    </article>
  );
}
