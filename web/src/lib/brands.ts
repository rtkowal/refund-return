import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { Brand } from "./policy-schema";

const DIR = join(process.cwd(), "data", "brands");

export function allBrands(): Brand[] {
  return readdirSync(DIR).filter((f) => f.endsWith(".json"))
    .map((f) => Brand.parse(JSON.parse(readFileSync(join(DIR, f), "utf8"))))
    .filter((b) => b.launch)
    .sort((a, b) => a.name.localeCompare(b.name));
}
export function getBrand(slug: string): Brand | undefined {
  return allBrands().find((b) => b.slug === slug);
}
/** Public view: strips the internal source quote. */
export function publicRules(b: Brand) {
  return b.rules.filter((r) => r.status !== "disputed").map(({ quote: _q, reviewNote: _n, ...r }) => r);
}
