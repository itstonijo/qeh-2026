import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

const BUILD_TARGET = process.env.BUILD_TARGET || "server";
const STATIC = BUILD_TARGET === "static";

const DEFAULT_BASE = STATIC ? "/qeh-2026" : "/";
const BASE = (process.env.BASE_PATH ?? DEFAULT_BASE) || "/";

const DEFAULT_SITE = STATIC
  ? "https://itstonijo.github.io"
  : "https://covert.example.com";

export default defineConfig({
  site: process.env.SITE_URL || DEFAULT_SITE,
  base: BASE,
  output: STATIC ? "static" : "server",
  adapter: STATIC ? undefined : node({ mode: "standalone" }),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.PUBLIC_STATIC_BUILD": JSON.stringify(STATIC ? "true" : ""),
    },
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
