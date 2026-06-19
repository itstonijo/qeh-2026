/*
 * scrobe.js — a tiny DOM scrobbler.
 *
 * Watches the page and "scrobbles" (records) lightweight interaction events:
 *   - clicks on CTAs (anything with a [data-cta] attribute)
 *   - section views (sections scrolling into the viewport)
 *   - the initial page load, with any UTM parameters from the URL
 *
 * Events are kept in-memory, mirrored to localStorage, and (in debug mode)
 * logged to the console. Nothing is sent off the page — this is a local,
 * privacy-friendly probe you can read back via window.scrobe.events().
 */
(function (window, document) {
  "use strict";

  var STORAGE_KEY = "qeh.scrobe.events";
  var MAX_EVENTS = 500;

  // Debug logging is on when the page is served locally or ?scrobe=debug is set.
  var DEBUG =
    /[?&]scrobe=debug\b/.test(window.location.search) ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  function now() {
    return new Date().toISOString();
  }

  function readUtm() {
    var params = new URLSearchParams(window.location.search);
    var utm = {};
    ["source", "medium", "campaign", "content", "term"].forEach(function (key) {
      var value = params.get("utm_" + key);
      if (value) utm[key] = value;
    });
    return utm;
  }

  function load() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function persist(events) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (err) {
      /* storage full or unavailable — keep going in-memory only */
    }
  }

  var events = load();
  var utm = readUtm();

  function scrobble(type, detail) {
    var event = {
      type: type,
      at: now(),
      path: window.location.pathname,
      detail: detail || {}
    };
    events.push(event);
    if (events.length > MAX_EVENTS) {
      events = events.slice(events.length - MAX_EVENTS);
    }
    persist(events);
    if (DEBUG) {
      // eslint-disable-next-line no-console
      console.log("[scrobe] " + type, event.detail);
    }
    return event;
  }

  // --- CTA clicks ----------------------------------------------------------
  document.addEventListener(
    "click",
    function (e) {
      var target = e.target.closest ? e.target.closest("[data-cta]") : null;
      if (!target) return;
      scrobble("cta", {
        cta: target.getAttribute("data-cta"),
        text: (target.textContent || "").trim(),
        href: target.getAttribute("href") || null
      });
    },
    true
  );

  // --- Section views -------------------------------------------------------
  function watchSections() {
    var sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    if (!("IntersectionObserver" in window)) return;

    var seen = Object.create(null);
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          if (seen[id]) return;
          seen[id] = true;
          scrobble("view", { section: id });
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // --- Public API ----------------------------------------------------------
  window.scrobe = {
    events: function () {
      return events.slice();
    },
    last: function (type) {
      for (var i = events.length - 1; i >= 0; i--) {
        if (!type || events[i].type === type) return events[i];
      }
      return null;
    },
    clear: function () {
      events = [];
      persist(events);
      return true;
    },
    record: scrobble
  };

  function start() {
    scrobble("load", { utm: utm, referrer: document.referrer || null });
    watchSections();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})(window, document);
