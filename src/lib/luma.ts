import archive from "../data/luma-events.json";

export interface LumaEventCard {
  id: string;
  sortAt: string;
  startAt: string;
  endAt?: string;
  title: string;
  month: string;
  day: string;
  year: string;
  meta: string;
  locationName: string;
  isOnline: boolean;
  coverUrl?: string;
  url?: string;
}

export interface LumaEventsResult {
  upcomingEvents: LumaEventCard[];
  pastEvents: LumaEventCard[];
  isConfigured: boolean;
  error?: string;
}

interface ArchivedLumaEvent {
  id: string;
  title: string;
  startAt: string;
  endAt?: string;
  timezone: string;
  coverUrl?: string;
  url?: string;
  locationName: string;
  isOnline: boolean;
}

const DEFAULT_TIME_ZONE = "Asia/Taipei";

export function getLumaEvents(now = new Date()): LumaEventsResult {
  const events = (archive.events as ArchivedLumaEvent[])
    .map(toEventCard)
    .filter((event): event is LumaEventCard => Boolean(event));
  const nowValue = now.valueOf();

  return {
    upcomingEvents: events
      .filter((event) => new Date(event.endAt ?? event.startAt).valueOf() >= nowValue)
      .sort((a, b) => a.sortAt.localeCompare(b.sortAt)),
    pastEvents: events
      .filter((event) => new Date(event.endAt ?? event.startAt).valueOf() < nowValue)
      .sort((a, b) => b.sortAt.localeCompare(a.sortAt)),
    isConfigured: true,
  };
}

function toEventCard(event: ArchivedLumaEvent): LumaEventCard | null {
  const start = new Date(event.startAt);
  if (Number.isNaN(start.valueOf())) return null;

  const end = event.endAt ? new Date(event.endAt) : null;
  const timeZone = getSafeTimeZone(event.timezone);
  const time = formatTimeRange(start, end, timeZone);
  const locationName = event.locationName || "Location TBD";

  return {
    id: event.id,
    sortAt: start.toISOString(),
    startAt: start.toISOString(),
    endAt: end && !Number.isNaN(end.valueOf()) ? end.toISOString() : undefined,
    title: event.title,
    month: new Intl.DateTimeFormat("en-US", { month: "short", timeZone }).format(start),
    day: new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone }).format(start),
    year: new Intl.DateTimeFormat("en-US", { year: "numeric", timeZone }).format(start),
    meta: [time, locationName].filter(Boolean).join(" | "),
    locationName,
    isOnline: event.isOnline,
    coverUrl: getSafeHttpsUrl(event.coverUrl),
    url: getSafeHttpsUrl(event.url),
  };
}

function formatTimeRange(start: Date, end: Date | null, timeZone: string): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  });

  if (!end || Number.isNaN(end.valueOf())) return formatter.format(start);
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

function getSafeHttpsUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}
