# Abdur Rehman — Portfolio

Built with **Vite + Vanilla JS + Tailwind CSS v4**, following the content map and design system you provided.

## Running it locally

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build      # production build → outputs to /dist
npm run preview    # preview the production build
```

## Structure

```
index.html          Home
projects.html        Projects (Pantry Inventory case study + CRUD Todo API)
about.html            About (education, internship, skills, certifications)
contact.html          Contact (form + links)

src/
  style.css           Design tokens (fonts, colors) + shared component classes
  js/
    config.js          ← EDIT HERE: links, contact info, project data
    nav.js              Shared nav bar (mobile menu included)
    footer.js           Shared footer
    tech-strip.js       Auto-scrolling technologies strip (Home)
    about.js            Skills grid renderer
    contact.js          Contact links renderer
    main.js             Mounts everything + handles the contact form
  assets/
    icons/              Skill icons (from the open-source Simple Icons set)
    images/             Your uploaded screenshots + photo
```

## One place to edit almost everything

Open `src/js/config.js` first. It holds:

- Your email, LinkedIn, GitHub links (currently placeholders marked `TODO`)
- Your CV path — once you add a PDF to `src/assets/cv/`, update `links.cv` and the
  "Download CV" button will activate automatically on every page
- Project data for both Pantry Inventory and CRUD Todo API, including GitHub repo
  and live demo URLs (currently `null` — add them here when ready)

## Still needs your input

These are marked with `TODO` / dashed placeholder boxes directly in the site:

1. **The session isolation bug write-up** (`projects.html`, Pantry Inventory case study) —
   this is the centerpiece of your proof statement. A guided structure is left as an
   HTML comment right above the placeholder.
2. **Before/after code snippets** for that same fix.
3. **GitHub repo links** for both projects.
4. **Live demo link** for Pantry Inventory, if you deploy one.
5. **Your CV file** (for the Download CV button).
6. **Certifications** (About page).
7. **FlyRank internship project details** (About + Projects pages) — a placeholder
   card is already in place on the Projects page for when these are ready.
8. **Real email/LinkedIn/GitHub URLs** in `config.js`.

## Notes

- Skill icons come from the [Simple Icons](https://simpleicons.org/) open-source set (npm package),
  inlined as SVG so they pick up your accent color on hover states.
- Fonts are loaded from Google Fonts (Space Grotesk + Inter) via a CDN `@import` in `style.css`.
- The contact form isn't wired to a backend yet — it currently just shows a message
  pointing people to your email. Wire up a real submit handler in `src/js/main.js` when ready.
