import * as Sentry from "@sentry/react-router";

Sentry.init({
  dsn: "https://d68fe04722d3e53c437e66b1b2d9118a@o4509400761630720.ingest.us.sentry.io/4509400763727872",
  
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
