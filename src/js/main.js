import "../style.css";
import { mountNav } from "./nav.js";
import { mountFooter } from "./footer.js";
import { mountTechStrip } from "./tech-strip.js";
import { initLightbox } from "./lightbox.js";
import { mountChatbot } from "./chatbot.js";

const activePage = document.body.dataset.active || "/index.html";

mountNav(activePage);
mountFooter();
mountTechStrip("tech-strip");
initLightbox();
mountChatbot();

const loader = document.getElementById("page-loader");
if (loader) {
  loader.style.opacity = "0";
  setTimeout(() => loader.remove(), 300);
}

// Contact form: no backend wired up yet, so this just gives the
// user feedback in the UI. Replace with a real submit handler
// (e.g. POST to an email API or backend route) when ready.
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const status = document.getElementById("contact-status");
    if (status) {
      status.textContent =
        "This form isn't wired to a backend yet — for now, please email me directly using the link below.";
      status.classList.remove("hidden");
    }
  });
}
