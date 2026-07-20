import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.886studios.com",
  trailingSlash: "never",
  server: {
    host: true,
    port: 4173
  }
});
