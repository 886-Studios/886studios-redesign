window.webAnalyticsBeforeSend = (event) =>
  event.type === "pageview" ? { ...event, url: window.location.pathname } : event;
