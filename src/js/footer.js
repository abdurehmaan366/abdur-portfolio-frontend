import { links } from "./config.js";

export function renderFooter() {
  return `
  <footer class="border-t border-border">
    <div class="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div>
        <p class="font-display font-semibold">Abdur Rehman</p>
        <p class="eyebrow mt-1">backend engineering &middot; auth &amp; security</p>
      </div>

      <div class="flex items-center gap-5">
        <a href="mailto:${links.email}" class="btn-ghost">Email</a>
        <a href="${links.linkedin}" target="_blank" rel="noopener noreferrer" class="btn-ghost">LinkedIn</a>
        <a href="${links.github}" target="_blank" rel="noopener noreferrer" class="btn-ghost">GitHub</a>
      </div>
    </div>
    <div class="border-t border-border">
      <p class="mx-auto max-w-6xl px-5 sm:px-8 py-4 text-xs text-ink-40 font-mono">
        &copy; ${new Date().getFullYear()} Abdur Rehman. Built with Vite, Vanilla JS &amp; Tailwind CSS.
      </p>
    </div>
  </footer>`;
}

export function mountFooter() {
  const el = document.getElementById("footer");
  if (!el) return;
  el.innerHTML = renderFooter();
}
