// Crawl the built site and fail on any internal link that 404s. Usage: npm run build && npm run check-links
import { spawn } from "node:child_process";
const PORT = 3199, base = `http://localhost:${PORT}`;
const srv = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore" });
const wait = async () => { for (let i = 0; i < 60; i++) { try { await fetch(base); return; } catch { await new Promise((r) => setTimeout(r, 500)); } } throw new Error("server did not start"); };
try {
  await wait();
  const seen = new Set(), todo = ["/"], broken = [];
  while (todo.length) {
    const p = todo.pop(); if (seen.has(p)) continue; seen.add(p);
    const r = await fetch(base + p, { redirect: "manual" });
    if (r.status === 404) { broken.push(p); continue; }
    const html = await r.text();
    for (const [, h] of html.matchAll(/href="(\/[^"#?]*)/g)) if (!h.startsWith("/_next") && !h.startsWith("/go/") && !seen.has(h)) todo.push(h);
  }
  console.log(`checked ${seen.size} pages`);
  if (broken.length) { console.error("404:\n" + broken.join("\n")); process.exitCode = 1; }
} finally { srv.kill(); }
