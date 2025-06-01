import * as Sentry from "@sentry/react-router";

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: "https://d68fe04722d3e53c437e66b1b2d9118a@o4509400761630720.ingest.us.sentry.io/4509400763727872",
    sendDefaultPii: true,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express(),
    ],
    tracesSampleRate: 1.0,
  });
}

export default Sentry;
