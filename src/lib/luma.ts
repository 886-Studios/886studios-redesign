type LumaRecord = Record<string, unknown>;

export interface LumaEventCard {
  id: string;
  sortAt: string;
  title: string;
  month: string;
  day: string;
  year: string;
  meta: string;
  coverUrl?: string;
  url?: string;
}

export interface LumaEventsResult {
  upcomingEvents: LumaEventCard[];
  pastEvents: LumaEventCard[];
  isConfigured: boolean;
  error?: string;
}

const LUMA_EVENTS_ENDPOINT = "https://public-api.luma.com/v1/calendar/list-events";
const DEFAULT_TIME_ZONE = "Asia/Taipei";
const PAGE_LIMIT = 50;
const MAX_PAGES_PER_SECTION = 10;

export async function getLumaEvents(): Promise<LumaEventsResult> {
  const apiKey = getEnvValue("LUMA_API_KEY");

  if (!apiKey) {
    console.warn("[luma] LUMA_API_KEY is not set — skipping API call.");

    return {
      upcomingEvents: [],
      pastEvents: [],
      isConfigured: false,
      error: "Luma is not configured.",
    };
  }

  console.log("[luma] API key found, fetching events...");

  const now = new Date().toISOString();
  const [upcoming, past] = await Promise.all([
    fetchLumaEvents(apiKey, {
      after: now,
      sortDirection: "asc",
    }),
    fetchLumaEvents(apiKey, {
      before: now,
      sortDirection: "desc",
    }),
  ]);

  const error = upcoming.error && past.error ? "Unable to load Luma events." : undefined;

  return {
    upcomingEvents: upcoming.events,
    pastEvents: past.events,
    isConfigured: true,
    error,
  };
}

async function fetchLumaEvents(
  apiKey: string,
  options: {
    after?: string;
    before?: string;
    sortDirection: "asc" | "desc";
  }
): Promise<{ events: LumaEventCard[]; error?: string }> {
  const events: LumaEventCard[] = [];
  let cursor: string | undefined;
  try {
    for (let page = 0; page < MAX_PAGES_PER_SECTION; page += 1) {
      const url = new URL(LUMA_EVENTS_ENDPOINT);
      if (options.after) url.searchParams.set("after", options.after);
      if (options.before) url.searchParams.set("before", options.before);
      if (cursor) url.searchParams.set("pagination_cursor", cursor);
      url.searchParams.set("pagination_limit", String(PAGE_LIMIT));
      url.searchParams.set("sort_column", "start_at");
      url.searchParams.set("sort_direction", options.sortDirection);
      url.searchParams.set("status", "approved");
      url.searchParams.append("platforms", "luma");
      url.searchParams.append("platforms", "external");

      const response = await fetch(url, {
        headers: { "x-luma-api-key": apiKey },
      });

      if (!response.ok) {
        console.warn(`[luma] Request failed with status ${response.status}.`);
        return { events: [], error: "Unable to load Luma events." };
      }

      const payload = (await response.json()) as LumaRecord;
      events.push(
        ...getEntries(payload)
          .map(getEventFromEntry)
          .map(toEventCard)
          .filter((event): event is LumaEventCard => Boolean(event))
      );

      cursor = getString(payload, "next_cursor");
      if (!cursor || payload.has_more !== true) break;
    }

    return {
      events: events.sort((a, b) =>
        options.sortDirection === "asc"
          ? a.sortAt.localeCompare(b.sortAt)
          : b.sortAt.localeCompare(a.sortAt)
      ),
    };
  } catch (err) {
    console.warn("[luma] Request threw an exception:", err);
    return {
      events: [],
      error: "Unable to load Luma events.",
    };
  }
}

function getEnvValue(name: string): string {
  const value = import.meta.env[name];
  if (typeof value === "string" && value.trim()) return value.trim();

  const processEnv = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env?.[name];

  return typeof processEnv === "string" ? processEnv.trim() : "";
}

function getEntries(payload: LumaRecord): unknown[] {
  if (Array.isArray(payload.entries)) return payload.entries;
  if (Array.isArray(payload.events)) return payload.events;
  return [];
}

function getEventFromEntry(entry: unknown): LumaRecord | null {
  if (!isRecord(entry)) return null;
  return isRecord(entry.event) ? entry.event : entry;
}

function toEventCard(event: LumaRecord | null): LumaEventCard | null {
  if (!event) return null;

  const startAt = getString(event, "start_at");
  if (!startAt) return null;

  const start = new Date(startAt);
  if (Number.isNaN(start.valueOf())) return null;

  const timeZone = getSafeTimeZone(getString(event, "timezone"));
  const endAt = getString(event, "end_at");
  const title = getString(event, "name") ?? "Untitled event";
  const location = getLocation(event);
  const time = formatTimeRange(start, endAt ? new Date(endAt) : null, timeZone);
  const meta = [time, location].filter(Boolean).join(" | ");

  return {
    id: getString(event, "api_id") ?? getString(event, "event_api_id") ?? start.toISOString(),
    sortAt: start.toISOString(),
    title,
    month: new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone,
    }).format(start),
    day: new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      timeZone,
    }).format(start),
    year: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      timeZone,
    }).format(start),
    meta,
    coverUrl: getCoverUrl(event),
    url: getEventUrl(event),
  };
}

function getCoverUrl(event: LumaRecord): string | undefined {
  return getSafeHttpsUrl(
    getString(event, "cover_url") ??
    getString(event, "coverUrl") ??
    getString(event, "thumbnail_url") ??
    getString(event, "image_url")
  );
}

function getLocation(event: LumaRecord): string {
  const locationType = getString(event, "location_type")?.toLowerCase();
  if (locationType?.includes("online") || getString(event, "meeting_url")) {
    return "Online";
  }

  const location =
    getNestedLocation(event, "geo_address_json") ??
    getNestedLocation(event, "geo_address_info") ??
    getNestedLocation(event, "location");

  return location ?? "Location TBD";
}

function getNestedLocation(event: LumaRecord, key: string): string | undefined {
  const value = event[key];
  if (typeof value === "string" && value.trim()) return value.trim();
  if (!isRecord(value)) return undefined;

  const city = getString(value, "city");
  const country = getString(value, "country") ?? getString(value, "country_code");
  if (city && country) return `${city}, ${country}`;
  if (city) return city;

  return (
    getString(value, "full_address") ??
    getString(value, "formatted_address") ??
    getString(value, "address") ??
    getString(value, "name")
  );
}

function getEventUrl(event: LumaRecord): string | undefined {
  const url =
    getString(event, "url") ??
    getString(event, "event_url") ??
    getString(event, "registration_url") ??
    getString(event, "share_url");

  const safeUrl = getSafeHttpsUrl(url);
  if (safeUrl) return safeUrl;

  const slug = getString(event, "slug");
  return slug ? `https://luma.com/${encodeURIComponent(slug)}` : undefined;
}

function getSafeHttpsUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

function formatTimeRange(start: Date, end: Date | null, timeZone: string): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  });

  if (!end || Number.isNaN(end.valueOf())) {
    return formatter.format(start);
  }

  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

function getSafeTimeZone(timeZone: string | undefined): string {
  if (!timeZone) return DEFAULT_TIME_ZONE;

  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    return timeZone;
  } catch {
    return DEFAULT_TIME_ZONE;
  }
}

function getString(record: LumaRecord, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function isRecord(value: unknown): value is LumaRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
