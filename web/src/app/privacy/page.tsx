import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy policy", description: "What refund-return.com collects, what it doesn't, and who processes data for us.", alternates: { canonical: "/privacy/" } };

export default function Privacy() {
  return (
    <article className="prose-rr max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">Privacy policy</h1>
      <p className="text-sm text-muted">Last updated: November 3, 2026. This site is operated by Digital Savages LLC.</p>
      <h2>The short version</h2>
      <ul>
        <li>You don&apos;t need an account, and we don&apos;t ask for your name or email.</li>
        <li>We don&apos;t store the letters you generate or what you type into the letter forms.</li>
        <li>We don&apos;t sell personal information.</li>
      </ul>
      <h2>Letter generator</h2>
      <p>When you click &quot;Write my letter&quot;, the details you entered are sent to our AI provider, OpenAI, to draft the letter, and the result is sent back to your browser. We don&apos;t save that text on our servers. OpenAI processes it under its API terms. Avoid entering sensitive details such as full card numbers; the letters use placeholders like [Your name] for you to fill in yourself.</p>
      <h2>What is collected automatically</h2>
      <ul>
        <li><strong>Hosting logs</strong> (Vercel): standard request data such as IP address, browser and pages requested, kept for security and debugging.</li>
        <li><strong>Analytics</strong> (Vercel Web Analytics): aggregate page-view statistics.</li>
        <li><strong>Outbound clicks</strong>: when you follow a link to a store, we record which store and which page the click came from, but not who you are.</li>
        <li><strong>Abuse protection</strong>: we limit how many letters one IP address can request per hour, and we may use Cloudflare Turnstile to block automated use.</li>
      </ul>
      <h2>Your choices</h2>
      <p>Because we don&apos;t keep account data or letter content, there is usually nothing tied to you to access or delete. If you have a question or request, contact us at [contact email].</p>
      <h2>Changes</h2>
      <p>If we change how we handle data, for example by adding advertising or an optional &quot;email me my letter&quot; feature, we will update this page first.</p>
    </article>
  );
}
