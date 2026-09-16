import { links } from "./config.js";

const NAV_ITEMS = [
  { href: "/index.html", label: "Home" },
  { href: "/projects.html", label: "Projects" },
  { href: "/about.html", label: "About" },
  { href: "/contact.html", label: "Contact" },
];

export function renderNav(activeHref) {
  const cvButton = links.cv
    ? `<a href="${links.cv}" download class="btn-secondary !py-2 !px-3.5 !text-sm">Download CV</a>`
    : `<span class="btn-secondary !py-2 !px-3.5 !text-sm opacity-40 cursor-not-allowed" title="CV coming soon">Download CV</span>`;

  const items = NAV_ITEMS.map((item) => {
    const isActive = item.href === activeHref;
    return `<a href="${item.href}" class="nav-link ${isActive ? "active" : ""}">${item.label}</a>`;
  }).join("");

  const mobileItems = NAV_ITEMS.map((item) => {
    const isActive = item.href === activeHref;
    return `<a href="${item.href}" class="block py-3 border-b border-border nav-link ${isActive ? "active" : ""}">${item.label}</a>`;
  }).join("");

  return `
  <header class="sticky top-0 z-50 bg-bg/90 backdrop-blur border-b border-border">
    <div class="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
      <a href="/index.html" class="flex items-center gap-2 font-display font-semibold text-base">
        <span class="status-dot"></span>
        <span class="hidden md:inline">Abdur Rehman</span>
        <span class="md:hidden font-mono">&lt;AR/&gt;</span>
      </a>

      <nav class="hidden md:flex items-center gap-8">
        ${items}
      </nav>

      <div class="hidden md:flex items-center gap-3">
        ${cvButton}
        <a href="/contact.html" class="btn-primary !py-2 !px-3.5 !text-sm">Get in Touch</a>
      </div>

      <button id="nav-toggle" aria-label="Toggle menu" aria-expanded="false" class="md:hidden p-2 -mr-2">
        <svg id="nav-icon-open" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <svg id="nav-icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="hidden"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <div id="mobile-menu" class="hidden md:hidden border-t border-border px-5 sm:px-8 pb-4">
      ${mobileItems}
      <div class="flex flex-col gap-3 pt-4">
        ${cvButton}
        <a href="/contact.html" class="btn-primary justify-center">Get in Touch</a>
      </div>
    </div>
  </header>`;
}

export function mountNav(activeHref) {
  const el = document.getElementById("nav");
  if (!el) return;
  el.innerHTML = renderNav(activeHref);

  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("nav-icon-open");
  const iconClose = document.getElementById("nav-icon-close");

  toggle?.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden");
    iconOpen.classList.toggle("hidden");
    iconClose.classList.toggle("hidden");
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });
}
