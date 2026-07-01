# Ironside Resources — Workflow Automation Map

Built 2026-06-20 from Toni Jo's operations interview. Goal: find the daily/weekly tasks that can be automated, delegated to AI, or eliminated. Times are Toni Jo's own honest estimates; weekly figures assume a 5-day week.

**The one rule that shapes everything:** the only thing Toni Jo *must* do herself is the human judgment calls — phoning candidates to confirm they're the real deal and interviewing them. Client selection and candidate fit can be driven by data. Everything feeding those calls is fair game for automation.

## Connectivity reality (read this first)
What can actually be wired up, given the tools:
- **Gmail, Google Calendar** — connect directly. Full read/draft automation (never auto-send).
- **JobAdder — only via Zapier.** Workable: read candidate/client/job records, write call notes, create/update candidates and jobs through Zapier triggers and actions. Some field and rate limits apply.
- **LinkedIn — only via Zapier, and limited.** Zapier can *post* updates on a schedule, but it **cannot search candidates or send DMs**. So LinkedIn sourcing and outreach stays MANUAL; only LinkedIn content posting automates.
- **Seek — no integration.** No API or Zapier connector. Sourcing from Seek stays MANUAL (web).
- **Web search, file access, Claude** — direct.

Every card's "Tools" line below reflects this.

---

## THE AUTOMATION MAP (sorted by priority, highest first)

### 1. Candidate sourcing & matching
- **Current time:** ~2 hrs/day (~10 hrs/week) — the single biggest sink, and a procrastination task.
- **Automation potential:** PARTIAL — the JobAdder side automates; external sourcing and calls stay manual.
- **How it works:** For each active JD, AI searches the JobAdder database (via Zapier) and the new CRM inflow, then returns a ranked shortlist with match reasoning and contact details, and drafts the outreach emails in Toni Jo's voice. **What stays manual:** finding brand-new candidates on Seek and LinkedIn (no integration), and the verification calls/interviews. So AI removes the "match existing pool to the JD" grind; Toni Jo still works Seek/LinkedIn by hand and makes the calls.
- **Priority:** HIGH
- **Tools:** JobAdder (via Zapier), Gmail, Claude. Manual: Seek (web), LinkedIn (web)

### 2. Email replies (incl. the "paste into Claude" busywork)
- **Current time:** ~5 min each, ~8-15 replies/day (~3.75 hrs/week). Top-3 buy-back request.
- **Automation potential:** PARTIAL (AI drafts, Toni Jo reviews and sends — never auto-send)
- **How it works:** AI watches the Gmail inbox, pulls the relevant JobAdder/thread context automatically through Zapier (no more manual pasting of emails or CRM data into Claude), and drafts replies in her voice following the CLAUDE.md rules. She skims, tweaks, sends. Kills the copy-paste-into-Claude step she flagged as busywork.
- **Priority:** HIGH
- **Tools:** Gmail, JobAdder (via Zapier), Claude

### 3. CRM notes & call/data entry
- **Current time:** 2-3 min/entry, ~15 entries/day (~2.9 hrs/week). Top-3 buy-back; heavily procrastinated.
- **Automation potential:** PARTIAL (AI drafts the note, Zapier writes it, Toni Jo spot-checks)
- **How it works:** After a call or email, AI drafts the call note / activity log and writes it to the right JobAdder record via Zapier. Toni Jo reviews a daily digest instead of typing each entry. New CRM data is auto-tagged and matched against open roles.
- **Priority:** HIGH
- **Tools:** JobAdder (via Zapier), Gmail, Claude

### 4. Candidate collateral — resume, snapshot/teaser, full brief
- **Current time:** ~3 hrs/week (same-format every time).
- **Automation potential:** PARTIAL→FULL (AI generates from JobAdder data, Toni Jo finalises)
- **How it works:** AI pulls a candidate's JobAdder record (via Zapier) and produces the formatted resume, the teaser/snapshot (sent first), and the full brief (sent after terms) in Ironside templates. Enforces the sales rule automatically: snapshot first, brief only once terms are agreed (or straight to brief for existing clients with terms).
- **Priority:** HIGH
- **Tools:** JobAdder (via Zapier), file access, Claude

### 5. BD research & outreach
- **Current time:** ~3 hrs/week (the most procrastinated task; #1 buy-back request).
- **Automation potential:** PARTIAL — email outreach automates; LinkedIn outreach stays manual.
- **How it works:** AI builds target-company profiles (mining/civil/defence in the ICP) from web search, finds the right contact, drafts warm **email** outreach in her voice, queues follow-ups, and logs everything to BD tracking in JobAdder via Zapier. **What stays manual:** LinkedIn DMs/connection requests (Zapier can't send them). Toni Jo approves sends and runs the meetings.
- **Priority:** HIGH
- **Tools:** web search, Gmail, JobAdder (via Zapier), Claude. Manual: LinkedIn (web)

### 6. Newsletters (candidate + client, monthly)
- **Current time:** 2 hrs each, ~4 hrs/week equivalent (Row leads, Toni Jo researches).
- **Automation potential:** PARTIAL (AI drafts both, Row/Toni Jo edit)
- **How it works:** AI pulls the month's candidate and client highlights from JobAdder (via Zapier) plus web research, and drafts both newsletters to the existing format. Humans edit and approve.
- **Priority:** MEDIUM
- **Tools:** JobAdder (via Zapier), web search, Claude, Gmail

### 7. Repeated lookups (names, emails, candidate/client details, pay rates, status)
- **Current time:** ~20 min/day scattered (~1.67 hrs/week). "Horrible with names."
- **Automation potential:** FULL (AI retrieval on demand)
- **How it works:** Ask in plain English — "who did I last speak to at FTA and when," "what's this candidate's ticket," "remind me of the name" — and AI answers from JobAdder (via Zapier) + Gmail instead of her digging. Optional pre-call brief so she walks in knowing the name and history.
- **Priority:** MEDIUM
- **Tools:** JobAdder (via Zapier), Gmail, Calendar, Claude

### 8. Email triage & filing
- **Current time:** ~30 sec each, 15-50 emails/day (~1.67 hrs/week).
- **Automation potential:** PARTIAL (AI sorts and files, Toni Jo glances)
- **How it works:** AI categorises incoming mail (client / candidate / BD / Row / noise), flags what needs a reply, and auto-files handled threads into their folders so the inbox clears itself. Runs entirely on the direct Gmail connection — no Zapier needed.
- **Priority:** MEDIUM
- **Tools:** Gmail, Claude

### 9. LinkedIn content
- **Current time:** ~2 hrs/week.
- **Automation potential:** PARTIAL (AI drafts the calendar + posts, Zapier schedules, Toni Jo approves)
- **How it works:** AI runs a weekly content calendar and drafts posts on the agreed themes (the competitor analysis pointed to veteran-tradie outcome stories — North East Link, Fortescue diesel mechanics). This is the one LinkedIn task Zapier *can* do: scheduled posting. She approves, Zapier posts.
- **Priority:** MEDIUM
- **Tools:** web search, Claude, LinkedIn posting (via Zapier)
- **Built:** see `automations/linkedin-personal-brand.md` (automation #4) and the seeded drafts in `content/linkedin-posts-batch-1.md` — personal-profile posts, Buffer for the queue, 3-week manual-approval trial before it runs on its own.

### 10. Pipeline review & BD review (weekly)
- **Current time:** ~1 hr each (~2 hrs/week).
- **Automation potential:** PARTIAL (AI generates the summary, Toni Jo + Row decide)
- **How it works:** AI auto-produces the pipeline status and BD progress summary from JobAdder (via Zapier) before each review, so the meeting is spent deciding and acting, not assembling the numbers.
- **Priority:** LOW-MEDIUM
- **Tools:** JobAdder (via Zapier), Claude

### 11. Following up no-response emails
- **Current time:** rolled into email time; flagged as suspected busywork.
- **Automation potential:** FULL (AI tracks and drafts, Toni Jo approves) — and partly ELIMINATE
- **How it works:** AI tracks which Gmail threads went quiet, auto-drafts a timed nudge, and — importantly — flags the dead ones so Toni Jo stops chasing leads that never convert. Buys back attention, not just time.
- **Priority:** LOW-MEDIUM
- **Tools:** Gmail, JobAdder (via Zapier), Claude

### MANUAL — keep these human (not automatable, listed for completeness)
- **Verification calls + candidate interviews** — Toni Jo's required judgment. Stays manual.
- **External candidate sourcing on Seek and LinkedIn** — no integration; stays manual/web.
- **LinkedIn outreach (DMs, connection requests)** — Zapier can't send these; manual.
- **Daily Row meeting (~1 hr/day) + weekly catch-up (~1 hr)** — human, though AI can prep the agenda and a post-meeting action list.
- **Client meetings** — human relationship work.

---

## THE MATH

Weekly hours currently spent on tasks with an automatable portion (excludes the manual calls, interviews and meetings above). "After" reflects the connectivity reality: Gmail/JobAdder automate, but Seek/LinkedIn sourcing and LinkedIn outreach stay manual.

| Task | Now (hrs/wk) | After automation (hrs/wk) |
|---|---|---|
| Candidate sourcing & matching | 10.0 | 4.0 |
| Email replies | 3.75 | 1.25 |
| CRM notes & entry | 2.9 | 0.5 |
| Candidate collateral (resume/snapshot/brief) | 3.0 | 0.75 |
| BD research & outreach | 3.0 | 1.25 |
| Newsletters | 4.0 | 1.0 |
| Repeated lookups | 1.67 | 0.3 |
| Email triage & filing | 1.67 | 0.3 |
| LinkedIn content | 2.0 | 0.5 |
| Pipeline + BD review | 2.0 | 0.5 |
| **TOTAL** | **~33.7 hrs/week** | **~10.85 hrs/week** |

**The gap: ~22.9 hours/week bought back** — still north of four hours a day, roughly most of a second person, without hiring one. (Slightly lower than a direct-integration world, because Seek/LinkedIn sourcing and LinkedIn DMs can't be automated through Zapier and stay on your plate.)

**Honest caveat:** that's the ceiling, not week one. It assumes the Zapier connections to JobAdder are built and tested, and the AI is trained on Ironside's templates and voice — there's a setup and trust-building ramp before drafts go out with barely a glance. A realistic first-90-days capture is the three you ranked highest — **BD, email replies, CRM notes** — which alone is roughly **7-8 hrs/week back**, and they happen to be your three biggest procrastination tasks, so the relief is bigger than the clock says.

**Where the bought-back time should go:** the one thing only you can do and the business needs most — calls, interviews, client meetings, and winning new clients to reverse the shrinking pipeline.
