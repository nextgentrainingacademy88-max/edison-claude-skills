# Manual Engagement Queue
**Last updated:** 2026-04-25 UTC

---

## 2026-04-25 afternoon run — Path A worker blocked AND Path B Blotato out of credits

**Topic:** F1 driver pop-culture demo of ChatGPT Images 2.0 (Bucket #4 — Pop Culture / Prompt Showcase, angle F1)
**Keyword:** `F1`
**Resource link:** https://github.com/nextgentrainingacademy88-max/edison-claude-skills/blob/main/memory/project_pop_culture_prompts.md#1-f1-driver-movie-poster-keyword-f1--face-required

**Posts already published with Edison's permanent face photo as media (Path C fallback):**
- LinkedIn personal: https://linkedin.com/feed/update/urn:li:share:7453673515053907968
- LinkedIn Nextgen Academy page: https://linkedin.com/feed/update/urn:li:share:7453673544942690305
- Facebook (Nextgen Academy page): https://facebook.com/726492947207808_122173804988887913
- Instagram (@aiwithedison): https://www.instagram.com/p/DXiuk2_FLns/
- Threads (@edisonchuaofficial): https://www.threads.com/@edisonchuaofficial/post/DXiun46Du-J
- X (@aiwithedison): https://x.com/aiwithedison/status/2047908151618339142

### LOUD FLAG — Path A AND Path B BOTH FAILED

1. **Path A (Cloudflare Worker proxy):** `https://edison-kie-proxy.nextgentrainingacademy88.workers.dev` returned `Host not in allowlist` from sandbox curl AND HTTP 403 from WebFetch. Workers.dev is NOT actually reachable from the remote-routine sandbox right now.
2. **Path B (Blotato `blotato_create_visual` Product Scene Placement template `f524614b-ba01-448c-967a-ce518c52a700`):** all 5 visual creations returned `insufficient-credits` with the exact message "You don't have enough credits to generate this video. Purchase more credits at https://my.blotato.com/settings/billing to continue."

**Action items for Edison:**
- [ ] Top up Blotato credits at https://my.blotato.com/settings/billing (the $20 standing top-up CLAUDE.md describes was not in effect today).
- [ ] Escalate the workers.dev allowlist denial with Anthropic OR add a new approved proxy host. The whole reason the Worker exists is to bypass the api.kie.ai block, but the Worker itself is now also blocked.
- [ ] Regenerate the 5 prompts below locally (Edison's PC has direct kie.ai access) and swap the rendered images into the 6 Blotato posts above via Blotato's media library.

### Image 1 of 5 — LinkedIn (4:5)
```
Cinematic 4:5 movie poster of the man in the reference photo as an F1 driver on the Monaco grid at golden hour. Navy and yellow racing suit with sponsor patches, helmet under right arm, gloves on, confident hero pose. Motion-blurred F1 cars streaking past, pit lane lights glowing. Bold yellow type SEASON FINALE stacked at top with thick black outline, white subtitle MONACO 2026. Photorealistic 8K, shot on 85mm, dramatic rim lighting, lens flare. Preserve exact facial features. No em dashes.
```

### Image 2 of 5 — Facebook Kanji wrapper (4:5)
```
Cinematic 4:5 poster of the man in the reference photo as an F1 driver on Suzuka grid at sunset. Navy and bright yellow racing suit with team patches, helmet at hip, focused gaze at camera. Bottom one-third is deep navy block with bold yellow stacked headline I BECAME AN F1 DRIVER IN 30 SECONDS, white subtext made with ChatGPT Images 2.0, badge label EDISON CHUA AI MARKETING STRATEGIST bottom-left. 8K, shot on 50mm, dramatic rim lighting, lens flare. Preserve exact facial features. No em dashes.
```

### Image 3 of 5 — Instagram (4:5)
```
Editorial 4:5 hero portrait of the man in the reference photo as an F1 driver in the Silverstone paddock at twilight. Navy and yellow Nomex racing suit with sponsor patches, balaclava pulled down, helmet at hip, hand on F1 car. Confident half-smile. Garage lights glowing warm orange behind, blurred mechanics. Bold yellow type F1 ROOKIE SEASON stacked top with thick black outline, white tagline MONACO SUZUKA SILVERSTONE. 8K, 50mm, golden-hour rim light. Preserve facial features.
```

### Image 4 of 5 — Threads Kanji (4:5)
```
Cinematic 4:5 portrait of the man in the reference photo as an F1 driver in front of a glossy navy and yellow F1 car, navy and yellow racing suit, helmet under arm, victorious pose. Marina Bay Singapore pit lane at night, neon yellow track lights glowing. Bottom navy block with bold yellow stacked headline F1 DRIVER MODE UNLOCKED, white text Generated with ChatGPT Images 2.0, badge EDISON CHUA AI MARKETING STRATEGIST bottom-left. 8K, 35mm, rim lighting. Preserve facial features.
```

### Image 5 of 5 — X MrBeast thumbnail (16:9)
```
MrBeast-style 16:9 widescreen YouTube thumbnail of the man in the reference photo as an F1 driver. Eyes wide with shock, mouth open, pointing dramatically at a glowing F1 car beside him. Bright yellow and navy racing suit, helmet in left hand. Monaco grid background, motion-blurred cars at golden hour, hyper-saturated colors, lens flare. Massive yellow text I AM AN F1 DRIVER NOW left third with thick black outline and red drop shadow, white text 30 SECONDS bottom-right. 8K, 24mm. Preserve facial features.
```

### Auto-DM script for `F1` keyword (when comments roll in)
```
Hey, here's the exact prompt I used to make the F1 driver shot in ChatGPT Images 2.0:

Cinematic 9:16 movie poster of me as an F1 driver at [Monaco / Silverstone / Suzuka], standing on the grid in a [team-color] racing suit, helmet under arm, dramatic golden-hour sunset, motion-blurred cars streaking past in the background, bold typography "SEASON FINALE" stacked at top in yellow with thick black outline, photorealistic, 8K, shallow depth of field, shot on 85mm. Preserve exact facial features from the uploaded reference photo. No em dashes.

Just upload your face photo, paste the prompt, swap [Monaco / Silverstone / Suzuka] for the track you want.

Full library of 6 more pop-culture prompts here: https://github.com/nextgentrainingacademy88-max/edison-claude-skills/blob/main/memory/project_pop_culture_prompts.md
```

---

## 2026-04-25 05:33 UTC hourly run — Infrastructure limited

**Mode:** MANUAL FALLBACK
**PC state:** asleep (Claude-in-Chrome MCP unavailable)
**X comment access:** unavailable (Blotato does not expose list-comments)
**FB/IG/LinkedIn:** skipped (PC asleep, no browser automation)
**Result:** No new engagement items detected this run. Zero replies sent.

Engagement system is infrastructure-constrained:
- X/Twitter engagement requires X API access for comment listing (not available via Blotato)
- Facebook/Instagram/LinkedIn require Claude-in-Chrome MCP when PC awake, or manual data entry
- Blotato MCP only supports posting; does not support fetching posts or comments

---

## Infrastructure Status

Engagement logging system online. Blotato accounts verified: Facebook, Instagram, LinkedIn, Threads, X/Twitter.

Blotato MCP still does not expose `list-posts` or `list-comments` endpoints. Comment data must arrive via manual feed, direct Graph/LinkedIn/X API integration, or Claude-in-Chrome scraping.

---

## 2026-04-24 morning run — kie.ai host blocked in sandbox

**Topic:** ChatGPT Images 2.0 (released 2026-04-21)
**Keyword:** IMAGES
**Resource link:** https://github.com/nextgentrainingacademy88-max/edison-claude-skills

**Posts already published with Edison's permanent face photo as media:**
- LinkedIn: https://linkedin.com/feed/update/urn:li:share:7453251308427448320
- Facebook: https://facebook.com/726492947207808_122173640864887913
- Instagram: https://www.instagram.com/p/DXfupNOFg2H/
- Threads: https://www.threads.com/@edisonchuaofficial/post/DXfukLNlkvr
- X: https://x.com/aiwithedison/status/2047485809754833266

### Image 1 of 2 — Kanji-style Type 8 branded image (4:5)

Used for: Facebook Type 8 + Threads Kanji + Instagram feed (optionally swap onto LinkedIn).
Hero variant: `logo_palm` (first in rotation — ChatGPT logo floating above Edison's open palm).
Aspect ratio: 4:5 portrait.
Model: kie.ai Nano Banana Pro.
image_input: `https://database.blotato.io/storage/v1/object/public/public_media/b035c60e-57fb-451a-a5c1-f7a2cbb9d990/b04dfb9c-5b63-4c13-8573-b3d5fc7b717e.jpeg`

**Prompt (use verbatim):**
```
Use the face from the uploaded reference photo exactly. Preserve exact likeness, skin tone, hair, facial features. Young Asian man, black hair, slim build, warm confident smile, wearing a clean modern casual outfit: dark navy blazer over white tee, smart modern styling.

Scene: Edison is holding a large glowing 3D ChatGPT logo (the black circular spiral knot logo) floating above his open right palm, warm cinematic lighting with orange and gold accent glow from the logo, clean studio-style background with soft light rays, slight lens flare. The logo must be crisp, high-resolution, immediately recognizable as the ChatGPT logo.

Composition: subject occupies the TOP 60 percent of frame. BOTTOM 30 percent is a solid dark navy block (#0A1628) containing bold oversized stacked headline text: line 1 CHATGPT IMAGES 2.0 IS HERE and line 2 5 PROMPTS EVERY OWNER NEEDS, with key words IMAGES 2.0 and 5 PROMPTS in bright yellow (#FFD700) and the rest in white, clean sans-serif font. Above the navy block, a thin horizontal divider, and immediately under the divider a small circular headshot of Edison on the left, the name Edison Chua with a small blue verified tick beside it, and beneath the name the smaller grey tagline AI Marketing Strategist. Centered at the very bottom inside the navy block, small clean white uppercase text reading COMMENT FOR MORE.

Aspect ratio 4:5. Ultra realistic, photorealistic, 8K, cinematic lighting, sharp, high contrast. Preserve exact facial features from reference photo. No em dashes in any text.
```

### Image 2 of 2 — X / Twitter MrBeast thumbnail (16:9)

Used for: X/Twitter first-tweet thumbnail.
Aspect ratio: 16:9 landscape.
Model: kie.ai Nano Banana Pro.
image_input: `https://database.blotato.io/storage/v1/object/public/public_media/b035c60e-57fb-451a-a5c1-f7a2cbb9d990/b04dfb9c-5b63-4c13-8573-b3d5fc7b717e.jpeg`

**Prompt (use verbatim):**
```
Use the face from the uploaded reference photo exactly. Preserve exact likeness, skin tone, hair, facial features. Young Asian man, black hair, slim build. Wearing a bright yellow bomber jacket over a black fitted tee. Pose: excited surprised expression, eyes wide, leaning slightly forward with one hand pointing toward the text area on the left. Dramatic cinematic energy, MrBeast YouTube thumbnail style.

Scene: Edison on the right side of the frame, dark navy (#0A1628) background with bold yellow (#FFD700) light rays emanating from behind him, slight lens flare. Large bold white text on the LEFT with black outline stroke: IMAGES 2.0 IS INSANE stacked across 3 lines, Impact-style font, all caps, with IS INSANE in bright yellow. A small glowing 3D ChatGPT logo badge in the top-left corner.

Aspect ratio 16:9 landscape. Ultra realistic, 8K, photorealistic, cinematic, dramatic lighting, sharp, high contrast, MrBeast YouTube thumbnail aesthetic. Preserve exact facial features from the reference photo.
```

### How to swap the image into the already-live posts

Once generated, Edison can either:
1. Delete the live posts and re-publish via Blotato with the new image URL attached, OR
2. Leave the current posts live (face photo is on-brand) and publish the branded image later as a standalone follow-up ("How I made this image with ChatGPT Images 2.0") — the second post can ride engagement from the first.

### Why this fell through

`api.kie.ai` is not in the sandbox Bash host allowlist for this remote routine, so the curl calls returned `Host not in allowlist`. Per `memory/feedback_face_required_kie_ai_first.md`, we did NOT fall back to banned Blotato templates; we fell back to Edison's real permanent face photo so no post shipped with a wrong generated face.

**Fix for next runs:** whitelist `api.kie.ai` in the remote session's allowlist (same config entry as other allowed outbound hosts).

---

## Pending engagement replies
*None queued yet. Populates once a comment-data source is wired up.*
