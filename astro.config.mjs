import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.886studios.com",
  trailingSlash: "never",
  vite: {
    build: {
      // Keep executable scripts external so CSP can reject all inline JavaScript.
      assetsInlineLimit(filePath) {
        if (/\.(?:m?js|ts)$/.test(filePath)) return false;
      }
    }
  },
  server: {
    host: "127.0.0.1",
    port: 4173
  }
});
