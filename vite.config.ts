import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "js-mastery-y1g",
  project: "javascript-react",
  // An auth token is required for uploading source maps.
  authToken: "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"
  // ...
};



export default defineConfig(config => {
  return {
  plugins: [tailwindcss(),tsconfigPaths(),reactRouter(),sentryReactRouter(sentryConfig, config)],
  sentryConfig,
  ssr:{
    noExternal: [/@syncfusion/]
  }
  };
});
