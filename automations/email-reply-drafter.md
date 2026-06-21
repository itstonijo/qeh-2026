# Automation #1 — AI Email-Reply Drafter

The first build, from the workflow map. Drafts replies to client and candidate emails in Toni Jo's voice and leaves them as **drafts** for her to review and send. Nothing is ever sent automatically.

**Why this one first:** top-3 buy-back, ~3.75 hrs/week, and it kills the busywork Toni Jo flagged — manually pasting emails into Claude. **Runs on Gmail directly — no Zapier needed.** (Pulling a sender's JobAdder history is an optional add-on; the draft works fine from the email thread alone.)

## Hard guardrails (non-negotiable)
- **Draft only, never send.** Matches the CLAUDE.md safety rule. The final step creates a Gmail draft; a human sends.
- **New/cold contacts get flagged** for a closer read before sending (warm but professional, no emojis).
- Voice rules from CLAUDE.md are embedded in the AI prompt below.

## Prerequisites
1. **Gmail** connected to Claude (the direct connection — this is all the core build needs).
2. **Claude** to draft the replies.
3. *(Optional)* **JobAdder via Zapier** — only if you want the draft to know the person's history (role, last contact, whether they're an existing client with terms). Skip it to start.

## The core flow (Gmail + Claude, no Zapier)

**Step 1 — Catch the email**
- Trigger on new inbox mail that's real correspondence, not noise. Filter to:
  `in:inbox -in:sent -category:promotions -category:social -from:noreply -from:no-reply newer_than:1d`
- This skips promos, social and no-reply senders (the Clay / JobAdder-export / marketing type mail in your inbox).

**Step 2 — Skip what doesn't need a reply**
- Continue only if the email isn't an auto-reply or marketing:
  - From email does NOT contain `noreply`, `no-reply`, `mailer`, `notifications`
  - Subject does NOT contain `out of office`, `automatic reply`, `unsubscribe`

**Step 3 — Claude drafts the reply**
- Feed Claude the email (sender, subject, body, and the thread so far) plus the prompt below. Claude has the thread context from Gmail directly — no paste, no Zapier.

**Step 4 — Save as a Gmail draft**
- Create a draft reply in the same thread. To = sender, threaded under the original.
- **Never "send."** Draft only.

**Step 5 (optional) — Ping Toni Jo**
- A quick "draft ready for [name] — [subject]. New/cold: yes/no" so she knows to review.

## Optional add-on — JobAdder context (this is the only part that needs Zapier)
If you want richer drafts later: a Zapier step looks up the sender in JobAdder by email and passes their name, role/status, last note and "existing client with terms? yes/no" into the prompt's CRM CONTEXT block. Without it, leave that block empty and the AI treats them as a new/cold contact. Worth adding once the core is trusted, not on day one.

## The AI prompt (paste into Step 3)

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

CRM CONTEXT (optional — leave empty if not using the JobAdder add-on; if empty, treat as a new/cold contact):
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
1. Run it on a few real recent emails with sending OFF, and read the drafts.
2. Check: does it open with the day + first name, sign off "Thank you" with no name, sound like you, and respect teaser-first?
3. Review every draft for the first two weeks before sending. If the voice drifts, update CLAUDE.md first, then the prompt — fix the source of truth.
4. Once trusted, you're skimming and sending instead of writing from scratch.

## Limitations
- This drafts replies. It does not file emails (that's automation #8, triage) or chase non-responders (#11) — separate builds.
- Keep the Step 1/2 filters tight so you're only drafting for mail that genuinely needs a reply.

## Next build
Candidate-matching (JobAdder pool vs a JD) is the bigger prize at ~6 hrs/week — and that one genuinely needs the JobAdder-via-Zapier connection. Good order: ship this Gmail-only drafter, then stand up the JobAdder Zapier link for matching.
