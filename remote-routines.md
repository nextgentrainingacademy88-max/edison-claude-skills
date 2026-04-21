# Claude Remote Routines — Setup Reference

These routines run on Anthropic's servers via Claude's native "Remote Routines" feature (create at claude.ai → Routines → New remote routine). They execute regardless of Edison's PC state.

**Repository:** `nextgentrainingacademy88-max/edison-claude-skills`
**Timezone for all schedules:** Asia/Kuala_Lumpur (MYT, UTC+8)

---

## Routine 1: Social Media Morning Post (9am MYT)

- **Name:** Social Media Morning Post (9am MYT)
- **Repository (in UI):** nextgentrainingacademy88-max/edison-claude-skills
- **Trigger:** Schedule, cron `3 9 * * *`
- **Connectors:** Blotato, Google Drive

**Prompt:**

```
You are running Edison Chua's morning social media automation. Execute the full posting pipeline.

Step 1 - Pull latest skills and state from the GitHub repo nextgentrainingacademy88-max/edison-claude-skills:
- CLAUDE.md
- rotation-state.json
- Every SKILL.md under: linkedin-content-writer/, edison-content-image-creator/, carousel-creator/, edison-infographic-creator/, facebook-content-creator/, threads-x-content-creator/, comment-engagement-responder/
- assets-manifest.json
- Every file under memory/

Step 2 - Research: WebSearch the latest AI news from the last 24 hours. Focus on Claude, ChatGPT, NotebookLM, Manus, Gemini, Perplexity, and anything practical for Malaysian SME and corporate trainers. Pick ONE top story as the core topic.

Step 3 - Generate content for all 5 platforms following the skills:
- LinkedIn: linkedin-content-writer + ONE rotated image skill. Use rotation-state.json to pick the next one.
- Facebook: facebook-content-creator, rotate next post type. Type 8 Kanji-style is the preferred default for AI tool/tip topics.
- Instagram: carousel-creator (branded navy + yellow).
- Threads + X/Twitter: threads-x-content-creator.

Step 4 - Generate images: Blotato templates first, kie.ai Nano Banana Pro fallback. Always use face_primary URL from assets-manifest.json for face-reference images. No em dashes. Colors: navy #0A1628 + yellow #FFD700.

Step 5 - Post to all 5 platforms via the Blotato connector.

Step 6 - Update rotation-state.json with last-used styles and push the updated file back to the GitHub repo.

Step 7 - Report a short summary per platform.

Rules:
- Never use em dashes.
- Preserve Edison's face across all AI images.
- Hashtags: LinkedIn 3-5, Facebook 5 max, Instagram 10-15, Threads 0, X 1-2.
- Aspect ratios: LinkedIn 4:5, Facebook 1:1 or 4:5, Instagram 4:5, Threads 1:1 or 4:5, X 1:1 or 16:9.
```

---

## Routine 2: Social Media Afternoon Post (1pm MYT)

- **Name:** Social Media Afternoon Post (1pm MYT)
- **Trigger:** Schedule, cron `7 13 * * *`
- **Connectors:** Blotato, Google Drive

**Prompt:** Same as Routine 1 with two changes:
1. Replace "morning" with "afternoon" in the opening line.
2. At the start of Step 2, add: "Skip any story that was already used in the morning run (check rotation-state.json last_topic_morning). Pick a different angle or different tool from what was posted this morning."

---

## Routine 3: Engagement Hourly

- **Name:** Social Media Engagement Hourly
- **Trigger:** Schedule, cron `17 * * * *`
- **Connectors:** Blotato, Google Drive

**Prompt:**

```
Run Edison Chua's hourly comment-engagement routine. Execute only, no confirmation prompts.

Step 1 - Pull from GitHub repo nextgentrainingacademy88-max/edison-claude-skills:
- comment-engagement-responder/SKILL.md
- rotation-state.json
- memory/project_engagement_routine.md

Step 2 - Platforms:
- X / Twitter: fully automate replies via Blotato. List Edison's X posts from last 48h, list replies, classify (resource_request / question / compliment / negative / unclear), reply warm and under 25 words, no em dashes. Cap 20 per run. For resource_request, pull Drive PDF link from rotation-state.json x_pdf_links[topic_slug].
- Facebook, Instagram, LinkedIn: DO NOT attempt browser automation. Use Blotato's list-comments endpoint if exposed. For each new comment, prepare a DM package per the responder skill (original comment + ready-to-send DM wording + Drive PDF link).

Step 3 - Auto-PDF: if a resource_request has no Drive link under {platform}_pdf_links[topic_slug], generate a branded PDF (navy #0A1628 + yellow #FFD700, AI with Edison cover, one tip per page), upload to Drive folder 1MyvXqCm8Mhs02OCX1qyWotsT3Pj37Sm- with Anyone-with-link sharing, save link to rotation-state.json, push updated file to GitHub.

Step 4 - For FB / LinkedIn / Instagram items: commit the DM packages to the GitHub repo at manual-queue/YYYY-MM-DD-HH.md. Include them in the run summary too.

Step 5 - De-dup: use memory/engagement-log.jsonl in the repo (append a new line per sent reply and commit).

Step 6 - Update rotation-state.json engagement block (last_engagement_run_utc, engagement_stats) and push.

Rules:
- Never auto-reply on FB / IG / LinkedIn from this routine.
- Never reply twice to the same comment.
- Never reply to negative/troll items; log SKIPPED.
- On any API error, log and continue.
```

---

## Notes

- All three routines read and write the GitHub repo, so every change Edison makes to skills or CLAUDE.md (pushed from the local editor) is picked up by the next remote run.
- The engagement routine can NOT do browser-based auto-reply on Meta/LinkedIn remotely (Claude-in-Chrome is local-only). Those platforms are manual-queue only in the cloud version.
- If Edison wants Meta/LinkedIn auto-reply, run the engagement skill manually on his PC during a session; that path still works via Claude-in-Chrome when his browser is open.
