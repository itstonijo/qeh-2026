# Automation #4 — LinkedIn Personal Brand Engine

From the workflow map, item #9 (LinkedIn content, ~2 hrs/week). Builds Toni Jo's personal LinkedIn brand: a clear niche, a fixed profile, a weekly content mix drawn from real Ironside material, and a daily network-building routine. Claude drafts, Toni Jo approves, Zapier/Buffer posts. Nothing goes out without her sign-off.

**Why this one:** the competitor analysis found a specific gap — nobody in veteran recruitment owns "veteran tradie ROI" outcome stories (RAEME/RAAF techs into Heavy Mobile Plant, North East Link, Fortescue). That's Toni Jo's niche to claim, and it's the one LinkedIn task Zapier can actually do something with: scheduled posting.

## Hard guardrails (non-negotiable)
- **Draft only, never auto-post.** Same rule as the email drafter: every batch of posts is shown in chat for Toni Jo's approval before anything is queued or published. This stays in place until she explicitly says she trusts the queue to run itself.
- **No sourcing or outreach automation.** LinkedIn via Zapier can post — it cannot search candidates, read the feed, or send DMs. That's a hard API limit, not a settings problem. Commenting, replying, and DMing stay 100% manual (see the daily routine below).
- Voice rules from CLAUDE.md are embedded in the AI prompt below — no corporate lines, no em-dashes, no emoji with cold contacts, sign off "Thank you" with no name.

## Prerequisites
1. **LinkedIn via Zapier** — `linkedin_create_share_update` (personal profile post), already enabled on this account.
2. **Buffer via Zapier** — *not yet connected.* Toni Jo or Row needs to create a Buffer account and connect it in Zapier before the queue step works (this is a real signup with its own cost, so it's a manual step, not something done on her behalf). Once connected, the Zapier action can be enabled.
3. **Claude** to draft the niche, calendar, and posts.

## Step 0 — Niche (one-time, confirm with Toni Jo)
Using the "who do I help / what problem / what result" framework:

> **I help mining, civil and defence employers fill safety-critical trades and technical roles with vetted ADF veterans — so they solve their skills shortage and veterans get a real pathway into civilian careers.**

Tweak wording with Toni Jo before treating it as fixed — everything else in this spec assumes this niche.

## Step 0.5 — Fix the profile (one-time, MANUAL — not automatable)
LinkedIn profile fields aren't exposed via the Zapier API, so this is a checklist for Toni Jo, not a build:
- **Photo:** HD, close-up, solid background, no selfies.
- **Banner:** one message, one CTA (e.g. "Placing veterans into mining, civil & defence roles").
- **Headline:** [who she helps] + [how] + [proof] — e.g. "Helping mining & civil employers fill safety-critical roles with vetted ADF veterans | 200+ placed since 2018 | Ironside Resources."
- **About section:** bullets, plain about what Ironside does, ends with a CTA (e.g. "Send me a message if you're hiring trades, operators or techs").
- **Featured section:** pin the Trade Upgrade Program one-pager or a recent placement story.
- **Custom button:** link to the main offer (contact/enquiry), shows on every post.

## Step 1 — Weekly content mix
Adapting the 9-post-type wheel to Ironside's real material, aimed at 2-3 posts/week:

| Stage | Post type | Ironside angle |
|---|---|---|
| Growth | Newsjacking | React to mining/civil/defence industry news (skills shortage reports, project announcements like FTA, North East Link) |
| Growth | Awareness | The ADF-to-civilian skills gap employers don't know how to bridge |
| Growth | Educational | How the Trade Upgrade Program turns RAEME/RAAF techs into Cert III Heavy Mobile Plant operators |
| Growth | Spectacle/story | A specific placement outcome — veteran, employer, result (mining/civil site, named where possible) |
| Build Trust | Story | Why Ironside exists — veteran-owned, Social Traders certified, "we speak both languages, Defence and business" |
| Build Trust | Short video/behind the scenes | Optional — a short clip of a site visit, a candidate's first day, Toni Jo talking through a placement |
| Build Trust | Lead magnet | Point to the Trade Upgrade Program one-pager or the replacement guarantee terms |
| Convert | Conversion | Direct CTA — "hiring trades or operators? Here's how we work" (permanent placement / contractor workforce) |
| Convert | Objection-handling | "Why a veteran over a generalist labour hire body" — work ethic, safety culture, ESG/social-procurement credit |

## Step 2 — Claude drafts the week's batch
Claude generates 2-3 posts for the coming week, one per content-mix slot above, using the AI prompt below. Output is shown in chat, not queued anywhere yet.

## Step 3 — Toni Jo approves
She reads the batch, edits anything that doesn't sound like her, and gives the go-ahead post by post or as a batch.

## Step 4 — Approved posts go to the Buffer queue (via Zapier)
Once Buffer is connected, approved posts are added to the queue with the agreed posting times. Buffer drips them out to Toni Jo's personal LinkedIn profile on schedule. Until Buffer is connected, approved posts go out one at a time via the direct `linkedin_create_share_update` Zapier action instead.

## The 3-week trial (Toni Jo's terms)
- **Weeks 1-3:** every batch is shown and approved in full before anything is queued or posted. No exceptions, no auto-posting.
- **After week 3:** if she's comfortable with how the drafts read and the cadence, this is the point to revisit whether the queue can run with lighter review (e.g. approve a month at a time instead of weekly). The default stays "show me before it goes out" until she says otherwise — same standing rule as the email drafter.

## Daily 60-minute network-building routine (MANUAL — Toni Jo does this herself)
Zapier/LinkedIn has no read or DM access, so this can't be automated. It's a routine, not a build:
1. **Before posting:** comment on 5-10 posts in the mining/civil/defence/veteran space.
2. **After posting:** reply to every comment on her own post.
3. **After replying:** DM the people who engaged.
4. **Ongoing:** send connection requests to peers/creators at her level in the niche.

Consistency builds visibility, engagement builds relationships, relationships build growth.

## The AI prompt (paste into Step 2)

```
You are drafting LinkedIn posts as Toni Jo Mooney, Specialist Recruiter & BD at
Ironside Resources, a veteran-owned recruitment agency and social enterprise that
places ex-ADF veterans into mining, civil and defence roles.

NICHE (everything below should serve this):
I help mining, civil and defence employers fill safety-critical trades and
technical roles with vetted ADF veterans, so they solve their skills shortage
and veterans get a real pathway into civilian careers.

Write [N] LinkedIn posts for the post types below. Output ONLY the post text for
each, labelled with its post type — no preamble, no hashtag spam (2-3 relevant
tags max, or none).

VOICE (follow exactly):
- Warm, direct, human. Plain talk, short and uneven sentences, contractions.
- No corporate or salesy lines. Never "we are a leading provider," never generic
  LinkedIn-guru filler.
- No CAPS, no em-dashes, no emojis unless there's genuine rapport with the
  audience (rare for LinkedIn posts — default to none).
- Sound like a specific person who's actually placed these people, not a brand
  account.

POST TYPES FOR THIS BATCH:
[list from the content mix table, e.g. "1. Educational — Trade Upgrade Program;
2. Story — placement outcome; 3. Objection — why a veteran over a generalist"]

MATERIAL TO DRAW ON:
- Trade Upgrade Program: RAEME/RAAF technicians into Cert III Heavy Mobile Plant,
  mainly diesel mechanics, a pipeline not a one-off.
- Veteran-owned, Social Traders certified — every placement funds veteran support.
- 4,000+ vetted candidates, 200+ placed in mining/civil since 2018, 98%
  interview-to-hire.
- 3-month replacement guarantee.
- Sweet spot: mid-tier operators and tier-1 project supply (e.g. FTA, North East
  Link, Fortescue, Linfox, WesTrac).
- "Leading the Transition" / "we speak both languages, Defence and business."

Each post ends with a soft CTA (comment, DM, or "if you're hiring, let's talk") —
never a hard sell.
```

## Test before you trust it
1. Run a batch and read it against CLAUDE.md's voice rules before showing Toni Jo — does it sound like her, not a template?
2. Confirm the content-mix table is actually being rotated through (not the same post type every week).
3. First 3 weeks: every post reviewed before it's queued or posted, per the trial terms above.
4. After that, check in with Toni Jo on whether the cadence and voice have earned lighter-touch review.

## Limitations
- Sourcing, commenting, replying, and DMing on LinkedIn are not automatable through Zapier — the daily network-building routine above stays manual, permanently.
- This only covers Toni Jo's personal profile. Company-page posts (Ironside Resources) would be a separate `linkedin_create_company_update` flow if wanted later.
- Buffer must be connected before the queue works; until then, approved posts go out one at a time via direct Zapier posting.

## Next build
Once this is trusted and the trial period is done, the natural pairing is the newsletter automation (#6 on the workflow map) — the LinkedIn outcome stories and the monthly candidate/client newsletter can draw from the same placement material instead of being researched twice.
