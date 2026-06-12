// Minimal dev server: build once, serve `dist/` over HTTP, and rebuild when a
// source file changes. No framework, just node:http + fs.watch.

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { watch } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const DIST = path.join(ROOT, "dist");
const SRC = path.join(ROOT, "src");
const PORT = 4321;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

function runBuild() {
  return new Promise((resolve) => {
    const child = spawn("node", [path.join(ROOT, "scripts/build.mjs")], { stdio: "inherit" });
    child.on("exit", resolve);
  });
}

async function serveFile(res, filePath) {
  try {
    const info = await stat(filePath);
    const target = info.isDirectory() ? path.join(filePath, "index.html") : filePath;
    const body = await readFile(target);
    res.writeHead(200, { "content-type": MIME[path.extname(target)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Not found");
  }
}

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  serveFile(res, path.join(DIST, urlPath));
});

let rebuilding = false;
function scheduleRebuild() {
  if (rebuilding) return;
  rebuilding = true;
  setTimeout(async () => {
    await runBuild();
    rebuilding = false;
  }, 100);
}

await runBuild();
server.listen(PORT, () => console.log(`[dev] http://localhost:${PORT}`));
watch(SRC, { recursive: true }, scheduleRebuild);
