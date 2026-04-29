---
name: Local routine setup (PRIMARY mode as of 2026-04-29)
description: Edison's social media posting now runs from his LOCAL PC via scheduled-tasks MCP. The cloud remote routines (claude.ai Routines) are DISABLED for posting (engagement hourly stays remote). When PC is online and cron fires, the local agent runs the full pipeline directly against api.kie.ai (no Worker proxy needed locally).
type: project
---

# Local routine setup — PRIMARY mode (since 2026-04-29)

## Why local replaced cloud

Cloud remote routines (claude.ai Routines) had three persistent issues:
1. Anthropic sandbox firewalled `api.kie.ai` outbound — required a Cloudflare Worker proxy
2. The remote sandbox doesn't load Edison's `.env`, so API keys had to be inlined into the routine prompt
3. The remote agent occasionally posted raw face photos when image generation failed, creating caption/image mismatches

Locally, none of these apply: kie.ai is reachable directly, `.env` loads, Edison can monitor / cancel, and a `last_topic_*_date` de-dup check prevents double-posts when both local-cron AND a manual run try to fire on the same day.

## What runs WHERE

| Routine | Mode | Cron | Notes |
|---|---|---|---|
| Morning post | **LOCAL** | `3 9 * * *` (9:03 AM MYT) | task `social-media-morning-post` in `~/.claude/scheduled-tasks/` |
| Afternoon post | **LOCAL** | `7 13 * * *` (1:07 PM MYT) | task `social-media-afternoon-post` |
| Engagement hourly | REMOTE | `30 * * * *` | claude.ai Routine — X/Twitter auto-reply works fine cloud-side |

The two cloud "Social Media Morning/Afternoon Post" routines are now **disabled** in claude.ai Routines (kept for emergency rollback, not actively firing).

## How the cron fires

Both local tasks use the [scheduled-tasks MCP](https://github.com/anthropics/claude-code) which:
- Registers the cron entry into `~/.claude/scheduled-tasks/<task-id>/SKILL.md`
- Fires the task at the specified LOCAL time **whenever Claude Code is running on Edison's PC**
- If Claude Code is closed at the cron time → that day's slot is missed (no automatic catch-up by the scheduler itself)

Edison's working assumption: Claude Code stays open while the PC is online. If he closes Claude Code and reopens it after 9:03 AM, the morning slot is missed for that day unless he runs the catch-up command (see below).

## Catch-up command for missed slots

When Edison opens Claude Code mid-day and a scheduled slot was missed, he can manually trigger:

> "Run the morning post catch-up now" (or "afternoon post catch-up")

The agent should:
1. Read `rotation-state.json` from the local working dir.
2. Check `last_topic_morning_date` — if it equals today's MYT date, ABORT (already ran, do not double-post).
3. If today's MYT date hasn't been recorded yet for that slot, fire the same logic as the scheduled task (read the SKILL.md prompt verbatim from `~/.claude/scheduled-tasks/social-media-morning-post/SKILL.md` and execute).
4. After success, write today's MYT date back to `last_topic_morning_date` (same for afternoon).

This is the de-dup guarantee: same-date check prevents double posts regardless of how the run is triggered (cron, manual catch-up, or session-start hook).

## Optional: SessionStart auto catch-up

For "PC online → posting fires straight away" without a manual command, add a SessionStart hook to `.claude/settings.json` that runs the catch-up logic on every Claude Code launch. The de-dup check (Step 2 above) ensures no double posting.

Example hook (use `update-config` skill to install):
```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Edison: if today_MYT_date != last_topic_morning_date AND time>=9:00 MYT, fire morning catch-up. Same for afternoon at 13:00 MYT.'"
          }
        ]
      }
    ]
  }
}
```

The hook prints a reminder; Edison's Claude Code session reads it and runs the catch-up if the conditions are met. (Not auto-installed by default — Edison opts in if desired.)

## Image generation pipeline (local)

LOCAL has direct access to `api.kie.ai` — no Worker proxy needed. The two scheduled tasks call:
- `POST https://api.kie.ai/api/v1/jobs/createTask`
- `GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId=...`

with body:
```
{
  "model": "gpt-image-2-image-to-image",
  "input": {
    "prompt": "<verbatim viral prompt>",
    "input_urls": ["<face_primary.blotato_url>"],
    "aspect_ratio": "4:5"
  }
}
```

**Critical:** field is `input_urls` (NOT `image_urls`). Wrong field silently disables face preservation. Confirmed working 2026-04-29 with the cyberpunk test.

## Validation gate (mandatory before posting)

For each generated image, all 3 must pass before `blotato_create_post`:
1. URL on `tempfile.aiquickdraw.com` — NOT `database.blotato.io` (raw face URL CDN).
2. URL ≠ face reference URL.
3. kie.ai task `state == success`.

If any check fails → log to `generated/engagement-manual-queue.md`, skip that destination, continue with the others. Edison would rather have ZERO posts than one mismatched-caption post.

## Prompt sourcing (hard rule)

NEVER write prompts from scratch. Copy VERBATIM from trending Threads/Twitter creators (@nickfloats, @javilopen, @icreatelife, @misskatrinarose, @lastaiupdate, @saprilpobud) or saved entries in `memory/project_pop_culture_prompts.md`. Only swap: face → Edison's face URL, brand colors → navy + yellow, optional outfit text. Save new prompts back to the memory file with creator attribution.

## 6 Blotato destinations per run

| # | Destination | accountId | pageId |
|---|---|---|---|
| 1 | LinkedIn Edison Chua personal profile | 18089 | (omit) |
| 2 | LinkedIn Nextgen Training Academy company page | 18089 | 108414535 |
| 3 | Facebook NextGen Training Academy | 27053 | 726492947207808 |
| 4 | Instagram aiwithedison | 41734 | — |
| 5 | Threads edisonchuaofficial | 5937 | — |
| 6 | X/Twitter aiwithedison | 16254 | — |

LinkedIn = same image, two destinations, slightly different caption voice (personal = casual first-person, page = authoritative brand).

## Rollback to remote (emergency)

If local tasks break (Claude Code crash, PC permanently offline, etc.), re-enable the cloud routines:
1. claude.ai Routines → "Social Media Morning Post 9am" → enable
2. claude.ai Routines → "Social Media Afternoon Post (1pm MYT)" → enable
3. Disable both local scheduled tasks (`mcp__scheduled-tasks__update_scheduled_task` with `enabled: false`).

The remote routines retain the latest prompt with the Worker proxy + `input_urls` + validation gate, so a rollback works in one click.
