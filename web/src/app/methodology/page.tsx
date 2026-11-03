import type { Metadata } from "next";
export const metadata: Metadata = { title: "How we verify return policies", alternates: { canonical: "/methodology/" } };

export default function Methodology() {
  return (
    <article className="prose-rr max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">How we verify return policies</h1>
      <p>Every policy fact on this site comes from the store&apos;s own published page. We fetch that page on a schedule (weekly, and daily from November to January), store a fingerprint of it, and re-check our facts whenever the page changes.</p>
      <h2>What we do</h2>
      <ul>
        <li>Pull each fact from the official page and keep a record of the exact wording it came from.</li>
        <li>Have a person review new and changed facts before they appear on the site.</li>
        <li>Show the source link and the date we last verified it next to the fact.</li>
        <li>Log every policy change in our public update log.</li>
      </ul>
      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t file claims, handle money, or act on your behalf.</li>
        <li>We don&apos;t give legal advice. Our letters are templates you edit and send yourself.</li>
        <li>We don&apos;t publish a page for a store unless we could verify its policy.</li>
      </ul>
    </article>
  );
}
