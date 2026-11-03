"use client";
import { useState } from "react";
import type { GeneratorDef, Law } from "@/lib/generator/defs";

type BrandOpt = { slug: string; name: string };
type Result = { letter: string; facts: string[]; sourceUrl?: string; brandName: string | null; laws: Law[] };
const field = "w-full rounded-lg border border-line bg-surface px-3 py-2";

export function Wizard({ def, brands, initialBrand }: { def: GeneratorDef; brands: BrandOpt[]; initialBrand?: string }) {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState(initialBrand ?? "");
  const [story, setStory] = useState("");
  const [vals, setVals] = useState<Record<string, string>>(() => Object.fromEntries(def.fields.filter((f) => f.type === "select").map((f) => [f.key, f.options![0][0]])));
  const [priorContact, setPrior] = useState(false);
  const [tone, setTone] = useState<"polite" | "firm" | "final">("polite");
  const [res, setRes] = useState<Result | null>(null);
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const brandName = brands.find((b) => b.slug === brand)?.name;

  async function generate(t = tone) {
    setBusy(true); setErr("");
    try {
      const r = await fetch("/api/generate/", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: def.slug, brand: brand || undefined, story, fields: vals, priorContact, tone: t }) });
      const j = await r.json(); if (!r.ok) throw new Error(j.error ?? "Something went wrong.");
      setRes(j); setStep(3);
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  }
  function download() {
    if (!res) return;
    const url = URL.createObjectURL(new Blob([res.letter], { type: "text/plain" }));
    Object.assign(document.createElement("a"), { href: url, download: `${def.filename}.txt` }).click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <ol className="flex gap-3 text-sm text-muted" aria-label="Progress">
        {["What happened", "Details", "Your letter"].map((s, i) => <li key={s} className={step === i + 1 ? "font-semibold text-ink" : ""}>{i + 1}. {s}</li>)}
      </ol>

      {step === 1 && (
        <div className="space-y-4">
          {def.usesBrand && (
            <label className="block">Which store or company?
              <select className={field} value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="">Other / not listed</option>
                {brands.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
              </select>
            </label>
          )}
          <label className="block">What happened?
            <textarea className={field} rows={5} maxLength={2000} value={story} onChange={(e) => setStory(e.target.value)} placeholder={def.storyPlaceholder} />
          </label>
          <button disabled={story.trim().length < 20} onClick={() => setStep(2)} className="rounded-lg bg-accent px-5 py-3 font-medium text-accent-ink disabled:opacity-50">Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {def.fields.map((f) => (
            <label key={f.key} className="block">{f.label}
              {f.type === "select" ? (
                <select className={field} value={vals[f.key] ?? ""} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })}>
                  {f.options!.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              ) : (
                <input type={f.type === "date" ? "date" : "text"} maxLength={200} placeholder={f.placeholder} className={field} value={vals[f.key] ?? ""} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })} />
              )}
            </label>
          ))}
          <label className="flex items-center gap-2 pt-6"><input type="checkbox" checked={priorContact} onChange={(e) => setPrior(e.target.checked)} /> I already contacted them</label>
          <div className="flex gap-2 sm:col-span-2">
            <button onClick={() => setStep(1)} className="rounded-lg border border-line px-5 py-3">Back</button>
            <button disabled={busy} onClick={() => generate()} className="rounded-lg bg-accent px-5 py-3 font-medium text-accent-ink disabled:opacity-50">{busy ? "Writing…" : "Write my letter"}</button>
          </div>
        </div>
      )}

      {err && <p role="alert" className="text-warn">{err}</p>}

      {step === 3 && res && (
        <div className="space-y-4">
          {(res.facts.length > 0 || res.laws.length > 0) && (
            <div className="space-y-2 rounded-lg border border-line bg-surface p-4 text-sm">
              {res.facts.length > 0 && <>
                <p className="font-medium">From {res.brandName}&apos;s policy</p>
                <ul className="list-disc pl-5">{res.facts.slice(0, 5).map((x) => <li key={x}>{x}</li>)}</ul>
                {res.sourceUrl && <p className="text-muted">Source: <a className="underline" href={res.sourceUrl} rel="nofollow noopener" target="_blank">{new URL(res.sourceUrl).hostname}</a></p>}
              </>}
              {res.laws.map((l) => <p key={l.cite}>{l.text} <a className="underline" href={l.url} rel="noopener" target="_blank">{l.cite}</a></p>)}
            </div>
          )}
          <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label="Tone">
            {(["polite", "firm", "final"] as const).map((t) => (
              <button key={t} disabled={busy} onClick={() => { setTone(t); generate(t); }}
                className={`rounded-full border px-3 py-1 ${tone === t ? "border-accent text-accent" : "border-line"}`}>{t === "final" ? "Final demand" : t[0].toUpperCase() + t.slice(1)}</button>
            ))}
          </div>
          <textarea className={`${field} font-mono text-sm`} rows={16} value={res.letter} onChange={(e) => setRes({ ...res, letter: e.target.value })} aria-label="Your letter (editable)" />
          <div className="flex flex-wrap gap-2">
            <button onClick={() => navigator.clipboard.writeText(res.letter)} className="rounded-lg bg-accent px-5 py-3 font-medium text-accent-ink">Copy</button>
            <button onClick={download} className="rounded-lg border border-line px-5 py-3">Download .txt</button>
          </div>
          {brand && def.usesBrand && (
            <div className="rounded-xl border border-line bg-surface p-4">
              <a href={`/go/${brand}/`} rel="nofollow" className="font-medium underline">Contact {brandName} →</a>
              <p className="text-sm text-muted">refund-return.com is not affiliated with {brandName}.</p>
            </div>
          )}
        </div>
      )}
      <p className="text-xs text-muted">Templates and information, not legal advice. We don&apos;t store what you type.</p>
    </div>
  );
}
