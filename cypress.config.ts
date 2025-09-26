import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {
      config.env = {
        ...process.env,
        ...config.env
      };
      return config;
    },
    env: {
      BURGER_API_URL: 'https://norma.nomoreparties.space/api'
    }
  }
});