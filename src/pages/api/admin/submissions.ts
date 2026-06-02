import type { APIRoute } from "astro";
import { promises as fs } from "node:fs";
import path from "node:path";

export const prerender = false;

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), ".data");

async function readJsonl(file: string) {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return raw
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => {
        try {
          return JSON.parse(l);
        } catch {
          return { _malformed: l };
        }
      });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

export const GET: APIRoute = async ({ url }) => {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    return Response.json(
      { ok: false, error: "Admin endpoint disabled. Set ADMIN_TOKEN to enable." },
      { status: 503 },
    );
  }
  if (url.searchParams.get("token") !== token) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const [briefs, subscribers] = await Promise.all([
    readJsonl("briefs.jsonl"),
    readJsonl("subscribers.jsonl"),
  ]);

  return Response.json({
    ok: true,
    counts: { briefs: briefs.length, subscribers: subscribers.length },
    briefs: briefs.slice(-25).reverse(),
    subscribers: subscribers.slice(-50).reverse(),
  });
};
