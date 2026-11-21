import { links } from "./config.js";

const NAV_ITEMS = [
  { href: "/index.html", label: "Home" },
  { href: "/projects.html", label: "Projects" },
  { href: "/about.html", label: "About" },
  { href: "/contact.html", label: "Contact" },
];

export function renderNav(activeHref) {
  const cvButton = links.cv
    ? `<a href="${links.cv}" download class="liquid-button btn-secondary !py-1.5 !px-3.5 !text-xs sm:!text-sm glass">Download CV</a>`
    : `<span class="btn-secondary !py-1.5 !px-3.5 !text-xs sm:!text-sm opacity-40 cursor-not-allowed glass" title="CV coming soon">Download CV</span>`;

  const items = NAV_ITEMS.map((item) => {
    const isActive = item.href === activeHref;
    return `<a href="${item.href}" class="nav-item ${isActive ? "is-on" : ""}" data-href="${item.href}">${item.label}</a>`;
  }).join("");

  const mobileItems = NAV_ITEMS.map((item) => {
    const isActive = item.href === activeHref;
    return `<a href="${item.href}" class="block py-3 px-3 rounded-xl border-b border-white/5 nav-item ${isActive ? "is-on bg-accent/15 text-white" : "text-ink-60"}">${item.label}</a>`;
  }).join("");

  return `
  <div class="liquid-nav-container">
    <header class="mx-auto max-w-5xl liquid-nav-bar glass px-4 sm:px-6 py-2.5 flex flex-col transition-all duration-300">
      <div class="flex items-center justify-between">
        <a href="/index.html" class="flex items-center gap-2.5 font-display font-semibold text-base group">
          <span class="status-dot"></span>
          <span class="hidden sm:inline text-ink group-hover:text-accent transition-colors">Abdur Rehman</span>
          <span class="sm:hidden font-mono text-sm text-ink group-hover:text-accent transition-colors">&lt;AR/&gt;</span>
        </a>

        <!-- Dynamic Liquid Bubble Navigation (Sliding on Click) -->
        <nav id="nav-switcher" class="hidden md:flex items-center relative p-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
          <div id="nav-indicator" class="nav-indicator glass" glass></div>
          ${items}
        </nav>

        <div class="hidden md:flex items-center gap-2.5">
          ${cvButton}
          <a href="/contact.html" class="liquid-button btn-primary !py-1.5 !px-4 !text-xs sm:!text-sm glass">Get in Touch</a>
        </div>

        <button id="nav-toggle" aria-label="Toggle menu" aria-expanded="false" class="md:hidden p-2 -mr-1 text-ink-60 hover:text-ink transition-colors">
          <svg id="nav-icon-open" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          <svg id="nav-icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="hidden"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div id="mobile-menu" class="hidden md:hidden border-t border-border/60 mt-3 pt-3 pb-2 flex flex-col gap-2">
        ${mobileItems}
        <div class="flex flex-col gap-2.5 pt-3 border-t border-border/40">
          ${cvButton}
          <a href="/contact.html" class="liquid-button btn-primary justify-center !py-2.5 glass">Get in Touch</a>
        </div>
      </div>
    </header>
  </div>`;
}

export function mountNav(activeHref) {
  const el = document.getElementById("nav");
  if (!el) return;
  el.innerHTML = renderNav(activeHref);

  const switcher = document.getElementById("nav-switcher");
  const indicator = document.getElementById("nav-indicator");

  if (switcher && indicator) {
    const navItems = [...switcher.querySelectorAll(".nav-item")];

    const place = (targetItem, animate = true) => {
      if (!targetItem) return;
      indicator.classList.toggle("ease", animate);
      indicator.style.left = `${targetItem.offsetLeft}px`;
      indicator.style.width = `${targetItem.offsetWidth}px`;
    };

    const activeItem = switcher.querySelector(".nav-item.is-on") || navItems[0];
    
    // Position cleanly at current page on initial load
    requestAnimationFrame(() => {
      place(activeItem, false);
      // Ready .ease for dynamic on-click animation
      setTimeout(() => indicator.classList.add("ease"), 80);
    });

    // ON CLICK ONLY: Navigation bubble slides dynamically when a link is clicked
    navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        const href = item.getAttribute("href");
        if (!href) return;

        // If clicking the current tab, perform a liquid bounce pulse without reload
        if (item.classList.contains("is-on")) {
          indicator.style.transform = "scale(1.1)";
          setTimeout(() => {
            indicator.style.transform = "";
          }, 240);
          return;
        }

        e.preventDefault();
        navItems.forEach((other) => other.classList.remove("is-on"));
        item.classList.add("is-on");

        // Dynamically slide the liquid bubble to clicked tab with stretch & bounce
        place(item, true);

        // Apple formula: let the liquid bounce animate, then navigate
        setTimeout(() => {
          window.location.href = href;
        }, 340);
      });
    });

    window.addEventListener("resize", () => {
      const currentActive = switcher.querySelector(".nav-item.is-on") || navItems[0];
      place(currentActive, false);
    });
  }

  // Mobile drawer toggle
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
