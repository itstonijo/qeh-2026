/* popup.js — drives the extension popup.
 *
 * Two modes:
 *   - Current page: inject the extractor into the active tab, download JSON or CSV.
 *   - Batch: open each URL in a hidden tab, scrobe it, close it, download one JSON array.
 */

const $ = (id) => document.getElementById(id);
const status = (msg) => { $("status").textContent = msg; };

/* ---- helpers ----------------------------------------------------------- */

function gatherOptions() {
  return {
    links: $("opt-links").checked,
    tables: $("opt-tables").checked,
    meta: $("opt-meta").checked,
    selector: $("opt-selector").checked ? $("selector").value.trim() : ""
  };
}

function hostOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch (e) { return "page"; }
}

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function isScrobeable(url) {
  return url && !/^(chrome|edge|about|chrome-extension|moz-extension|view-source|data):/i.test(url);
}

function download(filename, mime, content) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({ url, filename, saveAs: false });
  setTimeout(() => URL.revokeObjectURL(url), 15000);
}

/* ---- CSV ---------------------------------------------------------------- */

function csvCell(value) {
  const s = value == null ? "" : String(value);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function toCsv(rows) {
  return rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
}

/* Turn one extraction result into a list of { name, content } CSV files. */
function resultToCsvFiles(result) {
  const base = `scrobe-${hostOf(result.url)}-${stamp()}`;
  const files = [];

  if (Array.isArray(result.tables)) {
    result.tables.forEach((table, i) => {
      if (table.rows.length) files.push({ name: `${base}-table-${i + 1}.csv`, content: toCsv(table.rows) });
    });
  }

  if (Array.isArray(result.links) && result.links.length) {
    const rows = [["text", "href", "title"]].concat(
      result.links.map((l) => [l.text, l.href, l.title])
    );
    files.push({ name: `${base}-links.csv`, content: toCsv(rows) });
  }

  if (result.selector && Array.isArray(result.selector.matches) && result.selector.matches.length) {
    const rows = [["text", "href", "tag"]].concat(
      result.selector.matches.map((m) => [m.text, m.href, m.tag])
    );
    files.push({ name: `${base}-selector.csv`, content: toCsv(rows) });
  }

  if (result.meta) {
    const rows = [["key", "value"]];
    const push = (prefix, obj) => Object.keys(obj || {}).forEach((k) => rows.push([prefix + k, obj[k]]));
    push("", result.meta.tags);
    push("og:", result.meta.openGraph);
    push("twitter:", result.meta.twitter);
    if (rows.length > 1) files.push({ name: `${base}-meta.csv`, content: toCsv(rows) });
  }

  return files;
}

/* ---- extraction --------------------------------------------------------- */

async function extractTab(tabId, options) {
  await chrome.scripting.executeScript({ target: { tabId }, files: ["extractor.js"] });
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    func: (opts) => window.__scrobeExtract(opts),
    args: [options]
  });
  return result;
}

/* ---- current-page mode -------------------------------------------------- */

async function runSingle() {
  const button = $("run-single");
  button.disabled = true;
  status("Reading page…");

  const options = gatherOptions();
  if ($("opt-selector").checked && !options.selector) {
    status("Enter a CSS selector or untick that box.");
    button.disabled = false;
    return;
  }

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) throw new Error("No active tab.");
    if (!isScrobeable(tab.url)) throw new Error("This page can't be scrobed (browser-internal page).");

    const result = await extractTab(tab.id, options);
    const format = document.querySelector('input[name="format"]:checked').value;

    if (format === "csv") {
      const files = resultToCsvFiles(result);
      if (!files.length) { status("Nothing tabular to export as CSV. Try JSON."); button.disabled = false; return; }
      files.forEach((f) => download(f.name, "text/csv", f.content));
      status(`Saved ${files.length} CSV file(s).`);
    } else {
      download(`scrobe-${hostOf(result.url)}-${stamp()}.json`, "application/json", JSON.stringify(result, null, 2));
      const bits = [];
      if (result.links) bits.push(`${result.links.length} links`);
      if (result.tables) bits.push(`${result.tables.length} tables`);
      if (result.selector) bits.push(`${result.selector.count || 0} matches`);
      status(`Saved JSON — ${bits.join(", ") || "data"}.`);
    }
  } catch (e) {
    status("Error: " + (e && e.message ? e.message : String(e)));
  } finally {
    button.disabled = false;
  }
}

/* ---- batch mode --------------------------------------------------------- */

function waitForLoad(tabId, timeoutMs) {
  return new Promise((resolve) => {
    let done = false;
    const finish = () => { if (done) return; done = true; chrome.tabs.onUpdated.removeListener(listener); resolve(); };
    const listener = (id, info) => { if (id === tabId && info.status === "complete") finish(); };
    chrome.tabs.onUpdated.addListener(listener);
    // In case it's already complete:
    chrome.tabs.get(tabId, (t) => { if (t && t.status === "complete") finish(); });
    setTimeout(finish, timeoutMs);
  });
}

async function scrobeUrl(url, options) {
  let tab;
  try {
    tab = await chrome.tabs.create({ url, active: false });
    await waitForLoad(tab.id, 20000);
    await new Promise((r) => setTimeout(r, 600)); // settle for late-rendering content
    const result = await extractTab(tab.id, options);
    return { url, ok: true, result };
  } catch (e) {
    return { url, ok: false, error: e && e.message ? e.message : String(e) };
  } finally {
    if (tab && tab.id) { try { await chrome.tabs.remove(tab.id); } catch (e) { /* already gone */ } }
  }
}

async function runBatch() {
  const button = $("run-batch");
  const urls = $("urls").value.split("\n").map((s) => s.trim()).filter(Boolean);

  if (!urls.length) { status("Add at least one URL."); return; }
  const bad = urls.filter((u) => !isScrobeable(u) || !/^https?:\/\//i.test(u));
  if (bad.length) { status("These don't look like http(s) URLs:\n" + bad.join("\n")); return; }

  const options = gatherOptions();
  if ($("opt-selector").checked && !options.selector) { status("Enter a CSS selector or untick that box."); return; }

  button.disabled = true;
  const out = [];
  for (let i = 0; i < urls.length; i++) {
    status(`Scrobing ${i + 1}/${urls.length}…\n${urls[i]}`);
    out.push(await scrobeUrl(urls[i], options)); // sequential keeps it gentle on sites
  }

  download(`scrobe-batch-${stamp()}.json`, "application/json", JSON.stringify(out, null, 2));
  const ok = out.filter((r) => r.ok).length;
  status(`Done — ${ok}/${urls.length} pages scrobed. Saved JSON.`);
  button.disabled = false;
}

/* ---- wiring ------------------------------------------------------------- */

function showPane(which) {
  $("tab-single").classList.toggle("active", which === "single");
  $("tab-batch").classList.toggle("active", which === "batch");
  $("pane-single").classList.toggle("active", which === "single");
  $("pane-batch").classList.toggle("active", which === "batch");
  status("");
}

$("tab-single").addEventListener("click", () => showPane("single"));
$("tab-batch").addEventListener("click", () => showPane("batch"));
$("run-single").addEventListener("click", runSingle);
$("run-batch").addEventListener("click", runBatch);
$("selector").addEventListener("input", () => { if ($("selector").value.trim()) $("opt-selector").checked = true; });
