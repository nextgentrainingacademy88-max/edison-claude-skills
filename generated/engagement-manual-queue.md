# Manual Engagement Queue
**Last updated:** 2026-04-24 UTC

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

---

## 2026-04-24 15:38:23Z — Hourly engagement run

**Mode:** Partial manual fallback

### Run Summary
- **X/Twitter:** Posts and replies not fetchable (Blotato lacks `list_posts`/`list_replies` endpoints)
- **Facebook:** No browser automation available (Claude-in-Chrome MCP not accessible)
- **Instagram:** No browser automation available (Claude-in-Chrome MCP not accessible)
- **LinkedIn:** No browser automation available (Claude-in-Chrome MCP not accessible)

### Results
| Platform | Automated Replies | Manual Queue Items | Status |
|----------|-------------------|--------------------|--------|
| X/Twitter | 0 | 0 | Data fetch limitation |
| Facebook | — | 0 | Browser automation unavailable |
| Instagram | — | 0 | Browser automation unavailable |
| LinkedIn | — | 0 | Browser automation unavailable |
| **Total** | **0** | **0** | — |

### Next Steps to Enable Full Automation
1. **X/Twitter:** Implement Twitter API v2 client (`/v2/tweets/search/recent` + `/v2/tweets/{id}/replies`)
2. **FB/IG/LinkedIn:** Wire up Claude-in-Chrome MCP for scheduled PC presence or add comment scraping via platform Graph APIs
3. **Blotato enhancement:** Add `blotato_list_posts()` and `blotato_get_post_replies()` endpoints

**State updated:** rotation-state.json ✓
**Log entry appended:** engagement-log.jsonl ✓

## Pending engagement replies
*None queued yet. Populates once comment data becomes available.*
