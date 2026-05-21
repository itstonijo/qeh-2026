# Covert. — replica

A functioning multi-page Astro + Tailwind replica of a performance-led digital marketing agency site, modelled on [covert.com.au](https://www.covert.com.au).

## Stack

- [Astro 5](https://astro.build) in SSR mode with static prerendering per page
- [Tailwind CSS 4](https://tailwindcss.com) via the Vite plugin
- [`@astrojs/node`](https://docs.astro.build/en/guides/integrations-guide/node/) standalone adapter
- [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- Tiny client JS only where it earns its keep (mobile nav, contact form, newsletter)

## Run it

```bash
npm install
cp .env.example .env       # optional — defaults work
npm run dev                # dev server at http://127.0.0.1:4321
npm run build              # builds static pages + SSR server entry to dist/
npm start                  # runs the SSR server: node ./dist/server/entry.mjs
```

The site is fully functional out of the box:

- Every content page is statically prerendered for speed and CDN-friendliness
- The contact and newsletter forms POST to real server endpoints
- Submissions are appended to `.data/briefs.jsonl` and `.data/subscribers.jsonl`
- An optional `CONTACT_WEBHOOK_URL` forwards every submission to Slack / Discord / Resend / anywhere

## Configuration

See [`.env.example`](./.env.example). All variables are optional.

| Variable | What it does |
| --- | --- |
| `SITE_URL` | Public URL used for sitemap and canonical |
| `HOST` / `PORT` | Server bind (default `127.0.0.1:4321`) |
| `DATA_DIR` | Where submissions are appended (default `./.data`) |
| `CONTACT_WEBHOOK_URL` | Forward every submission to a webhook |
| `ADMIN_TOKEN` | Enables `GET /api/admin/submissions?token=…` |

## API

| Method | Path | Body | Returns |
| --- | --- | --- | --- |
| POST | `/api/contact` | `name`, `email`, `company?`, `budget?`, `services[]?`, `brief` | `{ ok, message }` on success, `{ ok:false, errors }` on validation failure |
| POST | `/api/subscribe` | `email` | `{ ok, message }` |
| GET | `/api/admin/submissions?token=…` | – | `{ briefs, subscribers, counts }` (disabled unless `ADMIN_TOKEN` set) |

Both POST endpoints accept either `application/x-www-form-urlencoded` (so HTML forms work without JS) or `application/json`. They both implement a `website` honeypot for bot deflection.

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Hero, services, work showcase, stats, process, testimonial, CTA |
| `/about` | Studio story, principles, team |
| `/work` | Case-study index |
| `/work/[slug]` | Individual case studies (Di Lusso, buyers agency, salon group, gaming, online roses) |
| `/digital-marketing` | Services overview |
| `/seo-agency-sydney` · `/content-creation` · `/digital-strategy` · `/website-app-development` | Other service pages |
| `/blog` · `/blog/[slug]` | Insights index and posts |
| `/contact` | Working brief form |
| `/thank-you` | Success page after a brief is sent |
| `/404` · `/robots.txt` · `/sitemap-index.xml` | – |

## Design notes

- Dark canvas (`#0a0a0a`) with off-white type and an electric-lime accent (`#d4ff3a`)
- Display headlines in Space Grotesk; body in Inter; eyebrows in JetBrains Mono
- Asymmetric work grid built on a 12-column system
- All copy is original — written to match the positioning observable from search snippets, not lifted verbatim
