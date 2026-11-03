// SEO audit of the built site: title, meta description, single H1, canonical, valid JSON-LD. Usage: npm run build && npm run seo-audit
import { spawn } from "node:child_process";
const PORT = 3200 + Math.floor(Math.random() * 700), base = `http://localhost:${PORT}`;
const srv = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore" });
const wait = async () => { for (let i = 0; i < 60; i++) { try { await fetch(base); return; } catch { await new Promise((r) => setTimeout(r, 500)); } } throw new Error("no server"); };
const issues = []; const titles = new Map();
try {
  await wait();
  const seen = new Set(), todo = ["/"];
  while (todo.length) {
    const p = todo.pop(); if (seen.has(p)) continue; seen.add(p);
    const html = await (await fetch(base + p)).text();
    for (const [, h] of html.matchAll(/href="(\/[^"#?]*)/g)) if (!/\.(ico|png|svg|txt|xml)$/.test(h) && !h.startsWith("/_next") && !h.startsWith("/go/") && !seen.has(h)) todo.push(h);
    const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "";
    const desc = /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? "";
    const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
    const canon = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1];
    if (!title) issues.push([p, "missing title"]); else if (title.length > 70) issues.push([p, `title ${title.length} chars`]);
    if (!desc) issues.push([p, "missing meta description"]); else if (desc.length > 170) issues.push([p, `description ${desc.length} chars`]);
    if (h1 !== 1) issues.push([p, `${h1} H1s`]);
    if (!canon) issues.push([p, "missing canonical"]); else if (!canon.endsWith(p)) issues.push([p, `canonical mismatch ${canon}`]);
    for (const [, j] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(j); } catch { issues.push([p, "invalid JSON-LD"]); } }
    if (title) titles.set(title, [...(titles.get(title) ?? []), p]);
  }
  for (const [t, ps] of titles) if (ps.length > 1) issues.push([ps.join(", "), `duplicate title "${t}"`]);
  console.log(`audited ${seen.size} pages, ${issues.length} issues`);
  const byKind = {}; for (const [p, k] of issues) { const key = k.replace(/\d+/g, "N").replace(/".*"/, '"…"').replace(/mismatch .*/, "mismatch"); (byKind[key] ??= []).push(p); }
  for (const [k, ps] of Object.entries(byKind)) console.log(`- ${k}: ${ps.length} (e.g. ${ps.slice(0, 3).join(" | ")})`);
  if (issues.length) process.exitCode = 1;
} finally { srv.kill(); }
