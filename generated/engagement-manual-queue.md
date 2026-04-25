# Manual Engagement Queue
**Last updated:** 2026-04-25 UTC

---

## 2026-04-25 morning run — Worker proxy + Blotato BOTH blocked

**Topic:** GPT-5.5 launched April 23 — fully agentic, 5 use cases for business owners
**Keyword:** GPT55
**Resource link:** https://github.com/nextgentrainingacademy88-max/edison-claude-skills
**Bucket:** (a) latest AI news / new release
**Outfit:** #7 (techwear black zip-up + minimal cargo) — matches agentic-AI theme

**Posts already published with Edison's permanent face photo as media:**
- LinkedIn personal: https://linkedin.com/feed/update/urn:li:share:7453614650983886848
- LinkedIn Nextgen page: https://linkedin.com/feed/update/urn:li:share:7453614724832837632
- Facebook: https://facebook.com/726492947207808_122173781882887913
- Instagram: https://www.instagram.com/p/DXiT2v_jU6H/
- Threads: https://www.threads.com/@edisonchuaofficial/post/DXiT6gympEY
- X/Twitter: https://x.com/aiwithedison/status/2047849559699624327

### Why this fell through (DOUBLE failure)

1. **Path A (api.kie.ai direct)** -> `Host not in allowlist` from sandbox firewall.
2. **Path A-via-Worker (`edison-kie-proxy.nextgentrainingacademy88.workers.dev`)** -> also `Host not in allowlist`. CLAUDE.md claims `*.workers.dev` is on the sandbox allowlist; testing today shows it is NOT. Investigate.
3. **Path B (Blotato `blotato_create_visual` template `f524614b-ba01-448c-967a-ce518c52a700`)** -> all 3 visuals returned `insufficient-credits`. Top up at https://my.blotato.com/settings/billing.

Fell to Path C: posted Edison's permanent face_primary.blotato_url as media on all 6 destinations, captions intact. Per CLAUDE.md, did NOT use Blotato built-in text-on-color templates.

### Image 1 of 3 — Kanji Type 8 logo_palm hero (4:5)

For: LinkedIn (personal + page) + Facebook + Instagram.
Aspect: 4:5 portrait. Model: kie.ai `gpt-image-2-image-to-image`.
image_urls: `["https://database.blotato.io/storage/v1/object/public/public_media/b035c60e-57fb-451a-a5c1-f7a2cbb9d990/b04dfb9c-5b63-4c13-8573-b3d5fc7b717e.jpeg"]`

**Prompt (use verbatim):**
```
Cinematic 4:5 portrait of Edison Chua holding a large glowing 3D ChatGPT logo with GPT-5.5 wordmark above his open right palm. Edison is a young Asian man, black hair, slim build, warm confident smile, wearing a techwear black zip-up jacket with minimal cargo pants. Eye-level intimate framing, shot on 50mm, warm cinematic lighting with orange-gold accent glow from the logo, clean dark studio background, slight lens flare.

Composition: subject occupies the TOP 60 percent of frame. BOTTOM 30 percent is a solid dark navy block (#0A1628) with bold oversized stacked headline text: line 1 GPT-5.5 IS AGENTIC NOW, line 2 5 TASKS TO HAND IT TODAY. Key words AGENTIC and 5 TASKS in bright yellow (#FFD700), the rest in white, clean sans-serif. Above the navy block a thin horizontal divider, immediately under it a small circular headshot of Edison on the left, the name Edison Chua with a small blue verified tick, beneath it smaller grey tagline AI Marketing Strategist. Centered at the very bottom inside the navy block, small clean white uppercase text COMMENT FOR MORE.

4:5 aspect, ultra realistic, photorealistic, 8K, sharp, high contrast. Preserve exact facial features from the reference photo. No em dashes.
```

### Image 2 of 3 — Kanji holo_panels hero (4:5) — Threads

For: Threads only.
Aspect: 4:5 portrait. Model: kie.ai `gpt-image-2-image-to-image`.
image_urls: same face URL as above.

**Prompt (use verbatim):**
```
Cinematic 4:5 portrait of Edison Chua looking up at floating holographic blue UI panels showing GPT-5.5 agents executing tasks (email drafting, calendar invite, code commit, slide deck export, Slack reply). Edison is a young Asian man, black hair, slim build, warm confident smile, wearing a techwear black zip-up jacket with minimal cargo pants. Slight low-angle hero framing, shot on 35mm, dramatic rim lighting with cyan and orange accents, clean dark studio background with soft volumetric fog, lens flare. The holographic panels are crisp, futuristic, with visible labels EMAIL, CALENDAR, CODE, DECK, SLACK and small spinning loader icons.

Composition: subject occupies the TOP 60 percent of frame. BOTTOM 30 percent is a solid dark navy block (#0A1628) with bold oversized stacked headline text: line 1 GPT-5.5 NOW RUNS, line 2 YOUR FRONT OFFICE. Key words RUNS and FRONT OFFICE in bright yellow (#FFD700), the rest in white, clean sans-serif. Above the navy block a thin horizontal divider, immediately under it a small circular headshot of Edison on the left, the name Edison Chua with a small blue verified tick, beneath it smaller grey tagline AI Marketing Strategist. Centered at the very bottom inside the navy block, small clean white uppercase text COMMENT FOR MORE.

4:5 aspect, ultra realistic, photorealistic, 8K, sharp, high contrast. Preserve exact facial features from the reference photo. No em dashes.
```

### Image 3 of 3 — MrBeast 16:9 thumbnail — X/Twitter

For: X/Twitter only.
Aspect: 16:9 landscape. Model: kie.ai `gpt-image-2-image-to-image`.
image_urls: same face URL.

**Prompt (use verbatim):**
```
MrBeast YouTube thumbnail style 16:9 wide-angle hero shot of Edison Chua on the LEFT side of frame leaning forward with mouth wide open in shocked excitement, eyes wide, pointing dramatically toward the right side of frame. Edison is a young Asian man, black hair, slim build, wearing a bright yellow bomber jacket over a white tee. Right side of frame shows a massive glowing 3D ChatGPT logo with GPT-5.5 wordmark, surrounded by bright orange explosion glow, sparks, and glowing dollar signs floating mid-air. Saturated high-contrast colors, dramatic studio lighting, rim light from behind, slight lens flare, photorealistic 8K, sharp focus, cinematic composition. Top of frame: bold massive yellow headline text with thick black outline reading GPT-5.5 IS HERE in 2 stacked lines. Bottom-right small white text Edison Chua AI Marketing Strategist.

Aspect ratio 16:9 landscape. Preserve exact facial features from the reference photo (young Asian man, black hair, slim build, warm confident smile). No em dashes. No extra text beyond what is specified.
```

### Action items for Edison (manual)

1. Top up Blotato credits at https://my.blotato.com/settings/billing so Path B works on the next run.
2. Investigate why `*.workers.dev` returned `Host not in allowlist` despite CLAUDE.md saying it should be allowlisted. Possible fixes: enable `Bash` permission for that host explicitly in the routine settings, or accept Path C as the new default until Anthropic widens the allowlist.
3. Optionally regenerate the 3 images above in Chrome (kie.ai web UI) and re-upload as image-only follow-up posts that reference the live thread.

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
