---
name: Hourly comment engagement routine (X only, others manual)
description: Auto-reply to X/Twitter comments only; Facebook/LinkedIn/Instagram are manual-only to avoid bans
type: project
originSessionId: 42f8fa17-a57a-4d1d-903e-8d50449b4999
---
Edison runs an hourly comment-engagement routine via the skill
`comment-engagement-responder` + scheduled task `social-media-engagement-hourly`.

**AUTOMATED (only one platform):**
- **X / Twitter** — replies to tweet-replies via Blotato (official API, safe).

**MANUAL ONLY (do NOT automate):**
- Facebook, Instagram, LinkedIn.
- Reason: Meta and LinkedIn actively detect and ban headless/automated comment activity.
  Even with stealth browsers like Browserbase, the risk of Edison's accounts being flagged
  or banned outweighs the engagement upside. Edison replies manually from his phone.
- What the responder DOES do for these platforms:
  - Appends each new comment + a suggested reply + PDF link (if applicable) to
    `./generated/engagement-manual-queue.md`.
  - Logs "MANUAL PIN REQUIRED" reminders for Type 8 / Strategy A posts.

**Why:** The cost of an account ban is catastrophic (loss of audience, brand, leads). The
benefit of 10-20 additional auto-replies per day is small by comparison. Decision was made
2026-04-22 after considering Browserbase and Playwright CLI options and explicitly rejecting
them for Meta + LinkedIn.

**How to apply:**
- NEVER add Meta or LinkedIn auto-reply to the engagement responder, even if a new cloud
  browser option appears. If asked, push back and remind about this decision.
- When Edison posts a PDF-promising post on any platform, still store the topic slug +
  Drive link pair in `rotation-state.json` under `{platform}_pdf_links` so the suggested
  reply in the manual queue contains the correct link.
- X auto-replies only: warm, direct, under 25 words, no em dashes, no markdown.
