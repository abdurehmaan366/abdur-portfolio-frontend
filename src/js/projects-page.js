import { projectList } from "./config.js";
import { renderLinkBadge } from "./repo-badge.js";

const featuredEl = document.getElementById("featured-projects");
const otherEl = document.getElementById("other-projects");

function featuredCardHtml(project) {
  return `
    <section id="${project.slug}" class="mx-auto max-w-6xl px-5 sm:px-8 py-12 sm:py-16 scroll-mt-24">
      <div class="liquid-card glass overflow-hidden border border-white/12">
        <div class="p-7 sm:p-10 border-b border-white/10 bg-white/[0.01]">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span class="eyebrow"><span class="status-dot mr-2"></span>featured project</span>
            <div class="flex gap-2">
              <span id="${project.slug}-github-badge"></span>
              <span id="${project.slug}-demo-badge"></span>
            </div>
          </div>
          <h2 class="font-display font-semibold text-2xl sm:text-3xl text-ink">${project.name}</h2>
          <p class="text-ink-60 mt-3 max-w-2xl leading-relaxed">${project.description}</p>
          <div class="flex flex-wrap gap-2 mt-5">
            ${project.tech.map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>
        </div>
        <div class="p-7 sm:p-10 bg-black/20">
          <div class="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <img src="${project.mainImage}" alt="${project.name}" class="w-full object-cover transition-transform duration-500 hover:scale-[1.01]" />
          </div>
          <div class="mt-7 flex items-center gap-4">
            <a href="/project.html?slug=${project.slug}" class="liquid-button btn-primary">
              <span>View Case Study</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>`;
}

function cardHtml(project) {
  return `
    <div id="${project.slug}" class="liquid-card glass overflow-hidden scroll-mt-24 flex flex-col justify-between border border-white/12 group">
      <div>
        <div class="relative overflow-hidden border-b border-white/10 aspect-[16/10] bg-black/30">
          <img src="${project.mainImage}" alt="${project.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between gap-2 mb-2">
            <h3 class="font-display font-semibold text-lg text-ink">${project.name}</h3>
            <span id="${project.slug}-github-badge"></span>
          </div>
          <p class="text-ink-60 text-sm leading-relaxed">${project.tagline}</p>
          <div class="flex flex-wrap gap-1.5 mt-4">
            ${project.tech.map((t) => `<span class="tag text-xs">${t}</span>`).join("")}
          </div>
        </div>
      </div>
      <div class="p-6 pt-0">
        <a href="/project.html?slug=${project.slug}" class="liquid-button btn-secondary !py-2 !px-4 !text-xs w-full justify-center">View Details</a>
      </div>
    </div>`;
}

const featured = projectList.filter((p) => p.featured);
const others = projectList.filter((p) => !p.featured);

if (featuredEl) featuredEl.innerHTML = featured.map(featuredCardHtml).join("");
if (otherEl) {
  otherEl.innerHTML =
    others.map(cardHtml).join("") +
    `<div class="liquid-card glass p-7 flex flex-col justify-center items-start gap-3 border border-dashed border-white/20 bg-white/[0.02]">
      <span class="tag opacity-70">Coming soon</span>
      <h3 class="font-display font-semibold text-lg text-ink">FlyRank Backend AI Engineering Projects</h3>
      <p class="text-ink-60 text-sm leading-relaxed">
        Internship projects and capstone project from FlyRank will be added here once complete.
      </p>
    </div>`;
}

// Mount GitHub/Demo badges for every project
projectList.forEach((project) => {
  const githubEl = document.getElementById(`${project.slug}-github-badge`);
  const demoEl = document.getElementById(`${project.slug}-demo-badge`);
  if (githubEl) githubEl.outerHTML = renderLinkBadge("GitHub", project.github);
  if (demoEl) demoEl.outerHTML = renderLinkBadge("Demo", project.demo);
});
