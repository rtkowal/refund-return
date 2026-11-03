import { z } from "zod";

/** One fact, with provenance. `quote` must appear verbatim in the snapshot (checked by scripts/validate-data.ts). */
export const Rule = z.object({
  id: z.string(),                                   // stable slug within the brand, e.g. "window-default"
  type: z.enum(["window","exclusion","fee","receipt","refund_method","refund_timing","exchange","price_adjustment","membership","holiday","cancellation"]),
  channel: z.enum(["any","in_store","online","marketplace_3p","app"]).default("any"),
  category: z.string().optional(),
  windowDays: z.number().int().positive().nullable().optional(),
  windowAnchor: z.enum(["purchase","receipt","delivery","purchase_or_receipt"]).optional(),
  season: z.object({ start: z.string().regex(/^\d{2}-\d{2}$/), end: z.string().regex(/^\d{2}-\d{2}$/), until: z.string().regex(/^\d{2}-\d{2}$/) }).optional(),
  text: z.string().min(10),                          // our wording (rendered)
  quote: z.string().min(10),                         // verbatim source sentence (never rendered)
  snapshot: z.string(),                              // key into `snapshots`
  status: z.enum(["extracted","reviewed","published","stale","disputed"]),
  extractedBy: z.enum(["llm","human","claude-session"]),
  reviewedBy: z.string().optional(),
  reviewedAt: z.string().optional(),
});

export const Snapshot = z.object({
  url: z.string().url(),
  file: z.string(),                                  // repo-relative path to the Markdown snapshot
  sha256: z.string().length(64),
  apifyRunId: z.string(),
  fetchedAt: z.string(),
});

export const Brand = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  kind: z.enum(["retailer","marketplace","subscription","airline"]),
  officialPolicyUrl: z.string().url(),
  returnsPortalUrl: z.string().url().optional(),
  usSearchVolume: z.number().int().optional(),
  launch: z.boolean(),
  lastVerifiedAt: z.string(),
  snapshots: z.record(Snapshot),
  rules: z.array(Rule).min(1),
  facets: z.array(z.string()).default([]),
});

export type Brand = z.infer<typeof Brand>;
export type Rule = z.infer<typeof Rule>;

/** Indexable only when every core rule is reviewed/published and verified within 30 days (7 in Nov–Jan). */
export function isIndexable(b: Brand, now = new Date()): boolean {
  const maxDays = [10, 11, 0].includes(now.getMonth()) ? 7 : 30;
  const age = (now.getTime() - new Date(b.lastVerifiedAt).getTime()) / 86_400_000;
  const reviewed = b.rules.every((r) => r.status === "reviewed" || r.status === "published");
  return b.launch && reviewed && age <= maxDays;
}
