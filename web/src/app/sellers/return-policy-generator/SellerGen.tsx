"use client";
import { useMemo, useState } from "react";

export type Note = { label: string; text: string; cite: string; url: string };
type Props = { platformNotes: Record<string, Note[]>; stateNotes: Note[] };
const field = "w-full rounded-lg border border-line bg-surface px-3 py-2";

export function SellerGen({ platformNotes, stateNotes }: Props) {
  const [f, setF] = useState({ store: "", platform: "shopify", days: "30", from: "delivery", condition: "unused, in original packaging, with tags attached",
    shipping: "customer", restock: "0", method: "original payment method", refundDays: "10", exchanges: "yes", exceptions: "Final-sale items\nGift cards\nPersonalized items", email: "" });
  const [fmt, setFmt] = useState<"md" | "html" | "text" | "jsonld">("md");
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  const md = useMemo(() => {
    const ex = f.exceptions.split("\n").map((s) => s.trim()).filter(Boolean);
    const store = f.store || "[Store name]";
    return [
      `# Return & Refund Policy`,
      ``,
      `Thank you for shopping with ${store}. If you're not satisfied with your purchase, you can return it as described below.`,
      ``,
      `## Return window`,
      `You can request a return within **${f.days} days** of ${f.from === "delivery" ? "the date your order was delivered" : "the date of purchase"}.`,
      ``,
      `## Condition`,
      `Items must be ${f.condition}.`,
      ``,
      `## Return shipping`,
      f.shipping === "free" ? `Return shipping is free.` : f.shipping === "customer" ? `You are responsible for return shipping costs unless the item arrived damaged, defective or incorrect.` : `Return shipping costs are deducted from your refund unless the item arrived damaged, defective or incorrect.`,
      ...(Number(f.restock) > 0 ? [``, `## Restocking fee`, `A restocking fee of ${f.restock}% of the item price applies to returned items that are not damaged, defective or incorrect.`] : []),
      ``,
      `## Refunds`,
      `Once we receive and inspect your return, we'll notify you and issue a refund to your ${f.method} within ${f.refundDays} business days. Your bank or card issuer may take additional time to post it.`,
      ...(f.exchanges === "yes" ? [``, `## Exchanges`, `If you need a different size or color, request an exchange and we'll send the replacement once your return is received.`] : []),
      ...(ex.length ? [``, `## Items that can't be returned`, ...ex.map((e) => `- ${e}`)] : []),
      ``,
      `## Damaged or incorrect items`,
      `If your order arrives damaged, defective or incorrect, contact us within ${f.days} days of delivery and we'll make it right.`,
      ``,
      `## How to start a return`,
      `Contact us at ${f.email || "[support email]"} with your order number.`,
    ].join("\n");
  }, [f]);

  const html = useMemo(() => md.split("\n").map((l) => l.startsWith("# ") ? `<h1>${l.slice(2)}</h1>` : l.startsWith("## ") ? `<h2>${l.slice(3)}</h2>` : l.startsWith("- ") ? `<li>${l.slice(2)}</li>` : l ? `<p>${l.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>` : "").join("\n").replace(/(<li>[\s\S]*?<\/li>\n?)+/g, (m) => `<ul>\n${m}</ul>\n`), [md]);
  const text = useMemo(() => md.replace(/^#+ /gm, "").replace(/\*\*/g, ""), [md]);
  const jsonld = useMemo(() => JSON.stringify({ "@context": "https://schema.org", "@type": "MerchantReturnPolicy", applicableCountry: "US",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow", merchantReturnDays: Number(f.days),
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: f.shipping === "free" ? "https://schema.org/FreeReturn" : "https://schema.org/ReturnShippingFees" }, null, 2), [f]);
  const out = { md, html, text, jsonld }[fmt];
  const notes = [...(platformNotes[f.platform] ?? []), ...stateNotes];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">Store name<input className={field} value={f.store} onChange={(e) => set("store", e.target.value)} /></label>
        <label className="block">Platform
          <select className={field} value={f.platform} onChange={(e) => set("platform", e.target.value)}>
            <option value="shopify">Shopify</option><option value="tiktok-shop">TikTok Shop</option><option value="etsy">Etsy</option><option value="woocommerce">WooCommerce / other</option>
          </select></label>
        <label className="block">Return window (days)<input type="number" min={0} max={365} className={field} value={f.days} onChange={(e) => set("days", e.target.value)} /></label>
        <label className="block">Counted from<select className={field} value={f.from} onChange={(e) => set("from", e.target.value)}><option value="delivery">Delivery</option><option value="purchase">Purchase</option></select></label>
        <label className="block sm:col-span-2">Required condition<input className={field} value={f.condition} onChange={(e) => set("condition", e.target.value)} /></label>
        <label className="block">Return shipping<select className={field} value={f.shipping} onChange={(e) => set("shipping", e.target.value)}><option value="customer">Customer pays</option><option value="free">Free returns</option><option value="deducted">Deducted from refund</option></select></label>
        <label className="block">Restocking fee (%)<input type="number" min={0} max={50} className={field} value={f.restock} onChange={(e) => set("restock", e.target.value)} /></label>
        <label className="block">Refund to<select className={field} value={f.method} onChange={(e) => set("method", e.target.value)}><option>original payment method</option><option>store credit</option></select></label>
        <label className="block">Refund within (business days)<input type="number" min={1} max={60} className={field} value={f.refundDays} onChange={(e) => set("refundDays", e.target.value)} /></label>
        <label className="block">Exchanges<select className={field} value={f.exchanges} onChange={(e) => set("exchanges", e.target.value)}><option value="yes">Offered</option><option value="no">Not offered</option></select></label>
        <label className="block">Support email<input className={field} value={f.email} onChange={(e) => set("email", e.target.value)} /></label>
        <label className="block sm:col-span-2">Non-returnable items (one per line)<textarea rows={3} className={field} value={f.exceptions} onChange={(e) => set("exceptions", e.target.value)} /></label>
      </div>

      {notes.length > 0 && (
        <div className="space-y-2 rounded-xl border border-line bg-surface p-4 text-sm">
          <p className="font-medium">Rules to check against (from official sources)</p>
          {notes.map((n) => <p key={n.text}><strong>{n.label}:</strong> {n.text} <a className="underline" href={n.url} target="_blank" rel="noopener">{n.cite}</a></p>)}
        </div>
      )}

      <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label="Format">
        {([["md", "Markdown"], ["html", "HTML"], ["text", "Plain text"], ["jsonld", "Google structured data"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setFmt(k)} className={`rounded-full border px-3 py-1 ${fmt === k ? "border-accent text-accent" : "border-line"}`}>{l}</button>
        ))}
      </div>
      <textarea readOnly rows={18} className={`${field} font-mono text-sm`} value={out} aria-label="Generated policy" />
      <button onClick={() => navigator.clipboard.writeText(out)} className="rounded-lg bg-accent px-5 py-3 font-medium text-accent-ink">Copy</button>
      <p className="text-xs text-muted">A template, not legal advice. Check it against your platform&apos;s current rules and the laws where you sell.</p>
    </div>
  );
}
