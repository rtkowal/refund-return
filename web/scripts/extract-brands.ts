/*
 * Extract brand policy rules from Apify snapshots with OpenAI → web/data/brands/<slug>.json
 * Usage: OPENAI_API_KEY=... [OPENAI_MODEL_EXTRACT=gpt-4.1-mini] npx tsx scripts/extract-brands.ts [--dry] [--limit N] [--only slug]
 * Every rule's quote must be verbatim in the snapshot or it is dropped. Output status = "extracted" (needs review).
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { Brand } from "../src/lib/policy-schema";
import { AI_MODELS, openaiJson } from "../src/lib/ai";

const ROOT = join(__dirname, "..", "..");
// load web/.env.local (gitignored) if present
const ENV = join(__dirname, "..", ".env.local");
if (existsSync(ENV)) for (const l of readFileSync(ENV, "utf8").split("\n")) { const m = /^([A-Z_]+)=(.*)$/.exec(l.trim()); if (m && !process.env[m[1]]) process.env[m[1]] = m[2]; }
const OUT = join(__dirname, "..", "data", "brands");
const BRAND_DIRS = [
  "research/scrape-2026-11-03/03-brands", "research/scrape-2026-11-03/05-retries",
  "research/scrape-2026-11-03-b2/06-blocked-retail-walmart-uk261-ba", "research/scrape-2026-11-03-b2/10-brands-41-120",
  "research/scrape-2026-11-03-b2/11-brands-121-200", "research/scrape-2026-11-03-b2/12-brands-retry-unblocker",
  "research/scrape-batch3/14-facets", "research/scrape-batch3/17-brands-fix",
];
const MANIFESTS = ["research/scrape-2026-11-03/manifest.csv", "research/scrape-2026-11-03-b2/manifest.csv", "research/scrape-batch3/manifest.csv"];
const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const LIMIT = Number(args[args.indexOf("--limit") + 1]) || Infinity;
const ONLY = args.includes("--only") ? args[args.indexOf("--only") + 1] : undefined;
const MODEL = AI_MODELS.extract;
const MIN_CHARS = 800;

const norm = (s: string) => s.replace(/\\([*_\[\]()#])/g, "$1").replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
const front = (raw: string) => {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  const get = (k: string) => m ? (new RegExp(`^${k}:\\s*(.*)$`, "m").exec(m[1])?.[1] ?? "").replace(/^"|"$/g, "").trim() : "";
  return { url: get("loaded_url") || get("source_url"), sha256: get("sha256"), run: get("apify_run_id"), fetched: get("fetched_at"), quality: get("quality"), body: m ? raw.slice(m[0].length) : raw };
};

// use=yes files only (manifest is the source of truth)
const usable = new Set<string>();
for (const m of MANIFESTS) {
  const p = join(ROOT, m); if (!existsSync(p)) continue;
  const base = m.replace(/manifest\.csv$/, "");
  for (const line of readFileSync(p, "utf8").split("\n").slice(1)) {
    const cols = line.split(","); if (cols.at(-1)?.trim() === "yes") usable.add(base + cols.at(-2)!.trim());
  }
}
const files = BRAND_DIRS.flatMap((d) => existsSync(join(ROOT, d)) ? readdirSync(join(ROOT, d)).filter((f) => f.endsWith(".md")).map((f) => `${d}/${f}`) : [])
  .filter((f) => usable.has(f) && statSync(join(ROOT, f)).size > MIN_CHARS);

const SCHEMA = {
  name: "policy", strict: true,
  schema: {
    type: "object", additionalProperties: false, required: ["isReturnPolicy", "brandName", "slug", "rules"],
    properties: {
      isReturnPolicy: { type: "boolean", description: "false if the page does not state the US consumer return/refund policy" },
      brandName: { type: "string" }, slug: { type: "string", description: "lowercase-hyphenated brand slug, e.g. best-buy" },
      rules: { type: "array", items: { type: "object", additionalProperties: false,
        required: ["type", "channel", "category", "windowDays", "windowAnchor", "text", "quote"],
        properties: {
          type: { type: "string", enum: ["window","exclusion","fee","receipt","refund_method","refund_timing","exchange","price_adjustment","membership","holiday","cancellation"] },
          channel: { type: "string", enum: ["any","in_store","online","marketplace_3p","app"] },
          category: { type: ["string", "null"] }, windowDays: { type: ["integer", "null"] },
          windowAnchor: { type: ["string", "null"], enum: ["purchase","receipt","delivery","purchase_or_receipt", null] },
          text: { type: "string", description: "One plain-English sentence in our own words. No marketing language." },
          quote: { type: "string", description: "The exact sentence from the page that supports the rule, copied character for character." },
        } } },
    },
  },
};
const SYSTEM = `You extract US retail return/refund policy facts from a store's official page.
Rules: only facts explicitly stated on the page; never infer or add outside knowledge. Each rule needs a verbatim supporting quote copied exactly.
Prefer: default return window, category-specific windows, holiday windows, exclusions, receipt/ID rules, fees (restocking, return shipping), refund method and timing, price adjustment, exchanges.
Max 12 rules. If the page is not a return policy (navigation, login, store locator, unrelated), set isReturnPolicy=false and rules=[].`;

async function extract(body: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return openaiJson<any>({ model: MODEL, schema: SCHEMA, messages: [{ role: "system", content: SYSTEM }, { role: "user", content: body.slice(0, 60_000) }] });
}

(async () => {
  console.log(`${files.length} usable brand snapshots${DRY ? " (dry run)" : ""}; model ${MODEL}`);
  if (DRY) { files.forEach((f) => console.log(" ", f)); return; }
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set");
  let tokensIn = 0, tokensOut = 0, done = 0, dropped = 0;
  for (const f of files.slice(0, LIMIT)) {
    const raw = readFileSync(join(ROOT, f), "utf8"); const fm = front(raw);
    try {
      const { data, usage } = await extract(fm.body);
      tokensIn += usage?.prompt_tokens ?? 0; tokensOut += usage?.completion_tokens ?? 0;
      if (!data.isReturnPolicy || !data.rules.length) { console.log(`– skip ${f} (not a policy page)`); continue; }
      const slug = String(data.slug).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      if (ONLY && slug !== ONLY) continue;
      const nb = norm(fm.body);
      const good = data.rules.filter((r: { quote: string }) => nb.includes(norm(r.quote)));
      dropped += data.rules.length - good.length;
      if (!good.length) { console.log(`✗ ${slug}: no verifiable rules`); continue; }
      const path = join(OUT, `${slug}.json`);
      const existing = existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : null;
      const snapKey = existing ? `s${Object.keys(existing.snapshots).length + 1}` : "policy";
      const rules = good.map((r: Record<string, unknown>, i: number) => ({
        id: `${snapKey}-${r.type}-${i + 1}`, type: r.type, channel: r.channel,
        ...(r.category ? { category: r.category } : {}), ...(r.windowDays ? { windowDays: r.windowDays } : {}),
        ...(r.windowAnchor ? { windowAnchor: r.windowAnchor } : {}),
        text: r.text, quote: r.quote, snapshot: snapKey, status: "extracted", extractedBy: "llm",
      }));
      const brand = existing ?? { slug, name: data.brandName, kind: "retailer", officialPolicyUrl: fm.url, launch: true, lastVerifiedAt: (fm.fetched || "2026-11-03").slice(0, 10), snapshots: {}, rules: [], facets: [] };
      if (Object.values(brand.snapshots).some((s: any) => s.sha256 === fm.sha256)) { console.log(`= ${slug}: snapshot already extracted`); continue; }
      brand.snapshots[snapKey] = { url: fm.url, file: relative(ROOT, join(ROOT, f)), sha256: fm.sha256, apifyRunId: fm.run || "unknown", fetchedAt: (fm.fetched || "2026-11-03").slice(0, 10) };
      brand.rules.push(...rules);
      const parsed = Brand.safeParse(brand);
      if (!parsed.success) { console.log(`✗ ${slug}: schema ${parsed.error.issues[0].message}`); continue; }
      writeFileSync(path, JSON.stringify(parsed.data, null, 2) + "\n"); done++;
      console.log(`✓ ${slug}: ${rules.length} rules (${data.rules.length - good.length} dropped)`);
    } catch (e) { console.log(`! ${f}: ${(e as Error).message}`); }
  }
  console.log(`done ${done}; rules dropped for unverifiable quotes: ${dropped}; tokens in ${tokensIn}, out ${tokensOut}`);
})();
