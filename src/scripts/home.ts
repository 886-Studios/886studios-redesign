function initPhotoMarquee() {
  const photoTracks = Array.from(document.querySelectorAll<HTMLElement>(".photo-track"));
  if (photoTracks.length === 0) return;

  const waitForImageDecode = (image: HTMLImageElement) =>
    new Promise<void>((resolve) => {
      const decodeImage = () => {
        image
          .decode()
          .catch(() => undefined)
          .finally(resolve);
      };

      if (image.complete) {
        decodeImage();
        return;
      }

      image.addEventListener("load", decodeImage, { once: true });
      image.addEventListener("error", () => resolve(), { once: true });
    });

  let animationFrame = 0;
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

  const queueSyncPhotoTracks = () => {
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(syncPhotoTracks);
  };

  if ("ResizeObserver" in window) {
    const photoResizeObserver = new ResizeObserver(queueSyncPhotoTracks);
    photoTracks.forEach((track) => photoResizeObserver.observe(track));
  }

  photoTracks.forEach((track) => {
    const firstSet = track.querySelector<HTMLElement>(".photo-track-set");
    if (!firstSet) return;

    const firstSetImages = Array.from(firstSet.querySelectorAll<HTMLImageElement>("img"));
    void Promise.all(firstSetImages.map(waitForImageDecode)).then(() => {
      track.classList.add("is-ready");
      queueSyncPhotoTracks();
    });
  });

  window.addEventListener("load", queueSyncPhotoTracks, { once: true });
  window.addEventListener("resize", queueSyncPhotoTracks);
  queueSyncPhotoTracks();
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
