---
name: threads-x-content-creator
description: >
  Edison Chua's complete Threads and X (Twitter) content creation system.
  Researches a trending AI topic, writes platform-native captions, generates
  platform-appropriate images, and schedules both posts via Blotato.

  Threads: conversational caption (150-300 chars), no hashtags, infographic image
  (whiteboard/chalkboard/manga rotation, same as LinkedIn).

  X (Twitter): punchy tweet thread (tweet 1 hook + 3-4 follow-up tweets), bold
  thumbnail image (face + text overlay, MrBeast/YouTube thumbnail style).

  Blotato account IDs: Threads = 5937, X = 16254.

  Trigger when Edison says: "post to Threads", "post to X", "post to Twitter",
  "Threads and X post", "social media post Threads X", or any request to create
  content for Threads or Twitter/X.

  TEST MODE triggers (generate a single sample image, no caption, no posting):
  - "test threads image" or "test threads infographic" → Threads infographic (face-free)
  - "test X thumbnail" or "test twitter thumbnail" → X MrBeast thumbnail (face-required, 16:9)
  - "test X image" or "test twitter image" → same as X thumbnail
  - "sample X thumbnail for [topic]" → X thumbnail with that topic
  X thumbnail is face-required — MUST use kie.ai with `face_primary.blotato_url`.
  Threads infographic is face-free — Blotato template first, kie.ai fallback.
  Read the exact prompt template section before generating.
---

## IMAGE GENERATION PRIORITY RULE

**Route by platform. X thumbnail is face-required → kie.ai first. Threads infographic is face-free → Blotato first.**

### X / Twitter thumbnail (face-required)

ALWAYS use kie.ai Nano Banana Pro FIRST with `image_input: [face_primary.blotato_url]`
from `assets-manifest.json`. Do NOT use Blotato built-in templates (Tutorial Carousel,
Quote Card, etc.) — those are text-to-image only and will generate a generic Asian male
that does not look like Edison.

Fallback chain if kie.ai fails:
1. Retry kie.ai once with simplified prompt.
2. Blotato Instagram Carousel Slideshow template (`53cfec04-2500-41cf-8cc1-ba670d2c341a`)
   with `model: "nano-banana-pro"` AND face URL passed as input.
3. Manual queue log — do NOT post the X thumbnail without Edison's real face.

### Threads infographic (face-free, concept-only)

Priority order:
1. **Blotato built-in template** — if a matching one exists (Whiteboard Infographic, Chalkboard Infographic, Classroom Chalkboard, Newspaper, Breaking News, Manga Panel, Billboard, Book Page, Futuristic Flyer, TV Wall, Trail Marker, Constellation, Steampunk, Cave Painting, Graffiti Mural, T-Shirt, Top Secret, Bus Ad, Movie Theater, Egyptian Hieroglyph, Tweet Card, Tutorial Carousel, Quote Card). Use `blotato_create_visual` with the template ID and a text `prompt`. One-shot. Uses Blotato credits.
2. **Blotato Instagram Carousel Slideshow** (template id `53cfec04-2500-41cf-8cc1-ba670d2c341a`) with `model: "nano-banana-pro"` — for custom prompts when no matching built-in template exists. Still uses Blotato credits.
3. **kie.ai Nano Banana Pro direct** — fall back if Blotato returns `creation-from-template-failed` / `insufficient-credits` / other error. Use `${KIE_API_KEY}` from env.

Log the actual path used per image in `rotation-state.json` → `image_generation.last_path_used`.

---


# Edison's Threads and X Content Creator

## Overview

This skill handles the full pipeline for Threads and X (Twitter):
1. Research a trending AI topic
2. Write platform-native captions (Threads = conversational, X = tweet thread)
3. Generate platform-appropriate images
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
| Image style | Infographic (whiteboard/chalkboard/manga) | Bold thumbnail (face + text overlay) |
| Aspect ratio | 1:1 square | 16:9 landscape |

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
- No formal structure, no numbered lists
- Short sentences. White space friendly.

**Threads caption formula:**
```
[Hook observation or surprising fact — 1 sentence]

[The practical implication for their work — 1-2 sentences]

[Soft question to invite replies]
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

## Step 3A: Generate Threads Image (Infographic)

Threads gets the same infographic style as LinkedIn.

**Style rotation (check memory for last used, never repeat same style twice):**
- Whiteboard: how-to / numbered tips / step-by-step
- Chalkboard: concept explainer / AI news / "what is X"
- Manga: story / before-after / relatable scenario

**Aspect ratio for Threads:** `1:1` (square)

Follow the infographic prompt patterns from `edison-infographic-creator` SKILL.md.
Use the same style selected for the LinkedIn post that day (same topic, same visual
family — but regenerate so it is a fresh asset).

Generate via kie.ai Nano Banana Pro:
```bash
curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer ${KIE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nano-banana-pro",
    "input": {
      "prompt": "[crafted infographic prompt]",
      "image_input": [],
      "aspect_ratio": "1:1",
      "resolution": "2K"
    }
  }'
```

Poll every 25 seconds until `data.state` is `"success"`.
Get URL from `data.resultJson.resultUrls[0]`.

Save to:
```
/sessions/[session]/mnt/Social Media Marketing/threads_infographic_[topic_slug].jpg
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
/sessions/[session]/mnt/Social Media Marketing/x_thumbnail_[topic_slug].jpg
```

---

## Step 4: Upload Images to Blotato

For each image (Threads infographic + X thumbnail):

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
Visual: [Threads infographic visual ID]
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
Same flow, different topic angle. Use the topic angle rotation from memory
(check project_linkedin_automation.md for the day's 7pm angle).

---

## Step 6: Save Infographic Style to Memory

After each run, update memory file `project_linkedin_automation.md`:
- Record which infographic style was used (Whiteboard / Chalkboard / Manga)
- Record the date and slot (10am or 7pm)
- Update "Next post should use" to the next style in rotation

Rotation order: Whiteboard -> Chalkboard -> Manga -> Whiteboard...
Never use the same style twice in a row across any platform.

---

## Quick Reference

| Item | Value |
|---|---|
| Threads account ID | 5937 |
| X account ID | 16254 |
| Threads image style | Infographic (1:1 square) |
| X image style | Bold thumbnail (16:9 landscape) |
| 9am MYT | 01:00 UTC |
| 1pm MYT | 05:00 UTC |
| kie.ai API key | ${KIE_API_KEY} |
| kie.ai model | nano-banana-pro |
| Face photos | See assets-manifest.json face_primary.url |

---

## Platform Voice Summary

**Threads voice:** Casual, curious, warm. Like Edison texting a colleague.
No jargon, no hype. End with a question.

**X voice:** Direct, punchy, slightly provocative. Edison knows something
most people don't. Thread structure delivers value fast.

---

## Engagement Routine (X/Twitter)

Replies to Edison's tweets are handled hourly by the shared `comment-engagement-responder`
skill. When an X post promises a resource or thread continuation, store the Drive link in
`rotation-state.json` under `x_pdf_links[topic_slug]` before posting. The responder replies
to every tweet-reply with either the Drive link (on resource requests), a short helpful
answer (on questions), or a warm thanks (on compliments). Threads replies are also covered
if the Threads API comments endpoint is available; otherwise flagged for manual review.
