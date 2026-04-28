---
name: edison-content-image-creator
description: >
  Edison Chua's complete social media image creation system — from choosing the right photo,
  to designing the concept and style, to generating and saving the final image. Use this skill
  whenever Edison wants to create any social media post image, thumbnail, carousel cover, or
  content visual using his face or photos.

  Trigger when Edison says things like: "create a post image", "generate an image of me",
  "make a LinkedIn visual", "design a thumbnail", "create something like MrBeast style",
  "make an image for this topic", "use my face to generate", "create a social post visual",
  or any request to produce a new AI-generated image for social media content.

  TEST MODE triggers (generate a single sample image):
  - "test content image" or "test post image" → Workshop Action by default
  - "test workshop photo" → Workshop Action sub-type
  - "test youtube thumbnail" or "test thumbnail" → MrBeast Y1 style by default
  - "test Y1" / "test mrbeast" → YouTube Thumbnail Y1 (MrBeast Bold)
  - "test Y3" / "test authority thumbnail" → YouTube Thumbnail Y3 (Clean Authority)
  - "test real classroom" → Real Classroom sub-type (multi-photo, no AI generation)
  - "sample face image for [topic]" → auto-pick best sub-type for the topic
  Always read the specific sub-type prompt template section in this file before generating.
  Face-required paths use kie.ai with `face_primary.blotato_url` from assets-manifest.json.

  This skill combines photo selection, style decision, ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) prompt crafting,
  Blotato upload, kie.ai generation, and saving — all in one workflow.
---


## OUTFIT VARIETY RULE (read before writing any image prompt)

Edison is DONE with the "dark navy blazer + white tee" default. Rotate outfits aggressively so he
looks like a real person with a wardrobe, not a corporate stock photo. Pick based on the scene
vibe and topic:

| # | Outfit | When to use |
|---|--------|-------------|
| 1 | Oversized black hoodie + simple chain | AI/tech tool news, late-night hacker vibe |
| 2 | Bright yellow bomber jacket + white tee | High-energy MrBeast thumbnail, shocked/excited poses |
| 3 | Denim jacket over black graphic tee | Instagram carousel, casual confident |
| 4 | Cream oversized crewneck + baseball cap | Chill tip/tutorial posts, "texting a friend" vibe |
| 5 | Olive utility jacket + olive cargo + white sneaker | Streetwear fashion-forward, pop culture posts |
| 6 | Washed indigo denim shirt (open) over plain tee | Warm "behind the scenes" / founder story |
| 7 | Techwear black zip-up + minimal cargo | Cyberpunk / agentic-AI themes |
| 8 | Heather-grey zip hoodie + black tee | Productivity, "how to" list posts |
| 9 | Retro color-block track jacket (navy+orange+cream) | Fun high-contrast pop culture / meme moments |
| 10 | Smart casual: navy blazer over a color tee with jeans | Only for "BREAKING / big announcement" posts — use sparingly, max 15% of runs |

**Hard rules:**
- NEVER a full suit, NEVER a tie, NEVER a dress shirt tucked in with slacks.
- The blazer-on-tee combo (#10) is a premium variant, not the default. Use at most 1 in every 7 posts.
- Rotate — never repeat the same outfit two posts in a row. Track `rotation-state.json` → `image_generation.last_outfit` across runs.
- Topic-match wins over strict rotation: a techwear topic uses #7 regardless of rotation.
- Keep his face, skin, and hair consistent (young Asian man, black hair, slim build, warm smile) — only the clothes change.

Substitute the outfit from this table verbatim into any skill template that says
"wearing a clean modern outfit" or "dark blazer over white tee". Do NOT paste the table
into the image prompt — paste only the chosen outfit line.

---


## IMAGE GENERATION PRIORITY RULE

**This skill ALWAYS generates Edison's face in the output. Therefore kie.ai is the PRIMARY
path for this skill — not Blotato built-in templates.**

**Rule:** Every content image produced by this skill uses Edison's face as reference.
Blotato built-in templates (Tutorial Carousel, Quote Card, etc.) are text-to-image only
and will produce a generic Asian male that does not look like Edison. They MUST NOT be
used for face-required images.

**Priority order:**
1. **kie.ai ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) with input_urls** — PRIMARY. Pass `face_primary.blotato_url` from
   `assets-manifest.json` as `input_urls[0]`. Use `${KIE_API_KEY}` from env.
2. **Retry kie.ai once with simplified prompt** if the first call fails/times out.
3. **Blotato Instagram Carousel Slideshow** (template id `53cfec04-2500-41cf-8cc1-ba670d2c341a`)
   with `model: "gpt-image-2-image-to-image"` AND the face URL as input — only if both kie.ai attempts fail.
4. **Manual queue** — if all three fail, log the intended prompt to
   `./generated/engagement-manual-queue.md` so Edison can regenerate manually. Do NOT post
   a face-required image with no face or a wrong face.

Log the path used per image in `rotation-state.json` → `image_generation.last_path_used` with
the specific path (e.g. `"kie_ai_face_ok"`, `"kie_ai_retry_ok"`, `"blotato_carousel_slideshow_fallback"`,
`"manual_queue_all_paths_failed"`).

---


# Edison's Content Image Creator

## Overview

This skill handles everything from picking the right source photo to delivering the final
generated image. It has two parts that always work together:

1. **Style & Prompt** — decide the concept, study the prompt library, craft the prompt
2. **Pipeline** — upload photo to Blotato, generate via kie.ai, download and save result

---

## PART 1: Style & Concept

### Core Rules (Never Break These)

- **Edison's face must always stay realistic and unchanged** — skin tone, hair, facial features
  are preserved in every image. Only the outfit, background, lighting, and concept change.
- **Match style to topic** — don't apply a fixed template. Ask: what visual makes someone stop
  scrolling for THIS specific topic?
- **Text behind, not on top** — when adding text overlays, text should be layered BEHIND Edison,
  blended into the background. Not a flat bar at the bottom. Not text on top of his face.
- **Use the ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) library first** — always search for prompt inspiration before writing
  from scratch.

---

### Step 1: Search the ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) Prompt Library

Fetch the manifest to find the right category:
```bash
curl -s "https://raw.githubusercontent.com/YouMind-OpenLab/gpt-image-2-image-to-image-prompts-recommend-skill/main/references/manifest.json"
```

Then search the relevant category file. For social/thumbnail content, the most useful files are:
- `youtube-thumbnail.json` — bold text, dramatic concepts, thumbnail styles
- `social-media-post.json` — LinkedIn, Instagram, general post styles
- `poster-flyer.json` — bold graphic poster styles

Search example:
```bash
curl -s "https://raw.githubusercontent.com/YouMind-OpenLab/gpt-image-2-image-to-image-prompts-recommend-skill/main/references/youtube-thumbnail.json" \
  -o /tmp/yt_thumbnails.json

python3 -c "
import json
with open('/tmp/yt_thumbnails.json') as f:
    data = json.load(f)
keywords = ['your', 'search', 'keywords']
for item in data:
    content = item.get('content','').lower()
    title = item.get('title','').lower()
    if any(k in content or k in title for k in keywords):
        if item.get('sourceMedia'):
            print(f'ID:{item[\"id\"]} | {item[\"title\"]}')
            print(item.get('content','')[:300])
            print()
"
```

Study the prompt structure — the composition language, lighting descriptors, and style terms
are what make ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) prompts work well.

---

### Step 2: Choose the Style

These are **examples of styles that work** — not a fixed rotation. Pick based on the topic.

**Style A — Bold Text + Face** (LinkedIn/Personal Brand, 1:1)
- Dark solid background. Edison's face RIGHT side. Large bold white stacked text LEFT side.
- Use for: professional tips, business lessons, personal branding
- Inspired by: Chris Donnelly LinkedIn style

**Style B — Concept / Creative Composite** (YouTube 16:9 or portrait 4:5)
- The image tells a story. Dramatic environment, split scene, or strong metaphor. Examples: Edison holding a giant glowing logo of the AI tool, walking through a floating document cloud, pointing at a workflow diagram that explodes into steps.
- Bold text optional — only if it adds to the concept.
- Use for: AI tools content, money/business transformation, strong metaphor topics
- **DO NOT use the half-face human/cyborg split style — Edison dislikes it.** Pick concept metaphors that are warm and educator-friendly, not dystopian.
- Key rule: concept must match the topic — pick story over decoration

**Style C — Big Text Layered BEHIND Subject** (portrait 4:5)
- Edison sharp in foreground. Large bold italic text overlaid on the background BEHIND him.
- Text feels like a backdrop or projection — part of the scene, not a graphic overlay.
- Use for: workshop content, speaking topics, authority positioning, teaching content

**Style D — Full Body / Action Shot** (portrait 4:5)
- Edison full body in a setting that fits the content — doesn't have to be a stage.
- Could be a rooftop, conference room, outdoor, office — whatever fits the topic.
- Use for: aspirational content, speaking, high-energy posts, "I do this" positioning

**Style E — MrBeast Thumbnail** (YouTube 16:9)
- Edison right side with dramatic blue + orange rim lighting, excited expression.
- Bold oversized white text with black stroke on left. Navy background with golden light rays.
- Use for: high-energy topics, "I tried X", viral-style content

---

### Step 3: Craft the Prompt

Combine the library learnings with the chosen style. Always include:

1. `"Use the face from the uploaded image"` — at the start
2. Edison's description: `"young Asian man, black hair, slim build, warm confident smile"`
3. Specific outfit — don't leave it vague
4. Explicit lighting description
5. Aspect ratio and composition intent
6. Quality closers: `"ultra realistic, 8K, photorealistic, cinematic"`

**Aspect ratios:**
- `"1:1"` — LinkedIn square, profile-style
- `"4:5"` — LinkedIn portrait, carousel covers, stage shots
- `"16:9"` — YouTube thumbnails, widescreen
- `"9:16"` — Stories, vertical content

---

## PART 2: Image Generation Pipeline

### Step 4: Select the Right Source Photo

**PERMANENT BLOTATO URLs — use these directly. Do NOT re-upload.**

| Photo | Blotato URL | Best For |
|-------|-------------|----------|
| Edison Chua Face.jpeg (PRIMARY) | `<face_primary.url from assets-manifest.json>` | AI tools, LinkedIn, personal branding, most posts |
| edison2.jpeg | Upload once if needed, then save URL here | Tech/gaming vibe |
| edison3.jpeg | Upload once if needed, then save URL here | Outdoor/travel feel |
| Workshop photo | Upload once if needed, then save URL here | Teaching/training content |

**How to pick:**
- AI tools, LinkedIn tips, personal branding → PRIMARY face URL above
- Workshop, training, teaching → blue blazer workshop shot (upload once, save URL)
- Outdoor/travel feel → `edison3.jpeg` (upload once, save URL)
- Tech/gaming vibe → `edison2.jpeg` (upload once, save URL)

**SKIP Step 5 entirely when using the PRIMARY face.** Go straight to Step 6 and use the URL above as `input_urls`.

---

### Step 5: Upload to Blotato (only for photos NOT yet uploaded)

Only do this if you need edison2.jpeg, edison3.jpeg, or the workshop photo and do not yet have a saved URL for them.

```bash
curl -X PUT "[presignedUrl]" \
  --data-binary "@[local_file_path]" \
  -H "Content-Type: image/jpeg"
```

200 response = success. Save the new `publicUrl` into this table above for future reuse.

---

### Step 6: Generate with kie.ai ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image)

```bash
curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer ${KIE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2-image-to-image",
    "input": {
      "prompt": "[crafted prompt from Step 3]",
      "input_urls": ["[publicUrl from Blotato]"],
      "aspect_ratio": "[chosen ratio]",
      "resolution": "2K"
    }
  }'
```

Returns a `taskId`.

---

### Step 7: Poll for Result

Poll every 25-30 seconds. Typical wait: 60-180 seconds.

```bash
curl -s "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=[taskId]" \
  -H "Authorization: Bearer ${KIE_API_KEY}"
```

When `data.state` is `"success"`, extract image URL from `data.resultJson.resultUrls[0]`.

---

### Step 8: Download and Save

```bash
curl -s -o "./generated/ Chua photos/[descriptive_name].jpg" \
  "[resultUrl]"
```

Use a clear descriptive filename (e.g., `post_ai_tools_linkedin_bold.jpg`).

Display the image to Edison using the Read tool for review.

---

## Platform Quick Reference

| Platform | Ratio | Best Style |
|----------|-------|-----------|
| LinkedIn square | 1:1 | A or B |
| LinkedIn portrait | 4:5 | C or D |
| YouTube thumbnail | 16:9 | B or E |
| Facebook/Instagram | 4:5 or 1:1 | Any |
| Threads/Twitter | 1:1 or 16:9 | A or B |

---

## Common Prompt Fixes

| Issue | Fix |
|-------|-----|
| Face changed too much | Add: "preserve exact facial features, do not alter the face" |
| Text garbled in image | Simplify to fewer words, no punctuation |
| Background too busy | Add: "clean simple background, minimal distractions" |
| Expression feels off | Add: "confident warm smile, natural relaxed expression" |
| Image too dark | Add: "soft even studio lighting, well lit" |
