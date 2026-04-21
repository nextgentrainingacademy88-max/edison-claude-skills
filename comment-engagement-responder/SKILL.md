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

| Platform | Primary path | Fallback |
|----------|-------------|----------|
| X / Twitter | AUTOMATED via Blotato API | — |
| Facebook | AUTOMATED via Claude-in-Chrome MCP using Edison's real browser session | Manual DM queue if PC asleep |
| Instagram | AUTOMATED via Claude-in-Chrome MCP (feed comments + DMs) | Manual DM queue if PC asleep |
| LinkedIn | AUTOMATED via Claude-in-Chrome MCP | Manual DM queue if PC asleep |

**Why Claude-in-Chrome instead of Browserbase or Playwright cloud:** the browser is Edison's
own, already logged in, with his real cookies, real user agent, and real typing cadence.
Meta and LinkedIn do not block this because it IS a human browser — Claude is just driving
the clicks and keystrokes. It only runs when Edison's PC is awake. When the PC is off the
hourly run falls through to the manual queue instead.

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

## Step 2: Detect Environment (PC awake check)

At the start of every run, probe whether Claude-in-Chrome MCP is connected:
```
Tool: mcp__Claude_in_Chrome__tabs_context_mcp  (or any lightweight Chrome MCP call)
```
- If it returns a live response within 5 seconds → `pc_awake = true`, full automation available.
- If it errors or times out → `pc_awake = false`, browser-based platforms fall through to manual queue.

Always print "Mode: [automated | manual fallback]" at the top of the run output.

---

## Step 3: Fetch New Comments / Replies Per Platform

### X / Twitter (always automated, never needs PC)
Use Blotato MCP:
```
Tool: mcp__519a64f8-a8a3-437b-a8c0-da574ff4903f__blotato_list_accounts
```
Find Edison's X account → list-posts last 48h → list-replies on each → collect items.
De-dup against `./generated/engagement-log.jsonl`.

### Facebook / Instagram / LinkedIn (automated when pc_awake, manual when not)

**When `pc_awake = true`:** use Claude-in-Chrome MCP to navigate Edison's logged-in browser:
- LinkedIn: `https://www.linkedin.com/in/edisonchua/recent-activity/comments/` — use
  `mcp__Claude_in_Chrome__navigate`, then `mcp__Claude_in_Chrome__get_page_text` to grab
  recent comment threads. Filter to comments newer than `last_engagement_run_utc`.
- Facebook: navigate to `https://www.facebook.com/edisonchua` → click each recent post →
  extract comment text + commenter name via `mcp__Claude_in_Chrome__read_page`.
- Instagram: navigate to `https://www.instagram.com/edisonchua` for feed comments AND
  `https://www.instagram.com/direct/inbox/` for DMs.

Use `mcp__Claude_in_Chrome__find` with selector hints to locate comment blocks. For each new
comment, collect the same item schema: `{ platform, post_id, post_topic_slug, comment_id,
commenter_name, commenter_handle, comment_text, timestamp }`.

Human-like pacing: wait 3-8 seconds (randomized) between navigations. Do not open more than
6 posts per platform per run.

**When `pc_awake = false`:** skip the scrape entirely for FB/LI/IG and write a single line
to the manual queue: `⏸ PC asleep at [timestamp] - FB/LI/IG scrape skipped this run`.

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

### X/Twitter (Blotato)
Post the reply via Blotato with `parentPostId` set to the original tweet/reply ID.
Rate-limit: 1 reply per 4 seconds, max 20 per run.

### Facebook / Instagram / LinkedIn when `pc_awake = true` (Claude-in-Chrome)

Drive the real browser to reply as Edison, exactly like a human:
1. `mcp__Claude_in_Chrome__navigate` to the post URL that holds the comment.
2. Scroll to the comment using `mcp__Claude_in_Chrome__find`.
3. Click the "Reply" link/button under the comment: `mcp__Claude_in_Chrome__left_click`
   or equivalent from the Chrome MCP toolkit.
4. Type the reply text slowly using `mcp__Claude_in_Chrome__form_input` or `type`.
   Simulate human typing cadence (50-120 ms per char); never paste the whole string at once.
5. Click Post/Send.
6. Take a screenshot via `mcp__Claude_in_Chrome__preview_screenshot` (or equivalent) for
   the log.
7. Wait 8-20 seconds (randomized) before the next reply on the same platform.

Rate limits (strict, do NOT exceed):
- Facebook: max 8 replies per run
- LinkedIn: max 5 replies per run
- Instagram (feed comments + DMs combined): max 8 per run

If ANY reply attempt fails (selector not found, login wall, 2FA prompt, rate-limit banner),
STOP the platform run immediately, fall through to the manual DM package for the remaining
items, and log the failure reason.

### Facebook / Instagram / LinkedIn when `pc_awake = false` OR automation fails
Prepare the manual DM package Edison can copy-paste:

1. **Copy of the original comment** (so Edison has context without opening the app).
2. **Ready-to-send DM text** in Edison's warm voice, example:
   ```
   Hey [First Name] 👋 thanks for commenting on my post! Here's the free guide I promised:
   [Drive link]. Hope it helps. If you find it useful, a share means a lot 🙏
   ```
3. **Resource link** — Drive PDF / website / prompt pack URL pulled from rotation-state.json
   under `{platform}_pdf_links[topic_slug]`. If no PDF exists yet for the post, create one
   using the PDF generation skill (see "PDF Generation" section below), upload to Drive,
   and save the new link back to rotation-state.json before writing the package.

Write each package to `./generated/engagement-manual-queue.md` in this format:
```
---
📌 [platform] — [commenter_name] ([commenter_handle])
Post: [post_url]
Time: [timestamp]

ORIGINAL COMMENT:
> [comment_text]

COPY-PASTE THIS DM:
Hey [First Name] 👋 thanks for commenting on my post! Here's the free guide I promised:
[Drive link]. Hope it helps. If you find it useful, a share means a lot 🙏

RESOURCE: [Drive URL or website link]
---
```

Also print the full package to stdout at the end of the run so Edison sees it in the
run's notification or chat output (until WhatsApp delivery is wired up later).

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

## PDF Generation (for resource requests when no PDF exists yet)

When a commenter asks for a guide/PDF that Edison promised in a post but no Drive link
exists yet under the `{platform}_pdf_links[topic_slug]` map, create it on-the-fly:

1. Read the original post caption + any tip comments to extract the guide content.
2. Generate clean markdown for the PDF. Format: title page with "AI with Edison" branding
   (navy #0A1628 background + yellow #FFD700 accent), author line "By Edison Chua - HRDC
   Certified AI Trainer", then one tip per page with a short intro + the actual prompt or
   step-by-step, then a closing CTA page ("Follow @edisonchua on LinkedIn / Facebook / X").
   No em dashes. Match Edison's voice from the original post.
3. Render to PDF using either:
   - `pandoc` CLI: `pandoc input.md -o output.pdf --pdf-engine=xelatex -V mainfont="Inter" -V geometry:margin=1in`
   - OR a headless Chromium print via `puppeteer` / `playwright` with a styled HTML template
     that uses the brand colors.
4. Save to `./generated/pdfs/[topic_slug]_[date].pdf`.
5. Upload to Google Drive folder `1MyvXqCm8Mhs02OCX1qyWotsT3Pj37Sm-` with sharing set to
   "Anyone with the link". Grab the shareable link.
6. Write the link back to `rotation-state.json` → `{platform}_pdf_links[topic_slug]` and
   push to GitHub so future runs reuse the same link.

If PDF generation tools are not available in the runtime, fall back to writing a clean
Google Doc via the Drive MCP (`mcp__d5e14817-74fe-4021-806c-825d865400cd__create_file`)
with MIME type `application/vnd.google-apps.document` and sharing the Doc link instead.

The goal is that every manual-queue package always has a real, working resource link — not
"PDF coming soon".

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
