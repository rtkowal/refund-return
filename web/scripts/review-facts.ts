/*
 * Automated second-pass review of brand facts. An independent model (default gpt-4.1, not the extractor) checks that each
 * rule's published text says exactly what its verbatim source quote says. Pass → status "reviewed"; fail → "disputed"
 * (hidden from pages). Usage: npm run review [-- --only slug] [-- --all]  (default: only rules with status "extracted")
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { openaiJson } from "../src/lib/ai";

const ENV = join(__dirname, "..", ".env.local");
if (existsSync(ENV)) for (const l of readFileSync(ENV, "utf8").split("\n")) { const m = /^([A-Z_]+)=(.*)$/.exec(l.trim()); if (m && !process.env[m[1]]) process.env[m[1]] = m[2]; }
const DIR = join(__dirname, "..", "data", "brands");
const MODEL = process.env.OPENAI_MODEL_REVIEW ?? "gpt-4.1";
const args = process.argv.slice(2);
const ONLY = args.includes("--only") ? args[args.indexOf("--only") + 1] : undefined;
const ALL = args.includes("--all");
const today = new Date().toISOString().slice(0, 10);

const SCHEMA = { name: "review", strict: true, schema: { type: "object", additionalProperties: false, required: ["results"], properties: {
  results: { type: "array", items: { type: "object", additionalProperties: false, required: ["id", "faithful", "reason"], properties: {
    id: { type: "string" }, faithful: { type: "boolean" }, reason: { type: "string" } } } } } } };
const SYSTEM = `You are a strict fact checker for a consumer-information website.
For each item, decide whether SUMMARY is fully supported by QUOTE (from the store's official policy page) for brand BRAND.
faithful=true only if SUMMARY adds nothing the QUOTE doesn't say (no extra numbers, conditions, scope or certainty) and doesn't contradict or overstate it. Minor rewording is fine. If the QUOTE is about a different company, region or a non-consumer context, faithful=false. Give a short reason.`;

type Rule = { id: string; text: string; quote: string; status: string; reviewedBy?: string; reviewedAt?: string; [k: string]: unknown };

(async () => {
  let pass = 0, fail = 0, tin = 0, tout = 0;
  const files = readdirSync(DIR).filter((f) => f.endsWith(".json") && (!ONLY || f === `${ONLY}.json`));
  const queue = [...files];
  const worker = async () => { for (let f = queue.shift(); f; f = queue.shift()) {
    const path = join(DIR, f); const b = JSON.parse(readFileSync(path, "utf8"));
    const todo: Rule[] = b.rules.filter((r: Rule) => ALL || r.status === "extracted");
    if (!todo.length) continue;
    try {
      const items = todo.map((r) => ({ id: r.id, SUMMARY: r.text, QUOTE: r.quote }));
      const { data, usage } = await openaiJson<{ results: { id: string; faithful: boolean; reason: string }[] }>({ model: MODEL, schema: SCHEMA,
        messages: [{ role: "system", content: SYSTEM }, { role: "user", content: `BRAND: ${b.name}\n${JSON.stringify(items)}` }] });
      tin += usage?.prompt_tokens ?? 0; tout += usage?.completion_tokens ?? 0;
      for (const res of data.results) {
        const r = b.rules.find((x: Rule) => x.id === res.id); if (!r) continue;
        r.status = res.faithful ? "reviewed" : "disputed"; r.reviewedBy = `auto:${MODEL}`; r.reviewedAt = today;
        if (!res.faithful) { r.reviewNote = res.reason; fail++; console.log(`✗ ${b.slug} ${r.id}: ${res.reason}`); } else { delete r.reviewNote; pass++; }
      }
      writeFileSync(path, JSON.stringify(b, null, 2) + "\n");
    } catch (e) { console.log(`! ${f}: ${(e as Error).message}`); }
  } };
  await Promise.all(Array.from({ length: 8 }, worker));
  console.log(`reviewed: ${pass} passed, ${fail} disputed; tokens in ${tin}, out ${tout}`);
})();
