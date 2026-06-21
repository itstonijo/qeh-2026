# Automation #2 — Candidate Matcher

The biggest time sink from the workflow map: ~2 hrs/day (~10 hrs/week) on candidate sourcing and matching. This build attacks the part that's automatable — matching Ironside's existing JobAdder pool to a role, ranking by fit, translating military experience into civilian terms, and drafting outreach. Toni Jo keeps the verification calls and interviews.

**Why second:** it needs the JobAdder-via-Zapier connection proven by automation #1's optional add-on. Bigger prize (~6 hrs/week), slightly more to stand up.

## The honest constraint (read first)
- **JobAdder connects only via Zapier**, and Zapier/JobAdder **cannot semantically search 4,000+ candidates in one AI call.** So the AI does not "search the whole database." Instead: JobAdder's own native search narrows the pool to a manageable longlist (right ticket, licence, location, keyword), and Claude ranks and reasons over *that* longlist.
- **External sourcing stays manual.** Finding brand-new people on Seek and LinkedIn has no integration. This build works the pool you already have.
- **Calls and interviews stay manual.** Toni Jo's required judgment. The AI hands her a ranked, reasoned shortlist; she makes the calls.
- **Candidate data is confidential** (Privacy Act 1988, per Ironside's client terms). Keep it inside the connected, approved tools (JobAdder, Gmail, Claude) — don't route it through anything ad hoc.

## Guardrails
- **Draft only, never auto-send** outreach (matches the safety rule). The AI drafts; Toni Jo approves and sends.
- **Match scores are a starting point, not gospel** — they rank the longlist so she reviews best-first, they don't decide.
- LinkedIn outreach stays manual (Zapier can't DM). Email outreach can be drafted automatically.

---

## Flow A — Role → shortlist (the daily grind)

For an active JD, turn the pool into a ranked, reasoned shortlist with draft outreach.

**Step 1 — Narrow the pool in JobAdder (native search, manual or saved-search)**
- Use JobAdder's own search/filters on the JD's must-haves: ticket/licence (e.g. HR licence, Cert III), location/FIFO, trade, keywords. Aim for a longlist of ~20-50, not the whole database.
- Save it as a JobAdder saved search per recurring role type so this is one click next time.

**Step 2 — Pull the longlist to Claude (via Zapier)**
- Zapier action: JobAdder → get the candidates from that search/folder (name, skills, tickets, last role, location, summary, last activity). Pass to the Claude step.
- *(If the Zapier JobAdder app can't return a saved-search set cleanly, fallback: export the longlist to CSV and hand it to Claude. Confirm the available action at build time.)*

**Step 3 — Claude ranks and reasons (matching prompt below)**
- Claude scores each candidate against the JD, explains the match, translates military experience into civilian terms, and flags gaps/risks.

**Step 4 — Claude drafts the shortlist output**
- A ranked table for Toni Jo (top first) + a client-ready **teaser/snapshot** for the top picks (snapshot first — full briefs only once terms are agreed, per the sales rule).

**Step 5 — Claude drafts candidate outreach**
- A short outreach email per top candidate in Toni Jo's voice (draft only). LinkedIn messages are drafted as text for her to paste manually.

**Step 6 — Toni Jo reviews → calls → sends**
- She reads best-first, makes the verification calls, approves the outreach.

---

## Flow B — Inbound candidate → open roles (Zapier-clean, set and forget)

Toni Jo mentioned new candidates add themselves to the system. This catches every one and checks them against what's open — no manual step.

**Step 1 — Trigger: JobAdder "New Candidate" (via Zapier)**
**Step 2 — Zapier pulls the current list of open JDs** (JobAdder get-jobs action)
**Step 3 — Claude scores the new candidate against each open JD** (same matching prompt)
**Step 4 — If any strong match:** write a note to the candidate's JobAdder record (via Zapier) and notify Toni Jo: "New candidate [name] looks like a fit for [role] — [why]." If no match, log quietly.

This reverses the work: instead of her remembering to re-check the pool, the pool checks itself against open roles as it grows.

---

## The Claude matching prompt (Flow A & B)

```
You are screening veteran candidates for Ironside Resources against a specific role.
Ironside places ex-ADF veterans into mining, civil and defence jobs.

For each candidate, do four things:
1. SCORE the fit 0-100 against the role's must-haves and nice-to-haves.
2. TRANSLATE their military experience into civilian terms a hiring manager understands
   (e.g. "RAEME vehicle mechanic" -> "heavy diesel / mobile plant mechanic, Cert III equivalent").
3. EXPLAIN the match in 2-3 plain sentences: what makes them right, in Toni Jo's plain, direct style.
4. FLAG gaps or risks honestly (missing ticket, location, licence, time since service).

Rules:
- Be honest, not optimistic. A weak match scored low is more useful than everyone at 80.
- Only the must-haves are disqualifiers. Rank, don't reject, on nice-to-haves.
- No corporate language. Plain talk.
- Output a ranked list, highest score first, each with: name, score, civilian translation,
  why, gaps.

THE ROLE:
Title: [JD title]
Must-haves: [tickets/licences/experience/location]
Nice-to-haves: [...]
Notes: [culture/site/shift/TAR]

THE CANDIDATES:
[JobAdder longlist: name, skills, tickets, last role, location, summary, last activity]
```

## The outreach draft prompt (reuses the email voice rules)
Use the same voice block from `automations/email-reply-drafter.md` (warm, direct, day opener, "Thank you" with no name, no emojis for cold contacts, no em-dashes). Add:

```
Write a short outreach message to this candidate about this role. Tell them plainly why
you thought of them (use the civilian translation), what the role is, and ask if they're
open to a quick chat. Keep it human and brief. Draft only.
```

## Test before you trust it
1. Take one real active JD and a known longlist. Run Flow A with sending OFF.
2. Check the ranking against your own gut — does the top 5 match who you'd have picked? Are the military-to-civilian translations accurate? Are the gap flags honest?
3. If the scores feel off, tune the must-haves/nice-to-haves wording in the prompt — that's where accuracy lives.
4. Run Flow B on the next few inbound candidates and sanity-check the "looks like a fit" flags before relying on them.
5. Two weeks of review-everything before you let drafts go out lightly.

## Limitations
- The AI ranks the longlist JobAdder's native search hands it. Garbage longlist in, garbage shortlist out — so the saved searches in Step 1 matter.
- Zapier task + AI-call cost scales with candidates scored. Flow B fires on every new candidate; keep the open-JD list tight.
- Confirm at build time which JobAdder Zapier actions return candidate sets and write notes; the app's action names need checking.
- This works your existing pool. It does not replace Seek/LinkedIn sourcing for roles where the right person isn't in JobAdder yet — that stays manual.

## What this buys back
Of the ~10 hrs/week on sourcing and matching, this should take the JobAdder-pool portion from manual to review-only — roughly **~6 hrs/week back** — while leaving the two things that need you: external sourcing and the calls.
