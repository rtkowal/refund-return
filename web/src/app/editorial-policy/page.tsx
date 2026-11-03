import type { Metadata } from "next";
export const metadata: Metadata = { title: "Editorial policy", alternates: { canonical: "/editorial-policy/" } };
export default function Editorial() {
  return (
    <article className="prose-rr max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">Editorial policy</h1>
      <ul>
        <li>Policy facts come only from official sources and carry a source link and verification date.</li>
        <li>Legal explanations cite the statute or regulation itself.</li>
        <li>We never promise an outcome. A letter can help; it can&apos;t guarantee a refund.</li>
        <li>Affiliate links are labeled where they appear. They never change what a policy says.</li>
        <li>Corrections: we fix errors and record the change in the update log.</li>
      </ul>
    </article>
  );
}
