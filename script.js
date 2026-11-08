(function () {
  const header = document.querySelector(".header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const shots = Array.from(document.querySelectorAll(".shot"));
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox.querySelector("img");
  const lightboxCap = lightbox.querySelector("figcaption");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");
  let index = 0;
  let lastFocus = null;

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
  }

  function show(i) {
    index = (i + shots.length) % shots.length;
    const shot = shots[index];
    lightboxImg.src = shot.dataset.full;
    lightboxImg.alt = shot.dataset.alt;
    lightboxCap.textContent = shot.dataset.caption;
  }

  function openLightbox(i) {
    lastFocus = document.activeElement;
    show(i);
    lightbox.hidden = false;
    document.body.classList.add("no-scroll");
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.removeAttribute("src");
    document.body.classList.remove("no-scroll");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  shots.forEach(function (shot, i) {
    shot.addEventListener("click", function () {
      openLightbox(i);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", function () {
    show(index - 1);
  });
  nextBtn.addEventListener("click", function () {
    show(index + 1);
  });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (!lightbox.hidden) closeLightbox();
      setMenu(false);
    }
    if (lightbox.hidden) return;
    if (event.key === "ArrowRight") show(index + 1);
    if (event.key === "ArrowLeft") show(index - 1);
  });
})();
