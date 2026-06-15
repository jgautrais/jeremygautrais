// Turn the image manifest into static HTML. Cards are injected at build time
// so the gallery is fully present in the served HTML (good for SEO and works
// without JavaScript). JS only enhances: filtering and the lightbox.

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// One gallery tile. The wrapping <a> points at the full jpg so the image is
// reachable without JS; gallery.js intercepts the click to open the lightbox.
function tileHtml(item) {
  const alt = escapeHtml(`${item.title} — ${item.category} artwork by Jérémy Gautrais`);
  const title = escapeHtml(item.title);

  return `
      <figure class="tile" data-category="${item.category}">
        <a class="tile__link" href="${item.full.jpg}"
           data-avif="${item.full.avif}" data-webp="${item.full.webp}" data-jpg="${item.full.jpg}"
           data-title="${title}" data-width="${item.width}" data-height="${item.height}">
          <picture>
            <source type="image/avif" srcset="${item.thumb.avif}" />
            <source type="image/webp" srcset="${item.thumb.webp}" />
            <img class="tile__img" src="${item.thumb.jpg}" alt="${alt}"
                 width="${item.width}" height="${item.height}"
                 loading="lazy" decoding="async"
                 style="background-image:url(${item.lqip})" />
          </picture>
        </a>
        <figcaption class="tile__caption">${title}</figcaption>
      </figure>`;
}

export function galleryHtml(manifest) {
  return manifest.map(tileHtml).join("\n");
}

// Curated selection for the landing teaser: the most recent voxel (computed,
// so it follows new uploads) followed by a fixed hand-picked set.
const TEASER_FIXED = ["voxel-054", "voxel-052", "voxel-029", "vector-009", "vector-001"];

export function teaserHtml(manifest) {
  const byId = new Map(manifest.map((item) => [item.id, item]));
  // Manifest is sorted newest-first, so the first voxel is the latest one.
  const latestVoxel = manifest.find((item) => item.category === "voxel");

  const picks = [latestVoxel, ...TEASER_FIXED.map((id) => byId.get(id))].filter(Boolean);

  return picks
    .map((item) => {
      const alt = escapeHtml(`${item.title} — ${item.category} artwork`);
      return `
        <a class="teaser__item" href="/gallery.html" aria-label="${escapeHtml(item.title)}">
          <picture>
            <source type="image/avif" srcset="${item.thumb.avif}" />
            <source type="image/webp" srcset="${item.thumb.webp}" />
            <img src="${item.thumb.jpg}" alt="${alt}" width="${item.width}" height="${item.height}"
                 loading="lazy" decoding="async" style="background-image:url(${item.lqip})" />
          </picture>
        </a>`;
    })
    .join("\n");
}
