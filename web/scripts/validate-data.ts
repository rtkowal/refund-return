/* Validates every brand file: schema, and that each rule's quote appears verbatim in its snapshot. Run: npm run validate */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { Brand } from "../src/lib/policy-schema";

const repoRoot = join(__dirname, "..", "..");
const dir = join(__dirname, "..", "data", "brands");
const norm = (s: string) => s.replace(/\\([*_\[\]()#])/g, "$1").replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
let errors = 0;

for (const f of readdirSync(dir).filter((x) => x.endsWith(".json"))) {
  const parsed = Brand.safeParse(JSON.parse(readFileSync(join(dir, f), "utf8")));
  if (!parsed.success) { console.error(`✗ ${f}: ${parsed.error.issues.map((i) => i.path.join(".") + " " + i.message).join("; ")}`); errors++; continue; }
  const b = parsed.data;
  for (const r of b.rules) {
    const snap = b.snapshots[r.snapshot];
    if (!snap) { console.error(`✗ ${f} ${r.id}: unknown snapshot "${r.snapshot}"`); errors++; continue; }
    const raw = readFileSync(join(repoRoot, snap.file), "utf8");
    if (!norm(raw).includes(norm(r.quote))) { console.error(`✗ ${f} ${r.id}: quote not found in ${snap.file}`); errors++; }
  }
  for (const [k, s] of Object.entries(b.snapshots)) {
    const body = readFileSync(join(repoRoot, s.file), "utf8");
    const declared = /sha256:\s*([0-9a-f]{64})/.exec(body)?.[1];
    if (declared && declared !== s.sha256) { console.error(`✗ ${f} snapshot ${k}: sha256 mismatch`); errors++; }
    void createHash;
  }
  console.log(`✓ ${f} (${b.rules.length} rules)`);
}
if (errors) { console.error(`${errors} error(s)`); process.exit(1); }
