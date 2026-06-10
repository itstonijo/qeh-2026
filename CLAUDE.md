# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## What this is

A single-page static marketing site — **QEH/2026**, a "recruitment-agency-in-a-box"
landing page that replicates a publicly described xRecruiter offering. The page pitches
experienced recruiters on launching their own agency while keeping 90% of billings, with
a primary CTA to book a strategy call.

There is **no build step, no framework, no package manager, and no JavaScript**. It is
plain HTML + CSS served as static files. Treat it as a hand-edited static site.

## Structure

```
index.html              Entire page markup — all sections live here, single file
assets/styles.css       All styling — design tokens + component styles, single file
campaigns/campaigns.json Log of UTM-tagged campaign links used in CTAs
.gitignore              Ignores local render artifacts (screenshot*.png)
```

`index.html` is organized as a sequence of `<section>` blocks, each with an `id` used by
the in-page nav: `#top` (hero), `#offer`, `#programs`, `#how`, `#proof`, `#book`, plus the
sticky `.nav` header and `.footer`. The nav links and section ids must stay in sync.

## Conventions

- **One file per concern.** Markup goes in `index.html`; styling goes in
  `assets/styles.css`. Do not introduce inline styles or `<style>`/`<script>` blocks unless
  there is a clear reason.
- **Design tokens.** Colors, radius, and max-width are CSS custom properties under `:root`
  in `styles.css` (`--bg`, `--accent`, `--radius`, `--maxw`, etc.). Reuse these tokens —
  don't hardcode new hex values when a token exists. The look is a dark theme with a yellow
  (`--accent: #ffd23f`) accent.
- **Layout.** Content is centered with `.container` (max-width via `--maxw`). Card/grid
  layouts use `.grid` + `.grid-3` / `.grid-4`. Reuse existing component classes
  (`.card`, `.program`, `.btn`, `.btn-primary`, etc.) before adding new ones.
- **Responsive.** Breakpoints are at 900px, 800px, and 560px. Keep new grids responsive in
  the same style (collapse to 2 columns, then 1).
- **CTAs and tracking.** Buttons carry a `data-cta="..."` attribute identifying their
  placement (e.g. `nav`, `hero`, `footer`, `program-90`). When adding a CTA, give it a
  descriptive `data-cta` value. The outbound booking link uses UTM parameters — see below.
- **Campaign links.** When you add or change a UTM-tagged outbound link in the markup,
  record it in `campaigns/campaigns.json` with its `id`, `name`, full `url`, `destination`,
  and parsed `utm` fields, matching the existing entry's shape. The footer links to this
  file as the "campaign log."

## Developing / previewing

There is nothing to compile. Open `index.html` directly in a browser, or serve the folder:

```
python3 -m http.server 8000   # then visit http://localhost:8000
```

`screenshot.png` / `screenshot-full.png` are gitignored local render artifacts — don't
commit them.

## Git workflow

- Default branch is `main`. Active development for this task happens on
  `claude/claude-md-docs-0bm47z`.
- Commit messages in history use short, imperative/`type:`-style summaries
  (e.g. `chore: remove unused Jekyll Pages workflow`, `Add UTM-tagged campaign log...`).
  Follow that style.
- Changes land via pull request against `main`.

## When making changes

- Keep copy consistent with the existing voice: direct, benefit-led, recruiter-facing.
- Preserve the nav ↔ section-id contract when adding, removing, or renaming sections.
- Verify visually in a browser since there are no automated tests or linters.
