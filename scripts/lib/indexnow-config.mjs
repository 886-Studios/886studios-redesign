import { realpath } from "node:fs/promises";
import path from "node:path";

function httpsUrl(value, name) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be an absolute HTTPS URL.`);
  }
  if (url.protocol !== "https:" || url.username || url.password || url.hash) {
    throw new Error(`${name} must use HTTPS without credentials or a fragment.`);
  }
  return url;
}

export async function getIndexNowConfig(environment = process.env, directory = process.cwd()) {
  const siteUrl = httpsUrl(environment.INDEXNOW_SITE_URL?.trim() || "https://www.886studios.com", "INDEXNOW_SITE_URL");
  if (siteUrl.pathname !== "/" || siteUrl.search) {
    throw new Error("INDEXNOW_SITE_URL must be the canonical site origin without a path or query.");
  }
  const endpoint = httpsUrl(environment.INDEXNOW_ENDPOINT?.trim() || "https://api.indexnow.org/indexnow", "INDEXNOW_ENDPOINT").href;
  const keyFile = environment.INDEXNOW_KEY_FILE?.trim() || "indexnow-key.txt";
  if (!keyFile.split("/").every((segment) => /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(segment))) {
    throw new Error("INDEXNOW_KEY_FILE must be a relative URL path inside public/ without traversal, backslashes, or URL delimiters.");
  }

  const publicDirectory = await realpath(path.resolve(directory, "public"));
  const keyPath = await realpath(path.resolve(publicDirectory, keyFile));
  const relativeKeyPath = path.relative(publicDirectory, keyPath);
  if (relativeKeyPath === ".." || relativeKeyPath.startsWith(`..${path.sep}`) || path.isAbsolute(relativeKeyPath)) {
    throw new Error("INDEXNOW_KEY_FILE must resolve inside public/; external symlinks are not allowed.");
  }

  return { siteUrl, endpoint, keyPath, keyLocation: new URL(`/${keyFile}`, siteUrl).href };
}

export function fetchIndexNow(url, options = {}, fetchImplementation = fetch) {
  return fetchImplementation(url, {
    ...options,
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
  });
}
