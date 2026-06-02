# Deploy

Quick-reference for getting this site live. Pick one path.

---

## Fastest path: GitHub Pages (free, static, auto-deploys)

The workflow at `.github/workflows/deploy-pages.yml` builds and deploys on every push to `main` or the working branch.

### One-time setup (your action required)

1. Open repo **[Settings → Pages](https://github.com/itstonijo/qeh-2026/settings/pages)**
2. Under **"Build and deployment"**, set **Source** to **"GitHub Actions"**
3. Save

That's the only manual step. Once it's set, the workflow will deploy on the next push (or re-run the latest one from the Actions tab).

### Live URL

After the first successful deploy: **https://itstonijo.github.io/qeh-2026/**

### Make the forms work on the static deploy

GitHub Pages is static-only. To keep the contact + newsletter forms functional, point them at a third-party endpoint.

1. Sign up at [formspree.io](https://formspree.io) (free tier is fine)
2. Create one form. Copy the action URL (`https://formspree.io/f/xxxxxxxx`)
3. In the repo: **Settings → Secrets and variables → Actions → Variables**
4. Add:
   - `PUBLIC_FORM_ENDPOINT` = your Formspree URL
   - `PUBLIC_NEWSLETTER_ENDPOINT` = same (or a second Formspree form)
5. Re-run the workflow from Actions tab

Without these the forms still render, but submitting shows a "set this env var" message.

### Troubleshooting

| Symptom | Fix |
| --- | --- |
| `build` job fails in <20s | Usually a missing dependency in package.json — check the Actions log |
| `deploy` job fails with "Pages is not enabled" | Do the one-time setup above |
| Pages URL 404s after deploy | Check Pages source is set to "GitHub Actions", not "Deploy from a branch" |
| Forms show "set this env var" message | Add the `PUBLIC_FORM_ENDPOINT` variable above and re-run |

---

## Full-stack path: Vercel (SSR + forms work natively)

```bash
git checkout claude/replicate-covert-website-pUbqF
npx vercel               # login the first time, then it deploys
```

Vercel autodetects Astro and uses the SSR adapter. `/api/contact` and `/api/subscribe` work natively. Submissions persist to a JSON file inside the container (ephemeral); set `CONTACT_WEBHOOK_URL` (e.g. Slack/Resend/Discord) for durable delivery.

---

## Self-hosted: Docker / Fly.io

### Docker

```bash
docker build -t covert .
docker run -p 4321:4321 -e HOST=0.0.0.0 -v covert-data:/app/.data covert
# Serves on http://localhost:4321
```

The mounted volume persists `briefs.jsonl` and `subscribers.jsonl` across restarts.

### Fly.io

```bash
fly launch --no-deploy --copy-config   # accept the existing fly.toml
fly deploy
```

Uses the Dockerfile. Region defaults to `syd`. Submissions persist to the `covert_data` volume.

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
