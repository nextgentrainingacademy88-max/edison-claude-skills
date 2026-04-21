---
name: Hourly comment engagement routine
description: Cross-platform auto-reply system for Edison's LinkedIn, Facebook, X, and Instagram posts
type: project
originSessionId: 42f8fa17-a57a-4d1d-903e-8d50449b4999
---
Edison runs an hourly comment-engagement routine across his social accounts. The logic
lives in the skill `comment-engagement-responder` (repo: nextgentrainingacademy88-max/
edison-claude-skills) and is invoked by the scheduled task `social-media-engagement-hourly`.

**Scope:**
- LinkedIn: public comments on Edison's last-48h posts → public replies.
- Facebook: public comments → public replies + pin-comment check.
- X/Twitter: replies to Edison's tweets → public replies.
- Instagram: DMs to Edison's account → private replies (feed comments secondary, only if
  Blotato supports them).

**Key behaviors:**
- Auto-detects "resource request" comments (asking for PDF/guide/link) and replies with
  the matching Google Drive link from `rotation-state.json` → `{platform}_pdf_links[topic_slug]`.
- Must store the Drive link in rotation-state.json BEFORE posting any resource-promising post.
- Logs "MANUAL PIN REQUIRED" to `./generated/engagement-manual-queue.md` when a Type 8 /
  Strategy A Facebook or LinkedIn post has no pinned first comment yet (pinning is not
  supported via API, Edison pins manually).

**Why:** Edison's Facebook strategy mirrors Kanji Low's format — the CTA "COMMENT FOR MORE"
only converts if somebody replies fast with the promised value. Within one hour is the
target response window.

**How to apply:** When Edison posts a tips/PDF-promising post on any of the 4 platforms,
ensure the topic slug + Drive link pair is added to `rotation-state.json` before the
scheduled engagement run hits. For Type 8 Facebook posts, also generate the branded
pin-comment image (Edison pointing down, yellow "ALL X BELOW") at 1:1 — see the Pin
Comment Protocol in `facebook-content-creator/SKILL.md`.
