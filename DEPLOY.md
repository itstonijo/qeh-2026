# Deploy

The canonical deploy target is **Fly.io** (SSR + persistent submission store on a mounted volume). GitHub Pages was considered and dropped — Pages can only serve static files, so the `/api/contact` and `/api/subscribe` routes can't run there.

Other static-host options (Netlify, Cloudflare Pages, S3+CloudFront) can serve the `npm run build:static` output but the forms then need a third-party endpoint (Formspree etc.) wired via `PUBLIC_FORM_ENDPOINT` / `PUBLIC_NEWSLETTER_ENDPOINT`. The repo keeps `netlify.toml` and `vercel.json` for that flexibility.

---

## Docker (local or any container host)

```bash
docker build -t covert .
docker run -p 4321:4321 -e HOST=0.0.0.0 -v covert-data:/app/.data covert
# Serves on http://localhost:4321
```

The mounted volume persists `briefs.jsonl` and `subscribers.jsonl` across restarts.

---

## Fly.io — full runbook

Verified locally: `npm run build` produces `dist/server/entry.mjs`; the SSR server serves pages and `POST /api/contact`, `POST /api/subscribe` round-trip and persist to `.data/*.jsonl`. The Dockerfile + `fly.toml` in this repo lift that same setup onto Fly with a persistent volume.

**Prereqs**

- Install flyctl: `curl -L https://fly.io/install.sh | sh` (or `brew install flyctl`)
- Sign in: `fly auth login` (opens a browser)

**1. Pick an app name** (must be globally unique on Fly)

The repo's `fly.toml` uses `covert-replica`. If that's taken — or you want your own — edit `app = "..."` in `fly.toml` before launching. Same name will become `https://<app>.fly.dev`.

**2. Launch (no deploy yet)**

```bash
fly launch --copy-config --no-deploy --name <your-app-name>
```

`--copy-config` reuses the existing `fly.toml` (region `syd`, port 4321, mount, VM size).

**3. Create the persistent volume**

```bash
fly volumes create covert_data --region syd --size 1   # 1 GB is plenty
```

Name must match the `[[mounts]] source` in `fly.toml` — leave both as `covert_data` unless you change both.

**4. Set secrets**

```bash
fly secrets set \
  ADMIN_TOKEN="$(openssl rand -hex 24)" \
  SITE_URL="https://<your-app-name>.fly.dev"
# Optional: forward every submission to Slack/Discord/Resend
fly secrets set CONTACT_WEBHOOK_URL="https://hooks.slack.com/services/..."
```

Save the `ADMIN_TOKEN` value — you'll need it to read submissions.

**5. Deploy**

```bash
fly deploy
```

First build pulls Node 22 alpine + your `node_modules`; subsequent deploys layer-cache. Expect ~2–3 min first time, <60s after.

**6. Verify**

```bash
APP=<your-app-name>
TOKEN=<the ADMIN_TOKEN you set>

curl -sI https://$APP.fly.dev/                         # 200
curl -sX POST https://$APP.fly.dev/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Smoke","email":"smoke@test.com","brief":"Verifying the live API responds and persists."}'
# → {"ok":true,"message":"Thanks — we'll be in touch within one business day.", ...}

curl -s "https://$APP.fly.dev/api/admin/submissions?token=$TOKEN" | jq '.counts'
# → {"briefs":1,"subscribers":0}
```

**7. Custom domain** (optional)

```bash
fly certs create covert.com.au
# Add the DNS records Fly prints, then:
fly certs check covert.com.au
fly secrets set SITE_URL="https://covert.com.au"
fly deploy   # re-render sitemap with the right canonical
```

**Day-2 operations**

```bash
fly logs                                   # live tail
fly ssh console -C "ls -la /app/.data"     # peek at the JSONL files
fly ssh console -C "cat /app/.data/briefs.jsonl"
fly scale count 1                          # already the default
fly status
```

**Gotchas**

| Symptom | Fix |
| --- | --- |
| `Could not find App` on `fly deploy` | App name in `fly.toml` doesn't exist yet — re-run step 2 |
| Pages render but `/api/*` returns 404 | Build was run with `BUILD_TARGET=static`. Default `npm run build` is correct for Fly; don't set the env. |
| Submissions vanish on redeploy | Volume not mounted. Check `fly volumes list` shows `covert_data` attached, region matches the app's primary region. |
| `/api/admin/submissions` returns 503 | `ADMIN_TOKEN` secret not set — re-run step 4. |
| 502/cold start delay | `auto_stop_machines = "stop"` in `fly.toml` saves cost; flip to `"off"` and set `min_machines_running = 1` to keep it always warm. |

---

## Build modes — quick reference

| Command | Output | Forms |
| --- | --- | --- |
| `npm run dev` | Dev server, HMR | Local Node API |
| `npm run build` | SSR build in `dist/` | Local Node API |
| `npm start` | Runs the SSR build | Local Node API |
| `npm run build:static` | Static files in `dist/` | 3rd-party endpoint |

## Env vars

| Variable | Used by | Default |
| --- | --- | --- |
| `SITE_URL` | Sitemap, canonical | `https://covert.example.com` |
| `BASE_PATH` | Site base path | `/` (or `/qeh-2026` in static mode) |
| `HOST` / `PORT` | SSR server bind | `127.0.0.1:4321` |
| `CONTACT_WEBHOOK_URL` | Forward submissions to Slack/Resend/etc | — |
| `ADMIN_TOKEN` | Gate `/api/admin/submissions` | — |
| `PUBLIC_FORM_ENDPOINT` | Static-build contact form action | `/api/contact` |
| `PUBLIC_NEWSLETTER_ENDPOINT` | Static-build newsletter form action | `/api/subscribe` |
| `DATA_DIR` | Where submissions persist | `./.data` |
