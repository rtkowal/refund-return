/** Rate limit (Upstash, falls back to in-memory) + Turnstile verification (skipped until keys exist). */
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const upstash = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(15, "1 h"), prefix: "rr-gen" }) : null;

const mem = new Map<string, number[]>();
export async function rateLimited(ip: string): Promise<boolean> {
  if (upstash) return !(await upstash.limit(ip)).success;
  const now = Date.now(), arr = (mem.get(ip) ?? []).filter((t) => now - t < 3_600_000); arr.push(now); mem.set(ip, arr);
  return arr.length > 15;
}

export const turnstileEnabled = () => Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
export async function turnstileOk(token: string | undefined, ip: string): Promise<boolean> {
  if (!turnstileEnabled()) return true;
  if (!token) return false;
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token, remoteip: ip }),
  });
  return Boolean((await r.json()).success);
}
