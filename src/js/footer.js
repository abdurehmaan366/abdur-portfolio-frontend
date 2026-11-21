import { links } from "./config.js";

export function renderFooter() {
  return `
  <footer class="border-t border-white/10 mt-20 relative z-10 bg-black/40 backdrop-blur-md">
    <div class="mx-auto max-w-6xl px-5 sm:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div>
        <div class="flex items-center gap-2">
          <span class="status-dot"></span>
          <p class="font-display font-semibold text-ink">Abdur Rehman</p>
        </div>
        <p class="eyebrow mt-1.5 text-xs text-ink-60">backend engineering &middot; auth &amp; security</p>
      </div>

      <div class="flex items-center gap-4">
        <a href="mailto:${links.email}" class="btn-secondary !py-1.5 !px-3.5 !text-xs glass">Email</a>
        <a href="${links.linkedin}" target="_blank" rel="noopener noreferrer" class="btn-secondary !py-1.5 !px-3.5 !text-xs glass">LinkedIn</a>
        <a href="${links.github}" target="_blank" rel="noopener noreferrer" class="btn-secondary !py-1.5 !px-3.5 !text-xs glass">GitHub</a>
      </div>
    </div>
    <div class="border-t border-white/5">
      <div class="mx-auto max-w-6xl px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-40 font-mono">
        <p>&copy; ${new Date().getFullYear()} Abdur Rehman. Built with Vite, Vanilla JS &amp; Liquid Glass.</p>
        <p class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
          <span>System operational &bull; Available for roles</span>
        </p>
      </div>
    </div>
  </footer>`;
}

export function mountFooter() {
  const el = document.getElementById("footer");
  if (!el) return;
  el.innerHTML = renderFooter();
}
