# DOM Scrobe — browser extension

A Manifest V3 browser extension that extracts data from whatever page you're on
and downloads it as a single JSON file. No servers, no tracking — everything runs
locally in your browser and the data only ever lands in your Downloads folder.

## What it pulls

- **Links & text** — every `<a href>` (absolute URL + text), all headings, and the
  page's visible text (`innerText`).
- **Tables** — each `<table>` as `{ caption, rows }`, rows being arrays of cell text.
- **Structured / meta** — `<meta>` tags, OpenGraph (`og:*`), Twitter cards,
  `<link rel="canonical">`, page language, and every `application/ld+json` block
  parsed into JSON.
- **Custom CSS selector** — tick the box, type a selector (e.g. `.product-card .price`),
  and get every match back with its text, attributes, `href`, and inner HTML.

Tick only what you need in the popup, then hit **Extract & download**.

## Install (Chrome / Edge / Brave)

1. Go to `chrome://extensions`.
2. Turn on **Developer mode** (top-right).
3. Click **Load unpacked** and select this `extension/` folder.
4. Pin "DOM Scrobe", open any site, click the icon, choose options, download.

## Install (Firefox)

1. Go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on** and pick `extension/manifest.json`.
   (Temporary add-ons are cleared when Firefox restarts.)

## Permissions

- `activeTab` + `scripting` — read the page **only** when you click the button.
- `downloads` — save the JSON file.

It never runs in the background and requests no host permissions, so it touches a
page only on your explicit click.

## Output

A file named `scrobe-<host>-<timestamp>.json`, e.g.:

```json
{
  "url": "https://example.com/products",
  "title": "Products",
  "scrobedAt": "2026-06-19T05:58:00.000Z",
  "links": [{ "href": "https://example.com/a", "text": "Item A", "title": null }],
  "headings": [{ "level": 1, "text": "Products" }],
  "tables": [{ "caption": null, "rows": [["Name", "Price"], ["A", "$9"]] }],
  "meta": { "tags": {}, "openGraph": {}, "twitter": {}, "jsonLd": [], "canonical": null }
}
```

## A note on responsible use

Only scrape pages you're allowed to. Respect each site's Terms of Service and
`robots.txt`, don't collect personal data without a lawful basis, and don't
hammer servers. This tool acts on a single page you've already loaded, on your
click — keep it that way.
