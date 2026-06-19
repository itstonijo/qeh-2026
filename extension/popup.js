/* popup.js — drives the extension popup: read options, inject the extractor,
 * collect the result, and download it as a JSON file. */

const $ = (id) => document.getElementById(id);
const status = (msg) => { $("status").textContent = msg; };

function safeName(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    return `scrobe-${host}-${stamp}.json`;
  } catch (e) {
    return `scrobe-${Date.now()}.json`;
  }
}

async function run() {
  const button = $("run");
  button.disabled = true;
  status("Reading page…");

  const options = {
    links: $("opt-links").checked,
    tables: $("opt-tables").checked,
    meta: $("opt-meta").checked,
    selector: $("opt-selector").checked ? $("selector").value.trim() : ""
  };

  if ($("opt-selector").checked && !options.selector) {
    status("Enter a CSS selector or untick that box.");
    button.disabled = false;
    return;
  }

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) throw new Error("No active tab.");
    if (/^(chrome|edge|about|chrome-extension):/i.test(tab.url || "")) {
      throw new Error("This page can't be scrobed (browser-internal page).");
    }

    // Inject the extractor definition, then call it with our options.
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["extractor.js"]
    });

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (opts) => window.__scrobeExtract(opts),
      args: [options]
    });

    const json = JSON.stringify(result, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    await chrome.downloads.download({
      url,
      filename: safeName(result.url || tab.url),
      saveAs: false
    });

    // Give the download a moment to start before releasing the blob.
    setTimeout(() => URL.revokeObjectURL(url), 10000);

    const bits = [];
    if (result.links) bits.push(`${result.links.length} links`);
    if (result.tables) bits.push(`${result.tables.length} tables`);
    if (result.selector) bits.push(`${result.selector.count || 0} matches`);
    status(`Saved — ${bits.join(", ") || "data"}.`);
  } catch (e) {
    status("Error: " + (e && e.message ? e.message : String(e)));
  } finally {
    button.disabled = false;
  }
}

$("run").addEventListener("click", run);

// Enable the selector box's checkbox automatically when the user types.
$("selector").addEventListener("input", () => {
  if ($("selector").value.trim()) $("opt-selector").checked = true;
});
