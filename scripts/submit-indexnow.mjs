import { readFile } from "node:fs/promises";
import path from "node:path";

const defaultSiteUrl = "https://www.886studios.com";
const defaultEndpoint = "https://api.indexnow.org/indexnow";
const defaultKeyFile = "indexnow-key.txt";
const isDryRun = process.argv.includes("--dry-run");
const requestedUrls = process.argv
  .filter((argument) => argument.startsWith("--url="))
  .map((argument) => argument.slice("--url=".length));

const getArgumentValue = (name) => {
  const prefix = `${name}=`;
  return process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
};

const decodeXml = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");

const siteUrl = new URL(process.env.INDEXNOW_SITE_URL?.trim() || defaultSiteUrl);
const endpoint = process.env.INDEXNOW_ENDPOINT?.trim() || defaultEndpoint;
const keyFile = process.env.INDEXNOW_KEY_FILE?.trim() || defaultKeyFile;
const sitemapPath = path.resolve(
  process.cwd(),
  getArgumentValue("--sitemap") || "dist/sitemap.xml",
);
const keyPath = path.resolve(process.cwd(), "public", keyFile);

const [sitemapXml, keyFileContents] = await Promise.all([
  requestedUrls.length === 0 ? readFile(sitemapPath, "utf8") : Promise.resolve(undefined),
  readFile(keyPath, "utf8"),
]);

const key = process.env.INDEXNOW_KEY?.trim() || keyFileContents.trim();

if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
  throw new Error("The IndexNow key must be 8-128 letters, numbers, or dashes.");
}

const candidateUrls =
  requestedUrls.length > 0
    ? requestedUrls
    : [...sitemapXml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((match) =>
        decodeXml(match[1].trim()),
      );
const urlList = [...new Set(candidateUrls)];

for (const url of urlList) {
  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }

  if (parsedUrl.origin !== siteUrl.origin) {
    throw new Error(`IndexNow URL must belong to ${siteUrl.origin}: ${url}`);
  }
}

if (urlList.length === 0) {
  throw new Error(`No ${siteUrl.origin} URLs were found in ${sitemapPath}.`);
}

if (urlList.length > 10_000) {
  throw new Error("IndexNow accepts at most 10,000 URLs per request.");
}

const keyLocation = new URL(`/${keyFile}`, siteUrl).toString();
const payload = {
  host: siteUrl.host,
  key,
  keyLocation,
  urlList,
};

if (isDryRun) {
  console.log(
    JSON.stringify(
      {
        endpoint,
        host: payload.host,
        keyLocation,
        source: requestedUrls.length > 0 ? "command-line URLs" : sitemapPath,
        urlCount: urlList.length,
        firstUrl: urlList[0],
        lastUrl: urlList.at(-1),
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

const keyResponse = await fetch(keyLocation);
const publishedKey = (await keyResponse.text()).trim();

if (!keyResponse.ok || publishedKey !== key) {
  throw new Error(
    `The published IndexNow key is not ready at ${keyLocation}. Deploy the site before submitting.`,
  );
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(payload),
});

const responseBody = (await response.text()).trim();

if (response.status !== 200 && response.status !== 202) {
  throw new Error(
    `IndexNow returned HTTP ${response.status}${responseBody ? `: ${responseBody}` : ""}`,
  );
}

console.log(
  `IndexNow accepted ${urlList.length} URLs for ${siteUrl.host} (HTTP ${response.status}).`,
);
