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
      <figure>
        <img src="${img.src}" alt="${img.alt}" data-lightbox class="rounded-lg border border-border w-full" />
        <figcaption class="text-xs text-ink-40 font-mono mt-2">${img.caption}</figcaption>
      </figure>`
    )
    .join("");

  const techHtml = project.tech.map((t) => `<span class="tag">${t}</span>`).join("");

  // Only Pantry Inventory currently carries the bug-writeup fields —
  // any future project with the same fields will automatically get this section too.
  const bugSectionHtml =
    project.bugWriteup !== undefined
      ? `
      <div class="p-7 sm:p-10 border-t border-border">
        <p class="eyebrow mb-4">the session isolation bug</p>
        ${
          project.bugWriteup
            ? `<p class="leading-relaxed">${project.bugWriteup}</p>`
            : `<div class="placeholder-block p-6 leading-relaxed">
                TODO — write up the multi-user session bug here: what happened, how you found it,
                what the fix was, and why it matters.
              </div>`
        }
        <div class="grid sm:grid-cols-2 gap-4 mt-5">
          <div class="placeholder-block p-5">
            <p class="text-xs font-mono text-ink-60 mb-2">// before</p>
            ${project.bugCodeBefore ? `<pre class="whitespace-pre-wrap">${project.bugCodeBefore}</pre>` : "TODO — paste the buggy code snippet here."}
          </div>
          <div class="placeholder-block p-5">
            <p class="text-xs font-mono text-ink-60 mb-2">// after</p>
            ${project.bugCodeAfter ? `<pre class="whitespace-pre-wrap">${project.bugCodeAfter}</pre>` : "TODO — paste the fixed code snippet here."}
          </div>
        </div>
      </div>`
      : "";

  detailEl.innerHTML = `
    <section class="mx-auto max-w-6xl px-5 sm:px-8 pt-10 pb-4">
      <a href="/projects.html" class="btn-ghost">&larr; Back to Projects</a>
    </section>

    <section class="mx-auto max-w-6xl px-5 sm:px-8 pb-14 sm:pb-20">
      <div class="card overflow-hidden">
        <div class="p-7 sm:p-10 border-b border-border">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span class="eyebrow">project</span>
            <div class="flex gap-2">
              <span id="detail-github-badge"></span>
              <span id="detail-demo-badge"></span>
            </div>
          </div>
          <h1 class="font-display font-semibold text-2xl sm:text-3xl">${project.name}</h1>
          <p class="text-ink-60 mt-3 max-w-2xl leading-relaxed">${project.description}</p>
          <div class="flex flex-wrap gap-2 mt-5">${techHtml}</div>
        </div>

        <div class="p-7 sm:p-10 border-b border-border">
          <img src="${project.mainImage}" alt="${project.name}" data-lightbox class="rounded-lg border border-border w-full" />
        </div>

        ${
          project.gallery.length > 0
            ? `<div class="p-7 sm:p-10 border-b border-border">
                <p class="eyebrow mb-4">screenshots</p>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">${galleryHtml}</div>
              </div>`
            : ""
        }

        ${bugSectionHtml}
      </div>
    </section>
  `;

  // Mount link badges now that the DOM nodes exist
  const badgeEl = document.getElementById("detail-github-badge");
  const demoEl = document.getElementById("detail-demo-badge");
  if (badgeEl) badgeEl.outerHTML = renderLinkBadge("GitHub", project.github);
  if (demoEl) demoEl.outerHTML = renderLinkBadge("Demo", project.demo);

  // Images were inserted after main.js's initial lightbox pass (which found
  // nothing on this page yet) — re-run it now that real images exist.
  initLightbox();
}
