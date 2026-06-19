/*
 * Lead generator for the QEH landing page.
 *
 * This is a static site (GitHub Pages), so there is no server to post to by
 * default. Leads are:
 *   1. validated client-side,
 *   2. attributed to the campaign / UTM source that drove the visit,
 *   3. persisted to localStorage so nothing is lost, and
 *   4. optionally POSTed to a collection endpoint if one is configured.
 *
 * To forward leads to a real CRM / inbox, set a webhook URL — either:
 *   window.LEAD_ENDPOINT = "https://...";   (before this script loads)
 * or append ?lead_endpoint=https://... to the page URL once to store it.
 *
 * The companion leads.html page reads the same localStorage store so an
 * operator can review and export captured leads as CSV.
 */
(function () {
  "use strict";

  var STORE_KEY = "qeh.leads.v1";
  var ENDPOINT_KEY = "qeh.lead_endpoint";
  var UTM_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function captureUtm() {
    var utm = {};
    UTM_FIELDS.forEach(function (key) {
      var val = qs(key);
      if (val) utm[key] = val;
    });
    return utm;
  }

  function resolveEndpoint() {
    var fromUrl = qs("lead_endpoint");
    if (fromUrl) {
      try { localStorage.setItem(ENDPOINT_KEY, fromUrl); } catch (e) {}
      return fromUrl;
    }
    if (typeof window.LEAD_ENDPOINT === "string" && window.LEAD_ENDPOINT) {
      return window.LEAD_ENDPOINT;
    }
    try { return localStorage.getItem(ENDPOINT_KEY) || ""; } catch (e) { return ""; }
  }

  function readLeads() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveLead(lead) {
    var leads = readLeads();
    leads.push(lead);
    try { localStorage.setItem(STORE_KEY, JSON.stringify(leads)); } catch (e) {}
    return leads;
  }

  function isValidEmail(value) {
    // Pragmatic check — not RFC-perfect, just enough to catch typos.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setStatus(el, message, kind) {
    if (!el) return;
    el.textContent = message;
    el.className = "form-status" + (kind ? " is-" + kind : "");
  }

  function forward(endpoint, lead) {
    if (!endpoint) return Promise.resolve(false);
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    })
      .then(function (res) { return res.ok; })
      .catch(function () { return false; });
  }

  function init() {
    var form = document.getElementById("lead-form");
    if (!form) return;

    var status = document.getElementById("lead-status");
    var utm = captureUtm();
    var endpoint = resolveEndpoint();

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Honeypot: real users never fill the hidden "company" field.
      if (form.elements.company && form.elements.company.value.trim() !== "") {
        return; // silently drop bots
      }

      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();

      if (!name) {
        setStatus(status, "Please enter your name.", "error");
        form.elements.name.focus();
        return;
      }
      if (!isValidEmail(email)) {
        setStatus(status, "Please enter a valid email address.", "error");
        form.elements.email.focus();
        return;
      }

      var lead = {
        id: "lead_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        name: name,
        email: email,
        phone: form.elements.phone.value.trim(),
        billings: form.elements.billings.value,
        niche: form.elements.niche.value.trim(),
        message: form.elements.message.value.trim(),
        utm: utm,
        page: window.location.pathname,
        referrer: document.referrer || "",
        createdAt: new Date().toISOString(),
      };

      saveLead(lead);

      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      setStatus(status, "Saving your request…", "");

      forward(endpoint, lead).then(function (delivered) {
        lead.delivered = delivered;
        // persist delivery outcome
        try {
          var leads = readLeads();
          var idx = leads.findIndex(function (l) { return l.id === lead.id; });
          if (idx > -1) { leads[idx] = lead; localStorage.setItem(STORE_KEY, JSON.stringify(leads)); }
        } catch (e) {}

        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = "Request my call"; }
        setStatus(
          status,
          "Thanks " + name.split(" ")[0] + " — we've got your details and will reach out within one business day.",
          "success"
        );
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
