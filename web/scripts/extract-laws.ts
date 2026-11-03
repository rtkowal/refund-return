/* Extract consumer-facing facts from official statute snapshots → data/laws/<id>.json. Quotes verified verbatim. Usage: npm run extract-laws [-- --only id] */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { AI_MODELS, openaiJson } from "../src/lib/ai";

const ROOT = join(__dirname, "..", ".."), OUT = join(__dirname, "..", "data", "laws");
const ENV = join(__dirname, "..", ".env.local");
if (existsSync(ENV)) for (const l of readFileSync(ENV, "utf8").split("\n")) { const m = /^([A-Z_]+)=(.*)$/.exec(l.trim()); if (m && !process.env[m[1]]) process.env[m[1]] = m[2]; }
const ONLY = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : undefined;
const norm = (s: string) => s.replace(/\\([*_\[\]()#])/g, "$1").replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
type Cfg = { id: string; state?: string; jurisdiction: string; name: string; citation: string; url: string; files: string[] };
const cfg: Cfg[] = JSON.parse(readFileSync(join(__dirname, "laws.config.json"), "utf8"));

const SCHEMA = { name: "law", strict: true, schema: { type: "object", additionalProperties: false, required: ["facts"], properties: {
  facts: { type: "array", items: { type: "object", additionalProperties: false, required: ["text", "quote"], properties: {
    text: { type: "string", description: "One plain-English sentence for a shopper, in our own words." },
    quote: { type: "string", description: "Exact supporting sentence from the text, copied character for character." } } } } } } };
const SYSTEM = `You summarize official US consumer-law text for shoppers.
Extract up to 8 facts relevant to returns, refunds, posted refund policies, cancellations, shipping deadlines, disputes, or restocking fees.
Only facts stated in the text; each needs an exact verbatim supporting quote. No legal advice, no interpretation beyond the words. If the text has no relevant provisions, return facts: [].`;

(async () => {
  for (const c of cfg.filter((x) => !ONLY || x.id === ONLY)) {
    const snaps = c.files.map((f) => { const raw = readFileSync(join(ROOT, f), "utf8"); const fm = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
      const get = (k: string) => fm ? (new RegExp(`^${k}:\\s*(.*)$`, "m").exec(fm[1])?.[1] ?? "").replace(/^"|"$/g, "").trim() : "";
      return { file: f, body: fm ? raw.slice(fm[0].length) : raw, sha256: get("sha256"), run: get("apify_run_id"), url: get("loaded_url") || get("source_url") }; });
    const text = snaps.map((s) => s.body).join("\n\n").slice(0, 120_000);
    const { data } = await openaiJson<{ facts: { text: string; quote: string }[] }>({ model: AI_MODELS.extract, schema: SCHEMA,
      messages: [{ role: "system", content: SYSTEM }, { role: "user", content: `${c.name} — ${c.citation}\n\n${text}` }] });
    const facts = data.facts.flatMap((f) => { const s = snaps.find((x) => norm(x.body).includes(norm(f.quote))); return s ? [{ ...f, snapshot: s.file }] : []; });
    writeFileSync(join(OUT, `${c.id}.json`), JSON.stringify({ ...c, snapshots: snaps.map(({ body: _b, ...s }) => s), facts, status: "extracted", reviewedBy: null, reviewedAt: null }, null, 2) + "\n");
    console.log(`${facts.length ? "✓" : "✗"} ${c.id}: ${facts.length} facts (${data.facts.length - facts.length} dropped)`);
  }
})();
