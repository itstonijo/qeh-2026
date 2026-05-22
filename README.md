# Covert. — replica

A functioning multi-page Astro + Tailwind replica of a performance-led digital marketing agency site, modelled on [covert.com.au](https://www.covert.com.au).

Builds two ways:

- **SSR** (default `npm run build` → `npm start`) — full server with working `/api/contact` and `/api/subscribe` endpoints. Ship to Vercel / Netlify / Fly / Docker host.
- **Static** (`npm run build:static`) — every page prerendered, no server needed. Ship to GitHub Pages / Cloudflare Pages / any CDN. Forms can be wired to a 3rd-party endpoint (Formspree, Resend, etc.) via env vars.

## Stack

- [Astro 5](https://astro.build) — SSR + static prerendering per page
- [Tailwind CSS 4](https://tailwindcss.com) via the Vite plugin
- [`@astrojs/node`](https://docs.astro.build/en/guides/integrations-guide/node/) standalone adapter (SSR builds)
- [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- Tiny client JS only where it earns its keep (mobile nav, contact form, newsletter)

## Run locally

```bash
npm install
cp .env.example .env       # optional — defaults work
npm run dev                # dev server at http://127.0.0.1:4321
```

```bash
# SSR build (production, with working forms)
npm run build
npm start                  # node ./dist/server/entry.mjs

# Static build (for GitHub Pages and similar)
BASE_PATH=/qeh-2026 npm run build:static
npx serve dist
```

## Deploy

The repo ships with deploy configs for the four most common targets. Pick the one that fits — the SSR ones keep the forms working out of the box.

### GitHub Pages (auto-deploys via Actions — free, static only)

A workflow at [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml) builds the static site and publishes to GitHub Pages on every push to `main` or the working branch.

**One-time setup:** in this repo's settings → **Pages** → set **Source** to **"GitHub Actions"**. That's it. The next push (or a manual run of the workflow) will publish to `https://<owner>.github.io/qeh-2026/`.

Forms on the static deploy will need a 3rd-party endpoint. Configure two repository variables (Settings → Secrets and variables → Actions → Variables):

| Variable | Example |
| --- | --- |
| `PUBLIC_FORM_ENDPOINT` | `https://formspree.io/f/abcd1234` |
| `PUBLIC_NEWSLETTER_ENDPOINT` | `https://formspree.io/f/wxyz9876` |

Without these the static contact form will show a helpful "set this env var" message instead of submitting.

### Vercel

`vercel.json` is included. From the repo root:

```bash
npx vercel
```

Vercel autodetects Astro and uses the SSR adapter — `/api/contact` and `/api/subscribe` work without any extra config.

### Netlify

`netlify.toml` is included. Drag-and-drop the repo at [app.netlify.com](https://app.netlify.com) or:

```bash
npx netlify-cli deploy --build --prod
```

For Netlify's edge functions to host the SSR routes natively, swap the adapter in `astro.config.mjs` from `@astrojs/node` to `@astrojs/netlify`.

### Fly.io

`fly.toml` and a `Dockerfile` are included.

```bash
fly launch --no-deploy --copy-config
fly deploy
```

Submissions persist to a mounted volume at `/app/.data`.

### Docker / self-hosted

```bash
docker build -t covert .
docker run -p 4321:4321 -e HOST=0.0.0.0 -v covert-data:/app/.data covert
```

## Configuration

See [`.env.example`](./.env.example). All variables are optional.

| Variable | What it does |
| --- | --- |
| `SITE_URL` | Public URL used for sitemap and canonical |
| `BASE_PATH` | Base path for the site (e.g. `/qeh-2026` for GitHub Pages) |
| `HOST` / `PORT` | Server bind (default `127.0.0.1:4321`) |
| `BUILD_TARGET` | `static` switches the build to static output |
| `DATA_DIR` | Where submissions are appended (default `./.data`) |
| `CONTACT_WEBHOOK_URL` | Forward every submission to a Slack/Discord/Resend webhook |
| `ADMIN_TOKEN` | Enables `GET /api/admin/submissions?token=…` |
| `PUBLIC_FORM_ENDPOINT` | Static-build override for the contact form action |
| `PUBLIC_NEWSLETTER_ENDPOINT` | Static-build override for the newsletter form action |

## API (SSR builds only)

| Method | Path | Body | Returns |
| --- | --- | --- | --- |
| POST | `/api/contact` | `name`, `email`, `company?`, `budget?`, `services[]?`, `brief` | `{ ok, message }` or `{ ok:false, errors }` |
| POST | `/api/subscribe` | `email` | `{ ok, message }` |
| GET | `/api/admin/submissions?token=…` | – | `{ briefs, subscribers, counts }` (gated by `ADMIN_TOKEN`) |

Both POST endpoints accept either `application/x-www-form-urlencoded` (so HTML forms work without JS) or `application/json`. Both have a `website` honeypot for bot deflection.

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Hero, services, work showcase, stats, process, testimonial, CTA |
| `/about` | Studio story, principles, team |
| `/work` · `/work/[slug]` | Case-study index and 5 individual case studies |
| `/digital-marketing` · `/seo-agency-sydney` · `/content-creation` · `/digital-strategy` · `/website-app-development` | Five service pages |
| `/blog` · `/blog/[slug]` | Insights index and posts |
| `/contact` · `/thank-you` | Working brief form and success page |
| `/404` · `/robots.txt` · `/sitemap-index.xml` | – |
