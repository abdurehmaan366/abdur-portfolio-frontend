import { skills } from "./config.js";

import javascriptIcon from "../assets/icons/javascript.svg?raw";
import nodedotjsIcon from "../assets/icons/nodedotjs.svg?raw";
import expressIcon from "../assets/icons/express.svg?raw";
import mongodbIcon from "../assets/icons/mongodb.svg?raw";
import html5Icon from "../assets/icons/html5.svg?raw";
import cssIcon from "../assets/icons/css.svg?raw";
import ejsIcon from "../assets/icons/ejs.svg?raw";
import gitIcon from "../assets/icons/git.svg?raw";
import githubIcon from "../assets/icons/github.svg?raw";
import dockerIcon from "../assets/icons/docker.svg?raw";

const ICON_MAP = {
  javascript: javascriptIcon,
  nodedotjs: nodedotjsIcon,
  express: expressIcon,
  mongodb: mongodbIcon,
  html5: html5Icon,
  css: cssIcon,
  ejs: ejsIcon,
  git: gitIcon,
  github: githubIcon,
  docker: dockerIcon,
};

function renderItems() {
  return skills
    .map(
      (s) => `
      <div class="group flex items-center gap-2.5 pr-10 shrink-0 text-ink-60 cursor-default">
        <span class="w-5 h-5 transition-all duration-200 ease-out group-hover:scale-125 group-hover:text-accent [&>svg]:w-full [&>svg]:h-full">${ICON_MAP[s.icon] ?? ""}</span>
        <span class="font-mono text-sm whitespace-nowrap transition-colors duration-200 group-hover:text-accent">${s.name}</span>
      </div>`
    )
    .join("");
}

export function renderTechStrip() {
  const items = renderItems();
  return `
  <div class="border-y border-border bg-white overflow-hidden py-5">
    <div class="marquee-track flex w-max">
      <div class="flex">${items}</div>
      <div class="flex" aria-hidden="true">${items}</div>
    </div>
  </div>`;
}

export function mountTechStrip(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = renderTechStrip();
}
