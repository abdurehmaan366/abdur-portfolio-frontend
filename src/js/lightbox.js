// Click-to-zoom lightbox.
// Any <img> with the `data-lightbox` attribute becomes clickable —
// clicking it opens an enlarged, centered overlay. Close via the
// × button, clicking the backdrop, or pressing Escape.

function buildOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "lightbox-overlay";
  overlay.className =
    "fixed inset-0 z-[100] hidden items-center justify-center p-4 sm:p-8 bg-ink/90 backdrop-blur-sm";
  overlay.innerHTML = `
    <button id="lightbox-close" aria-label="Close" class="absolute top-4 right-4 sm:top-6 sm:right-6 text-bg/80 hover:text-accent transition-colors">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <figure class="max-w-5xl w-full flex flex-col items-center gap-3">
      <img id="lightbox-img" src="" alt="" class="max-h-[85vh] w-auto max-w-full rounded-lg shadow-2xl" />
      <figcaption id="lightbox-caption" class="text-bg/70 text-sm font-mono text-center"></figcaption>
    </figure>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

export function initLightbox() {
  const triggers = document.querySelectorAll("img[data-lightbox]");
  if (!triggers.length) return;

  const overlay = buildOverlay();
  const imgEl = overlay.querySelector("#lightbox-img");
  const captionEl = overlay.querySelector("#lightbox-caption");
  const closeBtn = overlay.querySelector("#lightbox-close");

  function open(src, alt) {
    imgEl.src = src;
    imgEl.alt = alt;
    captionEl.textContent = alt;
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.add("hidden");
    overlay.classList.remove("flex");
    document.body.style.overflow = "";
    imgEl.src = "";
  }

  triggers.forEach((img) => {
    img.classList.add("cursor-zoom-in", "transition-transform", "duration-200", "hover:scale-[1.02]");
    img.addEventListener("click", () => open(img.src, img.alt));
  });

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}