#!/usr/bin/env bash
#
# convert-docs.sh — Turn everything in docs-inbox/ into Markdown under docs-md/.
#
# Usage:
#   scripts/convert-docs.sh                 # convert every file in docs-inbox/
#   scripts/convert-docs.sh report.docx     # convert one file (name in docs-inbox/ or a path)
#
# Conversion strategy — the best available tool wins, per file:
#   1. markitdown — broadest coverage (docx, pptx, xlsx, pdf, html, csv, images, …)
#   2. pandoc     — docx, odt, rtf, html, epub, latex, …
#   3. pdftotext  — PDFs (from poppler-utils), when markitdown is absent
#   4. plain copy — .txt / .md
#
# Install at least one converter:
#   markitdown (recommended):  pipx install markitdown   (or: pip install 'markitdown[all]')
#   pandoc:                    https://pandoc.org/installing.html
#   poppler-utils (PDF):       apt install poppler-utils  /  brew install poppler
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INBOX="$ROOT/docs-inbox"
OUTDIR="$ROOT/docs-md"

mkdir -p "$OUTDIR"

have() { command -v "$1" >/dev/null 2>&1; }

if ! have markitdown && ! have pandoc && ! have pdftotext; then
  cat >&2 <<'MSG'
Note: no document converter found — only .txt/.md files will be copied.
To convert Word, PDF, and other formats, install at least one of:
  • markitdown (recommended, broadest):  pipx install markitdown
  • pandoc:                               https://pandoc.org/installing.html
  • poppler-utils (PDFs only):            apt install poppler-utils  /  brew install poppler

MSG
fi

convert_one() {
  local src="$1" base name ext out
  base="$(basename "$src")"
  name="${base%.*}"
  ext="$(printf '%s' "${base##*.}" | tr '[:upper:]' '[:lower:]')"
  out="$OUTDIR/$name.md"

  # Plain text and existing Markdown pass straight through.
  if [[ "$ext" == "txt" || "$ext" == "md" || "$ext" == "markdown" ]]; then
    cp "$src" "$out"
    echo "copied      $base"
    return
  fi

  # Preferred: markitdown handles the widest range of formats.
  if have markitdown && markitdown "$src" -o "$out" 2>/dev/null && [[ -s "$out" ]]; then
    echo "markitdown  $base"
    return
  fi

  # Fallbacks by type.
  case "$ext" in
    pdf)
      if have pdftotext && pdftotext -layout "$src" "$out" 2>/dev/null && [[ -s "$out" ]]; then
        echo "pdftotext   $base"
        return
      fi
      ;;
    docx|odt|rtf|html|htm|epub|tex|odp|ods|csv)
      if have pandoc && pandoc "$src" -t gfm -o "$out" 2>/dev/null && [[ -s "$out" ]]; then
        echo "pandoc      $base"
        return
      fi
      ;;
  esac

  # Generic pandoc attempt for anything left over.
  if have pandoc && pandoc "$src" -t gfm -o "$out" 2>/dev/null && [[ -s "$out" ]]; then
    echo "pandoc      $base"
    return
  fi

  rm -f "$out"
  echo "SKIPPED     $base — no available tool handled .$ext" >&2
}

# Collect targets: explicit args, or everything in the drop box.
targets=()
if [[ $# -gt 0 ]]; then
  for a in "$@"; do
    if [[ -f "$a" ]]; then
      targets+=("$a")
    elif [[ -f "$INBOX/$a" ]]; then
      targets+=("$INBOX/$a")
    else
      echo "not found: $a" >&2
    fi
  done
else
  while IFS= read -r -d '' f; do
    targets+=("$f")
  done < <(find "$INBOX" -type f ! -name '.gitkeep' ! -name 'README.md' -print0)
fi

if [[ ${#targets[@]} -eq 0 ]]; then
  echo "Nothing to convert. Drop files into docs-inbox/ first."
  exit 0
fi

for f in "${targets[@]}"; do
  convert_one "$f"
done

echo "Done. Markdown is in ${OUTDIR#"$ROOT"/}/."
