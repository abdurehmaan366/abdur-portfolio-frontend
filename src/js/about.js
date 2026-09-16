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

const grid = document.getElementById("skills-grid");
if (grid) {
  grid.innerHTML = skills
    .map(
      (s) => `
      <div class="group card flex flex-col items-center justify-center gap-2.5 py-6 px-3 text-center cursor-default transition-colors duration-200 hover:border-accent">
        <span class="w-7 h-7 text-ink transition-all duration-200 ease-out group-hover:scale-125 group-hover:text-accent [&>svg]:w-full [&>svg]:h-full">${ICON_MAP[s.icon] ?? ""}</span>
        <span class="text-sm font-medium transition-colors duration-200 group-hover:text-accent">${s.name}</span>
      </div>`
    )
    .join("");
}
