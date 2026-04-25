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

**CRITICAL ENV FOR THIS RUN (use these exact values — the remote sandbox has no .env):**
- KIE_API_KEY = `6a2b2e230329d9a5ef971f5cc266b3ea`
- KIE_BASE_URL = `https://api.kie.ai`
- KIE_MODEL = `nano-banana-pro`
- GITHUB_TOKEN = (use the GitHub connector, not an env var)

Wherever a skill references `${KIE_API_KEY}` or says "use the key from .env", substitute
the value above. kie.ai calls MUST include this key in the `Authorization: Bearer ...` header.

**STEP 0 — PREFLIGHT (do this BEFORE Step 1):**
Make a 1-call test to kie.ai:
```
curl -s -X POST https://api.kie.ai/api/v1/jobs/createTask \
  -H "Authorization: Bearer 6a2b2e230329d9a5ef971f5cc266b3ea" \
  -H "Content-Type: application/json" \
  -d '{"model":"nano-banana-pro","input":{"prompt":"test","image_input":[],"aspect_ratio":"1:1","resolution":"2K"}}'
```
If the response is NOT `200` with a `data.taskId`, ABORT the whole run. Commit a manual-queue
entry to the GitHub repo at `generated/routine-aborts/YYYY-MM-DD-morning.md` explaining
kie.ai is down, and stop. Do NOT publish any post with a fallback image.

**BLACKLIST — these Blotato visual templates are FORBIDDEN for this routine (they produce
face-less text-on-color slides and have been posted to LinkedIn/FB/Threads by accident):**
- `/base/v2/tutorial-carousel/e095104b-e6c5-4a81-a89d-b0df3d7c5baf/v1` (Tutorial Carousel Monocolor)
- `/base/v2/tutorial-carousel/2491f97b-1b47-4efa-8b96-8c651fa7b3d5/v1` (Tutorial Carousel Flat)
- `/base/v2/quote-card/f941e306-76f7-45da-b3d9-7463af630e91/v1` (Quote Card Paper)
- `/base/v2/quote-card/77f65d2b-48cc-4adb-bfbb-5bc86f8c01bd/v1` (Quote Card Monocolor)
- `/base/v2/tweet-card/ba413be6-a840-4e60-8fd6-0066d3b427df/v1` (Tweet Card Minimal)
- `/base/v2/tweet-card/9714ae5c-7e6b-4878-be4a-4b1ba5d0cd66/v1` (Tweet Card Photo)
- `9f4e66cd-b784-4c02-b2ce-e6d0765fd4c0` (Single Centered Text Quote)
These ONLY generate a text slide on a colored background — no face, no logo, no branding —
exactly the ugly default that went out this morning. NEVER use them.

**FALLBACK RULE FOR FACE-REQUIRED IMAGES (override any skill-level fallback chain):**
If the kie.ai call for a face-required slide fails after 2 retries (one with the full
prompt, one with a simplified prompt), DO NOT post a fallback image to that platform.
Instead:
1. Write the intended prompt + topic + platform to `generated/engagement-manual-queue.md`
   (commit to GitHub).
2. SKIP that platform's post for this run.
3. Continue with the other platforms.
Posting is better than silence ONLY when the image has Edison's face. Posting a text-on-
navy template with no face is NEVER acceptable.

**PER-PLATFORM ISOLATION:** Generate each platform's image with its own kie.ai call using
its own prompt and aspect ratio. Never reuse one platform's image on another platform.
If LinkedIn's image succeeded but Facebook's failed, LinkedIn still posts and Facebook
goes to manual queue — they do NOT share an image.

Step 1 - Pull latest skills and state from the GitHub repo nextgentrainingacademy88-max/edison-claude-skills:
- CLAUDE.md
- rotation-state.json
- Every SKILL.md under: linkedin-content-writer/, edison-content-image-creator/, carousel-creator/, edison-infographic-creator/, facebook-content-creator/, threads-x-content-creator/, comment-engagement-responder/
- assets-manifest.json
- Every file under memory/

Step 2 - Research: WebSearch the latest AI news/updates from the last 24-72 hours. Prioritize in this order:
(a) NEW AI tool releases or NEW features (Claude updates, ChatGPT new features like GPT-5 image gen, NotebookLM new capabilities, Manus releases, Gemini, Perplexity, Midjourney, Runway, ElevenLabs, Sora, Veo, Kling). Frame EVERY angle for BUSINESS OWNERS (solopreneurs, SME founders, agency owners, operators juggling accounting + HR + admin + marketing). NEVER address trainers, training providers, L&D professionals, or employers — see memory/project_target_audience.md.
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

**Face-required images** (LinkedIn Type 8, Facebook Type 2/7/8, carousel cover, carousel CTA slide, Threads Kanji-style, X/Twitter MrBeast thumbnail, pin-comment image, any image where Edison must appear):
- ALWAYS call kie.ai Nano Banana Pro with `Authorization: Bearer 6a2b2e230329d9a5ef971f5cc266b3ea` and `image_input: ["<face_primary.blotato_url from assets-manifest.json>"]`.
- The canonical URL is `face_primary.blotato_url` in assets-manifest.json (NOT `drive_url` — the Drive URL sometimes returns a redirect).
- **kie.ai is the ONLY path.** Do NOT use ANY Blotato built-in template as a fallback — not Tutorial Carousel, not Quote Card, not Tweet Card, not Instagram Carousel Slideshow, not Whiteboard Infographic, not anything else. Those templates either produce text-on-color slides with no face, or generate a generic Asian male that does not look like Edison.
- Retry kie.ai exactly twice: first with the full prompt, second with a simplified prompt. If both fail, write the intended prompt + platform to `generated/engagement-manual-queue.md` (commit to GitHub), SKIP that platform's post, and move on. **Do NOT publish a face-required image with no face, a wrong face, or a Blotato-template fallback. Skipping a post is ALWAYS preferred over publishing a face-less slide.**

**Face-free images** (true infographics without Edison — whiteboard/chalkboard/manga explainers, etc. — NOT carousels, NOT Threads Kanji, NOT Facebook Type 8, NOT LinkedIn covers):
- kie.ai Nano Banana Pro with empty `image_input` array. 4:5 aspect ratio.
- No Blotato built-in template fallback here either — the ones that DO produce decent infographics (Whiteboard, Chalkboard, Manga Panel, Newspaper, etc.) still enforce a generic "Follow me for more helpful content | Repost" footer and lock the style/layout. Stick to kie.ai so the output matches Edison's brand.

Always log the path used per image in `rotation-state.json` under `image_generation.last_path_used` with enough detail to debug (e.g. `"kie_ai_face_ok"`, `"blotato_template_tutorial_carousel"`, `"kie_ai_retry_after_blotato_credit_fail"`).

No em dashes anywhere. Colors: navy #0A1628 + yellow #FFD700.

**Step 4a — PRE-PUBLISH IMAGE AUDIT (HARD GATE, runs for every platform before posting):**

For every image URL about to be attached to a Blotato post, run this audit. If ANY check fails, do NOT post that platform. Write the intended prompt + topic + platform to `generated/engagement-manual-queue.md` (commit to GitHub) and SKIP. Posting Edison's bare reference photo is NEVER acceptable, even as a "better than nothing" fallback — it has happened twice now (2026-04-22 wrong-face Blotato template, 2026-04-24 raw face photo on all 5 platforms) and Edison has explicitly forbidden it.

Audit checks (ALL must pass):
1. **Identity check — URL must not be the raw reference asset.** Reject if the about-to-post URL matches ANY of:
   - `face_primary.blotato_url` (`https://database.blotato.io/storage/v1/object/public/public_media/b035c60e-57fb-451a-a5c1-f7a2cbb9d990/b04dfb9c-5b63-4c13-8573-b3d5fc7b717e.jpeg`)
   - `face_primary.drive_url` (`https://lh3.googleusercontent.com/d/1xtRHfRctuDwNtOcg9cAhupE5zC1NUikh`)
   - any URL containing the drive ID `1xtRHfRctuDwNtOcg9cAhupE5zC1NUikh`
   - any URL in `face_alternatives[].url` from `assets-manifest.json`
   - any raw workshop photo URL from `workshop_photos[]` (workshop photos must be DARKENED + text-overlaid, never posted raw)
2. **Provenance check — URL must come from THIS run.** The image URL must either (a) be a fresh kie.ai output URL (typically on `tempfile.aiquickdraw.com`, `kie.ai`, or the kie.ai media CDN, generated in this run's task), or (b) be a Blotato `database.blotato.io` URL that was uploaded **from a kie.ai output during this run** (track upload IDs in run scratch). If you cannot point to the kie.ai task ID that produced this image, reject.
3. **Content check — face-required posts must visually contain branding.** For LinkedIn carousel cover, Facebook Type 8, Threads Kanji, X MrBeast thumbnail: the prompt that produced this image must include the navy block + yellow/white headline + "COMMENT FOR MORE" / verified-badge clauses. If the kie.ai task was called with a stripped/simplified prompt that omitted those branding clauses, treat as a content failure and re-run with the full prompt; if both retries returned a stripped image, SKIP and queue.
4. **Filesize/format sanity.** Reject any image under 50KB or that is the same byte-length as the reference face photo. (Trivial check — catches the case where the URL was rewritten but content is still the raw reference.)

Log the audit result in `rotation-state.json` under `image_generation.last_audit_result` per platform: `"pass_kie_ai_branded"`, `"reject_raw_face_photo"`, `"reject_no_kie_task_id"`, `"reject_branding_missing"`, etc. If ANY platform's audit fails, that platform is SKIPPED — do not silently swap in a different image.

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
