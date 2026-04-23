---
name: threads-x-content-creator
description: >
  Edison Chua's complete Threads and X (Twitter) content creation system.
  Researches a trending AI topic, writes platform-native captions, generates
  platform-appropriate images, and schedules both posts via Blotato.

  Threads: conversational caption (150-300 chars), no hashtags, Kanji-style
  branded image (Edison holding/beside a glowing 3D tool logo, verified badge,
  bottom navy block with bold yellow + white stacked headline, "COMMENT FOR MORE"
  footer). Same visual family as Facebook Type 8 — adapted to 4:5 portrait for
  Threads feed.

  X (Twitter): punchy tweet thread (tweet 1 hook + 3-4 follow-up tweets), bold
  thumbnail image (face + text overlay, MrBeast/YouTube thumbnail style).

  Blotato account IDs: Threads = 5937, X = 16254.

  Trigger when Edison says: "post to Threads", "post to X", "post to Twitter",
  "Threads and X post", "social media post Threads X", or any request to create
  content for Threads or Twitter/X.

  TEST MODE triggers (generate a single sample image, no caption, no posting):
  - "test threads image" or "test threads kanji" → Threads Kanji-style branded
    (face-required, 4:5)
  - "test X thumbnail" or "test twitter thumbnail" → X MrBeast thumbnail
    (face-required, 16:9)
  - "test X image" or "test twitter image" → same as X thumbnail
  - "sample X thumbnail for [topic]" → X thumbnail with that topic
  - "sample threads kanji for [topic]" → Threads Kanji with that topic
  Both Threads Kanji and X thumbnail are face-required — MUST use kie.ai with
  `face_primary.blotato_url`. Read the exact prompt template section before
  generating.
---

## IMAGE GENERATION PRIORITY RULE

**kie.ai Nano Banana Pro is the ONLY path for BOTH Threads and X images. Zero Blotato
template fallbacks.**

### BLACKLIST — These Blotato templates are BANNED from this skill (they produced
the plain-navy text slide that got posted to Edison's Threads on 2026-04-23):
- `/base/v2/tutorial-carousel/e095104b-e6c5-4a81-a89d-b0df3d7c5baf/v1` (Tutorial Carousel Monocolor)
- `/base/v2/tutorial-carousel/2491f97b-1b47-4efa-8b96-8c651fa7b3d5/v1` (Tutorial Carousel Flat)
- `/base/v2/quote-card/*` (Quote Card carousels)
- `/base/v2/tweet-card/*` (Tweet Card carousels)
- `9f4e66cd-b784-4c02-b2ce-e6d0765fd4c0` (Single Centered Text Quote)
- `/base/v2/image-slideshow/*`, `/base/v2/images-with-text/*` (slideshow templates)
- `53cfec04-2500-41cf-8cc1-ba670d2c341a` (Instagram Carousel Slideshow — ignores face URL)

### KIE_API_KEY (inline for remote routines where .env does not load)

`6a2b2e230329d9a5ef971f5cc266b3ea` — use as `Authorization: Bearer ...` header.

### X / Twitter thumbnail (face-required, 16:9)

kie.ai with `image_input: [face_primary.blotato_url]` from `assets-manifest.json`.

### Threads Kanji-style branded image (face-required, 4:5)

kie.ai with `image_input: [face_primary.blotato_url]` from `assets-manifest.json`.
Same visual family as Facebook Type 8 Kanji-style, different aspect ratio (Threads = 4:5).

### On kie.ai failure (both images):
Retry exactly twice (full prompt, then simplified prompt). If both fail:
1. Write the intended prompt + topic to `./generated/engagement-manual-queue.md`.
2. SKIP that platform's post for this run.
3. Do NOT fall back to any Blotato template — the text-on-color slides those produce
   were exactly what shipped to Threads this morning and are never acceptable.

Log the actual path used per image in `rotation-state.json` →
`image_generation.last_path_used`.

---


# Edison's Threads and X Content Creator

## Overview

This skill handles the full pipeline for Threads and X (Twitter):
1. Research a trending AI topic
2. Write platform-native captions (Threads = conversational, X = tweet thread)
3. Generate platform-appropriate images (both face-required, Kanji-style for
   Threads, MrBeast thumbnail for X)
4. Schedule via Blotato

Both platforms get the same topic on the same day, adapted for each platform's
format and audience behavior.

---

## Platform Differences

| | Threads | X (Twitter) |
|---|---|---|
| Caption length | 150-300 chars | Tweet 1: 240 chars max. Thread: 4-5 tweets |
| Hashtags | None (Threads penalizes reach) | 1-2 max, at end of last tweet only |
| Tone | Casual, conversational, human | Punchy, direct, slightly edgy |
| CTA style | Soft question ("what do you think?") | Strong CTA or retweet ask |
| Image style | Kanji-style branded (Edison + tool logo + navy block headline) | Bold MrBeast thumbnail (face + text overlay) |
| Aspect ratio | 4:5 portrait | 16:9 landscape |
| Face required | YES (kie.ai) | YES (kie.ai) |

---

## Step 1: Research Trending Topic

Before every post, run a web search. Use these queries:
- "AI news today [current month year]"
- "trending AI tools [current month year]"
- "Claude update 2026", "ChatGPT new feature", "Gemini AI update"

Pick the topic that is:
- Most discussed right now across LinkedIn, Twitter/X, and tech communities
- Translatable to practical value for Malaysian business professionals
- Fits 70% AI education / 30% funnel content split

Always translate technical topics into plain business language:
- "1M token context window" -> "Feed Claude your entire company policy manual"
- "Agentic AI" -> "AI that completes tasks without you babysitting it"

---

## Step 2A: Write the Threads Caption

**Rules:**
- 150-300 characters total
- NO hashtags (they hurt Threads reach)
- Casual, conversational tone — like texting a friend who is also curious about AI
- End with a soft open question to spark replies
- When the post promises a resource, end with `Comment [KEYWORD] and I'll DM you
  the [guide/PDF/template].` — matches the "COMMENT FOR MORE" visual CTA
- No formal structure, no numbered lists
- Short sentences. White space friendly.

**Threads caption formula:**
```
[Hook observation or surprising fact — 1 sentence]

[The practical implication for their work — 1-2 sentences]

[Soft question to invite replies OR Comment-for-link CTA]
```

**Example (topic: AI agents doing your VA tasks):**
```
AI can now handle tasks your VA used to take hours on.

Booking meetings, sorting emails, summarising docs — done in minutes.

Are you using any AI agents at work yet?
```

**What to avoid:**
- Don't use "I" too much — it reads like a diary
- Don't start with "Did you know"
- No bullet points or numbered lists
- No em dashes

---

## Step 2B: Write the X (Twitter) Thread

**Structure: 4-5 tweets**

**Tweet 1 (Hook — 240 chars max):**
Must stop the scroll. Use one of:
- Bold claim: "Most companies are wasting AI. Here is why."
- Surprising number: "I trained 200 staff on AI. One mistake came up every time."
- Unpopular take: "AI will not replace your job. Bad AI habits will."
- Reframe: "Prompting AI is not a skill. Knowing what to ask is."

End tweet 1 with a colon or open loop: "Here is what I told them:" or "A thread."

**Tweets 2-4 (Value delivery):**
- Each tweet: 1 tight insight or tip
- Max 200 chars per tweet
- Number them: "2/" "3/" "4/"
- Short, direct sentences
- No filler. Every word earns its place.

**Tweet 5 (CTA):**
- End with one clear action
- Options: "Repost to help someone on your timeline." / "Follow for daily AI tips." /
  "Reply with your biggest AI struggle — I'll respond to every one."
- 1-2 hashtags max, only here: #AItools #Malaysia or similar

**X caption format to deliver:**
```
TWEET 1:
[hook text]

TWEET 2:
2/ [insight]

TWEET 3:
3/ [insight]

TWEET 4:
4/ [insight or tip]

TWEET 5 (CTA):
5/ [CTA + 1-2 hashtags]
```

**What to avoid:**
- No em dashes
- No "synergy", "holistic", "game-changer"
- Don't overuse exclamation marks
- Keep tweet 1 punchy — not a paragraph

---

## Step 3A: Generate Threads Image (Kanji-Style Branded, 4:5)

Threads now uses the same Kanji-style branded format as Facebook Type 8 — the
PREFERRED default Edison style. This replaces the previous infographic style
(which produced weak plain-navy carousel covers).

**Design (locked structure — follow exactly):**
- **Aspect ratio:** 4:5 portrait
- **Top 60% of frame:** cinematic hero scene. Edison holding or standing beside
  a large glowing 3D brand logo of the featured tool (Claude, NotebookLM, Gemini,
  ChatGPT, Manus, Perplexity, Sora, Veo, Midjourney, Runway, ElevenLabs, etc.),
  OR the two tool logos connected with a glowing energy line (for "X + Y" posts),
  OR Edison looking at floating UI panels representing the topic. Warm cinematic
  lighting, slight lens flare, orange/gold accent light. The brand logo must be
  big, crisp, and readable.
- **Middle strip:** thin horizontal divider line.
- **Author badge (just below divider):** small circular headshot of Edison on
  the LEFT, then the name "Edison Chua" with a small blue verified tick next to
  it, and directly under the name in smaller grey text the tagline
  "AI Marketing Strategist" (or "HRDC Certified AI Trainer" when the post is
  about corporate training).
- **Bottom 30% of frame:** solid dark navy (#0A1628) block. Bold oversized
  headline text in 2 to 3 stacked lines. Use WHITE for most words and YELLOW
  (#FFD700) for the key/emphasized words. Keep it under 14 words total.
  Examples:
  - "CHATGPT WORKSPACE AGENTS JUST KILLED CUSTOM GPTS"
  - "HOW TO MASTER CLAUDE COWORK A COMPLETE GUIDE"
  - "CLAUDE CAN NOW THINK LIKE A $100M FOUNDER — USE THESE 8 PROMPTS"
- **Very bottom center:** the text "COMMENT FOR MORE" in small clean white
  uppercase.

**Headline hook styles (match caption energy):**
- "BREAKING: [TOOL] JUST [action]"
- "HOW TO MASTER [TOOL] — A COMPLETE GUIDE"
- "[TOOL] CAN NOW [surprising new capability]. USE THESE [X] PROMPTS."
- "[TOOL A] + [TOOL B] — HOW TO CONNECT THESE POWERFUL TOOLS FOR FREE."
- "USE [TOOL] TO [OUTCOME] 100X FASTER"

**Hero scene rotation (check `rotation-state.json` → `threads.last_kanji_hero`):**
1. `logo_palm` — Edison holding one glowing 3D tool logo floating above his
   open palm. Use for single-tool spotlights, new feature launches.
2. `two_logos` — Edison standing between two glowing 3D logos (Tool A on left,
   Tool B on right) with a curved glowing energy line connecting them. Use for
   stack combos ("Claude + NotebookLM", "ChatGPT + Manus").
3. `holo_panels` — Edison looking up at floating holographic UI panels showing
   the topic (dashboards, prompts, chat windows). Use for workflow posts,
   "how to build X", process explainers.

Rotate `logo_palm → two_logos → holo_panels → logo_palm...` — never repeat the
same hero variant twice in a row.

**Nano Banana Pro prompt template for Threads Kanji-style:**
```
Use the face from the uploaded reference photo exactly. Preserve exact likeness,
skin tone, hair, facial features. Young Asian man, black hair, slim build, warm
confident smile, wearing a clean modern outfit (dark blazer over white shirt,
or smart casual shirt depending on topic).

Scene: Edison is [holding a large glowing 3D [TOOL] logo floating above his
open palm / standing between two large glowing 3D logos ([TOOL A] on left,
[TOOL B] on right) with a curved glowing energy line connecting them / looking
up at floating holographic UI panels showing [topic]]. Warm cinematic lighting
with orange and gold accent glow from the logo, clean studio-style background
with soft light rays, slight lens flare. The logo must be crisp, high-resolution,
immediately recognizable.

Composition: subject occupies the TOP 60 percent of frame. BOTTOM 30 percent
is a solid dark navy block (#0A1628) containing bold oversized stacked headline
text: line 1 "[HEADLINE WORDS]" and line 2 "[HEADLINE WORDS]", with key words
in bright yellow (#FFD700) and the rest in white, clean sans-serif font. Above
the navy block, a thin horizontal divider, and immediately under the divider a
small circular headshot of Edison on the left, the name "Edison Chua" with a
small blue verified tick beside it, and beneath the name the smaller grey
tagline "AI Marketing Strategist". Centered at the very bottom inside the navy
block, small clean white uppercase text reading "COMMENT FOR MORE".

Aspect ratio 4:5. Ultra realistic, photorealistic, 8K, cinematic lighting,
sharp, high contrast. Preserve exact facial features from reference photo.
No em dashes in any text.
```

**Generate via kie.ai Nano Banana Pro (use permanent face URL directly):**
```bash
curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer ${KIE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nano-banana-pro",
    "input": {
      "prompt": "[crafted Kanji-style prompt]",
      "image_input": ["https://database.blotato.io/storage/v1/object/public/public_media/b035c60e-57fb-451a-a5c1-f7a2cbb9d990/b04dfb9c-5b63-4c13-8573-b3d5fc7b717e.jpeg"],
      "aspect_ratio": "4:5",
      "resolution": "2K"
    }
  }'
```

Poll every 25 seconds until `data.state` is `"success"`.
Get URL from `data.resultJson.resultUrls[0]`.

Save to:
```
./generated/threads_kanji_[topic_slug]_[date].jpg
```

---

## Step 3B: Generate X Image (Bold Thumbnail)

X gets a bold MrBeast/YouTube thumbnail style image using Edison's face.

**Style:** Face-forward, expressive, bold text overlay, high contrast background.
This is NOT a photo edit — it is an AI-generated stylised image of Edison.

**Required face reference photos — Permanent Blotato URLs (no upload needed):**

| Photo | Blotato URL |
|-------|-------------|
| Edison Chua Face.jpeg (PRIMARY) | `https://database.blotato.io/storage/v1/object/public/public_media/b035c60e-57fb-451a-a5c1-f7a2cbb9d990/b04dfb9c-5b63-4c13-8573-b3d5fc7b717e.jpeg` |
| edison2.jpeg | Upload once if needed, then save URL here |

Use the PRIMARY URL directly in `image_input`. Do NOT re-upload.

**X thumbnail prompt pattern (16:9 landscape):**
```json
{
  "style": "YouTube thumbnail",
  "subject": "Edison Chua, Malaysian man, casual fashion — clean streetwear or casual polo, no suits",
  "expression": "[match to topic — surprised, pointing, leaning in, thumbs up]",
  "pose": "[pointing at text / arms crossed / looking at camera wide-eyed]",
  "background": "bold solid colour or gradient — dark navy blue (#0A1628) with yellow (#FFD700) accents",
  "text_overlay": "[SHORT BOLD HEADLINE — max 5 words, all caps or title case, yellow or white text]",
  "text_position": "right side of image, bold sans-serif font",
  "lighting": "studio-quality, bright front lighting, clean sharp look",
  "quality": "4K sharp, high contrast, MrBeast YouTube thumbnail energy",
  "aspect_ratio": "16:9 landscape",
  "no": "suits, ties, formal blazer, blurry, soft lighting, stock photo feel"
}
```

**Important rules:**
- Edison's outfit is ALWAYS casual: streetwear, polo, relaxed button-down, bomber jacket
- Never suits, never ties, never formal blazers unless Edison explicitly requests
- Background glow (if any) must be WHITE — never navy, never teal
- Bold text overlay: 3-5 words max. Make it the hook of the tweet

**Generate via kie.ai Nano Banana Pro (use permanent face URL directly — no upload step):**
```bash
curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer ${KIE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nano-banana-pro",
    "input": {
      "prompt": "[crafted thumbnail prompt]",
      "image_input": ["https://database.blotato.io/storage/v1/object/public/public_media/b035c60e-57fb-451a-a5c1-f7a2cbb9d990/b04dfb9c-5b63-4c13-8573-b3d5fc7b717e.jpeg"],
      "aspect_ratio": "16:9",
      "resolution": "2K"
    }
  }'
```

Save to:
```
./generated/x_thumbnail_[topic_slug].jpg
```

---

## Step 4: Upload Images to Blotato

For each image (Threads Kanji-style + X thumbnail):

```bash
# Step 4a: Get presigned upload URL from Blotato
# Use: blotato_create_presigned_upload_url

# Step 4b: Upload image to the presigned URL via PUT
curl -s -X PUT "[presigned_url]" \
  -H "Content-Type: image/jpeg" \
  --data-binary @"[local_image_path]"

# Step 4c: Create visual in Blotato
# Use: blotato_create_visual with the upload key

# Step 4d: Poll for visual processing
# Use: blotato_get_visual_status until status is ready
```

---

## Step 5: Schedule Posts via Blotato

### Threads Post (9am MYT = 01:00 UTC)
```
Platform: threads
Account ID: 5937
Content: [Threads caption — 150-300 chars, no hashtags]
Visual: [Threads Kanji-style visual ID]
Schedule: 09:00 MYT = 01:00 UTC
```

### X Post (9am MYT = 01:00 UTC)
X needs the thread format. Post tweet 1 with the image. Replies are manual.
```
Platform: twitter
Account ID: 16254
Content: [Tweet 1 text only — 240 chars max]
Visual: [X thumbnail visual ID]
Schedule: 09:00 MYT = 01:00 UTC
```

### Evening slot (1pm MYT = 05:00 UTC)
Same flow, different topic angle.

---

## Step 6: Save State to Memory

After each run, update `rotation-state.json` → `threads` block:
- `last_kanji_hero`: which hero variant was used (`logo_palm`, `two_logos`, `holo_panels`)
- `last_topic_slug`: the topic just used (prevents same-topic repeat within 48h)

Hero rotation order: `logo_palm → two_logos → holo_panels → logo_palm...` —
never use the same hero variant twice in a row.

Also update `threads_pdf_links[topic_slug]` if the post promised a resource —
the hourly engagement responder needs the Drive/GitHub link to auto-deliver.

---

## Quick Reference

| Item | Value |
|---|---|
| Threads account ID | 5937 |
| X account ID | 16254 |
| Threads image style | Kanji-style branded (4:5 portrait, face-required) |
| X image style | Bold thumbnail (16:9 landscape, face-required) |
| 9am MYT | 01:00 UTC |
| 1pm MYT | 05:00 UTC |
| kie.ai API key | ${KIE_API_KEY} |
| kie.ai model | nano-banana-pro |
| Face photos | See assets-manifest.json face_primary.url |

---

## Platform Voice Summary

**Threads voice:** Casual, curious, warm. Like Edison texting a colleague.
No jargon, no hype. End with a question OR a Comment-for-link CTA when a
resource is promised.

**X voice:** Direct, punchy, slightly provocative. Edison knows something
most people don't. Thread structure delivers value fast.

---

## Engagement Routine (Threads + X)

Replies are handled hourly by the shared `comment-engagement-responder` skill.

**X/Twitter:** automated via Blotato API regardless of PC state.
**Threads:** automated via Claude-in-Chrome MCP when Edison's PC is awake.
When a post promises a resource, store the Drive link in `rotation-state.json`
under `threads_pdf_links[topic_slug]` or `x_pdf_links[topic_slug]` BEFORE
posting. The responder auto-delivers the link to every comment-for-link reply,
answers questions, and thanks compliments. If Claude-in-Chrome can't reach
Threads (PC asleep or login wall), the DM package falls through to
`./generated/engagement-manual-queue.md` for Edison to handle on mobile.
