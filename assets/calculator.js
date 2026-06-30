/*
 * calculator.js — drives the recruiter earnings calculator and lead capture.
 *
 * Two jobs:
 *   1. Live-calculate take-home (employee vs. own agency) as the sliders move.
 *   2. Capture the lead and POST it to a Google Apps Script endpoint, which
 *      writes the row to a Google Sheet and emails it via Gmail.
 *
 * To go live, deploy automation/leads-apps-script.gs as a Web App and paste
 * its /exec URL into LEAD_ENDPOINT below. Until then the form runs in demo
 * mode (validates + shows success, but doesn't send anywhere).
 */
(function () {
  "use strict";

  // ── CONFIG ────────────────────────────────────────────────────────────────
  // Paste your Apps Script Web App URL here (ends in /exec). See SETUP.md.
  var LEAD_ENDPOINT = "";
  var AGENCY_SHARE = 0.9; // you keep 90% of billings

  // ── Calculator ─────────────────────────────────────────────────────────────
  var feeRange = document.getElementById("feeRange");
  var placementsRange = document.getElementById("placementsRange");
  var rateRange = document.getElementById("rateRange");

  var feeOut = document.getElementById("fee");
  var placementsOut = document.getElementById("placements");
  var rateOut = document.getElementById("rate");

  var annualBillingsEl = document.getElementById("annualBillings");
  var employeeEl = document.getElementById("employeeTakeHome");
  var agencyEl = document.getElementById("agencyTakeHome");
  var deltaYearEl = document.getElementById("deltaYear");
  var deltaMonthEl = document.getElementById("deltaMonth");

  function money(n) {
    return "$" + Math.round(n).toLocaleString("en-US");
  }

  // expose current numbers so they get sent with the lead
  var current = {};

  function recalc() {
    var fee = Number(feeRange.value);
    var placements = Number(placementsRange.value);
    var rate = Number(rateRange.value) / 100;

    var annual = fee * placements * 12;
    var employee = annual * rate;
    var agency = annual * AGENCY_SHARE;
    var deltaYear = agency - employee;

    feeOut.textContent = money(fee);
    placementsOut.textContent = String(placements);
    rateOut.textContent = rate * 100 + "%";

    annualBillingsEl.textContent = money(annual);
    employeeEl.textContent = money(employee);
    agencyEl.textContent = money(agency);
    deltaYearEl.textContent = "+" + money(deltaYear);
    deltaMonthEl.textContent =
      "That's about +" + money(deltaYear / 12) + " every month.";

    current = {
      avg_placement_fee: fee,
      placements_per_month: placements,
      current_take_home_rate_pct: Number(rateRange.value),
      annual_billings: Math.round(annual),
      employee_take_home: Math.round(employee),
      agency_take_home: Math.round(agency),
      extra_per_year: Math.round(deltaYear)
    };
  }

  [feeRange, placementsRange, rateRange].forEach(function (el) {
    if (el) el.addEventListener("input", recalc);
  });
  recalc();

  // ── Lead capture ─────────────────────────────────────────────────────────
  var form = document.getElementById("leadForm");
  var statusEl = document.getElementById("formStatus");

  function setStatus(msg, kind) {
    statusEl.textContent = msg;
    statusEl.className = "form-status" + (kind ? " " + kind : "");
  }

  function readUtm() {
    var p = new URLSearchParams(window.location.search);
    var utm = {};
    ["source", "medium", "campaign", "content", "term"].forEach(function (k) {
      var v = p.get("utm_" + k);
      if (v) utm[k] = v;
    });
    return utm;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = (document.getElementById("name").value || "").trim();
      var email = (document.getElementById("email").value || "").trim();
      var honeypot = (document.getElementById("company").value || "").trim();

      // bot caught by honeypot — pretend success, send nothing
      if (honeypot) {
        setStatus("Thanks — check your inbox shortly.", "ok");
        return;
      }
      if (!name) return setStatus("Please add your first name.", "err");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return setStatus("Please enter a valid email.", "err");
      }

      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      setStatus("Sending your breakdown…", "");

      var payload = Object.assign(
        {
          name: name,
          email: email,
          source: "earnings-calculator",
          page: window.location.href,
          utm: readUtm(),
          submitted_at: new Date().toISOString()
        },
        current
      );

      // record locally too (scrobe), so it shows in the on-page event log
      if (window.scrobe) window.scrobe.record("lead", { email: email });

      function done() {
        form.reset();
        form.classList.add("is-done");
        setStatus(
          "You're in, " + name + "! Your breakdown and 90-Day Launch Playbook are on the way.",
          "ok"
        );
      }

      if (!LEAD_ENDPOINT) {
        // demo mode — no endpoint configured yet
        console.warn("[calculator] LEAD_ENDPOINT not set — running in demo mode. See SETUP.md.");
        return done();
      }

      fetch(LEAD_ENDPOINT, {
        method: "POST",
        mode: "no-cors", // Apps Script Web Apps don't send CORS headers
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      })
        .then(done)
        .catch(function () {
          btn.disabled = false;
          setStatus(
            "Something went wrong sending that. Please try again or email us directly.",
            "err"
          );
        });
    });
  }
})();
