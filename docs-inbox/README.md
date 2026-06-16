# docs-inbox — document drop box

Drop any document in here, then turn it into Markdown. Works two ways.

## 1. Self-serve script

```sh
scripts/convert-docs.sh            # convert everything in this folder
scripts/convert-docs.sh notes.docx # convert just one file
```

Output Markdown lands in `../docs-md/`. The script picks the best converter
installed on your machine:

- **markitdown** (recommended, widest coverage — Word, PowerPoint, Excel, PDF,
  HTML, CSV, images): `pipx install markitdown`
- **pandoc** (Word, ODT, RTF, HTML, EPUB, LaTeX …): https://pandoc.org/installing.html
- **poppler-utils** (PDFs, used when markitdown isn't present):
  `apt install poppler-utils` or `brew install poppler`

Install at least one. With **markitdown** alone you can convert essentially any
common document type.

## 2. Ask Claude

For messy layouts, scanned PDFs, or when you want clean, well-structured
Markdown (proper headings, tables, lists), drop the file here and ask Claude
Code to convert it. Claude reads the document and writes the Markdown by hand —
higher quality than a mechanical conversion.

## What gets committed

Nothing in `docs-inbox/` or `docs-md/` is committed by default (see
`.gitignore`) — your source documents stay private. To keep a specific
converted file in the repo:

```sh
git add -f docs-md/your-file.md
```
