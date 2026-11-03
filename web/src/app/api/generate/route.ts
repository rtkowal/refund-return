import { NextResponse } from "next/server";
import { GenInput } from "@/lib/generator/input";
import { buildMessages } from "@/lib/generator/prompt";
import { getGenerator } from "@/lib/generator/defs";
import { AI_MODELS, openaiText } from "@/lib/ai";
import { getBrand } from "@/lib/brands";
import { rateLimited, turnstileOk } from "@/lib/protect";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (await rateLimited(ip)) return NextResponse.json({ error: "Too many letters this hour. Please try again later." }, { status: 429 });
  const body = await req.json().catch(() => null);
  if (!(await turnstileOk(body?.turnstileToken, ip))) return NextResponse.json({ error: "Please complete the verification check." }, { status: 403 });
  const parsed = GenInput.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });
  const input = parsed.data;
  const def = getGenerator(input.type);
  if (!def) return NextResponse.json({ error: "Unknown letter type." }, { status: 400 });
  // only accept known field keys
  input.fields = Object.fromEntries(Object.entries(input.fields).filter(([k]) => def.fields.some((f) => f.key === k)));

  const brand = def.usesBrand && input.brand ? getBrand(input.brand) : undefined;
  const facts = brand ? brand.rules.map((r) => r.text) : [];
  try {
    const { text } = await openaiText({ model: AI_MODELS.generate, messages: buildMessages(def, input, facts, brand?.name, brand?.officialPolicyUrl) });
    // Nothing is stored or logged.
    return NextResponse.json({ letter: text.trim(), facts, sourceUrl: brand?.officialPolicyUrl, brandName: brand?.name ?? null, laws: def.laws });
  } catch {
    return NextResponse.json({ error: "The letter service is unavailable right now." }, { status: 502 });
  }
}
