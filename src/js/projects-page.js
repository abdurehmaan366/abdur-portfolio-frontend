import { projectList } from "./config.js";
import { renderLinkBadge } from "./repo-badge.js";

const featuredEl = document.getElementById("featured-projects");
const otherEl = document.getElementById("other-projects");

function featuredCardHtml(project) {
  return `
    <section id="${project.slug}" class="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20 scroll-mt-20">
      <div class="card overflow-hidden">
        <div class="p-7 sm:p-10 border-b border-border">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span class="eyebrow">featured project</span>
            <div class="flex gap-2">
              <span id="${project.slug}-github-badge"></span>
              <span id="${project.slug}-demo-badge"></span>
            </div>
          </div>
          <h2 class="font-display font-semibold text-2xl sm:text-3xl">${project.name}</h2>
          <p class="text-ink-60 mt-3 max-w-2xl leading-relaxed">${project.description}</p>
          <div class="flex flex-wrap gap-2 mt-5">
            ${project.tech.map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>
        </div>
        <div class="p-7 sm:p-10">
          <img src="${project.mainImage}" alt="${project.name}" class="rounded-lg border border-border w-full" />
          <a href="/project.html?slug=${project.slug}" class="btn-primary mt-6 inline-flex">View Details</a>
        </div>
      </div>
    </section>`;
}

function cardHtml(project) {
  return `
    <div id="${project.slug}" class="card overflow-hidden scroll-mt-20">
      <img src="${project.mainImage}" alt="${project.name}" class="w-full aspect-[16/10] object-cover border-b border-border" />
      <div class="p-6">
        <div class="flex items-center justify-between gap-2 mb-2">
          <h3 class="font-display font-semibold text-lg">${project.name}</h3>
          <span id="${project.slug}-github-badge"></span>
        </div>
        <p class="text-ink-60 text-sm leading-relaxed">${project.tagline}</p>
        <div class="flex flex-wrap gap-2 mt-4">
          ${project.tech.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
        <a href="/project.html?slug=${project.slug}" class="btn-primary !py-2 !px-3.5 !text-sm mt-6 inline-flex">View Details</a>
      </div>
    </div>`;
}

const featured = projectList.filter((p) => p.featured);
const others = projectList.filter((p) => !p.featured);

if (featuredEl) featuredEl.innerHTML = featured.map(featuredCardHtml).join("");
if (otherEl) {
  otherEl.innerHTML =
    others.map(cardHtml).join("") +
    `<div class="card p-6 flex flex-col justify-center items-start gap-2 border-dashed">
      <span class="tag opacity-60">Coming soon</span>
      <h3 class="font-display font-semibold text-lg mt-1">FlyRank Backend AI Engineering Projects</h3>
      <p class="text-ink-60 text-sm leading-relaxed">
        Internship projects and capstone project from FlyRank will be added here once complete.
      </p>
    </div>`;
}

// Mount GitHub/Demo badges for every project, now that the DOM nodes exist
projectList.forEach((project) => {
  const githubEl = document.getElementById(`${project.slug}-github-badge`);
  const demoEl = document.getElementById(`${project.slug}-demo-badge`);
  if (githubEl) githubEl.outerHTML = renderLinkBadge("GitHub", project.github);
  if (demoEl) demoEl.outerHTML = renderLinkBadge("Demo", project.demo);
});
