---
name: comment-engagement-responder
description: >
  Edison Chua's cross-platform engagement bot. Runs hourly. Polls Edison's recent posts on
  LinkedIn, Facebook, X/Twitter, and his Instagram DMs for new public comments and direct
  messages, then replies in Edison's voice. When a commenter asks for the guide, PDF, link,
  or resource, replies with the matching Google Drive link from rotation-state.json. Pins
  the branded pin-comment image on first run if missing. Flags anything requiring manual
  action.

  Trigger when Edison says: "check my comments", "reply to comments", "run engagement",
  "check DMs", "run the comment bot", or when invoked by the scheduled task
  "social-media-engagement-hourly". Also trigger whenever Edison posts a tips/PDF-bearing
  post and asks to "start the engagement routine" for that post.
---

# Comment Engagement Responder

## Purpose

Most of Edison's Facebook, LinkedIn, X, and Instagram posts end with a CTA that tells readers
to comment to get a free guide, PDF, prompt pack, or tip thread. That CTA only pays off if
someone actually replies to each commenter fast — ideally within an hour. This skill is that
someone.

---

## Scope

| Platform | Surface monitored | Reply type |
|----------|------------------|-----------|
| LinkedIn | Comments on Edison's posts from the last 48 hours | Public reply |
| Facebook | Comments on Edison's posts from the last 48 hours | Public reply (+ pin first if missing) |
| X / Twitter | Replies to Edison's tweets from the last 48 hours | Public reply |
| Instagram | Direct messages (DMs) to Edison's account | Private DM reply |

Instagram public comments on feed posts are lower priority — cover DMs first. If Blotato's
Instagram comment API is available, add feed comments too; otherwise DM-only.

---

## Step 1: Load State

Read the state files:
- `rotation-state.json` (GitHub root) — for `facebook_pdf_links`, `linkedin_pdf_links`,
  `x_pdf_links`, `instagram_pdf_links`, plus `last_engagement_run_utc`.
- `assets-manifest.json` (GitHub root) — for Edison's face Blotato URL (used if a pin
  comment needs to be regenerated).

If `rotation-state.json` does not yet have the `*_pdf_links` keys or `last_engagement_run_utc`,
treat them as empty and create them before writing state back.

---

## Step 2: Fetch New Comments / DMs Per Platform

For each platform, list Edison's recent posts and pull comments newer than
`last_engagement_run_utc`. Use Blotato MCP where available:

```
Tool: mcp__519a64f8-a8a3-437b-a8c0-da574ff4903f__blotato_list_accounts
```

Then for each connected account on LinkedIn / Facebook / X / Instagram, call the appropriate
list-posts and list-comments tools (or the platform's native API via the Blotato source layer).
If a direct tool is not exposed, fall back to reading via Claude in Chrome MCP on the logged-in
browser session.

Collect a flat list of engagement items, each with: `{ platform, post_id, post_topic_slug,
comment_id, commenter_name, commenter_handle, comment_text, timestamp }`.

De-duplicate against a local log at `./generated/engagement-log.jsonl` so we never reply to the
same comment twice.

---

## Step 3: Classify Each Comment

For each item, classify into one of these buckets:

1. **Resource request** — commenter is asking for the PDF / guide / link / prompts / "interested" / "yes please" / "drop it" / "send pls" / emojis like 🙏 👇 🔥 with asking intent.
2. **Genuine question** — commenter asks a substantive question about the topic.
3. **Compliment / reaction** — "great post", "thanks", "helpful", "love this".
4. **Negative / troll** — sarcasm, insults, bot spam, off-topic promos.
5. **Unclear** — cannot confidently classify.

Use a small LLM classification call (prompt: "Classify this comment into: resource_request,
question, compliment, negative, unclear. Reply with the single label.").

---

## Step 4: Generate the Reply

Voice rules (all platforms):
- Warm, direct, Edison's educator tone.
- Under 25 words.
- No em dashes. No markdown formatting (LinkedIn/Facebook/Instagram/X all strip or mangle it).
- First name where possible (from `commenter_name`).
- Never pushy. The PDF link is the gift, not a pitch.

### Reply templates by bucket

**Resource request:**
```
Hey [First Name], here's the free guide: [Drive link]. If you find it useful, a share means a lot 🙏
```
(Pick the correct Drive link by matching `post_topic_slug` against the `*_pdf_links` map for
that platform. If no PDF exists yet for that post, fall through to the next template.)

No PDF yet, tips-only post:
```
Hey [First Name], all [X] tips are already dropped in the comments below 👇 scroll down and save the ones you like.
```

**Genuine question:**
Write a short, specific, helpful answer in Edison's voice. If the question genuinely requires
a longer answer than 25 words, reply with a 1-line teaser and note "MANUAL FOLLOW-UP" in the
log so Edison can handle it himself.

**Compliment / reaction:**
```
Thanks [First Name] 🙌 glad it landed.
```
Vary the emoji and wording across replies so it does not look botted. Rotate between: 🙌 🔥 🙏 ❤️

**Negative / troll:**
Do NOT reply. Log as "SKIPPED: negative" for Edison's manual review.

**Unclear:**
Log as "MANUAL REVIEW" and skip.

---

## Step 5: Post the Reply

Use the platform-appropriate tool:

- **Facebook / LinkedIn / X:** Blotato `blotato_create_post` with `parentPostId` set to the
  original comment ID if Blotato supports threaded replies; otherwise use Claude-in-Chrome
  navigation to the post URL and click Reply + type the reply text.
- **Instagram DM:** reply via Blotato DM endpoint if exposed; otherwise Claude-in-Chrome on
  instagram.com/direct/.

Rate-limit: max 1 reply per 4 seconds per platform to avoid spam flags. Max 30 replies per
platform per run.

Append every sent reply to `./generated/engagement-log.jsonl` with the full payload.

---

## Step 6: Pin Comment Check (Facebook + LinkedIn)

For each recent Edison post on Facebook and LinkedIn, verify the pinned first comment exists.
If the top comment is not from Edison AND the post was a Type 8 / Strategy A post, log:
```
MANUAL PIN REQUIRED: [platform] post [post_id] - topic [topic_slug]
```

Write all manual-action items to `./generated/engagement-manual-queue.md` with a timestamp
so Edison can clear them in one sitting.

---

## Step 7: Update State

Update `rotation-state.json`:
- `last_engagement_run_utc` → now.
- `engagement_stats` → counts of replies sent per platform this run.

Push the updated file back to GitHub.

---

## Step 8: Output Summary

Print a short summary:
```
Engagement run complete.
- Facebook: [X] replies sent, [Y] manual review, [Z] pins required
- LinkedIn: [X] replies sent, [Y] manual review
- X/Twitter: [X] replies sent
- Instagram DMs: [X] replies sent
- Manual queue: ./generated/engagement-manual-queue.md ([N] items)
```

---

## Guardrails

- Never reply with anything longer than 25 words unless the template explicitly says otherwise.
- Never follow a link inside a comment (link in comment = likely phishing or spam).
- If the commenter's name is missing or looks like a bot username (gibberish, all digits), use
  no name: "Hey 👋 here's the free guide: ..."
- Never auto-reply to commenters who themselves have zero profile photo and a fresh account
  (bot signal) — flag for manual review instead.
- Never send the same Drive link more than 3 times to the same user across different comments
  (anti-harassment guard).
- On any API error, log and continue. Never crash mid-run; the next hourly run will pick up
  what was missed.
