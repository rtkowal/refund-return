import { z } from "zod";
export const GenInput = z.object({
  brand: z.string().regex(/^[a-z0-9-]+$/).max(60).optional(),
  brandName: z.string().max(80).optional(),
  story: z.string().min(20).max(2000),
  orderDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  channel: z.enum(["online", "in_store", "marketplace", "unknown"]),
  receipt: z.enum(["yes", "no", "order_email"]),
  outcome: z.enum(["refund", "exchange", "repair", "store_credit"]),
  payment: z.enum(["credit_card", "debit_card", "paypal", "bnpl", "cash", "other"]),
  priorContact: z.boolean(),
  tone: z.enum(["polite", "firm", "final"]),
});
export type GenInput = z.infer<typeof GenInput>;
