# Engagement Manual Queue — 2026-04-25 06:36:48 UTC

## Mode: Infrastructure Limitation — Manual Queue Only

**PC Awake Check:** SKIPPED — Claude-in-Chrome MCP not available in this runtime.

**Comment Fetch Status:**
- **X/Twitter:** Blotato tools do not expose comment-fetching API (`list-posts`, `list-replies`). Cannot autonomously fetch Edison's recent tweets or reply threads.
- **Facebook:** Claude-in-Chrome MCP unavailable. Cannot navigate browser to scrape comments.
- **Instagram:** Claude-in-Chrome MCP unavailable. Cannot scrape feed comments or DMs.
- **LinkedIn:** Claude-in-Chrome MCP unavailable. Cannot navigate browser to scrape comments.

---

## Required Infrastructure for Full Automation

To enable the engagement routine, one of the following must be resolved:

### Option A: Implement Claude-in-Chrome MCP Integration
- Probe for Chrome session at run start via lightweight MCP call.
- On `pc_awake=true`: automate FB, Instagram, LinkedIn replies via browser navigation.
- Supports human-like typing cadence (50-120ms per char) and randomized inter-reply delays.
- Requires that Edison's PC is awake and Chrome browser is running.

### Option B: Extend Blotato API Integration
- Request Blotato add `list_published_posts(account_id, days=2)` endpoint.
- Request Blotato add `list_post_comments(post_id)` endpoint.
- Request Blotato add `post_reply(comment_id, text)` endpoint for X/Twitter and other platforms.
- Would enable fully remote automation without requiring Edison's PC.

### Option C: Use Platform Native APIs
- Twitter API v2: Fetch replies via search or conversation threads endpoint.
- Facebook Graph API: Fetch post comments.
- Instagram Graph API: Fetch feed comments and DMs.
- LinkedIn API: Fetch post comments.
- Requires implementing auth + API rate-limit logic + response parsing per platform.

---

## Next Steps for Edison

1. **Decision:** Pick Option A, B, or C above.
2. **For this run:** Check `./generated/engagement-log.jsonl` for historical data once manual replies are processed.
3. **For future runs:** Once infrastructure is in place, the responder will autonomously:
   - Fetch all new comments (since `last_engagement_run_utc`).
   - Classify each (resource_request, question, compliment, negative, unclear).
   - Reply automatically with warm, <25-word responses.
   - Deliver PDF links from `rotation-state.json` for resource requests.
   - Fall back to manual queue if any API fails mid-run.
   - Update state and push to GitHub.

---

## Infrastructure Log

**2026-04-25 06:36:48 UTC — Hourly Engagement Run**
- Environment: Claude Code Haiku 4.5
- Available MCPs: GitHub (mcp__github), Google Drive (mcp__Google-Drive), Blotato (mcp__Blotato)
- Unavailable: Claude-in-Chrome, platform native APIs
- Fallback: Manual queue only

Waiting for infrastructure decision.
