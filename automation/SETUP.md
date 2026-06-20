# Setup — lead magnet, capture, and email flows

This wires up three things that work as one pipeline:

1. **Lead magnet** — `calculator.html` (a recruiter earnings calculator)
2. **Lead capture** — the form posts to a Google Apps Script that writes each
   lead to a Google Sheet and emails you + an instant auto-reply to the lead
3. **Email flows** — a daily nurture sequence that follows up automatically

Leads are also **triaged HOT / WARM / COLD** automatically (the seed of the
"AI agent" idea — see the bottom of this file).

---

## 1. Publish the site (GitHub Pages)

1. Merge this branch into `main`.
2. In the repo: **Settings ▸ Pages ▸ Source → "GitHub Actions"**.
3. The `Deploy site to GitHub Pages` workflow publishes the site. Your pages
   will be live at:
   - Home: `https://itstonijo.github.io/qeh-2026/`
   - Calculator (the lead magnet): `https://itstonijo.github.io/qeh-2026/calculator.html`

> A custom domain can be added later under Settings ▸ Pages.

---

## 2. Connect lead capture (Google Sheet + Gmail)

1. Create a new Google Sheet (any name).
2. In that Sheet: **Extensions ▸ Apps Script**.
3. Paste the contents of `automation/leads-apps-script.gs` into `Code.gs`.
4. Check the **CONFIG** block at the top — `OWNER_EMAIL` is already set to
   `itstonijo@live.com.au`; update `PLAYBOOK_URL` when your PDF is ready.
5. **Deploy ▸ New deployment ▸ Web app**
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
6. Copy the Web App URL (ends in `/exec`).
7. Open `assets/calculator.js` and paste it into:
   ```js
   var LEAD_ENDPOINT = "https://script.google.com/macros/s/XXXX/exec";
   ```
8. Commit + push. Done — submissions now land in the Sheet and in your inbox,
   and each lead gets an instant breakdown email.

> Until `LEAD_ENDPOINT` is set, the form runs in **demo mode**: it validates and
> shows the success message but doesn't send anywhere. That's expected.

---

## 3. Turn on the automated email flow

In the **same** Apps Script project:

1. Add a new file (**＋ ▸ Script**) and paste in `automation/email-flows.gs`.
2. Run the function `setupNurtureTrigger` once (authorise it when prompted).
   This schedules `runNurture` to send due emails every day at ~9am.
3. That's it. New leads automatically receive the 5-step sequence; the
   "Nurture step" column tracks progress so nobody is emailed twice.

To edit the wording or timing, change the `SEQUENCE` array in
`email-flows.gs` (each step has `afterDays`, `subject`, `body`).

---

## 3b. (Recommended) Same thing on autopilot via Zapier

If you'd rather not manage Apps Script triggers, the calculator can post to a
Zapier webhook instead, and Zapier can fan out to a Sheet, your email tool, a
CRM, Slack, etc. Say the word and I'll switch `LEAD_ENDPOINT` to a Zapier
"Catch Hook" URL and build the Zap.

---

## What's next — the AI agent (item #3)

`leads-apps-script.gs` already does **rule-based triage** (`scoreLead_`): it
tags every lead HOT / WARM / COLD from the numbers they entered, so your inbox
is pre-sorted instead of a flat list.

The natural next step is to layer a real LLM agent on top to:

- write a *personalised* first-touch reply per lead (not a template),
- draft responses when a lead replies to a nurture email,
- summarise the week's leads and flag who to call first.

That needs an API key and a couple of decisions on how hands-off you want it —
happy to scope and build it next.
