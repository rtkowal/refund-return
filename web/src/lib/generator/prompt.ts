import type { GeneratorDef } from "./defs";
import type { GenInput } from "./input";

export const BASE_RULES = `You draft short consumer letters for US-based users.
Hard rules:
- You are not a lawyer. The text must not claim to be legal advice or written by a lawyer, and must never promise or predict an outcome.
- Use ONLY the facts under FACTS and LAWS. Never invent policy terms, deadlines, laws, amounts or case numbers. If a section says "none", cite nothing from it.
- Use square-bracket placeholders for the user's details: [Your name], [Address], [Email], [Order number], [Date].
- Plain, specific, under 280 words. Output only the text, starting with "Subject:" (for a complaint summary, start with "Complaint summary:").
- Tone: polite = cooperative; firm = clear and direct; final = names the concrete next step (card dispute, regulator complaint or small claims, whichever fits) without other threats.`;

export function buildMessages(def: GeneratorDef, i: GenInput, facts: string[], brandName?: string, sourceUrl?: string) {
  const fieldLines = def.fields.map((f) => `${f.label}: ${i.fields[f.key] || "not given"}`).join("\n");
  const user = [
    `LETTER TYPE: ${def.title}. Address it to ${def.recipientHint}${brandName ? ` (${brandName})` : ""}.`,
    `TASK: ${def.instructions}`,
    `FACTS (store policy, verified from ${sourceUrl ?? "n/a"}):\n${facts.length ? facts.map((f) => `- ${f}`).join("\n") : "- none"}`,
    `LAWS (verified):\n${def.laws.length ? def.laws.map((l) => `- ${l.text} [${l.cite}]`).join("\n") : "- none"}`,
    `DETAILS:\n${fieldLines}\nContacted before: ${i.priorContact ? "yes" : "no"}\nTone: ${i.tone}`,
    `USER'S STORY: ${i.story}`,
  ].join("\n\n");
  return [{ role: "system" as const, content: BASE_RULES }, { role: "user" as const, content: user }];
}
