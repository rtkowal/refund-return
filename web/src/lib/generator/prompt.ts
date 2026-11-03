import type { GenInput } from "./input";

export const SYSTEM_PROMPT = `You write a short consumer letter asking a US store for a refund, exchange, repair or store credit.
Hard rules:
- You are not a lawyer and the letter must not claim to be legal advice or written by a lawyer. Never threaten legal action you can't name, and never promise or predict an outcome.
- Use ONLY the store-policy facts provided under FACTS. Never invent policy terms, deadlines, laws or case numbers. If no facts are provided, do not cite any policy.
- Put the customer's own details as placeholders in square brackets: [Your name], [Order number], [Address], [Date].
- Plain, specific, under 250 words. Include: what was bought, what went wrong, what the customer wants, and a reasonable reply deadline (10 days for polite/firm, 7 for final).
- Tone: polite = cooperative; firm = clear and direct; final = states that, if unresolved, the customer will dispute the payment with their card issuer or payment provider and file a complaint with their state attorney general.
Output: the letter only, starting with "Subject:".`;

export function userPrompt(i: GenInput, facts: string[], sourceUrl?: string) {
  return [
    `STORE: ${i.brandName ?? "the store"}`,
    `FACTS (verified from ${sourceUrl ?? "n/a"}):\n${facts.length ? facts.map((f) => `- ${f}`).join("\n") : "- none"}`,
    `CUSTOMER STORY: ${i.story}`,
    `ORDER DATE: ${i.orderDate ?? "unknown"} · CHANNEL: ${i.channel} · RECEIPT: ${i.receipt} · PAID WITH: ${i.payment}`,
    `WANTS: ${i.outcome} · CONTACTED BEFORE: ${i.priorContact ? "yes" : "no"} · TONE: ${i.tone}`,
  ].join("\n");
}
