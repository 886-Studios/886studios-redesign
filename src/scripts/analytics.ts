import { track } from "@vercel/analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type AnalyticsProperties = Record<string, string>;

function getDestination(element: HTMLElement) {
  const link = element.closest<HTMLAnchorElement>("a[href]");
  if (!link) return undefined;

  try {
    const url = new URL(link.href, window.location.href);
    const path = `${url.pathname}${url.hash}`;
    return url.origin === window.location.origin ? path : `${url.hostname}${path}`;
  } catch {
    return undefined;
  }
}

function sendAnalyticsEvent(element: HTMLElement) {
  if (!document.querySelector("script[data-google-analytics-id]")) return;

  const name = element.dataset.analyticsEvent;
  if (!name) return;

  const properties: AnalyticsProperties = {
    path: window.location.pathname,
  };
  const placement = element.dataset.analyticsPlacement;
  const label = element.dataset.analyticsLabel;
  const destination = getDestination(element);

  if (placement) properties.placement = placement;
  if (label) properties.label = label;
  if (destination) properties.destination = destination;

  track(name, properties);
  window.gtag?.("event", name, properties);
}

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const element = event.target.closest<HTMLElement>("[data-analytics-event]");
  if (!element || element instanceof HTMLFormElement) return;

  sendAnalyticsEvent(element);
});

document.addEventListener("submit", (event) => {
  if (!(event.target instanceof HTMLFormElement) || !event.target.dataset.analyticsEvent) return;
  sendAnalyticsEvent(event.target);
});
