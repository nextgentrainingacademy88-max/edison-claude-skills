---
name: carousel-creator
description: >
  Edison Chua's carousel creator for LinkedIn AND Instagram. Generates a full branded carousel
  (cover + content slides + CTA) using vibrant flat color + yellow + white branding, Edison's
  face on cover and CTA slides, real internet memes on content slides, and ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image)
  for all graphic generation.

  Use this skill whenever Edison says:
  - "Create a carousel about [topic]"
  - "Make me carousel slides on [topic]"
  - "Design a LinkedIn carousel for [topic]"
  - "Design an Instagram carousel for [topic]"
  - "Generate carousel images about [topic]"
  - "Build a carousel post for [topic]"
  - "Make slides for [topic]"

  TEST MODE triggers (generate just 1-2 representative slides to verify style + face + layout):
  - "test carousel cover" → generate cover slide only, follow lines 252-286 template VERBATIM
  - "test carousel cover for [topic]" → same, with topic-matched outfit/prop
  - "test carousel slide 2" or "test content slide" → generate content slide B/C/D only
  - "preview carousel style" → cover + 1 content slide only, 4:5 portrait
  - "sample carousel" / "carousel test" → cover + 1 content slide

  Always trigger for carousel or multi-slide content requests — even if Edison just says
  "carousel" or "slides" without specifying the platform. This skill covers BOTH LinkedIn
  and Instagram carousels with the same style; only the post-time aspect ratio differs
  (LinkedIn 4:5, Instagram 4:5 or 1:1).

  **In TEST MODE, READ the exact Cover Slide template section of this file (lines 252-286)
  and fill in variables verbatim. Do NOT write prompts from scratch. Mandatory elements
  (white glowing circle behind Edison, vibrant flat color background, topic-matched outfit
  and prop) MUST be included.**
---

## IMAGE GENERATION PRIORITY RULE

> **Remote routine usage note (as of 2026-04-25):** when this skill runs from a remote routine sandbox, replace every https://api.kie.ai URL with https://edison-kie-proxy.nextgentrainingacademy88.workers.dev (transparent Cloudflare Worker proxy). The sandbox blocks direct outbound to api.kie.ai; the Worker is on workers.dev which IS allowlisted. Same paths, same headers, same body, same response shape. From a local PC, api.kie.ai works directly without the Worker.



**kie.ai ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) is the ONLY path for every slide in a carousel. Zero Blotato
template fallbacks.**

### BLACKLIST — These Blotato templates have posted face-less text-on-navy slides to
Edison's LinkedIn/Facebook/Threads and are BANNED from this skill:
- `/base/v2/tutorial-carousel/e095104b-e6c5-4a81-a89d-b0df3d7c5baf/v1` (Tutorial Carousel Monocolor — the culprit)
- `/base/v2/tutorial-carousel/2491f97b-1b47-4efa-8b96-8c651fa7b3d5/v1` (Tutorial Carousel Flat)
- `/base/v2/quote-card/*` (Quote Card carousels)
- `/base/v2/tweet-card/*` (Tweet Card carousels)
- `9f4e66cd-b784-4c02-b2ce-e6d0765fd4c0` (Single Centered Text Quote)
- `/base/v2/image-slideshow/*`, `/base/v2/images-with-text/*` (slideshow templates)

### Rule A — Face-required slides (Cover, CTA, any slide with Edison)

**kie.ai ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) is the ONLY path.** If kie.ai fails, skip the post — do NOT
fall back to any Blotato template.

```
POST https://api.kie.ai/api/v1/jobs/createTask
Headers:
  Authorization: Bearer 6a2b2e230329d9a5ef971f5cc266b3ea
  Content-Type: application/json

{
  "model": "gpt-image-2-image-to-image",
  "input": {
    "prompt": "[full prompt]",
    "image_urls": ["[face_primary.blotato_url from assets-manifest.json]"],
    "aspect_ratio": "[ratio]",
    "resolution": "2K"
  }
}
```

The `${KIE_API_KEY}` value is `6a2b2e230329d9a5ef971f5cc266b3ea` — substitute it inline
when running from an environment where .env does not load (e.g. Anthropic remote routines).

Always pull `face_primary.blotato_url` from assets-manifest.json — NOT the Google Drive
URL (some fetchers hit a redirect on Drive). Retry kie.ai exactly twice (full prompt, then
simplified prompt). If both fail: write the intended prompt to `generated/engagement-manual-queue.md`,
SKIP that platform's post, move on. **NEVER publish a carousel with a face-less slide
or a Blotato-template fallback.**

### Rule B — Face-free decorative slides (numbered points, checklists, graphics without Edison)

Also kie.ai only — empty `image_urls: []`. Blotato built-in infographic templates
(Whiteboard, Chalkboard, Manga Panel, Newspaper, etc.) are tempting but lock in a
generic "Follow me | Repost" footer and rigid layout that does NOT match Edison's
navy-yellow branding. Stick with kie.ai so every slide matches the cover's vibe.

### Logging

Log the actual path used per slide in `rotation-state.json` → `image_generation.last_path_used`
with enough detail to diagnose partial-credit failures, e.g. `"carousel_mixed: cover=kie_ai_face, slide2=blotato_tutorial, slide3=blotato_insufficient_credits_fallback_kie_ai_no_face, cta=kie_ai_face"`.
If any slide was missing the face when it should have had one, ALSO log
`face_coverage: "incomplete"` and append a manual-queue note for Edison.

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

# Edison's Carousel Creator

## Overview

This skill creates a complete LinkedIn carousel — cover slide, content slides, and a CTA
closing slide — all in Edison's dark navy blue + yellow branding.

Each slide falls into one of these types, each handled differently:

| Slide Type | Edison's Face? | Meme? | Generated How |
|---|---|---|---|
| Cover | Yes | No | ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) image-to-image |
| Hook / problem | No | Yes | ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) graphic + meme sourced from web |
| Numbered point | No | Yes (optional) | ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) graphic + meme sourced from web |
| Checklist / how-to | No | No | ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) graphic only |
| Tool spotlight | No | No | ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) graphic + screenshot |
| CTA / wrap-up | Yes (circle) | No | ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) image-to-image |

Target length: **6-9 slides total**. Don't go over 10 — credits are limited.

---

## Edison's Branding

- **Cover slide background**: VIBRANT solid flat color — NOT dark navy. Pick bold and bright based on topic (see Cover Slide Color Guide below). This is a hard rule.
- **Content slides background**: Same vibrant color as the cover — use the SAME color throughout the entire carousel for consistency. All slides match.
- **Headline text**: On vibrant cover slides use bold white headline + yellow subtitle. On dark navy content slides use yellow headline + white body.
- **Body text**: White
- **Subtext / secondary**: Light grey or cream
- **Brand name**: "AI with Edison" — appears on cover and CTA slide
- **Feel**: Bold, energetic, visual storytelling. Think Audrey Chia-style covers — vibrant, punchy, character-driven.
- **No red** — that's Audrey Chia's branding, not Edison's.

### Cover Slide Color Guide

Pick a vibrant background color that matches the topic energy. Change every carousel — never repeat the same color back to back.

| Topic | Background Color |
|---|---|
| AI tools / productivity | Bright teal `#00BFA6` or electric blue `#1565C0` |
| Corporate training / L&D | Deep orange `#E65100` or warm amber `#FF8F00` |
| Marketing / funnels | Bold purple `#6A1B9A` or vivid indigo `#283593` |
| Hook / audience engagement | Bright coral `#FF5252` or vivid green `#2E7D32` |
| Mistakes / hidden problems | Deep burnt orange `#BF360C` or strong teal `#00695C` |
| Productivity / automation | Bright cobalt `#0D47A1` or rich emerald `#1B5E20` |
| Mindset / motivation | Vivid magenta `#AD1457` or deep gold `#F57F17` |

Rule: always a solid flat color fill — no gradients, no dark navy on cover slides.

---

## Edison's Photo

Face-only photos live at:
```
<face/workshop photos loaded from Drive URLs in assets-manifest.json>Edison Face only\
```

The Cowork session may or may not have this folder mounted. Check first:
```bash
ls "./generated/ Face only/" 2>/dev/null \
  || echo "NOT MOUNTED"
```

If mounted, use the path directly. If not mounted, tell Edison:
> "I need your face photo to generate the cover. Could you drag and drop it into our chat,
> or select the Edison Face only folder in Cowork?"

Edison's appearance: young Asian man, black hair, slim build, warm confident smile.
His face must stay **exactly the same** on every slide — only outfit, pose, and background change.

### Pose — Always Vary, Never Just Standing Straight

Pick a natural, dynamic pose that fits the topic. Rotate through these:
- Crossed arms, relaxed confident smile
- One hand gesturing outward, explaining something
- Pointing at floating icon or text area
- Looking sideways at something with a curious expression
- Holding a prop relevant to the topic (phone, laptop, pen, book)
- Leaning slightly forward, engaged expression
- Arms slightly open, welcoming pose

Never describe the pose as "standing straight" or "arms at sides." Always pick something with energy.

### Outfit — Colorful, Topic-Matched, Always Vary

Edison's outfit on cover slides should be **colorful and vibrant** — it needs to pop against the bright background and feel visually dynamic, like Audrey Chia's covers. Never dark or muted unless the topic demands it. The vibe is confident, stylish, and energetic.

| Topic | Outfit Suggestion |
|---|---|
| AI tools / tech | Bright color tee (yellow, cobalt, teal) with a casual overshirt or bomber jacket |
| Corporate training | Smart casual polo in a vivid color (orange, electric blue, green) |
| Marketing / funnels | Colorful casual button-down, untucked, sleeves rolled |
| Productivity | Bold crew-neck tee or zip hoodie in a standout color |
| Mindset / motivation | Vibrant casual jacket over a contrasting plain tee |
| General business | Clean polo or knit shirt in a bright, confident color |

Rules:
- No suits, no ties, no formal blazers unless Edison explicitly says so
- Outfit color should complement or contrast the background color — never blend in
- Always describe the specific outfit and color in the prompt — never leave it vague
- Vary the outfit every carousel so it never looks repeated

---

## Step 1: Plan the Carousel

When Edison gives a topic, immediately draft a slide plan before generating anything.

**Standard structure:**
```
Slide 1 — Cover: [Main carousel title]
Slide 2 — Hook: [Attention-grabbing problem or stat]
Slide 3 — Point #1: [First tip/mistake/step]
Slide 4 — Point #2: [Second tip/mistake/step]
Slide 5 — Point #3: [Third tip/mistake/step]
Slide 6 — Point #4 or How-to: [Fourth point or checklist]
Slide 7 — Point #5: [Fifth point]
Slide 8 — CTA: [Follow Edison for more AI tips]
```

For each slide, note: slide type, headline text (max 6 words), body text (1-2 lines),
whether a meme fits, and what kind of meme would work.

**Show Edison the plan and get his go-ahead before generating any images.**

---

## Step 2: Use the Proven Prompt Structure

**Do NOT search the ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) prompt library.** The prompt structure below is already
proven and tested — use it directly. Searching the library wastes tokens and credits.

The templates in Steps 4 onwards are ready to use. Just fill in the topic-specific
text (headline, subtitle, slide content) and generate.

---

## Step 3: Upload Edison's Face (for Cover + CTA slides)

Get a public URL using Blotato:

```
Tool: blotato_create_presigned_upload_url
  filename: "edison_face_carousel.jpeg"
```

Then upload via curl:
```bash
curl -X PUT "[presignedUrl]" \
  --data-binary "@[local_path_to_face_photo]" \
  -H "Content-Type: image/jpeg"
```

200 = success. Save the `publicUrl` — reuse it for all face slides in this carousel.

---

## Step 4: Generate Each Slide

Work through the slide plan one by one. Use the right method per slide type.

---

### SLIDE TYPE A — Cover Slide (Face + Title)

The cover is the most important slide. It must be vibrant, visual, and immediately tell a story through Edison's outfit, pose, and any props. Think Audrey Chia's carousel covers — the character sells the topic before anyone reads a word.

**Before writing the prompt, decide:**
1. What vibrant background color fits this topic? (See Cover Slide Color Guide)
2. What outfit color pops against that background?
3. What character, prop, or scene tells the story? Examples:
   - Talking about hooks/audience? Edison holding a fishing rod with a big fish on the line
   - Talking about mistakes/hidden problems? Edison in a detective outfit with magnifying glass
   - Talking about recording/video content? Edison holding a boom mic or clapperboard
   - Talking about AI tools? Edison with a floating robot companion beside him
   - Talking about funnels/marketing? Edison pointing at a funnel diagram
   - Talking about productivity? Edison with a stopwatch or checklist
   - No obvious prop needed? Edison in a confident pose with clean background — no forced icons
4. Icons/props are optional — only include them if they genuinely add to the storytelling. Sometimes a clean background with just Edison works better.

**Prompt template:**
```
Use the face from the uploaded reference image. Young Asian man, black hair, slim build,
warm confident smile. Preserve exact facial features — do not alter the face.

Outfit: [colorful, topic-matched outfit — be specific about color and style, e.g.
"bright cobalt blue bomber jacket over a white tee" or "vivid orange polo shirt, untucked"
or "yellow graphic tee with an open overshirt" — outfit color must pop against the background]

Pose: [topic-driven pose — e.g. "holding a fishing rod with a fish on the line, grinning"
or "wearing a detective hat, holding a magnifying glass, curious expression"
or "one hand gesturing outward as if explaining, confident smile"
or "arms slightly open, welcoming and energetic stance"]

[If using a character costume or prop, describe it clearly — detective coat, spy gear,
fishing vest, boom mic, robot companion, etc.]

Layout: LinkedIn carousel cover poster, 4:5 portrait. Solid vibrant flat background color
[HEX CODE from color guide]. Edison stands center or slightly off-center, 3/4 or full body.
Behind Edison, a large bright white soft glowing circle — a strong white radial glow like a
spotlight shining behind him, clearly white and luminous against the colored background.
The white circle must be large, centered behind his body. This is mandatory on every cover slide.
[Only if topic calls for it: floating 3D-style icons or props related to topic around Edison.
If no icons fit naturally, leave background clean — just Edison + white glow circle.]

At the top: very large bold white text reading "[MAIN TITLE IN CAPS]" — huge, the
dominant visual element. Below the title in bold yellow: "(subtitle or parenthetical in brackets)".

Bottom-left corner: small white text "Edison Chua" with subtext "AI Educator + Growth Funnel Expert".

Soft studio lighting on Edison, natural skin tone, subtle rim light.
Ultra realistic, 8K, photorealistic, cinematic, sharp.
DO NOT render any technical instructions, lighting notes, or camera settings as text on the image.
Only render the title, subtitle, and the bottom-left name/title.
```

**kie.ai call:**
```bash
curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer ${KIE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2-image-to-image",
    "input": {
      "prompt": "[prompt]",
      "image_urls": ["[publicUrl]"],
      "aspect_ratio": "4:5",
      "resolution": "2K"
    }
  }'
```

---

### SLIDE TYPE B — Hook / Problem Slide (Meme + Text, No Face)

These slides grab attention with a bold statement and a funny meme image.

**Layout rules for ALL content slides (B, C, D, E):**
- Generous padding on all sides — at least 10% whitespace margin. Nothing touches the edges.
- Font is large and bold but proportionate — content fits comfortably with room to breathe top and bottom.
- Vertical spacing between elements is generous — do not stack tightly.
- Font style: Heavy sans-serif (Impact or Montserrat Black style). Clean and modern.
- Bottom bar on EVERY content slide: thin horizontal line near the bottom, "@aiwithedison" small white text on the left, white right-pointing chevron arrow ">" on the right indicating swipe.
- Memes must be square or portrait format — never wide/landscape. This prevents cropping issues.

**Layout:**
- Vibrant flat background (same color as cover)
- Bold yellow headline at top
- Meme image in the center (square or portrait crop, clean thin white border)
- White body text below the meme (1-2 sentences)
- Bottom bar: "@aiwithedison" left + ">" swipe arrow right

**Step 1 — Source the meme:**

Search imgflip or giphy for a relevant meme:
```bash
# Search imgflip for meme
curl -s "https://api.imgflip.com/get_memes" | python3 -c "
import json, sys
data = json.load(sys.stdin)
memes = data['data']['memes']
keyword = '[topic keyword]'
for m in memes:
    if keyword.lower() in m['name'].lower():
        print(m['name'], m['url'])
"
```

Or search Google Images / Giphy mentally and pick a well-known meme that fits the point.
Good memes to use: "This is Fine" dog, Boromir "One does not simply", Nicolas Cage reactions,
Drake approving/disapproving, Distracted Boyfriend, "Is this a pigeon?", etc.

Save the meme URL — it will be referenced in the Canva assembly step.

**Step 2 — Download the meme and upload to Blotato:**

```bash
# Download meme to /tmp
curl -s -o /tmp/meme_slide[N].jpg "[meme image URL from imgflip]"

# Upload to Blotato to get a public URL
# Use blotato_create_presigned_upload_url, then curl PUT
```

Save the Blotato `publicUrl` for the meme.

**Step 3 — Generate the slide with the meme baked in:**

Pass the meme as `image_input` so kie.ai composites it directly into the design.
Never use a placeholder box — the meme must be visually embedded in the final image.

```
Solid vibrant flat background color [SAME HEX as cover slide]. Bold yellow headline text at top reading
"[HEADLINE IN CAPS]". White supporting text below: "[body text]".
In the center of the slide, feature the meme from the reference image — both panels
clearly visible, cleanly embedded into the slide design as a featured graphic.
The meme should look like it belongs in the design, not pasted on top.
White closing text at the bottom: "[closing line]".
Bold modern poster layout. 4:5 aspect ratio, ultra sharp, clean graphic design.
DO NOT render any technical instructions as visible text on the image.
```

Call kie.ai WITH `image_urls: ["[meme_public_url]"]`.

---

### SLIDE TYPE C — Numbered Point Slide (Meme optional)

**Layout:**
- Navy background
- Yellow number + title at top (e.g. "#1 SET YOUR PITCH GOAL")
- Supporting sentence below title
- Meme image in center (if a fitting meme exists), OR just body text
- Closing sentence below

**Prompt:**
```
Solid vibrant flat background color [SAME HEX as cover slide]. Bold yellow text at top: "[NUMBER + TITLE]".
White supporting text below: "[supporting line]". Clean rectangular image placeholder
box in center for a meme or screenshot insert. White closing text at bottom:
"[closing line]". Bold modern poster layout, no people. 4:5 aspect ratio, sharp,
professional graphic design.
```

For the meme: pick one that matches the point. Boromir "you must have a goal" for
goal-setting content, Nicolas Cage "WOW" for surprising stats, etc. Save the URL.

---

### SLIDE TYPE D — Checklist / How-to Slide (No Meme)

**Layout (matching "How to Nail Your Goal" reference):**
- Navy background
- Bold title in a yellow pill/banner shape at top
- 3 checklist items, each in a rounded white card with a gold tick icon on the left
- "HOT TIP" label and tip box at the bottom in a cream/light color

**Prompt:**
```
Solid vibrant flat background color [SAME HEX as cover slide]. At the top, a bold yellow rounded banner/pill
shape containing white text "[TITLE]". Below, three rounded white card rows each
with a gold checkmark icon on the left and dark text: "[item 1]", "[item 2]",
"[item 3]". At the bottom, a small yellow "HOT TIP" label above a rounded cream
box with dark text: "[tip text]". Clean, structured infographic style.
No people, no faces. 4:5 aspect ratio, ultra sharp, professional.
```

---

### SLIDE TYPE E — Tool Spotlight Slide (No Meme)

**Layout:**
- Navy background
- "MEET [TOOL NAME]" headline with tool logo
- Subtitle: what the tool does
- Screenshot of the tool in center
- Body text below

**Prompt:**
```
Solid vibrant flat background color [SAME HEX as cover slide]. Bold yellow text at top: "MEET [TOOL]".
Yellow subtitle: "[what tool does]". White body text: "[supporting line]".
A clean rectangular screenshot placeholder box in the center showing a software
interface. White closing text below. Modern tech poster layout, no people.
4:5 aspect ratio, sharp, professional.
```

Note the actual tool screenshot URL separately — it will be inserted in Canva.

---

### SLIDE TYPE F — CTA / Wrap-up Slide (Face in Circle)

Modelled on Audrey Chia's CTA slide. Edison in a circle portrait crop, bottom-right. LinkedIn icon + name + title, bottom-left. Bell icon at top. No full body.

**Outfit rule for CTA:** Fashion-forward streetwear only. Stylish oversized jacket (white, cream, or bold color) over a fitted dark tee. Korean streetwear influencer energy. Never a plain tee. Never formal. Vary the jacket style each carousel.

**Layout:**
- Same vibrant flat background as rest of carousel
- Large white bell icon at top center
- Bold large white text: "FOLLOW EDISON"
- Bold yellow text below: "FOR MORE AI TIPS."
- Bottom right: Edison in a clean circular portrait crop with white border
- Bottom left: LinkedIn square icon (white), bold white "Edison Chua", smaller white subtext "AI Educator + Growth Funnel Expert"

**Prompt:**
```
Use the face from the uploaded reference image. Young Asian man, black hair, slim build,
warm confident smile. Preserve exact facial features — do not alter the face.

Outfit: [Fashion-forward streetwear — e.g. "stylish white oversized jacket with subtle
design details over a fitted black tee" or "clean cream satin bomber jacket over a dark
tee" or "structured pastel green coach jacket over a black fitted shirt" — always elevated
casual, never plain, never formal. Vary each carousel.]

Pose: Relaxed confident chin-rest pose — one hand lightly under chin, slight smile,
looking directly at camera. Like a lifestyle content creator portrait.

Layout: LinkedIn carousel CTA slide, 4:5 portrait. Solid vibrant flat background color
[SAME HEX as cover slide]. Large bold white bell icon at the very top center.
Bold large white text "FOLLOW EDISON". Bold yellow text below "FOR MORE AI TIPS."
Bottom right: Edison in a clean circular portrait crop with a white border,
upper body visible inside the circle, confident and stylish.
Bottom left: LinkedIn square logo icon in white, bold white "Edison Chua",
smaller white subtext "AI Educator + Growth Funnel Expert".

Clean modern layout. 4:5 aspect ratio. Ultra realistic, 8K, photorealistic, cinematic, sharp.
DO NOT render any technical instructions as text on the image.
Only render the headline, subtext, bell icon, and bottom-left name/title.
```

Call kie.ai WITH `image_input` (same face URL as cover).

---

## Step 5: Poll for Results

After each kie.ai call, save the `taskId` and poll every 25-30 seconds:

```bash
curl -s "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=[taskId]" \
  -H "Authorization: Bearer ${KIE_API_KEY}"
```

When `data.state` is `"success"`, download from `data.resultJson.resultUrls[0]`.

To save time, submit all non-face slides to kie.ai first (they don't need the face
upload), then do face slides in parallel while graphics are generating.

---

## Step 6: Download and Display Results

Save each slide to the outputs folder:
```bash
curl -s -o "./generated/" \
  "[resultUrl]"
```

Naming convention: `carousel_ai_tools_slide1_cover.jpg`, `carousel_ai_tools_slide2_hook.jpg`, etc.

Display each image to Edison using the Read tool as soon as it's downloaded.

---

## Step 7: Deliver the Full Package

After all slides are generated, give Edison:

1. All slide images (displayed via Read tool)
2. A meme sourcing list — for each slide that uses a meme:
   ```
   Slide 3 (Hook): Nicolas Cage "WOW" meme
   URL: [direct image URL]
   Insert: center placeholder box
   ```
3. Assembly instructions:
   > "Open each slide image in Canva. For slides with memes, insert the meme image
   > into the center placeholder area. Resize to fit the box. Done."

Ask Edison: any slides to regenerate or adjust?

---

## Prompt Fixes

| Issue | Fix |
|---|---|
| Face changed | Add: "preserve exact facial features, identical to reference" |
| Cover background too dark / navy | Add: "solid vivid flat [color] background, NOT dark navy, bright and saturated" |
| Content slide wrong background | Add: "deep dark navy blue #0A1628, NOT light colors" |
| Outfit too dark / muted | Add: "outfit is [bright color], vibrant and colorful, clearly visible against background" |
| Text unreadable in image | Keep embedded text to 4 words max; add longer text in Canva |
| Image too dark | Add: "well-lit, balanced exposure, soft studio lighting" |
| Looks too AI-generated | Add: "ultra realistic, photorealistic, 8K, natural skin texture" |
| Circle cutout looks bad | Add: "clean circular portrait crop, sharp edges, white border" |
| Prop/costume looks forced | Remove the prop and use a clean pose instead — not every slide needs a prop |

---

## Meme Rules (READ BEFORE PICKING)

### HARD RULES — these are non-negotiable:

1. **NEVER use a placeholder.** No "meme goes here" box, no grey rectangle, no dotted
   outline saying "insert meme". The actual meme image must be downloaded, uploaded to
   Blotato, passed as `image_input` to kie.ai, and composited into the final slide. If
   the meme cannot be sourced, skip the meme and use a clean text-only slide instead.
   Never publish a slide with a placeholder.

2. **Pick the meme that fits THIS topic, not a meme from a fixed list.** The reference
   table below is just inspiration. Do NOT default to "This is Fine dog" or Boromir
   just because they're on the list. Every carousel should pick memes based on what
   the specific slide is saying.

3. **Prefer current trending memes** over recycled classics. Before picking, search
   for what's trending right now — check the imgflip trending feed, Reddit's r/memes,
   knowyourmeme trending page, or the current-week viral TikTok meme formats. Use a
   fresh meme when one fits; fall back to a timeless classic only when nothing current
   matches the point.

4. **No romantic memes, no love hearts.** Keep it professional and funny.

5. **Square or portrait crop only.** No landscape memes — they break the carousel
   composition.

### Meme sourcing (in order of preference)

1. **Current trending feeds (check these first):**
   - `https://api.imgflip.com/get_memes` — imgflip top 100 trending memes, JSON
   - `https://knowyourmeme.com/memes/trending` — weekly trending page
   - `https://www.reddit.com/r/memes/top/.json?t=week` — Reddit top-week
   - `https://giphy.com/explore/meme` — Giphy meme trending
2. **imgflip template browse:** `https://imgflip.com/memetemplates` — copy image URL
3. **Google Images search:** only as last resort, and only if the image is clearly a
   known meme template with no licensing issues.

### Reference table (INSPIRATION, not a rotation)

Use these ONLY when one of them genuinely fits the slide's point. Do not force a slide
to use one of these just because they're listed.

| Situation | Classic meme that could fit |
|---|---|
| Surprising stat or fact | Nicolas Cage "WOW VERY INTERESTING" |
| Something everyone does wrong | "This is Fine" dog in burning room |
| Needing a goal / plan | Boromir "One does not simply" |
| Obvious insight | Roll Safe (finger on temple) |
| Before vs after | Drake approving/disapproving |
| Overthinking | Spider-Man pointing at himself |
| Ignoring the obvious solution | "Is this a pigeon?" |
| Something taking forever | Waiting skeleton |

If the current topic is about a 2026 AI tool like Claude Opus 4.7 or NotebookLM, FIRST
look for an AI-specific or tech-current meme (e.g. Sam Altman reaction memes, Elon
reaction faces, recent AI panic memes, "AI replaced my job" tweet-style memes) before
falling back to these classics.

---

## Engagement Routine

When a carousel post promises a resource ("full PDF in comments", "link below", "comment GUIDE"),
store the Drive link in `rotation-state.json` under the platform's `*_pdf_links` map before
publishing. The shared `comment-engagement-responder` skill runs hourly and delivers the link
to every commenter asking for it, across LinkedIn, Facebook, and Instagram. Pin-comment image
generation and manual-pin flagging are documented in `facebook-content-creator/SKILL.md`.
