// Download the self-hosted woff2 fonts (latin subset) from the Fontsource CDN
// into src/assets/fonts. Run once: `npm run fonts`. The files are committed so
// the build/runtime never depends on the network.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const OUT = path.join(ROOT, "src/assets/fonts");
const CDN = "https://cdn.jsdelivr.net/fontsource/fonts";

// family@version/subset-weight-style.woff2
const FONTS = [
  { family: "inter", weight: 400, file: "inter-400.woff2" },
  { family: "inter", weight: 600, file: "inter-600.woff2" },
  { family: "bricolage-grotesque", weight: 700, file: "bricolage-700.woff2" },
  { family: "bricolage-grotesque", weight: 800, file: "bricolage-800.woff2" },
];

async function download({ family, weight, file }) {
  const url = `${CDN}/${family}@latest/latin-${weight}-normal.woff2`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(OUT, file), buffer);
  console.log(`[fonts] ${file} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

await mkdir(OUT, { recursive: true });
for (const font of FONTS) await download(font);
console.log("[fonts] done");
