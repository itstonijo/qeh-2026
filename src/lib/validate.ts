export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateBrief(form: Record<string, unknown>) {
  const errors: FieldErrors = {};
  const name = String(form.name ?? "").trim();
  const email = String(form.email ?? "").trim();
  const company = String(form.company ?? "").trim();
  const budget = String(form.budget ?? "").trim();
  const brief = String(form.brief ?? "").trim();
  let services: string[] = [];

  if (Array.isArray(form.services)) {
    services = form.services.map(String).filter(Boolean);
  } else if (typeof form.services === "string" && form.services) {
    services = [form.services];
  }

  if (name.length < 2) errors.name = "Tell us your name.";
  if (name.length > 120) errors.name = "Too long.";
  if (!EMAIL_RE.test(email)) errors.email = "We need a real email.";
  if (brief.length < 10) errors.brief = "Give us a couple of sentences.";
  if (brief.length > 4000) errors.brief = "That's a novel — try 4,000 chars.";
  if (company.length > 200) errors.company = "Too long.";

  // Optional honeypot
  if (typeof form.website === "string" && form.website.trim() !== "") {
    errors._spam = "Spam detected.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data: { name, email, company, budget, brief, services },
  };
}

export function validateSubscriber(form: Record<string, unknown>) {
  const errors: FieldErrors = {};
  const email = String(form.email ?? "").trim();
  if (!EMAIL_RE.test(email)) errors.email = "We need a real email.";
  if (typeof form.website === "string" && form.website.trim() !== "") {
    errors._spam = "Spam detected.";
  }
  return { ok: Object.keys(errors).length === 0, errors, data: { email } };
}
