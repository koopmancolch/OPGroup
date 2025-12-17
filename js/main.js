const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#navmenu");
const header = document.querySelector("[data-header]");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });

  // Close menu when clicking a link (mobile UX)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });
}

// Solid header on scroll (Tesla-like)
const onScroll = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 10);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// --- PDF modal ---
const modal = document.getElementById("pdfModal");
const frame = document.getElementById("pdfFrame");
const titleEl = document.getElementById("pdfTitle");
const openNew = document.getElementById("pdfOpenNew");
const download = document.getElementById("pdfDownload");

function openPdf({ title, pdf }) {
  // Add #view=FitH for nicer default; browser PDF viewer supports this in many cases
  const url = pdf + "#view=FitH";
  titleEl.textContent = title || "Document";
  frame.src = url;
  openNew.href = pdf;
  download.href = pdf;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closePdf() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  frame.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".js-open-pdf").forEach(btn => {
  btn.addEventListener("click", () => {
    openPdf({
      title: btn.dataset.title,
      pdf: btn.dataset.pdf
    });
  });
});

modal?.addEventListener("click", (e) => {
  if (e.target.matches("[data-close]")) closePdf();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closePdf();
});
