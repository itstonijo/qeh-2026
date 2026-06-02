import type { APIRoute } from "astro";
import { validateBrief } from "../../lib/validate";
import { recordBrief } from "../../lib/store";

export const prerender = false;

async function parseBody(request: Request): Promise<Record<string, unknown>> {
  const ct = request.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    return (await request.json()) as Record<string, unknown>;
  }
  const fd = await request.formData();
  const out: Record<string, unknown> = {};
  for (const key of new Set(fd.keys())) {
    const values = fd.getAll(key).map((v) => (typeof v === "string" ? v : ""));
    out[key] = values.length > 1 ? values : values[0];
  }
  return out;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let body: Record<string, unknown>;
  try {
    body = await parseBody(request);
  } catch {
    return Response.json({ ok: false, error: "Couldn't read your submission." }, { status: 400 });
  }

  const { ok, errors, data } = validateBrief(body);
  if (!ok) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const ua = request.headers.get("user-agent") ?? "";
  const ip = request.headers.get("x-forwarded-for") ?? clientAddress ?? "";

  try {
    const { saved, webhook } = await recordBrief({ ...data, ua, ip });
    return Response.json({
      ok: true,
      message: "Thanks — we'll be in touch within one business day.",
      id: saved.ts,
      webhook,
    });
  } catch (err) {
    console.error("[contact] failed to record", err);
    return Response.json(
      { ok: false, error: "We hit an issue saving that. Try again in a moment." },
      { status: 500 },
    );
  }
};

export const GET: APIRoute = () =>
  Response.json({ ok: false, error: "POST a brief to this endpoint." }, { status: 405 });
