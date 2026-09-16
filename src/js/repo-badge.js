// Renders a badge for a project link (GitHub repo, live demo, etc).
// If `url` is set, renders a real clickable link.
// If `url` is null/empty, renders a disabled "coming soon" badge instead.
// This is the single place that decides "link vs. coming soon" —
// every project card just calls this function rather than hardcoding either state.

export function renderLinkBadge(label, url) {
  if (url) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="tag hover:border-accent hover:text-accent transition-colors shrink-0">${label} &rarr;</a>`;
  }
  return `<span class="tag opacity-60 shrink-0">${label}: coming soon</span>`;
}

export function mountLinkBadge(elementId, label, url) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.outerHTML = renderLinkBadge(label, url);
}