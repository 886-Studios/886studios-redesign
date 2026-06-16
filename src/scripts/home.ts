function initPhotoMarquee() {
  const photoTracks = Array.from(document.querySelectorAll<HTMLElement>(".photo-track"));
  if (photoTracks.length === 0) return;

  const syncPhotoTracks = () => {
    const isCompact = window.matchMedia("(max-width: 720px)").matches;
    const pixelsPerSecond = isCompact ? 34 : 42;
    const minimumDuration = isCompact ? 58 : 62;

    photoTracks.forEach((track) => {
      const firstSet = track.querySelector<HTMLElement>(".photo-track-set");
      if (!firstSet) return;

      const loopWidth = firstSet.getBoundingClientRect().width;
      if (loopWidth <= 0) return;

      track.style.setProperty("--photo-loop-distance", `${-loopWidth}px`);
      track.style.setProperty(
        "--photo-marquee-duration",
        `${Math.max(minimumDuration, loopWidth / pixelsPerSecond).toFixed(2)}s`
      );
    });
  };

  if ("ResizeObserver" in window) {
    const photoResizeObserver = new ResizeObserver(syncPhotoTracks);
    photoTracks.forEach((track) => photoResizeObserver.observe(track));
  }

  window.addEventListener("load", syncPhotoTracks, { once: true });
  window.addEventListener("resize", syncPhotoTracks);
  syncPhotoTracks();
}

function initNewsletterForm() {
  const newsletterForm = document.querySelector<HTMLFormElement>(".nl-form");
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", () => {
    const button = newsletterForm.querySelector<HTMLButtonElement>(".nl-btn");
    newsletterForm.classList.add("is-submitted");

    if (button) {
      button.textContent = "Check your inbox";
    }
  });
}

initPhotoMarquee();
initNewsletterForm();
