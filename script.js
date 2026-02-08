// === WhatsApp config ===
// Use wa.me format: countrycode + number (no +, no spaces)
const WA_NUMBER = "526562654955";

// Optional default message:
const DEFAULT_WA_TEXT = "Hi! I’d like to book an appointment at Como La Flor Studio 💐";

// Build a WhatsApp link with a message
function waLink(text) {
  const msg = encodeURIComponent(text || DEFAULT_WA_TEXT);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

// Wire up buttons
function setHref(id, text) {
  const el = document.getElementById(id);
  if (!el) return;
  el.href = waLink(text);
  el.target = "_blank";
  el.rel = "noreferrer";
}

document.getElementById("year").textContent = new Date().getFullYear();

// Top / hero / services / contact buttons
setHref("waTopBtn", DEFAULT_WA_TEXT);
setHref("waTopBtnMobile", DEFAULT_WA_TEXT);
setHref("waHeroBtn", "Hi! I want to book at Como La Flor Studio 💐. What availability do you have?");
setHref("waServicesBtn", "Hi! I’m not sure what to book. Can you recommend a nail service for me?");
setHref("waBlankBtn", DEFAULT_WA_TEXT);
setHref("waContactBtn", "Hi! I want to book an appointment at Como La Flor Studio 💐.");
setHref("waFloat", "Hi! I want to book at Como La Flor Studio 💐.");

// Direct phone display link
const waDirect = document.getElementById("waDirectLink");
if (waDirect) {
  waDirect.href = waLink(DEFAULT_WA_TEXT);
  waDirect.target = "_blank";
  waDirect.rel = "noreferrer";
}

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const isHidden = mobileNav.hasAttribute("hidden");
    if (isHidden) {
      mobileNav.removeAttribute("hidden");
      menuBtn.setAttribute("aria-expanded", "true");
    } else {
      mobileNav.setAttribute("hidden", "");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Close menu when clicking a link
  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileNav.setAttribute("hidden", "");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Booking form -> opens WhatsApp with a prefilled message
const form = document.getElementById("bookingForm");
const bookingNote = document.getElementById("bookingNote");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const service = (data.get("service") || "").toString().trim();
    const date = (data.get("date") || "").toString().trim();
    const time = (data.get("time") || "").toString().trim();
    const notes = (data.get("notes") || "").toString().trim();

    const msg =
      `Hi! I’d like to book at Como La Flor Studio 💐\n\n` +
      `Name: ${name}\n` +
      `Service: ${service}\n` +
      `Preferred date: ${date}\n` +
      `Preferred time: ${time}\n` +
      (notes ? `Notes: ${notes}\n` : "") +
      `\nI can send an inspo photo here too.`;

    if (bookingNote) bookingNote.textContent = "Opening WhatsApp…";
    window.open(waLink(msg), "_blank", "noreferrer");

    // Optional: clear form
    // form.reset();
    setTimeout(() => { if (bookingNote) bookingNote.textContent = ""; }, 2500);
  });
}
