import type { Metadata } from "next";
import { allLaws } from "@/lib/laws";
import { SellerGen, type Note } from "./SellerGen";

export const metadata: Metadata = {
  title: "Free return policy generator for Shopify, TikTok Shop & Etsy",
  description: "Generate a return and refund policy for your online store, checked against platform rules and state posting laws. Copy as Markdown, HTML, text or Google structured data.",
  alternates: { canonical: "/sellers/return-policy-generator/" },
};

const PLATFORM: Record<string, string> = { "platform-tiktok-shop": "tiktok-shop", "platform-etsy": "etsy" };

export default function Page() {
  const laws = allLaws();
  const platformNotes: Record<string, Note[]> = {};
  for (const l of laws) {
    const key = PLATFORM[l.id]; if (!key) continue; // Amazon's captured page covers subscriptions only; Shopify imposes no return terms
    platformNotes[key] = l.facts.map((f) => ({ label: l.name, text: f.text, cite: l.citation, url: l.url }));
  }
  const stateNotes: Note[] = laws.filter((l) => l.state === "california" || l.state === "new-york")
    .map((l) => ({ label: l.name, text: l.facts[0].text, cite: l.citation, url: l.url }));
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">Return policy generator for online stores</h1>
      <p className="text-muted">Fill in your terms and copy a clear return policy. We show platform rules and state posting laws we&apos;ve checked against their official text, so you can make sure your policy fits them.</p>
      <SellerGen platformNotes={platformNotes} stateNotes={stateNotes} />
    </div>
  );
}
