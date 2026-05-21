# Covert. — replica

A multi-page Astro + Tailwind replica of a performance-led digital marketing agency site, modelled on [covert.com.au](https://www.covert.com.au).

## Stack

- [Astro 5](https://astro.build) — content-first multi-page framework
- [Tailwind CSS 4](https://tailwindcss.com) — utility-first styling via the Vite plugin
- Zero client JS by default; small islands for nav and marquee only

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to dist/
npm run preview
```

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Hero, services, work showcase, stats, clients, testimonial, CTA |
| `/about` | Studio story, principles, team |
| `/work` | Full case-study index |
| `/work/[slug]` | Individual case studies (Di Lusso, buyers agency, hair salon group, gaming brand, online roses) |
| `/digital-marketing` | Services overview |
| `/seo-agency-sydney` | SEO service page |
| `/content-creation` | Content service page |
| `/digital-strategy` | Strategy service page |
| `/website-app-development` | Build service page |
| `/blog` | Insights index |
| `/contact` | Contact form + studio details |

## Notes on the design

- Dark canvas (`#0a0a0a`) with off-white type and an electric-lime accent (`#d4ff3a`)
- Display headlines use a tight-tracked grotesk; body uses Inter
- Layout is built on a 12-column grid with deliberate asymmetry on the work tiles
- All copy is original — written to match the positioning observable from search snippets, not lifted verbatim
