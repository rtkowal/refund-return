import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
export type LawFact = { text: string; quote: string; snapshot: string };
export type Law = { id: string; state?: string; jurisdiction: string; name: string; citation: string; url: string; facts: LawFact[]; reviewedBy: string | null; reviewedAt: string | null };
const DIR = join(process.cwd(), "data", "laws");
export function allLaws(): Law[] { return readdirSync(DIR).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(readFileSync(join(DIR, f), "utf8")) as Law).filter((l) => l.facts.length > 0); }
export const federalLaws = () => allLaws().filter((l) => l.jurisdiction === "US");
export const stateLaws = () => allLaws().filter((l) => l.state).sort((a, b) => a.name.localeCompare(b.name));
export const getState = (s: string) => stateLaws().find((l) => l.state === s);
/** Public view: never ship the internal quote. */
export const publicFacts = (l: Law) => l.facts.map((f) => f.text);
