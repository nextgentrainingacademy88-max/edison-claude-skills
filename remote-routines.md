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

Step 2 - Research: WebSearch the latest AI news/updates from the last 24-72 hours. Prioritize in this order:
(a) NEW AI tool releases or NEW features (Claude updates, ChatGPT new features like GPT-5 image gen, NotebookLM new capabilities, Manus releases, Gemini, Perplexity, Midjourney, Runway, ElevenLabs, Sora, Veo, Kling).
(b) If nothing breaking in (a), pivot to a high-engagement practical how-to angle using a recently released tool ("Here's how to use [tool] for [outcome]").
(c) If neither (a) nor (b) have a fresh angle, pivot to a monetization angle ("How to make money with Claude Code", "AI side-hustle with [tool]").
Pick ONE top story as the core topic for all 5 platforms. Pick a short KEYWORD tied to the topic (e.g. CLAUDE, PROMPT, AGENT, GUIDE, NOTEBOOK) for the comment-for-link CTA.

Step 3 - Generate content for all 5 platforms following the skills. BEFORE writing any image prompt, READ the relevant section of the skill file verbatim (e.g. carousel-creator Cover Slide lines 252-286, facebook-content-creator Type 8 section). Do NOT write prompts from scratch. Fill in topic variables against the skill's template exactly.
- LinkedIn: linkedin-content-writer + ONE rotated image skill. Use rotation-state.json to pick the next one.
- Facebook: facebook-content-creator, rotate next post type. Type 8 Kanji-style is the preferred default for AI tool/tip topics.
- Instagram: carousel-creator (vibrant flat color + white glow circle behind Edison + topic-matched outfit/prop on cover).
- Threads + X/Twitter: threads-x-content-creator.

**Mandatory elements the skills enforce:**
- Carousel cover: vibrant flat color background (NOT dark navy), mandatory large white glowing circle behind Edison, topic-matched outfit with props (e.g. detective + magnifying glass, fishing rod, boom mic).
- Facebook Type 8 Kanji: Edison holding glowing 3D brand logo, blue verified badge, navy bottom block with yellow+white stacked headline, "COMMENT FOR MORE" CTA, 4:5.
- Memes: NEVER use placeholders. Always source the actual meme from imgflip API / Reddit r/memes top-week / knowyourmeme trending. Pick what fits THIS topic, not a fixed list. No romance memes. Square/portrait only.
- Screenshots: actual screenshot must be embedded, never a placeholder box.

Step 4 - Generate images using the CORRECT path per image type:

**Face-required images** (LinkedIn Type 8, Facebook Type 2/7/8, carousel cover, carousel CTA slide, X/Twitter MrBeast thumbnail, pin-comment image, any image where Edison must appear):
- ALWAYS call kie.ai Nano Banana Pro FIRST with `image_input: ["<face_primary.blotato_url from assets-manifest.json>"]`.
- The canonical URL is `face_primary.blotato_url` in assets-manifest.json (NOT `drive_url` — the Drive URL sometimes returns a redirect).
- Do NOT use Blotato built-in templates (Tutorial Carousel, Quote Card, Tweet Card, Whiteboard Infographic, etc.) for face-required images. Those templates are text-to-image only and will generate a generic Asian male that does not look like Edison.
- If kie.ai fails, retry once with a simplified prompt. If still fails, fall back to the Blotato Instagram Carousel Slideshow template (`53cfec04-2500-41cf-8cc1-ba670d2c341a`) with `model: "nano-banana-pro"` AND the face URL as input. If all three fail, log the intended prompt to manual queue and skip that post — do NOT publish a face-required image with no face or a wrong face.

**Face-free images** (infographics, quote cards, numbered tip slides, decorative graphics, threads infographic):
- Blotato built-in template first (fastest, cheapest).
- Blotato Carousel Slideshow template second.
- kie.ai third.

Always log the path used per image in `rotation-state.json` under `image_generation.last_path_used` with enough detail to debug (e.g. `"kie_ai_face_ok"`, `"blotato_template_tutorial_carousel"`, `"kie_ai_retry_after_blotato_credit_fail"`).

No em dashes anywhere. Colors: navy #0A1628 + yellow #FFD700.

Step 4b - Before publishing, create or locate the resource tied to the KEYWORD (GitHub link, Drive PDF, prompt pack). If no resource exists yet for this topic, auto-generate a branded PDF (navy + yellow, "AI with Edison" cover, practical content) and upload to Google Drive folder 1MyvXqCm8Mhs02OCX1qyWotsT3Pj37Sm- with "Anyone with link" sharing. Store the keyword and link in rotation-state.json under {platform}_pdf_links[topic_slug] so the hourly engagement responder auto-delivers it when someone comments the KEYWORD. Every post copy MUST end with: `Comment [KEYWORD] and I'll DM you the [GitHub link / prompt pack / PDF guide].` Example KEYWORDS: CLAUDE (GitHub repo https://github.com/nextgentrainingacademy88-max/edison-claude-skills), PROMPT (prompt pack), AGENT (agent template), GUIDE (how-to PDF), NOTEBOOK (NotebookLM workflow).

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
