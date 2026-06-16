# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## What this is

`qeh-2026` is a **single-page static marketing landing page**. There is no
build step, no framework, no package manager, and no server — just hand-written
HTML and CSS that can be opened directly in a browser.

The page is a reference replication of an "xRecruiter"-style
*recruitment-agency-in-a-box* offering ("Run your own recruitment agency. Keep
90% of your billings."). The single call-to-action sends visitors to an external
UTM-tagged strategy-call booking URL.

## Repository layout

```
.
├── index.html            # The entire page. All copy and structure live here.
├── assets/
│   └── styles.css        # All styling. Dark theme driven by CSS custom properties.
├── campaigns/
│   └── campaigns.json    # Log of UTM-tagged campaign links used by the page.
├── docs-inbox/           # "Drop box": put source documents here to convert to Markdown.
├── docs-md/              # Output: Markdown generated from docs-inbox/.
├── scripts/
│   └── convert-docs.sh   # Converts everything in docs-inbox/ into docs-md/*.md.
└── .gitignore            # Ignores render artifacts + drop-box contents.
```

There is no application code, no tests, and no CI workflows (a previous Jekyll /
GitHub Pages workflow was intentionally removed — see git history). Keep it that
way unless explicitly asked to add tooling.

### `index.html`
A standard `<!doctype html>` document. Content is organized into anchored
`<section>` blocks linked from the sticky nav:

- `#top` — hero (`.hero`) with headline, lede, CTA row, `.hero-stats`
- `#offer` — "what you get" feature cards (`.grid.grid-4 > .card`)
- `#programs` — three program cards (`.grid.grid-3 > .program`)
- `#how` — three-step process (`.steps`)
- `#proof` — results/stats (`.proof-grid .stat`)
- `#book` — final CTA, links to the external booking URL
- footer — copyright + link to `campaigns/campaigns.json`

### `assets/styles.css`
One stylesheet, no preprocessor. The visual system is defined by CSS variables
in `:root` (colors `--bg`, `--panel`, `--accent`, etc.; layout `--radius`,
`--maxw`). Layout uses CSS grid (`.grid-3`, `.grid-4`) with mobile breakpoints
at `900px`, `800px`, and `560px`. Use the existing variables and component
classes rather than introducing new colors or one-off inline styles.

### `campaigns/campaigns.json`
A small JSON ledger of marketing links. Each entry records the full UTM URL, the
clean `destination`, the parsed `utm` params (`source`, `medium`, `campaign`,
`content`), plus a `name`, `id`, and `notes`. When you add or change a CTA link
in `index.html`, add the corresponding entry here so the two stay in sync.

### Document drop box (`docs-inbox/` → `docs-md/`)
A workspace for turning arbitrary documents into Markdown. Drop any file
(Word, PDF, PowerPoint, Excel, HTML, CSV, plain text, …) into `docs-inbox/`,
then generate Markdown two ways:

- **Self-serve script**: `scripts/convert-docs.sh` (optionally pass a filename
  to convert just one). It picks the best converter installed —
  [markitdown](https://github.com/microsoft/markitdown) (recommended, widest
  coverage), then `pandoc`, then `pdftotext` for PDFs; `.txt`/`.md` are copied
  as-is. Output lands in `docs-md/`.
- **Ask Claude**: for messy layouts or scanned PDFs, drop the file in and ask
  Claude to convert it — it reads the document and writes clean, well-structured
  Markdown by hand (better than mechanical conversion).

Contents of `docs-inbox/` and `docs-md/` are git-ignored so source documents
stay private; commit a specific output with `git add -f docs-md/<file>.md`. The
folders themselves are kept in the repo via `.gitkeep` (and `docs-inbox/README.md`).

## Conventions

- **HTML**: 2-space indentation, lowercase tags/attributes, double-quoted
  attribute values, HTML entities (`&rarr;`, `&amp;`, `&copy;`). CTA links carry
  a `data-cta="..."` attribute identifying their placement (e.g. `nav`, `hero`,
  `program-90`, `footer`) — preserve this pattern for any new CTAs.
- **CSS**: lowercase hex colors, group rules under the existing
  `/* section */` comment banners, drive theming through the `:root` variables.
- **Links**: internal navigation uses in-page `#anchor` hrefs; the booking CTA
  uses the full external UTM URL (keep it identical to the matching
  `campaigns.json` entry).
- **No dependencies**: do not add npm/yarn, frameworks, or external CDN assets
  unless the user explicitly requests it.

## Development workflow

There is nothing to install or compile.

- **Preview**: open `index.html` in a browser, or serve the folder, e.g.
  `python3 -m http.server` then visit `http://localhost:8000`.
- **Edit copy/structure**: change `index.html`.
- **Edit look/feel**: change `assets/styles.css` (prefer existing variables).
- **Track a campaign link**: update `campaigns/campaigns.json`.
- Screenshot artifacts (`screenshot.png`, `screenshot-full.png`) are
  git-ignored; don't commit them.

## Git & PR workflow

- Active development branch for AI-assisted work: `claude/claude-md-docs-j6b7hb`.
  Do not push to `main` without explicit permission.
- Commit messages follow Conventional Commits style (`chore:`, `feat:`, ...),
  matching existing history.
- Push with `git push -u origin <branch>`, then open a **draft** pull request if
  one doesn't already exist for the branch.
