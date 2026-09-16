// ─────────────────────────────────────────────────────────────
// EDIT ME: this file is the single place to update links, contact
// info, and project content. Adding a new project? Scroll to
// `projects` below and copy an existing entry as a template —
// the card grid and details page both render from this automatically.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Abdur Rehman",
  role: "Backend AI Engineering Intern",
  claim: "Secure Backend Systems with Reliable Authentication.",
  supporting:
    "I build backend systems that handle real user data safely — including a project where I found and fixed a multi-user session bug that let one account see another's data.",
  photo: "/images/profile/abdur-rehman.jpeg",
};

export const links = {
  email: "abdurrehman.se.work@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdur-rehman-2b39a33b1",
  github: "https://github.com/abdurehmaan366",
  cv: "/cv/abdur-rehman-cv.pdf",
};

export const skills = [
  { name: "JavaScript", icon: "javascript" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "Express.js", icon: "express" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "HTML5", icon: "html5" },
  { name: "CSS3", icon: "css" },
  { name: "EJS", icon: "ejs" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Docker", icon: "docker" },
];

// ─────────────────────────────────────────────────────────────
// PROJECTS — each key is one project. Fields:
//   slug          URL-safe id, used for the details page link:
//                 /project.html?slug=THIS_VALUE
//   featured      true = shows as the big card at the top of Projects page
//   mainImage     the ONE image shown on the card grid — keep this
//                 consistent in aspect ratio across projects so cards
//                 stay visually aligned
//   gallery       array of extra screenshots — these show ONLY on the
//                 project's details page, not on the card
// ─────────────────────────────────────────────────────────────
export const projects = {
  pantryInventory: {
    slug: "pantry-inventory",
    name: "Pantry Inventory",
    featured: true,
    tagline: "Session-based auth system with full CRUD pantry tracking.",
    description:
      "A pantry inventory manager built with Node.js, Express, MongoDB, and EJS. Users register, verify their email with a one-time code, log in with a session-based auth system, and manage pantry items — add, edit, delete, and track stock status and expiry dates.",
    tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Sessions"],
    github: null, // TODO: add GitHub repo URL
    demo: null, // TODO: add live demo URL if available
    mainImage: "/images/pantry/pantry-home.png",
    gallery: [
      { src: "/images/pantry/register.png", alt: "Create account form", caption: "Register" },
      { src: "/images/pantry/verify-otp.png", alt: "Verify email OTP form", caption: "Verify Email (OTP)" },
      { src: "/images/pantry/login.png", alt: "Login form", caption: "Login" },
      { src: "/images/pantry/forgot-password.png", alt: "Forgot password form", caption: "Forgot Password" },
      { src: "/images/pantry/pantry-home.png", alt: "Pantry inventory home screen", caption: "Home / inventory view" },
      { src: "/images/pantry/pantry-add-item.png", alt: "Add pantry item form", caption: "Add item" },
      { src: "/images/pantry/pantry-edit-item.png", alt: "Edit pantry item form", caption: "Edit item" },
    ],
    // TODO: fill in the real bug story — see the guided note near
    // the bottom of project-detail.js for the structure to follow.
    bugWriteup: null,
    bugCodeBefore: null,
    bugCodeAfter: null,
  },

  crudTodoApi: {
    slug: "crud-todo-api",
    name: "CRUD Todo API",
    featured: false,
    tagline: "Dockerized REST API for tasks, documented with Swagger.",
    description:
      "A CRUD REST API for managing tasks, built with Express.js. Fully containerized with Docker — the app and a PostgreSQL database each run in their own container, with a persistent volume for the database. Endpoints are documented and testable through Swagger UI (OAS 3.0).",
    tech: ["Node.js", "Express.js", "PostgreSQL", "Docker", "Swagger"],
    github: "https://github.com/abdurehmaan366/docker-implemented-crud-todo-api",
    demo: null,
    mainImage: "/images/todo-api/swagger.png",
    gallery: [
      { src: "/images/todo-api/swagger.png", alt: "Swagger UI documentation for the Task API", caption: "Swagger docs" },
      { src: "/images/todo-api/docker-images.png", alt: "Docker Desktop images list", caption: "Docker images" },
      { src: "/images/todo-api/docker-containers.png", alt: "docker ps showing running containers", caption: "Running containers" },
      { src: "/images/todo-api/docker-volume.png", alt: "docker volume ls output", caption: "Persistent volume" },
    ],
  },

  politeScraper: {
    slug: "polite-scraper",
    name: "The Polite Scraper",
    featured: false,
    tagline: "A reliable, respectful web scraper with caching and retries.",
    description:
      "A reliable and responsible web scraper built with Node.js, Cheerio, and Zod. Features caching, retries, request timeouts, schema validation, and polite request delays.",
    tech: ["Node.js", "JavaScript", "Cheerio", "Zod", "Web Scraping"],
    github: "https://github.com/abdurehmaan366/the-polite-scraper",
    demo: null,
    mainImage: "/images/polite-scraper/run-terminal.png",
    gallery: [
      { src: "/images/polite-scraper/run-terminal.png", alt: "Terminal output of the Polite Scraper", caption: "Terminal run" },
      // TODO: add more Polite Scraper screenshots here as you take them —
      // just copy the line above, change src/alt/caption.
    ],
  },
};

// Helper so any page can loop over all projects without knowing the object's keys.
export const projectList = Object.values(projects);

// Helper the details page uses to find "which project am I showing?" from the URL.
export function getProjectBySlug(slug) {
  return projectList.find((p) => p.slug === slug) || null;
}

export const chat = {
  // Local dev default. Once you deploy the backend (Render, etc.),
  // update this to your live backend URL, e.g.
  // "https://portfolio-backend-xxxx.onrender.com/api/chat"
  apiUrl: "https://abdur-portfolio-backend-production.up.railway.app/api/chat",
  starterQuestions: [
    "What's the session bug story?",
    "What's your tech stack?",
    "What have you built at FlyRank?",
  ],
};
