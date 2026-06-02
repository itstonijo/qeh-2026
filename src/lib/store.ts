import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), ".data");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function appendJsonl(file: string, record: Record<string, unknown>) {
  await ensureDir();
  const payload = { ...record, ts: new Date().toISOString() };
  const line = JSON.stringify(payload) + "\n";
  await fs.appendFile(path.join(DATA_DIR, file), line, "utf8");
  return payload;
}

async function forwardWebhook(record: Record<string, unknown>, kind: string) {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, record }),
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

export async function recordBrief(record: Record<string, unknown>) {
  const saved = await appendJsonl("briefs.jsonl", record);
  const webhook = await forwardWebhook(saved, "brief");
  return { saved, webhook };
}

export async function recordSubscriber(record: Record<string, unknown>) {
  const saved = await appendJsonl("subscribers.jsonl", record);
  const webhook = await forwardWebhook(saved, "subscriber");
  return { saved, webhook };
}
