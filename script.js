// WhatsApp: usa formato wa.me con código de país + número (sin +, sin espacios)
const WA_NUMBER = "526562654955";

function waLink(text) {
  const msg = encodeURIComponent(text);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

document.getElementById("year").textContent = new Date().getFullYear();

const msgDefault = "Hola! Quiero agendar una cita en Como La Flor Studio 💐";
const msgHero = "Hola! Quiero agendar en Como La Flor Studio 💐. ¿Qué disponibilidad tienes?";
const msgServicios = "Hola! No estoy segura qué servicio elegir. ¿Me recomiendas uno según mi idea? 💐";
const msgContacto = "Hola! Me gustaría agendar una cita en Como La Flor Studio 💐";

function setHref(id, text) {
  const el = document.getElementById(id);
  if (!el) return;
  el.href = waLink(text);
  el.target = "_blank";
  el.rel = "noreferrer";
}

setHref("waTopBtn", msgDefault);
setHref("waTopBtnMobile", msgDefault);
setHref("waHeroBtn", msgHero);
setHref("waServiciosBtn", msgServicios);
setHref("waBlankBtn", msgDefault);
setHref("waContactoBtn", msgContacto);
setHref("waFloat", msgContacto);

const waDirect = document.getElementById("waDirectLink");
if (waDirect) {
  waDirect.href = waLink(msgDefault);
  waDirect.target = "_blank";
  waDirect.rel = "noreferrer";
}

// Menú móvil
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

  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileNav.setAttribute("hidden", "");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Formulario -> abre WhatsApp con mensaje ya armado
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
      `Hola! Quiero agendar una cita en Como La Flor Studio 💐\n\n` +
      `Nombre: ${name}\n` +
      `Servicio: ${service}\n` +
      `Fecha preferida: ${date}\n` +
      `Hora preferida: ${time}\n` +
      (notes ? `Detalles: ${notes}\n` : "") +
      `\nPuedo enviar una foto de inspiración por aquí.`;

    if (bookingNote) bookingNote.textContent = "Abriendo WhatsApp…";
    window.open(waLink(msg), "_blank", "noreferrer");

    setTimeout(() => { if (bookingNote) bookingNote.textContent = ""; }, 2500);
  });
}

