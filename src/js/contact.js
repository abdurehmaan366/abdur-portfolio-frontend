import { links } from "./config.js";

const items = [
  { label: "Email", value: links.email, href: `mailto:${links.email}` },
  { label: "LinkedIn", value: "linkedin.com/in/…", href: links.linkedin },
  { label: "GitHub", value: "github.com/…", href: links.github },
];

const el = document.getElementById("contact-links");
if (el) {
  el.innerHTML = items
    .map(
      (item) => `
      <a href="${item.href}" target="_blank" rel="noopener noreferrer" class="card p-4 flex items-center justify-between group">
        <div>
          <p class="text-xs eyebrow">${item.label}</p>
          <p class="text-sm mt-1 font-medium">${item.value}</p>
        </div>
        <span class="text-ink-40 group-hover:text-accent transition-colors">&rarr;</span>
      </a>`
    )
    .join("");
}
