# Abdur Rehman — Developer Portfolio

A fast, responsive, and minimalist developer portfolio built with **Vite**, **Vanilla JavaScript**, and **Tailwind CSS v4**. Modular by design — almost everything you'd want to change lives in one file.

> 🔗 **Part of a two-repo portfolio system.**
> Frontend → this repo
> Backend (chatbot API) → [portfolio-backend](https://github.com/abdurehmaan366/portfolio-backend)

![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Pending TODOs](#pending-todos)
- [License](#license)
- [Contact](#contact)

---

## 📜 Overview

This is the source code for my personal portfolio site. It showcases engineering case studies, project deep-dives, my background and skills, and an integrated chatbot that answers questions about my work. The site is multi-page, statically built, and designed to be fully customizable through a single config file.

---

## ✨ Features

- 📄 **Multi-page layout** — Home, Projects (case studies), About, and Contact, each as a separate HTML entry point
- ⚙️ **Single config file** — all personal details, links, and project data live in `src/js/config.js`; touch nothing else for most updates
- 🧩 **Shared components** — nav, footer, tech strip, and chatbot are modular JS files that mount themselves across pages
- 🤖 **Interactive chatbot** — answers visitor questions about projects and experience; connects to a separate backend API
- 🎨 **Inline SVG skill icons** — sourced from [Simple Icons](https://simpleicons.org/), they inherit your accent color on hover
- 🎞️ **Auto-scrolling tech strip** — animated skill badge banner on the home page
- 🖼️ **Lightbox gallery** — screenshot viewer on project case study pages
- 💨 **Tailwind CSS v4** — utility-first styling with design tokens defined in `src/style.css`
- 🔤 **Google Fonts** — Space Grotesk + Inter, loaded via CDN

---

## 🛠️ Tech Stack

| Layer | Tool |
|---|---|
| Build | [Vite 8.x](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite` |
| Language | Vanilla JavaScript (ES6 modules) |
| Icons | [Simple Icons](https://simpleicons.org/) (npm) |
| Typography | Google Fonts — Space Grotesk, Inter |

---

## 📁 Project Structure

```
├── index.html               # Home page
├── projects.html            # Projects & case studies
├── about.html               # Education, internship, skills, certifications
├── contact.html             # Contact form & links
├── vite.config.js           # Vite + multi-page entry points
├── package.json
└── src/
    ├── style.css            # Design tokens, font imports, shared component classes
    ├── js/
    │   ├── config.js        # ← Edit here: all links, content, and project data
    │   ├── main.js          # Global init entry point; mounts contact form handler
    │   ├── nav.js           # Responsive nav bar (mobile menu included)
    │   ├── footer.js        # Shared footer
    │   ├── tech-strip.js    # Auto-scrolling tech skills banner (Home)
    │   ├── about.js         # Skills grid renderer (About)
    │   ├── contact.js       # Contact links renderer
    │   ├── chatbot.js       # Chatbot widget; connects to backend via config.chat.apiUrl
    │   ├── lightbox.js      # Screenshot lightbox for project pages
    │   ├── project-detail.js# Dynamic project detail view
    │   ├── projects-page.js # Projects list renderer
    │   └── repo-badge.js    # GitHub star/fork badge fetcher
    └── assets/
        ├── cv/              # Your CV/resume PDF
        ├── certificates/    # Coursera and other credentials
        ├── icons/           # SVG skill icons
        └── images/          # Project screenshots and profile photo
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js v18+ and npm.

```bash
# 1. Clone the repo
git clone https://github.com/abdurehmaan366/portfolio-frontend.git
cd portfolio-frontend

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# → http://localhost:5173
```

**Available scripts:**

| Script | What it does |
|---|---|
| `npm run dev` | Starts Vite dev server with hot reload |
| `npm run build` | Production build → outputs to `/dist` |
| `npm run preview` | Preview the production build locally |

> 💬 **Chatbot:** The portfolio chatbot requires the backend server to be running. Clone and start [portfolio-backend](https://github.com/abdurehmaan366/portfolio-backend) separately — it listens on `http://localhost:3001` by default, which is what this frontend expects in dev.

---

## 🔧 Configuration

**Open `src/js/config.js` first.** It is the single source of truth for:

- Your name, role, and tagline displayed across the site
- Email, LinkedIn, GitHub, and CV links
- All project data — names, descriptions, tech stacks, GitHub repos, demo URLs, screenshots, and the session bug write-up for the Pantry Inventory case study
- Chatbot API URL (`chat.apiUrl`) — defaults to `http://localhost:3001/api/chat` for local dev; update to your deployed backend URL before going live

The "Download CV" button activates automatically once you drop a PDF into `public/cv/` and set `links.cv` to `/cv/abdur-rehman-cv.pdf` in config.

---

## 📝 Pending TODOs

The following are marked with `TODO` comments in the code or shown as dashed placeholder boxes on the live site:

1. **Session isolation bug write-up** (`projects.pantryInventory.bugWriteup` in `config.js`) — the centrepiece of the Pantry Inventory case study. A guided HTML comment structure is left above the placeholder in `projects.html`.
2. **Before/after code snippets** for the session bug fix (`bugCodeBefore` / `bugCodeAfter` in config).
3. **GitHub repo link** for Pantry Inventory (`projects.pantryInventory.github`).
4. **Live demo link** for Pantry Inventory, if deployed (`projects.pantryInventory.demo`).
5. **CV PDF** — add to `public/cv/` and confirm the path in `links.cv`.
6. **Certifications** — About page has a placeholder section ready.
7. **FlyRank internship details** — a placeholder card is already in `projects.html` for when these are ready to share.
8. **Chatbot backend URL** — update `chat.apiUrl` in config before deploying.
9. **Contact form backend** — currently shows a fallback message pointing to your email. Wire up a real submit handler in `src/js/main.js` when ready.

---

## 🔒 License

Copyright © 2026 Abdur Rehman. All rights reserved.

Source code is publicly available for review and learning purposes. Reusing the design, content, branding, or assets as your own portfolio is not permitted.

---

## ✉️ Contact

**Abdur Rehman**
[abdurrehman.se.work@gmail.com](mailto:abdurrehman.se.work@gmail.com) · [LinkedIn](https://linkedin.com/in/abdur-rehman-2b39a33b1) · [GitHub](https://github.com/abdurehmaan366)