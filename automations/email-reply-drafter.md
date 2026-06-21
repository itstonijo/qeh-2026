# Automation #1 — AI Email-Reply Drafter

The first build, from the workflow map. Drafts replies to client and candidate emails in Toni Jo's voice, with JobAdder context pulled in automatically, and leaves them as **drafts** for her to review and send. Nothing is ever sent automatically.

**Why this one first:** top-3 buy-back, ~3.75 hrs/week, and it kills the busywork Toni Jo flagged — manually pasting emails and CRM data into Claude. Fully buildable on the current stack (Gmail direct + JobAdder via Zapier).

## Hard guardrails (non-negotiable)
- **Draft only, never send.** Matches the CLAUDE.md safety rule. The final step creates a Gmail draft; a human sends.
- **No replies to new/cold contacts go out without a closer read.** The draft still gets made, but the notification flags "new/cold — check tone."
- Voice rules from CLAUDE.md are embedded in the AI prompt below.

## Prerequisites
1. **Zapier plan** that includes multi-step Zaps and an AI step (most paid tiers; AI by Zapier is included, or connect the Anthropic/Claude app).
2. **Gmail** connected to Zapier.
3. **JobAdder** connected to Zapier (this is the only way JobAdder integrates).
4. Decide the AI step: **Anthropic (Claude) app in Zapier** (preferred, keeps it in Claude) or **AI by Zapier**.

## The Zap, step by step

**Step 1 — Trigger: Gmail → "New Email Matching Search"**
- Use a search string so you only fire on real correspondence, not noise. Starting search:
  `in:inbox -in:sent -category:promotions -category:social -from:noreply -from:no-reply newer_than:1d`
- This skips promos, social, and no-reply senders (the Clay/JobAdder-export/marketing type mail from your inbox sample).

**Step 2 — Filter: only continue if a reply is likely needed**
- Continue only if the email is NOT from common no-reply / marketing domains, and the body isn't an auto-receipt. Conditions (Filter by Zapier):
  - From Email **does not contain** `noreply`, `no-reply`, `mailer`, `notifications`
  - Subject **does not contain** `out of office`, `automatic reply`, `unsubscribe`

**Step 3 — JobAdder lookup (via Zapier): find the contact**
- Action: JobAdder **"Find Candidate"** by email = `{{Step 1 From Email}}`.
- Add a second path / fallback: JobAdder **"Find Contact"** (client side) by the same email.
- This pulls their record — name, role/role status, last activity, notes — so the AI has context. (Exact action names depend on JobAdder's Zapier app; if "Find by email" isn't offered, use a search step on the closest available field. Mark this to verify on build.)
- If nothing is found, continue anyway with "no CRM match — treat as new/cold."

**Step 4 — AI step (Claude / AI by Zapier): draft the reply**
- Model: Claude. Paste the prompt in the next section, mapping the Zapier fields into the bracketed slots.

**Step 5 — Gmail → "Create Draft Reply"**
- Action: Create Draft Reply (so it threads under the original).
- To: `{{Step 1 From Email}}`  ·  Thread: `{{Step 1 Thread-ID}}`  ·  Body: `{{Step 4 AI output}}`
- **Do NOT use "Send Email."** Draft only.

**Step 6 (optional) — Notify Toni Jo**
- Gmail/Slack/SMS: "Draft ready for {{From Name}} — {{Subject}}. New/cold: {{yes/no}}." So she knows to review.

## The AI prompt (paste into Step 4)

```
You are drafting an email reply as Toni Jo Mooney, Specialist Recruiter & BD at
Ironside Resources, a veteran-owned recruitment agency and social enterprise that
places ex-ADF veterans into mining, civil and defence roles.

Write a reply to the email below. Output ONLY the email body — no subject, no
preamble, no notes.

VOICE (follow exactly):
- Warm, direct, human. Sound like a real person pleased to hear from them, not a script.
- Use contractions and short, uneven sentences. Plain talk (e.g. "that role is right up our alley").
- Open with the day, then their name: "Happy [day]," then "Hi [first name],".
- Sign off with "Thank you" on its own line. Do NOT write her name after it — the signature handles that.
- Match formality to the relationship: warm but professional for new or cold contacts; looser once there's rapport.

HARD RULES (never break):
- No corporate or salesy lines. Never "We are a leading provider..." or "Thank you for reaching out, your inquiry is important to us."
- No "I hope this email finds you well."
- No CAPS, no em-dashes, no emojis if this is a new or cold contact (a single :) only if there's clear existing rapport).
- No "Here's what I'll do" task lists. No filler.
- Never "Cheers." Never "Kind regards" unless this is a genuine cold first contact.

SALES RULE (if they're asking about candidates for a role):
- Offer a candidate teaser/snapshot first. Full briefs only once terms are agreed.
- EXCEPTION: if the CRM context shows this is an existing client WITH terms, go straight to offering full briefs.

CRM CONTEXT (may be empty — if empty, treat as a new/cold contact):
Name: [JobAdder name]
Type: [candidate / client / unknown]
Existing client with terms: [yes / no / unknown]
Role / status: [JobAdder role or status]
Last activity / notes: [JobAdder last note]

THE EMAIL TO REPLY TO:
From: [From Name]
Subject: [Subject]
Body:
[Email body]
```

## Test before you trust it
1. Build with the Zap **off**, run "Test" on a real recent email, read the draft.
2. Check: does it open with the day + first name, sign off "Thank you" with no name, sound like you, and respect teaser-first?
3. Run it live but **review every draft for the first two weeks** before sending. Tighten the prompt for anything that reads off (and if it keeps missing, update CLAUDE.md first, then the prompt — fix the source of truth).
4. Once trusted, you're skimming and sending instead of writing from scratch.

## Limitations & cost
- Every trigger that passes the filter uses Zapier tasks + one AI call. With 15-50 emails/day, tighten the Step 1 search and Step 2 filter so you're only drafting for mail that genuinely needs a reply, or you'll burn task quota on noise.
- JobAdder's exact Zapier action names need confirming at build time (flagged in Step 3).
- This drafts replies. It does not file emails (that's automation #8, triage) or follow up non-responders (#11) — those are separate Zaps.

## Next build
Automation #1 in the workflow map's candidate-matching (JobAdder pool vs a JD) is the bigger prize at ~6 hrs/week saved, but needs the JobAdder Zapier connection proven out first — which this Zap also establishes. Good order: ship this, confirm JobAdder-via-Zapier works, then build matching on top.
