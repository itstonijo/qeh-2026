import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

export default defineConfig({
  site: process.env.SITE_URL || "https://covert.example.com",
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  trailingSlash: "ignore",
  security: {
    checkOrigin: false,
  },
  server: {
    host: process.env.HOST || "127.0.0.1",
    port: Number(process.env.PORT) || 4321,
  },
});
