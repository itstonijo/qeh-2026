# Ironside Resources — Workflow Automation Map

Built 2026-06-20 from Toni Jo's operations interview. Goal: find the daily/weekly tasks that can be automated, delegated to AI, or eliminated. Times are Toni Jo's own honest estimates; weekly figures assume a 5-day week.

**The one rule that shapes everything:** the only thing Toni Jo *must* do herself is the human judgment calls — phoning candidates to confirm they're the real deal and interviewing them. Client selection and candidate fit can be driven by data. Everything feeding those calls is fair game for automation.

---

## THE AUTOMATION MAP (sorted by priority, highest first)

### 1. Candidate sourcing & outreach
- **Current time:** ~2 hrs/day (~10 hrs/week) — the single biggest sink, and a procrastination task.
- **Automation potential:** PARTIAL (AI does ~80%, Toni Jo reviews and makes the calls)
- **How it works:** AI reads each active JD, searches JobAdder + new CRM inflow + Seek/LinkedIn signals, and returns a ranked shortlist with match reasoning and contact details. It drafts the 10-15 outreach messages per role in Toni Jo's voice. She reviews the shortlist, approves outreach, and keeps the verification calls.
- **Priority:** HIGH
- **Tools:** JobAdder, Seek, LinkedIn, web search, Claude, Gmail

### 2. Email replies (incl. the "paste into Claude" busywork)
- **Current time:** ~5 min each, ~8-15 replies/day (~3.75 hrs/week). Top-3 buy-back request.
- **Automation potential:** PARTIAL (AI drafts, Toni Jo reviews and sends — never auto-send)
- **How it works:** AI watches the inbox, pulls the relevant CRM/thread context automatically (no more manual pasting of emails or CRM data into Claude), and drafts replies in her voice following the CLAUDE.md rules. She skims, tweaks, sends. Eliminates the copy-paste-into-Claude step she flagged as busywork.
- **Priority:** HIGH
- **Tools:** Gmail, JobAdder, Claude

### 3. CRM notes & call/data entry
- **Current time:** 2-3 min/entry, ~15 entries/day (~2.9 hrs/week). Top-3 buy-back; heavily procrastinated.
- **Automation potential:** FULL→PARTIAL (AI generates the note, Toni Jo spot-checks)
- **How it works:** After a call or email, AI drafts the call note / activity log and writes it to the right JobAdder record automatically. Toni Jo reviews a daily digest rather than typing each entry. New CRM data is auto-tagged and matched against open roles.
- **Priority:** HIGH
- **Tools:** JobAdder, Gmail, Claude

### 4. Candidate collateral — resume, snapshot/teaser, full brief
- **Current time:** ~3 hrs/week (same-format every time).
- **Automation potential:** PARTIAL→FULL (AI generates from CRM data, Toni Jo finalises)
- **How it works:** From a candidate's JobAdder record, AI produces the formatted resume, the teaser/snapshot (sent first), and the full brief (sent after terms) in Ironside templates. Enforces the sales rule automatically: snapshot first, brief only once terms are agreed (or straight to brief for existing clients with terms).
- **Priority:** HIGH
- **Tools:** JobAdder, file access, Claude

### 5. BD research & outreach
- **Current time:** ~3 hrs/week (the most procrastinated task; #1 buy-back request).
- **Automation potential:** PARTIAL (AI researches + drafts, Toni Jo approves and books)
- **How it works:** AI builds target-company profiles (mining/civil/defence in the ICP), finds the right contact, drafts warm outreach in her voice, and queues follow-ups. Logs everything to BD tracking automatically. Toni Jo approves sends and runs the meetings.
- **Priority:** HIGH
- **Tools:** web search, LinkedIn, Gmail, JobAdder, Claude

### 6. Newsletters (candidate + client, monthly)
- **Current time:** 2 hrs each, ~4 hrs/week equivalent (Row leads, Toni Jo researches).
- **Automation potential:** PARTIAL (AI drafts both, Row/Toni Jo edit)
- **How it works:** AI pulls the month's candidate and client highlights, drafts both newsletters to the existing format, and surfaces the research Toni Jo currently does by hand. Humans edit and approve.
- **Priority:** MEDIUM
- **Tools:** JobAdder, web search, Claude, Gmail

### 7. Repeated lookups (names, emails, candidate/client details, pay rates, status)
- **Current time:** ~20 min/day scattered (~1.67 hrs/week). "Horrible with names."
- **Automation potential:** FULL (AI retrieval on demand)
- **How it works:** Ask in plain English — "who did I last speak to at FTA and when," "what's this candidate's ticket," "remind me of the name" — and AI answers instantly from JobAdder/Gmail instead of her digging. Optional pre-call brief so she walks in knowing the name and history.
- **Priority:** MEDIUM
- **Tools:** JobAdder, Gmail, Calendar, Claude

### 8. Email triage & filing
- **Current time:** ~30 sec each, 15-50 emails/day (~1.67 hrs/week).
- **Automation potential:** PARTIAL (AI sorts and files, Toni Jo glances)
- **How it works:** AI categorises incoming mail (client / candidate / BD / Row / noise), flags what needs a reply, and auto-files handled threads into their folders so the inbox clears itself.
- **Priority:** MEDIUM
- **Tools:** Gmail, Claude

### 9. LinkedIn content
- **Current time:** ~2 hrs/week.
- **Automation potential:** PARTIAL (AI drafts the calendar + posts, Toni Jo approves)
- **How it works:** AI runs a weekly content calendar and drafts posts on the agreed themes (the competitor analysis pointed to veteran-tradie outcome stories — North East Link, Fortescue diesel mechanics). She approves and posts.
- **Priority:** MEDIUM
- **Tools:** web search, Claude, LinkedIn

### 10. Pipeline review & BD review (weekly)
- **Current time:** ~1 hr each (~2 hrs/week).
- **Automation potential:** PARTIAL (AI generates the summary, Toni Jo + Row decide)
- **How it works:** AI auto-produces the pipeline status and BD progress summary before each review, so the meeting is spent deciding and acting, not assembling the numbers.
- **Priority:** LOW-MEDIUM
- **Tools:** JobAdder, Claude

### 11. Following up no-response emails
- **Current time:** rolled into email time; flagged as suspected busywork.
- **Automation potential:** FULL (AI tracks and drafts, Toni Jo approves) — and partly ELIMINATE
- **How it works:** AI tracks which threads went quiet, auto-drafts a timed nudge, and — importantly — flags the dead ones so Toni Jo stops chasing leads that never convert. Buys back attention, not just time.
- **Priority:** LOW-MEDIUM
- **Tools:** Gmail, JobAdder, Claude

### MANUAL — keep these human (not automatable, listed for completeness)
- **Verification calls + candidate interviews** — Toni Jo's required judgment. ~part of her day, stays manual.
- **Daily Row meeting (~1 hr/day) + weekly catch-up (~1 hr)** — human, though AI can prep the agenda and a post-meeting action list.
- **Client meetings** — human relationship work.

---

## THE MATH

Weekly hours currently spent on tasks that are automatable (excludes the manual calls, interviews and meetings above):

| Task | Now (hrs/wk) | After automation (hrs/wk) |
|---|---|---|
| Candidate sourcing & outreach | 10.0 | 3.0 |
| Email replies | 3.75 | 1.25 |
| CRM notes & entry | 2.9 | 0.5 |
| Candidate collateral (resume/snapshot/brief) | 3.0 | 0.75 |
| BD research & outreach | 3.0 | 1.0 |
| Newsletters | 4.0 | 1.0 |
| Repeated lookups | 1.67 | 0.3 |
| Email triage & filing | 1.67 | 0.3 |
| LinkedIn content | 2.0 | 0.5 |
| Pipeline + BD review | 2.0 | 0.5 |
| **TOTAL** | **~33.7 hrs/week** | **~9.1 hrs/week** |

**The gap: ~24.6 hours/week bought back** — roughly 5 hours a day, the equivalent of getting most of a second person back without hiring one.

**Honest caveat:** that's the ceiling, not week one. It assumes the JobAdder/Gmail connections are wired up and the AI is trained on Ironside's templates and voice — there's a setup and trust-building ramp before drafts go out with barely a glance. A realistic first-90-days capture is the three you ranked highest — **BD, email replies, CRM notes** — which alone is roughly **8-9 hrs/week back**, and they happen to be your three biggest procrastination tasks, so the relief is bigger than the clock says.

**Where the bought-back time should go:** the one thing only you can do and the business needs most — calls, interviews, client meetings, and winning new clients to reverse the shrinking pipeline.
