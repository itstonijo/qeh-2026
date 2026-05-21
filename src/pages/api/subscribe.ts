import type { APIRoute } from "astro";
import { validateSubscriber } from "../../lib/validate";
import { recordSubscriber } from "../../lib/store";

export const prerender = false;

async function parseBody(request: Request): Promise<Record<string, unknown>> {
  const ct = request.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    return (await request.json()) as Record<string, unknown>;
  }
  const fd = await request.formData();
  return Object.fromEntries(fd.entries());
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let body: Record<string, unknown>;
  try {
    body = await parseBody(request);
  } catch {
    return Response.json({ ok: false, error: "Couldn't read your submission." }, { status: 400 });
  }

  const { ok, errors, data } = validateSubscriber(body);
  if (!ok) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for") ?? clientAddress ?? "";

  try {
    const { saved } = await recordSubscriber({ ...data, ip });
    return Response.json({ ok: true, message: "Subscribed — see you next month.", id: saved.ts });
  } catch (err) {
    console.error("[subscribe] failed to record", err);
    return Response.json(
      { ok: false, error: "We hit an issue saving that. Try again in a moment." },
      { status: 500 },
    );
  }
};

export const GET: APIRoute = () =>
  Response.json({ ok: false, error: "POST an email to this endpoint." }, { status: 405 });
