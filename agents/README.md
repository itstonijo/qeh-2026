# Chief Agent Officer — Operator Playbook

This is the runnable version of the service described on the landing page. It gives you
the five AI operators a Chief Agent Officer (CAO) would deploy, packaged as
[Claude Code subagents](https://docs.claude.com/en/docs/claude-code/sub-agents) so you can
run them yourself.

Each agent lives in `.claude/agents/` as a definition file. Once this repo is open in Claude
Code, the agents are available — invoke them by name, e.g. *"use the email-triage agent to
clear my inbox"*.

## The five operators

| Agent | What it does | MCP server it needs |
|-------|--------------|---------------------|
| `email-triage` | Reads, labels, prioritises and drafts replies in your inbox | Gmail |
| `calendar-scheduler` | Books, reschedules and protects time on your calendar | Google Calendar |
| `sales-call-scorer` | Scores call transcripts against a fixed rubric and logs results | (none — works on transcripts you provide; Drive optional) |
| `ops-automator` | Connects and automates across your other apps (CRM, accounting, Slack…) | Zapier |
| `marketing-seo` | Plans content, writes optimised copy, maintains on-page SEO & UTM tracking | (none required; web + repo) |

## How to run them

1. **Connect the tools.** In Claude Code on the web, connect the MCP servers each agent needs
   (Gmail, Google Calendar, Zapier). The agent definitions reference these by capability, not by
   a hard-coded server ID, so they work in any session once the server is connected.
2. **Invoke the agent.** Ask Claude to use the agent by name, or describe the job — Claude will
   route to the right operator. Example prompts:
   - *"Run email-triage on my last 24 hours of mail and draft replies for the ones that need one."*
   - *"Use calendar-scheduler to find 30 minutes with Sam next week and send the invite."*
   - *"Score this call transcript with sales-call-scorer."* (paste or point to the transcript)
   - *"Use ops-automator to push new CRM deals into our accounting tool."*
   - *"Have marketing-seo audit index.html and improve the on-page SEO."*
3. **Review before send.** Every agent is set up to **draft, not send** by default for anything
   outbound (emails, invites, posts). You approve before it goes out. Loosen this only once you
   trust a given workflow.

## Files

- `.claude/agents/email-triage.md`
- `.claude/agents/calendar-scheduler.md`
- `.claude/agents/sales-call-scorer.md`
- `.claude/agents/ops-automator.md`
- `.claude/agents/marketing-seo.md`
- `agents/sales-call-rubric.md` — the scoring rubric the sales agent uses
- `agents/seo-checklist.md` — the on-page SEO checklist the marketing agent works from

## Safety defaults

- Outbound actions are **draft-first**. Nothing is emailed, booked externally, posted, or paid
  without your explicit go-ahead.
- Agents touch only the data needed for the task and report what they did.
- Start each agent on a small batch, confirm the output is right, then widen scope.
