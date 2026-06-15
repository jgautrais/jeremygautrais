# jeremygautrais.fr

Personal portfolio.

Plain HTML, CSS and JavaScript — no runtime framework. A small Node build step
optimizes the images and assembles the pages into a static site.

## How it works

- `app/src/` holds the hand-written pages (`index.html`, `gallery.html`) and
  assets (CSS, JS, self-hosted fonts).
- `app/scripts/build.mjs` produces `app/dist/`:
  1. resizes each illustration in `app/public/images/illustration/` into
     responsive `avif` / `webp` / `jpg` variants (thumbnail + full) plus a tiny
     blurred placeholder, using [sharp];
  2. injects the gallery and landing teaser into the HTML from the generated
     image manifest;
  3. copies assets and writes `sitemap.xml`, `robots.txt` and the social card.

The gallery is in the static HTML. JavaScript only adds filtering and the lightbox.

## Develop

```bash
cd app
npm install
npm run fonts   # one-off: download the self-hosted fonts
npm run dev     # build + serve at http://localhost:4321 + rebuild on change
```

| Command         | Description                                        |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Build, serve on port 4321, rebuild on file changes |
| `npm run build` | Generate the static site into `app/dist/`          |
| `npm run fonts` | Download the self-hosted woff2 fonts               |

Adding an illustration: drop the file in `app/public/images/illustration/`
(named `category-NNN_some_title.jpg`, e.g. `voxel-068_new_scene.jpg`) and run
`npm run build`. Variants are cached, so rebuilds are incremental.

## Deploy

Docker multi-stage build, served by Nginx behind Traefik.

```bash
docker compose up -d            # local stack at http://jeremygautrais.localhost
```

Dockerfile targets:

- **local** — dev server with rebuild-on-change (port 4321)
- **release** — static site built and served via Nginx (port 80)

[sharp]: https://sharp.pixelplumbing.com/
