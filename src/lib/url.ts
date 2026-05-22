const BASE = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

export function url(path: string): string {
  if (!path) return BASE || "/";
  if (/^(https?:|mailto:|tel:|#)/i.test(path)) return path;
  const clean = path.startsWith("/") ? path : "/" + path;
  if (clean === "/") return BASE ? BASE + "/" : "/";
  return BASE + clean;
}
