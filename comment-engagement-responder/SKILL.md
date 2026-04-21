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

| Platform | Status | Why |
|----------|--------|-----|
| X / Twitter | AUTOMATED — public reply via Blotato | Legit API, low ban risk |
| Facebook | MANUAL ONLY — logged to queue for Edison | Meta actively bans headless comment automation |
| Instagram | MANUAL ONLY — logged to queue for Edison | Meta actively bans headless comment automation |
| LinkedIn | MANUAL ONLY — logged to queue for Edison | LinkedIn bans automated engagement, account at risk |

For the three manual-only platforms, this skill's only job is to generate the pin-comment
image and remind Edison to pin + reply manually. Every new comment on those platforms is
appended to `./generated/engagement-manual-queue.md` with platform, post URL, commenter,
and suggested reply text — Edison copy-pastes the reply himself from his phone/laptop.

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

## Step 2: Fetch New Replies (X/Twitter only)

**Scope is intentionally narrow.** Auto-replying on Meta (Facebook, Instagram) and LinkedIn is
NOT supported — these platforms actively detect and ban headless/automated comment activity,
and the risk of Edison's accounts being flagged or banned outweighs the engagement upside.
Those platforms are handled MANUALLY by Edison.

The only platform this responder acts on autonomously is **X/Twitter**, where Blotato (and the
X API it wraps) supports legitimate programmatic replies.

```
Tool: mcp__519a64f8-a8a3-437b-a8c0-da574ff4903f__blotato_list_accounts
```

Find Edison's X account. Call Blotato list-posts for the last 48h, then list-comments/replies
on each post. Collect a flat list of reply items:
`{ platform: "x", post_id, post_topic_slug, reply_id, commenter_name, commenter_handle,
reply_text, timestamp }`.

De-duplicate against `./generated/engagement-log.jsonl`.

If Blotato's X reply endpoint is NOT available, log each new reply to the manual queue and
skip — do NOT fall through to browser automation.

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

## Step 5: Post the Reply (X only)

For X/Twitter items, post the reply via Blotato with `parentPostId` set to the original
tweet/reply ID. Rate-limit: max 1 reply per 4 seconds. Max 20 replies per run.

For Facebook / LinkedIn / Instagram items, do NOT attempt to reply. Instead write one
line per item to `./generated/engagement-manual-queue.md`:
```
[timestamp] [platform] - [commenter_name] on [post_url]
  Comment: "[comment_text]"
  Suggested reply: "[generated reply text]"
  PDF link (if applicable): [Drive URL]
```

Append every sent X reply to `./generated/engagement-log.jsonl`.

---

## Step 6: Pin Comment Check (Facebook + LinkedIn)

For each recent Edison post on Facebook and LinkedIn that was a Type 8 / Strategy A post,
log a "MANUAL PIN REQUIRED" entry to `./generated/engagement-manual-queue.md`. Do NOT try
to verify the pin via scraping — just remind Edison to pin manually when he publishes.

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
- X/Twitter: [X] replies sent automatically
- Facebook: [N] items queued for manual reply
- LinkedIn: [N] items queued for manual reply
- Instagram: [N] items queued for manual reply
- Manual queue: ./generated/engagement-manual-queue.md
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
