import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    NYT_API_KEY: "LHAoAuu6Ri7g0hsmpVfeSnuhthclf3AY",
  },
});
