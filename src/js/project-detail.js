import { getProjectBySlug } from "./config.js";
import { renderLinkBadge } from "./repo-badge.js";
import { initLightbox } from "./lightbox.js";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const project = getProjectBySlug(slug);

const detailEl = document.getElementById("project-detail");
const notFoundEl = document.getElementById("project-not-found");

if (!project) {
  notFoundEl.classList.remove("hidden");
} else {
  document.getElementById("page-title").textContent = `${project.name} — Abdur Rehman`;
  document.getElementById("page-description").setAttribute("content", project.tagline);

  const galleryHtml = project.gallery
    .map(
      (img) => `
      <figure class="group">
        <div class="rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/40">
          <img src="${img.src}" alt="${img.alt}" data-lightbox class="cursor-pointer w-full transition-transform duration-300 group-hover:scale-[1.02]" />
        </div>
        <figcaption class="text-xs text-ink-40 font-mono mt-2.5 px-1">${img.caption}</figcaption>
      </figure>`
    )
    .join("");

  const techHtml = project.tech.map((t) => `<span class="tag">${t}</span>`).join("");

  const bugSectionHtml =
    project.bugWriteup !== undefined
      ? `
      <div class="p-7 sm:p-10 border-t border-white/10 bg-black/25">
        <p class="eyebrow mb-4"><span class="status-dot mr-2"></span>the session isolation bug</p>
        ${
          project.bugWriteup
            ? `<p class="leading-relaxed text-ink-60">${project.bugWriteup}</p>`
            : `<div class="placeholder-block p-6 leading-relaxed">
                TODO — write up the multi-user session bug here: what happened, how you found it,
                what the fix was, and why it matters.
              </div>`
        }
        <div class="grid sm:grid-cols-2 gap-4 mt-6">
          <div class="placeholder-block p-5 border border-white/10 bg-white/[0.02]">
            <p class="text-xs font-mono text-red-400 mb-2">// before</p>
            ${project.bugCodeBefore ? `<pre class="whitespace-pre-wrap font-mono text-xs text-ink-60">${project.bugCodeBefore}</pre>` : "<span class='text-ink-40 text-xs'>TODO — paste the buggy code snippet here.</span>"}
          </div>
          <div class="placeholder-block p-5 border border-white/10 bg-white/[0.02]">
            <p class="text-xs font-mono text-accent mb-2">// after</p>
            ${project.bugCodeAfter ? `<pre class="whitespace-pre-wrap font-mono text-xs text-ink-60">${project.bugCodeAfter}</pre>` : "<span class='text-ink-40 text-xs'>TODO — paste the fixed code snippet here.</span>"}
          </div>
        </div>
      </div>`
      : "";

  detailEl.innerHTML = `
    <section class="mx-auto max-w-6xl px-5 sm:px-8 pt-8 pb-4">
      <a href="/projects.html" class="btn-ghost mb-6 inline-flex">&larr; Back to Projects</a>
      <div class="flex flex-wrap items-center justify-between gap-4 mb-2">
        <h1 class="font-display font-semibold text-3xl sm:text-5xl text-ink">${project.name}</h1>
        <div class="flex gap-2.5">
          <span id="detail-github-badge"></span>
          <span id="detail-demo-badge"></span>
        </div>
      </div>
      <p class="text-ink-60 text-lg mt-2 max-w-2xl">${project.tagline}</p>
      <div class="flex flex-wrap gap-2 mt-5">
        ${techHtml}
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 sm:px-8 py-8">
      <div class="liquid-card glass overflow-hidden border border-white/12">
        <div class="p-7 sm:p-10">
          <h2 class="font-display font-semibold text-xl mb-4 text-ink">Overview</h2>
          <p class="text-ink-60 leading-relaxed text-base max-w-3xl">${project.description}</p>
        </div>

        ${bugSectionHtml}

        <div class="p-7 sm:p-10 border-t border-white/10">
          <h2 class="font-display font-semibold text-xl mb-6 text-ink">Screenshots</h2>
          <div class="grid sm:grid-cols-2 gap-6">
            ${galleryHtml}
          </div>
        </div>
      </div>
    </section>`;

  const githubBadgeEl = document.getElementById("detail-github-badge");
  const demoBadgeEl = document.getElementById("detail-demo-badge");
  if (githubBadgeEl) githubBadgeEl.outerHTML = renderLinkBadge("GitHub", project.github);
  if (demoBadgeEl) demoBadgeEl.outerHTML = renderLinkBadge("Live Demo", project.demo);

  initLightbox();
}
