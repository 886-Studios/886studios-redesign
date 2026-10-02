const siteOrigin = "https://www.886studios.com";
const publicHosts = new Set(["www.886studios.com", "886studios.com"]);
const portalHosts = new Set(["886-studios-perks.vercel.app", "perks.886studios.com"]);

export function isPrivatePerksUrl(value) {
  try {
    const url = new URL(value, siteOrigin);
    return portalHosts.has(url.hostname) || (
      publicHosts.has(url.hostname) && /^\/perks(?:\/|$)/i.test(decodeURIComponent(url.pathname))
    );
  } catch {
    return false;
  }
}

export function hasPrivatePerksReference(text) {
  // Include rendered links, JSON-LD, XML feeds, and plain/Markdown discovery text.
  const normalized = text.replaceAll("\\/", "/");
  const references = normalized.match(/https?:\/\/[^\s"'<>)]*|(?<![\w/])\/perks(?=[/?#\s"'<>)]|$)[^\s"'<>)]*/gi) ?? [];
  return references.some(isPrivatePerksUrl);
}
