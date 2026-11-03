"use client";
import { useState } from "react";

type BrandOpt = { slug: string; name: string };
type Result = { letter: string; facts: string[]; sourceUrl?: string; brandName: string | null };

const field = "w-full rounded-lg border border-line bg-surface px-3 py-2";

export function Wizard({ brands, initialBrand }: { brands: BrandOpt[]; initialBrand?: string }) {
  const [step, setStep] = useState(1);
  const [f, setF] = useState({
    brand: initialBrand ?? "", story: "", orderDate: "", channel: "online", receipt: "order_email",
    outcome: "refund", payment: "credit_card", priorContact: false, tone: "polite",
  });
  const [res, setRes] = useState<Result | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k: string, v: string | boolean) => setF((p) => ({ ...p, [k]: v }));
  const brandName = brands.find((b) => b.slug === f.brand)?.name;

  async function generate(tone = f.tone) {
    setBusy(true); setErr("");
    try {
      const body = { ...f, tone, brand: f.brand || undefined, orderDate: f.orderDate || undefined };
      const r = await fetch("/api/generate/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "Something went wrong.");
      setRes(j); setStep(3);
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  }
  function download() {
    if (!res) return;
    const url = URL.createObjectURL(new Blob([res.letter], { type: "text/plain" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "refund-request.txt" }); a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <ol className="flex gap-2 text-sm text-muted" aria-label="Progress">
        {["What happened", "Details", "Your letter"].map((s, i) => (
          <li key={s} className={step === i + 1 ? "font-semibold text-ink" : ""}>{i + 1}. {s}</li>
        ))}
      </ol>

      {step === 1 && (
        <div className="space-y-4">
          <label className="block">Which store?
            <select className={field} value={f.brand} onChange={(e) => set("brand", e.target.value)}>
              <option value="">Other / not listed</option>
              {brands.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
            </select>
          </label>
          <label className="block">What happened?
            <textarea className={field} rows={5} maxLength={2000} value={f.story} onChange={(e) => set("story", e.target.value)}
              placeholder="e.g. I bought a coffee maker online on Oct 2. It stopped working after a week and customer service won't take it back." />
          </label>
          <button disabled={f.story.trim().length < 20} onClick={() => setStep(2)}
            className="rounded-lg bg-accent px-5 py-3 font-medium text-accent-ink disabled:opacity-50">Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">Order date<input type="date" className={field} value={f.orderDate} onChange={(e) => set("orderDate", e.target.value)} /></label>
          <label className="block">Bought
            <select className={field} value={f.channel} onChange={(e) => set("channel", e.target.value)}>
              <option value="online">Online</option><option value="in_store">In store</option><option value="marketplace">From a marketplace seller</option><option value="unknown">Not sure</option>
            </select></label>
          <label className="block">Proof of purchase
            <select className={field} value={f.receipt} onChange={(e) => set("receipt", e.target.value)}>
              <option value="order_email">Order email / account</option><option value="yes">Paper receipt</option><option value="no">None</option>
            </select></label>
          <label className="block">What you want
            <select className={field} value={f.outcome} onChange={(e) => set("outcome", e.target.value)}>
              <option value="refund">Refund</option><option value="exchange">Exchange</option><option value="repair">Repair</option><option value="store_credit">Store credit</option>
            </select></label>
          <label className="block">Paid with
            <select className={field} value={f.payment} onChange={(e) => set("payment", e.target.value)}>
              <option value="credit_card">Credit card</option><option value="debit_card">Debit card</option><option value="paypal">PayPal</option><option value="bnpl">Klarna / Afterpay / Affirm</option><option value="cash">Cash</option><option value="other">Other</option>
            </select></label>
          <label className="flex items-center gap-2 pt-6"><input type="checkbox" checked={f.priorContact} onChange={(e) => set("priorContact", e.target.checked)} /> I already contacted them</label>
          <div className="flex gap-2 sm:col-span-2">
            <button onClick={() => setStep(1)} className="rounded-lg border border-line px-5 py-3">Back</button>
            <button disabled={busy} onClick={() => generate()} className="rounded-lg bg-accent px-5 py-3 font-medium text-accent-ink disabled:opacity-50">{busy ? "Writing…" : "Write my letter"}</button>
          </div>
        </div>
      )}

      {err && <p role="alert" className="text-warn">{err}</p>}

      {step === 3 && res && (
        <div className="space-y-4">
          {res.facts.length > 0 && (
            <div className="rounded-lg border border-line bg-surface p-4 text-sm">
              <p className="font-medium">Facts we used from {res.brandName}&apos;s policy</p>
              <ul className="list-disc pl-5">{res.facts.slice(0, 5).map((x) => <li key={x}>{x}</li>)}</ul>
              {res.sourceUrl && <p className="text-muted">Source: <a className="underline" href={res.sourceUrl} rel="nofollow noopener" target="_blank">{new URL(res.sourceUrl).hostname}</a></p>}
            </div>
          )}
          <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label="Tone">
            {(["polite", "firm", "final"] as const).map((t) => (
              <button key={t} disabled={busy} onClick={() => { set("tone", t); generate(t); }}
                className={`rounded-full border px-3 py-1 ${f.tone === t ? "border-accent text-accent" : "border-line"}`}>{t === "final" ? "Final demand" : t[0].toUpperCase() + t.slice(1)}</button>
            ))}
          </div>
          <textarea className={`${field} font-mono text-sm`} rows={16} value={res.letter} onChange={(e) => setRes({ ...res, letter: e.target.value })} aria-label="Your letter (editable)" />
          <div className="flex flex-wrap gap-2">
            <button onClick={() => navigator.clipboard.writeText(res.letter)} className="rounded-lg bg-accent px-5 py-3 font-medium text-accent-ink">Copy</button>
            <button onClick={download} className="rounded-lg border border-line px-5 py-3">Download .txt</button>
          </div>
          {f.brand && (
            <div className="rounded-xl border border-line bg-surface p-4">
              <a href={`/go/${f.brand}/`} rel="nofollow" className="font-medium underline">File your request with {brandName} →</a>
              <p className="text-sm text-muted">refund-return.com is not affiliated with {brandName}.</p>
            </div>
          )}
          <p className="text-sm text-muted">If they say no: <a className="underline" href="/chargebacks/">dispute the charge</a> with your card issuer, or check <a className="underline" href="/laws/us/">your state&apos;s law</a>.</p>
        </div>
      )}
      <p className="text-xs text-muted">Templates and information, not legal advice. We don&apos;t store what you type.</p>
    </div>
  );
}
