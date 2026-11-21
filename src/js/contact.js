import { links } from "./config.js";

const items = [
  { label: "Email", value: links.email, href: `mailto:${links.email}` },
  { label: "LinkedIn", value: "linkedin.com/in/abdurrehman", href: links.linkedin },
  { label: "GitHub", value: "github.com/abdur-rehman", href: links.github },
];

const el = document.getElementById("contact-links");
if (el) {
  el.innerHTML = items
    .map(
      (item) => `
      <a href="${item.href}" target="_blank" rel="noopener noreferrer" class="liquid-card glass p-5 flex items-center justify-between group border border-white/10 hover:border-accent/40 transition-all duration-200">
        <div>
          <p class="text-xs eyebrow"><span class="status-dot mr-1.5"></span>${item.label}</p>
          <p class="text-sm mt-1.5 font-mono text-ink group-hover:text-accent transition-colors">${item.value}</p>
        </div>
        <span class="text-ink-40 group-hover:text-accent group-hover:translate-x-1 transition-all text-base">&rarr;</span>
      </a>`
    )
    .join("");
}
