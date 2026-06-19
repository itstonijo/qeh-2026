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

Tick only what you need in the popup, then hit **Extract current page**.

## Output formats

- **JSON** (default) — one file with everything you ticked.
- **CSV** — each tabular dataset is exported as its own `.csv`: one per `<table>`,
  plus `…-links.csv`, `…-selector.csv`, and `…-meta.csv` when those are present.

## Batch mode

Switch to the **Batch URLs** tab, paste one URL per line, and hit **Run batch**.
Each URL is opened in a hidden background tab, scrobed (with the same "what to grab"
options), then closed — sequentially, to stay gentle on the sites. The result is a
single `scrobe-batch-<timestamp>.json` array, one entry per URL:

```json
[
  { "url": "https://example.com/a", "ok": true, "result": { "...": "..." } },
  { "url": "https://example.com/b", "ok": false, "error": "timed out" }
]
```

Keep the popup open while a batch runs — it drives the tabs from the popup.

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

- `activeTab` + `scripting` — read pages when you click a button.
- `downloads` — save the JSON/CSV files.
- `tabs` + `<all_urls>` — needed for **batch mode** to open, read and close the
  background tabs you list. Single-page mode only ever reads the tab you're on,
  on your click.

It never runs in the background on its own — extraction happens only when you
press a button in the popup.

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
