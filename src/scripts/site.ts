const select = <T extends Element>(selector: string) => document.querySelector<T>(selector);
const selectAll = <T extends Element>(selector: string) => Array.from(document.querySelectorAll<T>(selector));
const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const getFocusableElements = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => element.getClientRects().length > 0);

function initNavChrome() {
  const nav = select<HTMLElement>(".site-nav");
  const hamburger = select<HTMLButtonElement>(".nav-hamburger");
  const drawer = select<HTMLElement>("#mobile-drawer");
  const overlay = drawer?.querySelector<HTMLElement>(".mobile-drawer-overlay");
  const closeButton = drawer?.querySelector<HTMLButtonElement>(".mobile-drawer-close");
  const main = select<HTMLElement>("#main-content");
  const footer = select<HTMLElement>("footer");
  let previouslyFocusedElement: HTMLElement | null = null;
  let previousBodyOverflow = "";
  let previousHtmlOverflow = "";
  let previousBodyPosition = "";
  let previousBodyTop = "";
  let previousBodyWidth = "";
  let lockedScrollY = 0;

  if (!nav || !hamburger || !drawer || !overlay || !closeButton) return;

  const updateNav = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const openDrawer = () => {
    previouslyFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : hamburger;
    drawer.setAttribute("aria-hidden", "false");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close menu");
    hamburger.classList.add("is-open");
    drawer.classList.add("is-open");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;
    previousBodyPosition = document.body.style.position;
    previousBodyTop = document.body.style.top;
    previousBodyWidth = document.body.style.width;
    lockedScrollY = window.scrollY;
    document.documentElement.classList.add("mobile-menu-open");
    document.body.classList.add("mobile-menu-open");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.width = "100%";
    closeButton.focus({ preventScroll: true });
  };

  const closeDrawer = () => {
    if (!drawer.classList.contains("is-open")) return;

    drawer.setAttribute("aria-hidden", "true");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
    hamburger.classList.remove("is-open");
    drawer.classList.remove("is-open");
    main?.removeAttribute("inert");
    footer?.removeAttribute("inert");
    document.documentElement.classList.remove("mobile-menu-open");
    document.body.classList.remove("mobile-menu-open");
    document.documentElement.style.overflow = previousHtmlOverflow;
    document.body.style.overflow = previousBodyOverflow;
    document.body.style.position = previousBodyPosition;
    document.body.style.top = previousBodyTop;
    document.body.style.width = previousBodyWidth;
    window.scrollTo(0, lockedScrollY);
    const focusTarget = previouslyFocusedElement && document.contains(previouslyFocusedElement) ? previouslyFocusedElement : hamburger;
    focusTarget.focus({ preventScroll: true });
    previouslyFocusedElement = null;
    previousBodyOverflow = "";
    previousHtmlOverflow = "";
    previousBodyPosition = "";
    previousBodyTop = "";
    previousBodyWidth = "";
    lockedScrollY = 0;
  };

  const trapDrawerFocus = (event: KeyboardEvent) => {
    if (event.key !== "Tab") return;

    const focusableElements = getFocusableElements(drawer);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!firstElement || !lastElement) {
      event.preventDefault();
      closeButton.focus();
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });
  hamburger.addEventListener("click", () => {
    if (drawer.classList.contains("is-open")) {
      closeDrawer();
      return;
    }

    openDrawer();
  });
  closeButton.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);
  drawer.addEventListener("keydown", trapDrawerFocus);

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

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
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
