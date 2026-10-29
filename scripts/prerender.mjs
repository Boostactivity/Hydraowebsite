// Pré-rendu des pages du sitemap (29/10/2026) : le site est une appli React côté client. Toutes les adresses
// renvoyaient le même index.html (même titre, pas de canonique), et Google ne connaissait que l'accueil
// (18 pages sur 19 « inconnues »). Ce script ouvre chaque page du sitemap dans Chrome sans interface,
// une fois le JavaScript exécuté, et enregistre le HTML final (titre, description, canonique, texte)
// dans prerender/<page>/index.html. Le serveur sert ce fichier, puis React prend le relais.
//   node scripts/prerender.mjs [https://hydral-kitchen.fr]     (CHROME=chemin de chrome si besoin)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const BASE = process.argv[2] ?? "https://hydral-kitchen.fr";
const CHROME = process.env.CHROME ?? [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/chromium", "/usr/bin/google-chrome",
].find((p) => fs.existsSync(p));
if (!CHROME) throw new Error("Chrome introuvable (variable CHROME)");

const sitemap = fs.readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const pages = [...sitemap.matchAll(/<loc>https?:\/\/[^/<]+(\/[^<]*)<\/loc>/g)].map((m) => m[1] || "/");
fs.rmSync("prerender", { recursive: true, force: true });

for (const p of pages) {
  const html = execFileSync(CHROME, ["--headless=new", `--user-data-dir=${path.join(os.tmpdir(), "prerender-chrome")}`, "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
    "--window-size=1366,2400", "--virtual-time-budget=15000", "--dump-dom", BASE + p], { encoding: "utf8", maxBuffer: 64 << 20 });
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const canon = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  const texte = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  if (!canon.endsWith(p === "/" ? "/" : p) && canon !== BASE + p) console.warn(`  ⚠ ${p} : canonique ${canon}`);
  const out = path.join("prerender", p === "/" ? "" : p, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, "<!DOCTYPE html>\n" + html);
  console.log(`${p.padEnd(18)} ${String(texte).padStart(5)} mots  ${title}`);
}
