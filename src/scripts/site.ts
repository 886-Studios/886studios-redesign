const select = <T extends Element>(selector: string) => document.querySelector<T>(selector);
const selectAll = <T extends Element>(selector: string) => Array.from(document.querySelectorAll<T>(selector));

function initNavChrome() {
  const nav = select<HTMLElement>(".site-nav");
  const hamburger = select<HTMLButtonElement>(".nav-hamburger");
  const drawer = select<HTMLElement>("#mobile-drawer");
  const overlay = drawer?.querySelector<HTMLElement>(".mobile-drawer-overlay");
  const closeButton = drawer?.querySelector<HTMLButtonElement>(".mobile-drawer-close");

  if (!nav || !hamburger || !drawer || !overlay || !closeButton) return;

  const updateNav = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const openDrawer = () => {
    drawer.setAttribute("aria-hidden", "false");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.classList.add("is-open");
    drawer.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer.setAttribute("aria-hidden", "true");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.classList.remove("is-open");
    drawer.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });
  hamburger.addEventListener("click", openDrawer);
  closeButton.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });
}

function initCachedPageAnimationReplay() {
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;

    selectAll<HTMLElement>(".hero-h1, .hero-sub, .hero-actions, .eyebrow").forEach((element) => {
      element.style.animationName = "none";
      void element.getBoundingClientRect();
      element.style.animationName = "";
    });
  });
}

function initScrollReveal() {
  const revealElements = selectAll<HTMLElement>(".reveal");
  if (revealElements.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
}

initNavChrome();
initCachedPageAnimationReplay();
initScrollReveal();
