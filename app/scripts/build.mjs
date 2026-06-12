// Build the static site into `dist/`:
//   1. optimize illustrations -> dist/images/gallery + manifest
//   2. inject the gallery + landing teaser into the HTML templates
//   3. copy hand-written assets (css/js/fonts/img)
//   4. emit SEO files (sitemap.xml, robots.txt) + social card
//
// No runtime framework: the output is plain HTML/CSS/JS served as-is.

import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { makeOgImage, processImages, writeManifest } from "./lib/images.mjs";
import { galleryHtml, teaserHtml } from "./lib/gallery-html.mjs";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");
const ILLUSTRATIONS = path.join(ROOT, "public/images/illustration");
const PROFILE = path.join(ROOT, "public/images/profile.jpg");

const SITE_URL = "https://jeremygautrais.fr";

async function injectTemplate(name, replacements) {
  let html = await readFile(path.join(SRC, name), "utf8");
  for (const [marker, value] of Object.entries(replacements)) {
    html = html.replace(marker, value);
  }
  await writeFile(path.join(DIST, name), html);
}

function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = ["/", "/gallery.html"]
    .map(
      (loc) =>
        `  <url><loc>${SITE_URL}${loc}</loc><lastmod>${today}</lastmod></url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function robotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

async function build() {
  const start = Date.now();
  // No full wipe: outputs are overwritten in place so the image pipeline can
  // skip already-encoded variants (fast incremental rebuilds). Docker builds
  // start from an empty context, so they always produce a clean dist anyway.
  await mkdir(DIST, { recursive: true });

  // 1. Images -> manifest
  const manifest = await processImages({
    sourceDir: ILLUSTRATIONS,
    outDir: path.join(DIST, "images/gallery"),
  });
  await writeManifest(manifest, path.join(DIST, "data/illustrations.json"));

  // 2. HTML templates
  await injectTemplate("gallery.html", { "<!-- GALLERY -->": galleryHtml(manifest) });
  await injectTemplate("index.html", { "<!-- TEASER -->": teaserHtml(manifest) });

  // 3. Static assets, standalone pages, favicon, profile picture
  await cp(path.join(SRC, "assets"), path.join(DIST, "assets"), { recursive: true });
  await cp(path.join(SRC, "404.html"), path.join(DIST, "404.html"));
  await cp(path.join(ROOT, "public/favicon.ico"), path.join(DIST, "favicon.ico"));
  await mkdir(path.join(DIST, "images"), { recursive: true });
  await cp(PROFILE, path.join(DIST, "images/profile.jpg"));

  // 4. SEO + social card (profile picture on a branded background)
  await makeOgImage({
    srcPath: PROFILE,
    outPath: path.join(DIST, "assets/img/og.jpg"),
  });
  await writeFile(path.join(DIST, "sitemap.xml"), sitemapXml());
  await writeFile(path.join(DIST, "robots.txt"), robotsTxt());

  console.log(`[build] done in ${((Date.now() - start) / 1000).toFixed(1)}s -> dist/`);
}

build().catch((error) => {
  console.error("[build] failed:", error);
  process.exit(1);
});
