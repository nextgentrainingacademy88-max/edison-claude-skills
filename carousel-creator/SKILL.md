---
name: carousel-creator
description: >
  Edison Chua's LinkedIn carousel creator. Generates a full branded carousel (cover + content
  slides) using dark navy blue + yellow branding, Edison's face on cover and CTA slides,
  real internet memes on content slides, and Nano Banana Pro for all graphic generation.

  Use this skill whenever Edison says:
  - "Create a carousel about [topic]"
  - "Make me carousel slides on [topic]"
  - "Design a LinkedIn carousel for [topic]"
  - "Generate carousel images about [topic]"
  - "Build a carousel post for [topic]"
  - "Make slides for [topic]"

  Always trigger for carousel or multi-slide content requests — even if Edison just says
  "carousel" or "slides" without specifying LinkedIn.
---

# Edison's Carousel Creator

## Overview

This skill creates a complete LinkedIn carousel — cover slide, content slides, and a CTA
closing slide — all in Edison's dark navy blue + yellow branding.

Each slide falls into one of these types, each handled differently:

| Slide Type | Edison's Face? | Meme? | Generated How |
|---|---|---|---|
| Cover | Yes | No | Nano Banana Pro image-to-image |
| Hook / problem | No | Yes | Nano Banana Pro graphic + meme sourced from web |
| Numbered point | No | Yes (optional) | Nano Banana Pro graphic + meme sourced from web |
| Checklist / how-to | No | No | Nano Banana Pro graphic only |
| Tool spotlight | No | No | Nano Banana Pro graphic + screenshot |
| CTA / wrap-up | Yes (circle) | No | Nano Banana Pro image-to-image |

Target length: **6-9 slides total**. Don't go over 10 — credits are limited.

---

## Edison's Branding

- **Background**: Deep dark navy blue (`#0A1628`)
- **Headline text**: Bold yellow (`#FFD700`)
- **Body text**: White
- **Subtext / secondary**: Light grey or cream
- **Brand name**: "AI with Edison" — appears on cover and CTA slide
- **Feel**: Bold, modern, professional. Corporate trainer meets AI expert.
- **No red** — that's Audrey Chia's branding, not Edison's.

---

## Edison's Photo

Face-only photos live at:
```
D:\NEXTGEN ACADEMY\LinkedIn Sample Posting\Edison Chua photos\Edison Face only\
```

The Cowork session may or may not have this folder mounted. Check first:
```bash
ls "/sessions/inspiring-sleepy-einstein/mnt/Edison Face only/" 2>/dev/null \
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

### Outfit — Always Casual, Always Vary

Edison's default is **casual fashion wear**. Never put him in a suit, formal blazer, or business attire unless he explicitly asks for it. The vibe is relaxed, stylish, and real.

| Topic | Outfit Suggestion |
|---|---|
| AI tools / tech | Clean white or black graphic tee, casual overshirt or bomber jacket open over it |
| Corporate training | Neat polo shirt or collared knit shirt, no jacket needed |
| Marketing / funnels | Casual button-down shirt, untucked, sleeves rolled, relaxed fit |
| Productivity | Simple crew-neck tee or zip hoodie, minimal and clean |
| Mindset / motivation | Casual jacket over a plain tee, streetwear-adjacent but clean |
| General business | Smart casual polo or knit shirt, no blazer |

Rules:
- No suits, no ties, no formal blazers unless Edison explicitly says so
- Always describe the specific outfit in the prompt — never leave it vague
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

**Do NOT search the Nano Banana Pro prompt library.** The prompt structure below is already
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

**Prompt template:**
```
Use the face from the uploaded reference image. Young Asian man, black hair, slim build,
warm confident smile. Preserve exact facial features — do not alter the face.

Outfit: [pick from outfit guide based on topic — be specific, e.g. "charcoal fitted
jacket over black t-shirt" or "smart white button-down, sleeves slightly rolled"]

Pose: [pick a natural dynamic pose — e.g. "crossed arms, relaxed confident smile" or
"one hand gesturing outward as if explaining" or "pointing at a floating icon to his right"]

Layout: LinkedIn carousel cover poster, 4:5 portrait. Deep dark navy blue background
(#0A1628). Edison stands center-bottom, 3/4 or full body. Behind Edison, a large soft
glowing circle in BRIGHT WHITE — a strong white radial glow like a spotlight behind him,
clearly white against the dark navy background, not teal, not navy.
Floating around Edison are colorful 3D-style icons related to the topic [e.g. for AI:
robot emoji, brain with circuits, lightbulb, chat bubble, gear, sparkle stars — for
training: graduation cap, clipboard, people icons, trophy — pick icons that match the
carousel topic]. Icons float at different heights and angles, some small some larger,
giving an energetic dynamic feel.

At the top: very large bold white text reading "[MAIN TITLE IN CAPS]" — huge, the
dominant visual element. Below the title in bold yellow: "[subtitle or parenthetical]".

At the very bottom of the image, three small items in a row: "AI with Edison" on the
left, an Instagram icon with "@aiwithedison" in the center, and "nextgentrainingacademy.com"
on the right. All in small white font.

DO NOT render any technical instructions, lighting notes, or camera settings as text
on the image. Only render the title, subtitle, and the three bottom social items.
Ultra realistic, 8K, photorealistic, cinematic, sharp.
```

**kie.ai call:**
```bash
curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer ${KIE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nano-banana-pro",
    "input": {
      "prompt": "[prompt]",
      "image_input": ["[publicUrl]"],
      "aspect_ratio": "4:5",
      "resolution": "2K"
    }
  }'
```

---

### SLIDE TYPE B — Hook / Problem Slide (Meme + Text, No Face)

These slides grab attention with a bold statement and a funny meme image.

**Layout (matching the reference examples):**
- Navy blue background
- Bold yellow headline at top (e.g. "10 SECONDS IS ALL YOU GET TO HOOK YOUR READER")
- Meme image in the center (rectangular, like a photo insert)
- White body text below the meme (1-2 sentences)

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
Dark navy blue background (#0A1628). Bold yellow headline text at top reading
"[HEADLINE IN CAPS]". White supporting text below: "[body text]".
In the center of the slide, feature the meme from the reference image — both panels
clearly visible, cleanly embedded into the slide design as a featured graphic.
The meme should look like it belongs in the design, not pasted on top.
White closing text at the bottom: "[closing line]".
Bold modern poster layout. 4:5 aspect ratio, ultra sharp, clean graphic design.
DO NOT render any technical instructions as visible text on the image.
```

Call kie.ai WITH `image_input: ["[meme_public_url]"]`.

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
Dark navy blue background (#0A1628). Bold yellow text at top: "[NUMBER + TITLE]".
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
Dark navy blue background (#0A1628). At the top, a bold yellow rounded banner/pill
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
Dark navy blue background (#0A1628). Bold yellow text at top: "MEET [TOOL]".
Yellow subtitle: "[what tool does]". White body text: "[supporting line]".
A clean rectangular screenshot placeholder box in the center showing a software
interface. White closing text below. Modern tech poster layout, no people.
4:5 aspect ratio, sharp, professional.
```

Note the actual tool screenshot URL separately — it will be inserted in Canva.

---

### SLIDE TYPE F — CTA / Wrap-up Slide (Face in Circle)

**Layout (matching "Follow Audrey" reference — but for Edison):**
- Navy background
- Bell icon or emoji at top
- Bold white + yellow headline: "FOLLOW EDISON FOR MORE AI TIPS."
- Edison's face in a circle cutout, bottom-right
- LinkedIn icon + "Edison Chua / AI with Edison" name label, bottom-left

**Prompt:**
```
Use the face from the uploaded reference image. Young Asian man, black hair, slim build,
warm confident smile. Preserve exact facial features.

Layout: Dark navy blue background (#0A1628). Bold white text at top: "FOLLOW EDISON".
Bold yellow text below: "FOR MORE AI TIPS." A circular portrait cutout of Edison
in the bottom-right, dressed casual fashion wear, smiling confidently.
At the bottom left: "AI with Edison" with an Instagram icon and "@aiwithedison"
and "nextgentrainingacademy.com" in small white font.
Clean, modern, professional. 4:5 aspect ratio, ultra realistic, photorealistic.
DO NOT render any technical instructions, lighting notes, or camera settings as text
on the image.
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
curl -s -o "/sessions/inspiring-sleepy-einstein/mnt/outputs/carousel_[topic]_slide[N]_[type].jpg" \
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
| Wrong background color | Add: "deep dark navy blue #0A1628, NOT red, NOT light colors" |
| Text unreadable in image | Keep embedded text to 4 words max; add longer text in Canva |
| Image too dark | Add: "well-lit, balanced exposure, soft studio lighting" |
| Looks too AI-generated | Add: "ultra realistic, photorealistic, 8K, natural skin texture" |
| Circle cutout looks bad | Add: "clean circular portrait crop, sharp edges, white border" |

---

## Meme Quick Reference

Good memes to use for corporate training / AI / business content:

| Situation | Meme |
|---|---|
| Surprising stat or fact | Nicolas Cage "WOW VERY INTERESTING" |
| Something everyone does wrong | "This is Fine" dog in burning room |
| Needing a goal / plan | Boromir "One does not simply" |
| Obvious insight | Roll Safe (finger on temple) |
| Before vs after | Drake approving/disapproving |
| Overthinking | Spider-Man pointing at himself |
| Ignoring the obvious solution | "Is this a pigeon?" |
| Something taking forever | Waiting skeleton |

Source memes from: `https://api.imgflip.com/get_memes` or search directly on
`https://imgflip.com/memetemplates` and copy the image URL.

No love hearts, no romantic memes — keep it professional and funny.
