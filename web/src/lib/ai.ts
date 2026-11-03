/** Single AI provider module: OpenAI (owner decision 2026-11-03). Used by the extraction pipeline and, later, the letter generator. */
export const AI_MODELS = {
  extract: process.env.OPENAI_MODEL_EXTRACT ?? "gpt-4.1-mini", // cheap, structured extraction
  generate: process.env.OPENAI_MODEL_GENERATE ?? "gpt-4.1",    // letter drafting
};

type Msg = { role: "system" | "user" | "assistant"; content: string };

export async function openaiJson<T>(opts: { model: string; messages: Msg[]; schema: { name: string; strict: boolean; schema: object } }) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY is not set");
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: opts.model, temperature: 0, messages: opts.messages, response_format: { type: "json_schema", json_schema: opts.schema } }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const j = await res.json();
  return { data: JSON.parse(j.choices[0].message.content) as T, usage: j.usage as { prompt_tokens: number; completion_tokens: number } };
}
