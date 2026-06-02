// Build the site as a fully static export for hosts like GitHub Pages.
// Temporarily hides src/pages/api/ so Astro doesn't try to render the
// server-only POST endpoints, then runs `astro build` with BUILD_TARGET=static.
//
// Usage:
//   node scripts/build-static.mjs
//   BASE_PATH=/qeh-2026 node scripts/build-static.mjs
//   SITE_URL=https://you.example.com BASE_PATH= node scripts/build-static.mjs

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { rename } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const API = resolve(ROOT, "src/pages/api");
const HIDDEN = resolve(ROOT, "src/pages/_api_hidden_during_static_build");

let moved = false;

async function hideApi() {
  if (existsSync(API)) {
    await rename(API, HIDDEN);
    moved = true;
    console.log("[build-static] hid src/pages/api");
  }
}

async function restoreApi() {
  if (moved && existsSync(HIDDEN)) {
    await rename(HIDDEN, API);
    console.log("[build-static] restored src/pages/api");
  }
}

function runAstro() {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn("npx", ["astro", "build"], {
      cwd: ROOT,
      stdio: "inherit",
      env: { ...process.env, BUILD_TARGET: "static" },
    });
    child.on("exit", (code) => (code === 0 ? resolvePromise() : rejectPromise(new Error(`astro build exited ${code}`))));
    child.on("error", rejectPromise);
  });
}

process.on("SIGINT", async () => {
  await restoreApi();
  process.exit(130);
});

try {
  await hideApi();
  await runAstro();
} catch (err) {
  console.error("[build-static]", err);
  process.exitCode = 1;
} finally {
  await restoreApi();
}
