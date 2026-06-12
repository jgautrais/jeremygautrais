// Progressive enhancement for the gallery: category filtering and a native
// <dialog> lightbox with keyboard navigation. Without JS the grid still works
// and every tile links straight to its full-size image.

const grid = document.querySelector(".grid");
const filters = document.querySelectorAll(".filter");
const dialog = document.querySelector(".lightbox");

if (grid && dialog) {
  const tiles = Array.from(grid.querySelectorAll(".tile"));
  const stageImg = dialog.querySelector(".lightbox__stage img");
  const sourceAvif = dialog.querySelector(".lightbox__stage source[type='image/avif']");
  const sourceWebp = dialog.querySelector(".lightbox__stage source[type='image/webp']");
  const caption = dialog.querySelector(".lightbox__caption");

  let visible = tiles; // tiles matching the active filter
  let index = 0; // position within `visible`

  // ---- Masonry layout ----
  // Items flow row-major (left to right). We turn the plain grid into a
  // staggered masonry by giving each tile a row span computed from its aspect
  // ratio, so reading order stays horizontal: 30 29 28 across the top row.
  grid.classList.add("grid--masonry");
  const gridStyles = getComputedStyle(grid);

  function layout() {
    const rowUnit = parseFloat(gridStyles.gridAutoRows) || 8;
    const rowGap = parseFloat(gridStyles.rowGap) || 0;
    for (const tile of tiles) {
      if (tile.hidden) continue;
      const link = tile.querySelector(".tile__link");
      const ratio = link.dataset.height / link.dataset.width;
      const height = tile.getBoundingClientRect().width * ratio;
      const span = Math.ceil((height + rowGap) / (rowUnit + rowGap));
      tile.style.gridRowEnd = `span ${span}`;
    }
  }

  let frame;
  function scheduleLayout() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(layout);
  }
  window.addEventListener("resize", scheduleLayout);

  // ---- Filtering ----
  function applyFilter(category) {
    visible = tiles.filter((tile) => {
      const match = category === "all" || tile.dataset.category === category;
      tile.hidden = !match;
      return match;
    });
    layout();
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      applyFilter(button.dataset.filter);
    });
  });

  // ---- Lightbox ----
  function show(i) {
    index = (i + visible.length) % visible.length;
    const link = visible[index].querySelector(".tile__link");
    // Update the <picture> sources so the browser picks avif/webp/jpg by support.
    sourceAvif.srcset = link.dataset.avif;
    sourceWebp.srcset = link.dataset.webp;
    stageImg.src = link.dataset.jpg;
    stageImg.alt = link.dataset.title;
    caption.textContent = link.dataset.title;
  }

  function open(i) {
    show(i);
    if (!dialog.open) dialog.showModal();
  }

  grid.addEventListener("click", (event) => {
    const link = event.target.closest(".tile__link");
    if (!link) return;
    event.preventDefault();
    const tile = link.closest(".tile");
    const i = visible.indexOf(tile);
    if (i !== -1) open(i);
  });

  dialog.querySelector(".lightbox__btn--prev").addEventListener("click", () => show(index - 1));
  dialog.querySelector(".lightbox__btn--next").addEventListener("click", () => show(index + 1));
  dialog.querySelector(".lightbox__close").addEventListener("click", () => dialog.close());

  // Click anywhere outside the image (dark area, backdrop) closes it. Clicks on
  // the image itself or on a control button are ignored.
  dialog.addEventListener("click", (event) => {
    if (event.target !== stageImg && !event.target.closest("button")) dialog.close();
  });

  document.addEventListener("keydown", (event) => {
    if (!dialog.open) return;
    if (event.key === "ArrowLeft") show(index - 1);
    if (event.key === "ArrowRight") show(index + 1);
  });

  // Initial masonry pass once the DOM is ready.
  layout();
}
