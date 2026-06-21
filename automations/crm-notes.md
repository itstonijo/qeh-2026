# Automation #3 — CRM Notes

The third build, and the last of Toni Jo's top-three procrastination tasks. CRM note and call-log entry: 2-3 min each, ~15/day (~2.9 hrs/week). It nags because it's tedious and easy to put off, which means the CRM goes stale, which makes everything downstream (matching, follow-ups, reply context) worse. Automating it keeps JobAdder current without the typing.

**Why this one:** top-3 buy-back, heavily procrastinated, and it feeds everything else — the email-reply drafter and the candidate matcher both read these notes. Clean the source, sharpen the whole system.

## The shape of the problem
Notes come from two places:
1. **Emails** — already digital. These can be captured fully automatically.
2. **Calls** — not digital. The phone call itself can't be auto-logged, so the build gives Toni Jo a 10-second capture step instead of a 3-minute typing step.

## Guardrails
- **Notes are factual records — the AI summarises, it never invents.** It logs only what's in the email or what she dictates, and flags anything unclear rather than guessing.
- **Auto-filing notes is fine** (internal record-keeping, not outbound comms or spend, so it doesn't hit the "always draft" rule) — but everything lands in a **once-a-day review digest** so nothing wrong sits unchecked.
- **Candidate/client data is confidential** (Privacy Act 1988, per Ironside's terms) — keep capture inside approved tools (Gmail, Claude, JobAdder), not random apps.

## The standard note format (same every time)
```
Date | Type (call / email / meeting) | Contact name | Company or role/job
Summary: what happened, in 1-3 plain lines
Next action: [what] by [date]
```
Consistency is the point — every note files the same way, so the matcher and follow-up tools can read them.

---

## Flow A — Email → CRM note (fully automatic)

**Step 1 — Trigger: a meaningful client/candidate email (Gmail, direct)**
- Fires on sent OR received mail in real correspondence (reuse the noise filter from the email-reply drafter: skip promos, no-reply, auto-replies).

**Step 2 — Claude writes the note**
- Claude reads the thread and produces a note in the standard format above: who, what was agreed, the next action and a due date if one's implied.

**Step 3 — File it to JobAdder (via Zapier)**
- Zapier matches the contact by email and appends the note to that candidate/client record. If no match, hold it in the digest for Toni Jo to assign.

---

## Flow B — Call → CRM note (10-second capture, AI does the rest)

The call can't auto-log, so replace 3 minutes of typing with a few seconds of talking.

**Step 1 — Capture, rough and fast.** Right after a call, Toni Jo dumps a quick raw note — phone voice-to-text or a one-liner — into a single dedicated capture channel (e.g. a "call notes" Gmail label/address she sends to, or a quick message to Claude). Messy is fine: "just spoke to Greg at NACP, keen on the two diesel mechanics, wants briefs Monday, call him back Thursday."
**Step 2 — Claude structures it** into the standard note format, pulling out the contact, the role, the summary and the next action + due date.
**Step 3 — File to JobAdder (via Zapier)** against the right record, same as Flow A. Ambiguous ones go to the digest.

---

## The daily digest (the review step)
Once a day, Claude sends Toni Jo a single digest: every note it filed today, plus any it couldn't confidently file (no contact match, unclear next step). She skims, fixes the few that need it, assigns the orphans. That's the whole review — minutes, not the task.

## The Claude note prompt
```
You are logging a CRM note for Ironside Resources (veteran recruitment, mining/civil/
defence). Turn the input below into a factual activity note. Summarise only what is
actually there — never invent details, commitments or dates. If something is unclear,
write "[unclear: ...]" rather than guessing.

Output exactly this format:
Date | Type | Contact name | Company or role/job
Summary: 1-3 plain lines, no fluff, no corporate language
Next action: [what] by [date]   (write "none stated" if there isn't one)

INPUT (email thread, or rough call dictation):
[content]
```

## Test before you trust it
1. Run Flow A on a handful of real recent email threads with auto-file OFF — check the notes are accurate, the next-actions are right, and nothing's invented.
2. Try Flow B: leave yourself three messy voice-to-text call notes and see if Claude structures and files them correctly.
3. Watch the daily digest for a week. Are the orphans/unclear flags catching the right ones? Tune the contact-matching and the prompt.
4. Once trusted, auto-file runs and you just skim the digest.

## Limitations
- The live phone call still can't be transcribed unless calls run through a VoIP that records — so Flow B needs the 10-second capture. It's a shortcut, not zero-touch.
- Contact matching depends on JobAdder having the person; brand-new contacts land in the digest to assign.
- Zapier task cost scales with note volume; the Gmail noise filter keeps Flow A from logging junk.
- Confirm the JobAdder Zapier "create note / add activity" action and "find contact" action at build time.

## What this buys back
~2.9 hrs/week of typing drops to ~0.5 hrs/week of skimming a digest — and the bigger win is a CRM that's actually current, which makes the matcher, the reply drafter and the follow-up chaser all work better. Three of your worst time sinks share one root: stale, manually-kept data. This fixes the root.
