import { NextResponse } from "next/server";
import { GenInput } from "@/lib/generator/input";
import { SYSTEM_PROMPT, userPrompt } from "@/lib/generator/prompt";
import { AI_MODELS, openaiText } from "@/lib/ai";
import { getBrand } from "@/lib/brands";

export const runtime = "nodejs";

// Best-effort per-instance limiter. TODO(milestone 7): Upstash + Turnstile for a real limit.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now(), win = 60 * 60 * 1000, max = 10;
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < win);
  arr.push(now); hits.set(ip, arr);
  return arr.length > max;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many letters this hour. Please try again later." }, { status: 429 });
  const parsed = GenInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });
  const input = parsed.data;

  const brand = input.brand ? getBrand(input.brand) : undefined;
  const facts = brand ? brand.rules.map((r) => r.text) : [];
  const sourceUrl = brand ? brand.officialPolicyUrl : undefined;
  if (brand) input.brandName = brand.name;

  try {
    const { text } = await openaiText({
      model: AI_MODELS.generate,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: userPrompt(input, facts, sourceUrl) }],
    });
    // No PII stored: nothing is logged or persisted.
    return NextResponse.json({ letter: text.trim(), facts, sourceUrl, brandName: input.brandName ?? null });
  } catch {
    return NextResponse.json({ error: "The letter service is unavailable right now." }, { status: 502 });
  }
}
