import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.886studios.com",
  trailingSlash: "never",
  server: {
    host: "127.0.0.1",
    port: 4173
  }
});
