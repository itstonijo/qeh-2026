# LinkedIn Personal Brand — Handoff

Status doc for automation #4, written 2026-07-02. The full build spec is in `linkedin-personal-brand.md`, the seeded drafts are in `../content/linkedin-posts-batch-1.md`, and both are on PR #49.

## What's built

- **The build spec** (`automations/linkedin-personal-brand.md`): niche statement, one-time profile checklist, weekly content mix (2-3 posts/week across educational, story, awareness, objection-handling, conversion and lead-magnet posts), the drafting prompt, and the posting flow.
- **The first batch** (`content/linkedin-posts-batch-1.md`): 8 finished draft posts covering weeks 1-3, plus one story slot held open for real material (see below). Nothing has been posted.
- **Links back to the rest of the system**: workflow-map item #9 points at the spec, and CLAUDE.md now carries the LinkedIn approval rule and the open item tracking this.

## How the flow works

1. Claude drafts a week's batch of posts in Toni Jo's voice.
2. Every post is shown in chat for her approval. Nothing is queued or posted without sign-off.
3. Approved posts go out via the LinkedIn Zapier action (already connected), or into a Buffer queue once Buffer is set up.
4. Weeks 1-3 are a trial: full approval on everything. After that, Toni Jo decides if the queue has earned lighter review. Until she says so, the default stays "show me first."

## Decisions made

- **Personal profile only.** Posts go out as Toni Jo, not the company page. Company cross-posting can be added later if wanted.
- **Buffer for scheduling.** Chosen over direct same-day posting so a batch can be approved once and drip out on schedule. Not yet connected (see below).
- **3-week approval trial** before any talk of the queue running on its own.

## Hard rules

- **Never auto-post.** Every post is shown and approved before it's queued or published.
- **Story posts must be real.** No invented names, employers, timelines, outcomes or quotes, ever. If no real story is ready that week, a different post type fills the slot.
- **Consent before featuring anyone.** Default to anonymised (same as the newsletter's "Candidate 1, 2, 3" approach); name people only with their explicit OK.
- **Sensitive record material never goes public.** Background checks, personal circumstances, anything disclosed in confidence for recruitment stays in the CRM. No exceptions, anonymised or not.
- **What can't be automated stays manual**: LinkedIn via Zapier can post, but can't search, read the feed, or DM. The daily network-building routine (comment on 5-10 posts, reply to every comment, DM people who engage, connect with peers) is Toni Jo's, permanently.

## Waiting on Toni Jo

1. **Confirm or tweak the niche statement** in the spec: "I help mining, civil and defence employers fill safety-critical trades and technical roles with vetted ADF veterans, so they solve their skills shortage and veterans get a real pathway into civilian careers."
2. **Work through the profile checklist** (photo, banner, headline, About, featured section) — one-time, manual, can't be automated.
3. **Read and edit batch 1** — cut or reword anything that doesn't sound like you.
4. **Supply the real story for the held slot**: which placement, the outcome in your own words, and named or anonymised. That's all that's needed to finish the batch.
5. **Set up Buffer** (you or Row): create the account and connect it in Zapier. It's a paid signup, so it wasn't done on your behalf. Until then, approved posts can still go out one at a time via the direct LinkedIn action.

## Where things live

| Thing | File |
|---|---|
| Build spec, guardrails, drafting prompt | `automations/linkedin-personal-brand.md` |
| Seeded posts, weeks 1-3 | `content/linkedin-posts-batch-1.md` |
| Workflow context (item #9) | `workflow-map.md` |
| Standing safety rules + open item | `CLAUDE.md` |
| The PR | itstonijo/Iornside-2026 #49 (draft) |
