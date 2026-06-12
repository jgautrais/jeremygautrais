// Image pipeline: turn each source illustration into optimized, responsive
// variants (thumbnail + full screen, in avif/webp/jpg) plus a tiny blurred
// placeholder (LQIP). Returns a manifest consumed by the gallery generator.
//
// The deployed site only ever loads the lightweight thumbnails; the full
// variant is fetched on demand when the lightbox opens.

import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

import { parseFilename } from "./slug.mjs";

const THUMB_WIDTH = 700;
const FULL_WIDTH = 1600;
const LQIP_WIDTH = 24;

// One encoder config per output format. `ext` is the file extension.
const FORMATS = [
  { ext: "avif", apply: (img, q) => img.avif({ quality: q.avif }) },
  { ext: "webp", apply: (img, q) => img.webp({ quality: q.webp }) },
  { ext: "jpg", apply: (img, q) => img.jpeg({ quality: q.jpg, mozjpeg: true }) },
];

const QUALITY = { avif: 52, webp: 74, jpg: 80 };

// Encode a single variant (one size + one format), skipping work when the
// output already exists and is newer than the source.
async function encodeVariant(srcPath, srcMtime, outDir, id, variant, width, format) {
  const fileName = `${id}-${variant}.${format.ext}`;
  const outPath = path.join(outDir, fileName);

  if (existsSync(outPath)) {
    const outMtime = (await stat(outPath)).mtimeMs;
    if (outMtime >= srcMtime) return `/images/gallery/${fileName}`;
  }

  const pipeline = sharp(srcPath).resize({ width, withoutEnlargement: true });
  await format.apply(pipeline, QUALITY).toFile(outPath);
  return `/images/gallery/${fileName}`;
}

// Build all variants of a given size, returning { avif, webp, jpg } web paths.
async function encodeSize(srcPath, srcMtime, outDir, id, variant, width) {
  const out = {};
  for (const format of FORMATS) {
    out[format.ext] = await encodeVariant(srcPath, srcMtime, outDir, id, variant, width, format);
  }
  return out;
}

// Tiny blurred preview inlined as a data URI for instant placeholders.
async function makeLqip(srcPath) {
  const buffer = await sharp(srcPath)
    .resize({ width: LQIP_WIDTH })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

// Process every illustration in `sourceDir` into `outDir`, returning a sorted
// manifest array.
export async function processImages({ sourceDir, outDir }) {
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(sourceDir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  const manifest = [];

  for (const file of files) {
    const parsed = parseFilename(file);
    if (!parsed) {
      console.warn(`[images] skipping unrecognized filename: ${file}`);
      continue;
    }

    const srcPath = path.join(sourceDir, file);
    const srcMtime = (await stat(srcPath)).mtimeMs;
    const meta = await sharp(srcPath).metadata();

    const thumb = await encodeSize(srcPath, srcMtime, outDir, parsed.id, "thumb", THUMB_WIDTH);
    const full = await encodeSize(srcPath, srcMtime, outDir, parsed.id, "full", FULL_WIDTH);
    const lqip = await makeLqip(srcPath);

    manifest.push({
      id: parsed.id,
      category: parsed.category,
      title: parsed.title,
      width: meta.width,
      height: meta.height,
      thumb,
      full,
      lqip,
    });
  }

  // Newest first: sort by name descending (higher numbers are more recent).
  manifest.sort((a, b) => b.id.localeCompare(a.id, "en", { numeric: true }));
  console.log(`[images] processed ${manifest.length} illustrations`);
  return manifest;
}

// Generate a 1200x630 social card: the source image centered on a solid
// branded background. Using "inside" keeps a small source (e.g. the profile
// picture) from being heavily upscaled and stretched.
export async function makeOgImage({ srcPath, outPath, background = "#faf9f6" }) {
  await mkdir(path.dirname(outPath), { recursive: true });
  const photo = await sharp(srcPath).resize({ height: 440, fit: "inside" }).toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 3, background } })
    .composite([{ input: photo, gravity: "centre" }])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(outPath);
}

export async function writeManifest(manifest, outPath) {
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, JSON.stringify(manifest, null, 2));
}
