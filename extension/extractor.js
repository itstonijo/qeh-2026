/*
 * extractor.js — runs in the context of the target page.
 *
 * Exposes a single global, __scrobeExtract(options), that walks the live DOM
 * and returns a plain serializable object. It is injected on demand by the
 * popup via chrome.scripting.executeScript, so it must not rely on anything
 * outside the page itself.
 */
function __scrobeExtract(options) {
  options = options || {};

  var text = function (node) {
    return (node && node.textContent ? node.textContent : "").replace(/\s+/g, " ").trim();
  };

  var result = {
    url: location.href,
    title: document.title,
    scrobedAt: new Date().toISOString()
  };

  // --- Links & text --------------------------------------------------------
  if (options.links) {
    var anchors = Array.prototype.slice.call(document.querySelectorAll("a[href]"));
    result.links = anchors.map(function (a) {
      return { href: a.href, text: text(a), title: a.getAttribute("title") || null };
    });

    result.headings = Array.prototype.slice
      .call(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
      .map(function (h) {
        return { level: Number(h.tagName.slice(1)), text: text(h) };
      });

    result.text = (document.body ? document.body.innerText : "").trim();
  }

  // --- Tables --------------------------------------------------------------
  if (options.tables) {
    result.tables = Array.prototype.slice.call(document.querySelectorAll("table")).map(function (table) {
      var rows = Array.prototype.slice.call(table.rows).map(function (row) {
        return Array.prototype.slice.call(row.cells).map(function (cell) {
          return text(cell);
        });
      });
      var caption = table.caption ? text(table.caption) : null;
      return { caption: caption, rows: rows };
    });
  }

  // --- Structured / meta ---------------------------------------------------
  if (options.meta) {
    var meta = { tags: {}, openGraph: {}, twitter: {}, jsonLd: [] };

    Array.prototype.slice.call(document.querySelectorAll("meta")).forEach(function (m) {
      var key = m.getAttribute("property") || m.getAttribute("name");
      var content = m.getAttribute("content");
      if (!key || content == null) return;
      if (key.indexOf("og:") === 0) meta.openGraph[key.slice(3)] = content;
      else if (key.indexOf("twitter:") === 0) meta.twitter[key.slice(8)] = content;
      else meta.tags[key] = content;
    });

    Array.prototype.slice
      .call(document.querySelectorAll('script[type="application/ld+json"]'))
      .forEach(function (s) {
        try {
          meta.jsonLd.push(JSON.parse(s.textContent));
        } catch (e) {
          meta.jsonLd.push({ __parseError: true, raw: (s.textContent || "").slice(0, 2000) });
        }
      });

    var canonical = document.querySelector('link[rel="canonical"]');
    meta.canonical = canonical ? canonical.href : null;
    meta.lang = document.documentElement.getAttribute("lang") || null;

    result.meta = meta;
  }

  // --- Custom selector -----------------------------------------------------
  if (options.selector) {
    result.selector = { query: options.selector, matches: [] };
    try {
      var nodes = Array.prototype.slice.call(document.querySelectorAll(options.selector));
      result.selector.count = nodes.length;
      result.selector.matches = nodes.map(function (node) {
        var attrs = {};
        Array.prototype.slice.call(node.attributes).forEach(function (attr) {
          attrs[attr.name] = attr.value;
        });
        return {
          tag: node.tagName.toLowerCase(),
          text: text(node),
          href: node.getAttribute ? node.getAttribute("href") || null : null,
          attrs: attrs,
          html: node.innerHTML.slice(0, 5000)
        };
      });
    } catch (e) {
      result.selector.error = String(e && e.message ? e.message : e);
    }
  }

  return result;
}
