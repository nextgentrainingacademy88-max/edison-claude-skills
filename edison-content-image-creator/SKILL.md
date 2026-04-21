---
name: edison-content-image-creator
description: >
  Edison Chua's complete social media image creation system — from choosing the right photo,
  to designing the concept and style, to generating and saving the final image. Use this skill
  whenever Edison wants to create any social media post image, thumbnail, carousel cover, or
  content visual using his face or real workshop photos.

  Trigger when Edison says things like: "create a post image", "generate an image of me",
  "make a LinkedIn visual", "design a thumbnail", "YouTube thumbnail style", "MrBeast style",
  "cyborg face", "half face AI", "workshop photo with overlay", "use my training photos",
  "post photos of me with students", "use my face to generate", "create a social post visual",
  "content image post", or any request to produce a new image for social media using Edison's
  face or real photos. Always trigger for content image requests — this skill handles all
  3 content image sub-types and decides which one to use based on the rotation.
---

# Edison's Content Image Creator

## Overview

Content images rotate through THREE distinct sub-types. Each has its own photo selection
rules, prompt style, and output format. The rotation keeps the LinkedIn feed visually varied.

**The 3 Content Image Sub-Types (rotate in this order):**
1. **Workshop Action** — real teaching photo of Edison solo, bold text overlay added via AI
2. **Real Classroom** — authentic photos of Edison with students, multi-photo, no heavy AI
3. **YouTube Thumbnail** — AI-generated dramatic composite using Edison's face as reference

---

## Step 1: Check the Sub-Type Rotation

Read `/sessions/[current-session-id]/mnt/.auto-memory/project_linkedin_automation.md`.

Find the "Content Image Sub-Type Rotation Tracker" section. Rotation order:
**Workshop Action → Real Classroom → YouTube Thumbnail → Workshop Action (repeat)**

Use the next sub-type after the last one recorded. If no tracker exists yet, start with Workshop Action.

After generating, update the tracker (see Step 8 at the bottom).

---

## Step 2: Select Photos from the Library

All photos live under:
```
/sessions/[current]/mnt/Social Media Marketing/Edison Chua photos/
```

Always use the Read tool to visually confirm any photo before selecting. Never guess from filename alone.

**Face-only portraits** (use for YouTube Thumbnail sub-type):
```
Edison Face only/Edison Chua Face.jpeg      <- primary, use this first
Edison Face only/edison2.jpeg
Edison Face only/edison3.jpeg
```

**Workshop teaching shots** (Edison standing, teaching, arms gesturing — for Workshop Action):
```
edisonchuaofficial_1755684526_3703272678101445496_321228572.jpg   <- best: blue blazer, arms raised wide
edisonchuaofficial_1755684526_3703272678135018164_321228572.jpg
edisonchuaofficial_1769012405_3815075026920105102_321228572.jpg
edisonchuaofficial_1771048946_3832152369991861466_321228572.jpg
edisonchuaofficial_1763113368_3765590317405040611_69009783030.jpg
```

**Group and classroom shots** (Edison with students — for Real Classroom):
```
aiwithedison_1763977312_3772837611246414586_69009783030.jpg
aiwithedison_1763977312_3772837611246447536_69009783030.jpg
aiwithedison_1763977312_3772837611355451807_69009783030.jpg
aiwithedison_1752335629_3675180093032447902_69009783030.jpg
aiwithedison_1752335629_3675180093032473025_69009783030.jpg
edisonchuaofficial_1755684526_3703272678101445496_321228572.jpg   <- also works: participants in foreground
```

---

## Sub-Type 1: Workshop Action

**What it is:** A real workshop photo of Edison teaching solo — standing, arms out, commanding
the room. Nano Banana Pro adds a bold text overlay connected to the post topic.
Text sits behind Edison or as a large backdrop, never on top of his face.

**Photo:** Pick the best standing action teaching shot. Default: blue blazer, arms raised wide.

**Prompt template:**
```
Use the face and body from the uploaded reference photo exactly. Preserve exact likeness,
skin tone, hair, facial features. Keep the person in their original teaching pose — standing,
arms gesturing, mid-presentation in a training room. Warm cinematic lighting, participants
partially visible in foreground or background. Add a large bold text overlay integrated BEHIND
the subject (not covering his face) reading: "[POST HEADLINE IN CAPS, max 6 words]". Text
style: white with dark navy drop shadow, looks like a projection on the wall or backdrop.
Small "AI with Edison" branding at the bottom in yellow. Warm cinematic color grade, slight
vignette. Ultra realistic, photorealistic, 8K, sharp, high contrast. Aspect 4:5.
```

**Aspect ratio:** `4:5`
**Post copy style:** Full LinkedIn post — hook, list, closing, repost CTA, P.S., hashtags.

---

## Sub-Type 2: Real Classroom (Multi-Photo, No AI Generation)

**What it is:** Authentic unedited photos of Edison with workshop participants posted together.
No AI generation needed. Post 2-4 real photos in one LinkedIn post to show social proof,
real training, and community energy. These feel human and credible.

**Photo selection:** Pick 2-4 from the group/classroom library above. Mix formats:
1 action shot + 1-2 group shots works well. Use Read tool to visually review each one.

**No kie.ai generation for this sub-type.** Upload the real photos directly.

Upload each photo to Blotato via separate presigned URLs. Collect all publicUrls into an
array and pass as `mediaUrls` in `blotato_create_post`.

**Post copy style:** More personal and story-driven. Good hook angles:
- "I just finished training [X] staff from [type of company] on AI..."
- "Real moment from last week's workshop..."
- "This is what it looks like when a whole team finally gets AI..."

Less list-heavy. Warmer and more human. P.S. can invite corporate training inquiries.

---

## Sub-Type 3: YouTube Thumbnail (AI Face Composite)

**What it is:** Fully AI-generated image using Edison's face as reference. Output is a
dramatic eye-catching YouTube-thumbnail-style visual. Three Y-styles rotate within this
sub-type — check the tracker and use the next one in the Y1 → Y2 → Y3 → Y1 sequence.

**Photo to always use for this sub-type:** `Edison Face only/Edison Chua Face.jpeg`
Upload to Blotato, use as `image_input` in kie.ai.

---

### Y1: MrBeast Bold (16:9)

**When to use:** High-energy AI news, tool lists, viral-style content.
Be exaggerated — big expression, big text, big energy. That is the point of this style.

**Prompt:**
```
Use the face from the uploaded reference photo. Young Asian man, black hair, slim build.
YouTube thumbnail MrBeast format: subject on RIGHT side of frame, upper body visible,
dramatic blue and orange split rim lighting, mouth open in exaggerated excited expression,
eyebrows raised high, one hand pointing LEFT toward text area. LEFT side: bold oversized
white text "[HEADLINE, max 5 words]" with thick black stroke outline, stacked 2-3 lines,
text takes up 40% of the frame. Background: deep dark navy blue with golden light burst
from centre. Small "AI with Edison" logo bottom right in yellow. Aspect 16:9.
Photorealistic, ultra realistic, 8K, cinematic, sharp. Preserve exact facial features.
```

**Aspect ratio:** `16:9`

---

### Y2: Half-Face Cyborg / AI Concept (16:9)

**When to use:** AI transformation topics, "AI vs Human", future of work, agentic AI,
AI replacing tasks. The drama of the split face IS the message — concept first.

**Prompt:**
```
Use the face from the uploaded reference photo. Young Asian man, black hair, slim build.
Split-face concept portrait: LEFT half of face is photorealistic human with natural warm
skin tones and soft studio lighting. RIGHT half seamlessly transitions into chrome metallic
cyborg plating with panel lines, glowing cyan circuit traces, and light-emitting data streams
flowing from the eye socket. Hard clean vertical split line down the centre of the face with
subtle cyan glow at the seam. Background: deep black with scattered cyan and blue light
particles. Bold white text overlay: "[HEADLINE, max 5 words]" positioned above or beside
the face, clean sans-serif font. Aspect 16:9. Ultra realistic on the human side, ultra
detailed mechanical on the AI side. 8K, sharp, cinematic. Preserve exact facial structure.
```

**Aspect ratio:** `16:9` (or `4:5` for portrait if topic fits better)

---

### Y3: Clean Authority (16:9)

**When to use:** Corporate training, HRDC content, credibility posts, client results,
professional positioning. Trust over drama — calm, confident, credible.

**Prompt:**
```
Use the face from the uploaded reference photo. Young Asian man, black hair, slim build,
confident calm expression. Professional YouTube thumbnail: subject at slight 3/4 angle,
direct gaze toward camera, soft dramatic key light from upper left, clean dark navy gradient
background (darker on left, slightly lighter on right). Bold clean sans-serif text on LEFT:
"[HEADLINE, max 5 words]" in white with one accent word or line highlighted in yellow #FFD700.
Small "AI with Edison" text bottom right in yellow. No exaggeration, no dramatic expressions.
Strong, professional, trustworthy presence. Aspect 16:9. Ultra realistic, photorealistic,
8K, cinematic, sharp. Preserve exact facial features from reference photo.
```

**Aspect ratio:** `16:9`

---

## Step 3: Upload Source Photo to Blotato (Sub-Types 1 and 3 only)

```
Tool: mcp__519a64f8-a8a3-437b-a8c0-da574ff4903f__blotato_create_presigned_upload_url
  filename: "edison_source_[date].jpeg"
```

Upload via curl:
```bash
curl -X PUT "[presignedUrl]" \
  --data-binary "@[local_file_path]" \
  -H "Content-Type: image/jpeg"
```

200 = success. Use `publicUrl` as `image_input` for kie.ai.

---

## Step 4: Generate with kie.ai Nano Banana Pro (Sub-Types 1 and 3 only)

```bash
curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer ${KIE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nano-banana-pro",
    "input": {
      "prompt": "[crafted prompt]",
      "image_input": ["[publicUrl from Blotato]"],
      "aspect_ratio": "[chosen ratio]",
      "resolution": "2K"
    }
  }'
```

Poll every 25-30 seconds until `data.state == "success"`:
```bash
curl -s "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=[taskId]" \
  -H "Authorization: Bearer ${KIE_API_KEY}"
```
Get the image URL from `data.resultJson.resultUrls[0]`.

---

## Step 5: Download and Save

```bash
curl -s -o "/sessions/[current]/mnt/Social Media Marketing/[descriptive_name].jpg" "[resultUrl]"
```

Naming convention:
- `content_workshop_action_[topic]_[date].jpg`
- `content_thumbnail_y1_mrbeast_[topic]_[date].jpg`
- `content_thumbnail_y2_cyborg_[topic]_[date].jpg`
- `content_thumbnail_y3_authority_[topic]_[date].jpg`

Display to Edison using Read tool for visual review before posting.

---

## Step 6: Upload Final Image to Blotato for Posting

Sub-Types 1 and 3: get a fresh presigned URL for the generated output file, upload it,
use the publicUrl in `blotato_create_post mediaUrls`.

Sub-Type 2: upload all selected real photos as separate presigned URLs. Pass all publicUrls
as an array in `mediaUrls`.

---

## Step 7: Common Prompt Fixes

| Issue | Fix |
|-------|-----|
| Face changed too much | Add: "preserve exact facial features, do not alter the face" |
| Cyborg split not sharp | Add: "hard clean vertical split line, precise edge, no blending" |
| MrBeast text too small | Add: "extremely large bold text, text takes up 40% of frame" |
| Text garbled in image | Reduce to fewer words, remove punctuation from the text string |
| Background too busy | Add: "clean simple background, minimal distractions" |
| Expression wrong | Add: "confident warm expression, natural relaxed energy" |
| Image too dark | Add: "soft even dramatic lighting, well lit subject" |

---

## Step 8: Update Rotation Trackers in Memory

After every run, update `/sessions/[current]/mnt/.auto-memory/project_linkedin_automation.md`.
Add these sections if they do not exist yet:

```
## Content Image Sub-Type Rotation Tracker
Last used (most recent first):
- [date] [time] MYT: [Sub-Type name] — [topic slug]
- [previous entries, keep last 6]
Next should use: [next sub-type in rotation]

## YouTube Thumbnail Y-Style Rotation (within Sub-Type 3 only)
Last Y style used: [Y1 / Y2 / Y3]
Next Y style: [next in Y1 → Y2 → Y3 → Y1 rotation]
```
