const INTERNAL_PATH_RE = /^\/(?!\/)/;

export function getSafeExternalHttpsHref(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  try {
    const url = new URL(trimmed);
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function getSafeInternalOrHttpsHref(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  if (trimmed.startsWith("#") || INTERNAL_PATH_RE.test(trimmed)) return trimmed;

  return getSafeExternalHttpsHref(trimmed);
}

export function isExternalHttpsHref(value: string | undefined): boolean {
  return Boolean(getSafeExternalHttpsHref(value));
}
