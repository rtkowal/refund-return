import { z } from "zod";
export const GenInput = z.object({
  type: z.string().regex(/^[a-z0-9-]+$/).max(40),
  brand: z.string().regex(/^[a-z0-9-]+$/).max(60).optional(),
  story: z.string().min(20).max(2000),
  fields: z.record(z.string().max(80), z.string().max(200)).default({}),
  priorContact: z.boolean().default(false),
  tone: z.enum(["polite", "firm", "final"]),
});
export type GenInput = z.infer<typeof GenInput>;
