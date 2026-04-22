---
name: edison-infographic-creator
description: >
  Edison Chua's infographic creation system for AI and tech topics. Creates
  visually engaging infographics using Nano Banana Pro in three rotating styles:
  whiteboard hand-drawn, analogy flat illustration, and manga/comic panel.

  Trigger when Edison mentions: "create an infographic", "make an infographic
  about", "infographic on [topic]", "explain [AI/tech topic] as an infographic",
  "whiteboard infographic", "analogy style", "manga panel", "4-panel comic",
  or any request to visually explain an AI or tech concept as an educational image.

  TEST MODE triggers (generate a single sample infographic):
  - "test infographic" → next style in rotation (check rotation-state.json)
  - "test whiteboard" or "test whiteboard infographic" → Style W (Charlie Hill style)
  - "test analogy" or "test analogy style" → Style A (top/bottom split illustration)
  - "test manga" or "test manga style" or "test 4 panel" → Style M (4-panel comic)
  - "sample infographic for [topic]" → auto-select best style for the topic
  Read the exact Style Guide section for the chosen style (W/A/M) and use the
  prompt pattern verbatim. This skill is face-free — Blotato templates are the
  primary path (Whiteboard: `ae868019-820d-434c-8fe1-74c9da99129a`, Manga:
  `49c61370-a706-4b82-98f7-62d557d1c66d`); Analogy has no Blotato template so
  use kie.ai direct.

  This skill handles: selecting the right style, crafting the prompt, generating
  via Blotato template or kie.ai Nano Banana Pro, and saving the result.
---

# Edison's Infographic Creator

## Overview

This skill creates educational infographic images on AI and tech topics using
three rotating visual styles. It does NOT require Edison's face — these are
concept-first, education-first visuals. The content is the hero.

**All images use aspect ratio `4:5` (portrait). No exceptions.**

---

## PART 1: Style Selection

### Step 1: Ask for the Topic (if not provided)

If Edison hasn't specified a topic, ask:
- What is the topic? (e.g., "5 AI tools to replace your VA", "How RAG works",
  "ChatGPT vs Claude", "3 ways AI saves time")
- Any preference on style? (whiteboard / analogy / manga — or auto-select)

**Style rotation rule: never repeat the same style twice in a row.**
Default rotation order: Whiteboard → Analogy → Manga → repeat.

If no style preference, auto-select based on topic:
- **Step-by-step / how-to / numbered tips** → Whiteboard style
- **Concept explainer / "what is X" / comparisons** → Analogy style
- **Story-based / before-after / relatable scenario** → Manga/comic panel style

---

### Style Guide

#### Style W: Whiteboard Hand-Drawn
**When to use**: How-to guides, numbered tips, step-by-step processes, tool comparisons
**Feel**: Casual, educational, relatable — like a teacher drew it live
**Reference**: Charlie Hill whiteboard infographic style — multi-panel grid,
hand-drawn icons, marker-style text, coloured arrows, light warm white bg
**Key elements**: Black marker lines, coloured accent highlights (orange, blue,
yellow), hand-lettered titles, simple stick-figure or icon illustrations, vertical
grid layout with 4-6 sections

**Prompt pattern**:
```
Whiteboard-style hand-drawn infographic about [TOPIC]. Clean white background,
bold black marker strokes, coloured accent highlights in [orange/blue/yellow].
[NUMBER] sections arranged in a vertical grid layout (portrait 4:5 orientation).
Each section has a simple hand-drawn icon, a short bold hand-lettered title,
and 1-2 bullet points in neat marker handwriting. Title at the top reads:
[HEADLINE]. The overall feel is a teacher explaining concepts on a whiteboard
— casual, clear, educational. No photographic elements. Flat 2D illustration
style. 4K quality, sharp lines.
```

---

#### Style A: Analogy Flat Illustration
**When to use**: Concept explainers, "what is X", comparisons, abstract AI topics
that need a relatable real-world parallel to make them easy to understand
**Feel**: Clean, modern, approachable — like a well-designed editorial illustration
that makes a complex idea click instantly
**Core idea**: The infographic pairs an AI concept with a familiar real-world
analogy (e.g., RAG = a librarian who finds books for you, AI hallucination =
a confident student making things up, fine-tuning = training an experienced chef
on a new cuisine). The visual shows both the analogy scene and the AI concept
in a top/bottom split layout, with clean labels bridging the two worlds.
**Key elements**: Flat design, bright meaningful colours, clear icons or simple
illustrated characters, bold headline, short bridging labels like "just like..."
or "think of it as...", clean white or light background

**Prompt pattern**:
```
Clean flat illustration infographic (portrait 4:5): "[HEADLINE]". Top/bottom
split layout. Top half: a simple illustrated scene showing [REAL-WORLD ANALOGY
SCENE — e.g., a librarian pulling books from shelves]. Bottom half: the same
concept applied to AI — [AI CONCEPT SCENE — e.g., an AI retrieving documents
from a database]. Bold connecting label in the centre: "[BRIDGING PHRASE — e.g.,
RAG works the same way]". Bright meaningful colours — [choose 2-3 colours that
suit the mood]. Flat vector illustration style, clean bold outlines, simple
readable icons. Bold title at top: [HEADLINE]. Short caption at bottom: [ONE
SENTENCE TAKEAWAY]. No photography, pure illustration. 4K quality.
```

**Example analogies to draw from:**
- RAG = librarian who fetches books before answering
- AI hallucination = confident student who makes up answers
- Fine-tuning = training an experienced chef on a new cuisine
- Prompt engineering = giving clear instructions to a new employee
- AI agents = a manager delegating tasks to a team
- Vector embeddings = organising books by topic, not just title
- Context window = a person's short-term memory during a meeting
- LLM training = a student reading millions of textbooks before an exam

---

#### Style M: Manga / Comic Panel
**When to use**: Story-based topics, before/after scenarios, "what happens when
you use AI" narratives, relatable everyday struggles, funny/relatable takes on
tech concepts
**Feel**: Engaging, entertaining, shareable — comic strip teaching format
**Layout**: Always 4-panel vertical (portrait 4:5), top-to-bottom story flow
**Color**: Can be black and white with accent colour OR full meaningful colour.
Choose colour when it adds emotional clarity or energy to the story. Use B&W
for stark, punchy contrast. Default to colour for upbeat or motivational topics,
B&W for dramatic before/after contrasts.

**Prompt pattern**:
```
4-panel vertical manga-style comic infographic (portrait 4:5) about [TOPIC].
[COLOUR CHOICE: "Black and white with yellow accent highlights" OR "Full colour
with meaningful vibrant palette — [describe mood: warm/cool/energetic/calm]"].
Bold black panel borders with clean white gutters. Style: modern educational
manga, expressive characters, clean line art. Each panel progresses the story:
Panel 1: [SETUP — introduce the problem or situation]
Panel 2: [CONFLICT — show the struggle or old way]
Panel 3: [SOLUTION — introduce AI or the new approach]
Panel 4: [RESULT — show the positive outcome or punchline]
Speech bubbles with short punchy dialogue. Bold headline above panels: [HEADLINE].
Clean crisp digital manga art style. 4K quality.
```

---

## PART 2: Prompt Crafting

### Step 2: Craft the Final Prompt

Use the style patterns above. Always include:

1. **Style declaration** — state the style explicitly at the start
2. **Topic** — the specific AI/tech concept to explain
3. **Headline** — the title text that appears in the infographic
4. **Layout** — number of sections/panels and their arrangement
5. **Content outline** — what goes in each section
6. **Visual language** — specific colours, line style, icon types
7. **Quality closers** — "clean digital illustration, high contrast, sharp lines,
   no blurriness, 4K quality"

**No source photo needed** — these infographics are concept-only, no face input.
Set `image_input` to `[]` in the API call.

---

## PART 3: Generation Pipeline

### IMAGE GENERATION PRIORITY RULE

**This skill produces CONCEPT-ONLY infographics with no Edison face.** The Blotato-first
priority below is correct here. If a task requires Edison's face in the image, do NOT use
this skill — use `edison-content-image-creator` or `carousel-creator` instead (both route
to kie.ai first with `face_primary.blotato_url`).

**Always try Blotato first. Fall back to kie.ai only if Blotato fails or credits are exhausted.**

---

### Step 3A: Generate with Blotato (PRIMARY — use this first)

Use the `blotato_create_visual` MCP tool with the matching template ID for the chosen style:

| Style | Template ID | Notes |
|-------|-------------|-------|
| Whiteboard | `ae868019-820d-434c-8fe1-74c9da99129a` | Clean whiteboard AI image |
| Chalkboard | `fcd64907-b103-46f8-9f75-51b9d1a522f5` | Chalkboard-style AI image |
| Chalkboard (alt) | `d9495026-3945-44f6-8b44-07c28c492e6d` | Classroom chalkboard with teacher/students |
| Manga | `49c61370-a706-4b82-98f7-62d557d1c66d` | B&W manga panel infographic |

**Call:**
```
blotato_create_visual(
  templateId: "[template ID from table above]",
  inputs: {},
  prompt: "[crafted prompt from Step 2]",
  title: "infographic_[topic_slug]_[style]",
  render: true
)
```

Poll with `blotato_get_visual_status(id: "[creation ID]")` every 15-30 seconds (up to 5 minutes).
When `status` is `"done"`, use `imageUrls[0]` directly as the media URL for the post. No download needed.

**If Blotato returns `creation-from-template-failed` or any credit/quota error, go to Step 3B.**

---

### Step 3B: Generate with kie.ai Nano Banana Pro (FALLBACK — only if Blotato fails)

**All styles use `"4:5"` aspect ratio.**

```bash
curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer ${KIE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nano-banana-pro",
    "input": {
      "prompt": "[crafted prompt]",
      "image_input": [],
      "aspect_ratio": "4:5",
      "resolution": "2K"
    }
  }'
```

Returns a `taskId`.

---

### Step 4: Poll for kie.ai Result (fallback only)

Poll every 25-30 seconds. Typical wait: 60-180 seconds.

```bash
curl -s "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=[taskId]" \
  -H "Authorization: Bearer ${KIE_API_KEY}"
```

When `data.state` is `"success"`, get the URL from `data.resultJson.resultUrls[0]`.

---

### Step 5: Download and Save (kie.ai fallback only)

Save to the current session's Social Media Marketing folder:

```bash
curl -s -o "./generated/ Media Marketing/infographic_[topic_slug]_[style].jpg" \
  "[resultUrl]"
```

Upload to Blotato via `blotato_create_presigned_upload_url` before posting.

Use descriptive filenames like:
- `infographic_5_ai_tools_whiteboard.jpg`
- `infographic_what_is_rag_analogy.jpg`
- `infographic_ai_saves_time_manga.jpg`

Display to Edison using the Read tool for review.

---

## Quick Reference

| Style | Background | Key Colours | Best For | Ratio |
|-------|-----------|-------------|----------|-------|
| Whiteboard (W) | White | Black + orange/blue accents | Tips, steps, tools | 4:5 |
| Analogy (A) | White/light | Bright meaningful colours | Explainers, concepts, "what is X" | 4:5 |
| Manga (M) | White + black | B&W+accent OR full colour | Stories, before/after, scenarios | 4:5 |

**Rotation order: W → A → M → repeat. Never repeat the same style twice in a row.**

---

## Common Prompt Fixes

| Issue | Fix |
|-------|-----|
| Text garbled or unreadable | Reduce text, use only short labels — no long sentences |
| Too many details crammed | Limit to 4-6 sections max, each with 1-2 short bullet points |
| Style not consistent | Add: "consistent illustration style throughout, uniform line weight" |
| Analogy scenes not clearly connected | Add: "bold centre label connecting both halves, clear visual bridge" |
| Manga panels blending together | Add: "bold thick black panel borders, clean white gutter between panels" |
| Icons look too generic | Add: "hand-drawn doodle icons, imperfect slightly wobbly lines" |
| Colour feels random or muddy | Specify exact mood: "warm earthy tones" or "cool blue and green palette" |

---

## Example Prompts

### Whiteboard — "5 AI Tools to Save Time"
```
Whiteboard-style hand-drawn infographic (portrait 4:5): "5 AI Tools That Save
You Time". Clean white background, bold black marker strokes, orange and blue
accents. 5 sections in a vertical grid layout. Each section: a simple hand-drawn
icon + short bold title + 1 sentence description. Sections: 1) ChatGPT (chat
bubble icon), 2) Perplexity (search icon), 3) Notion AI (document icon), 4)
Otter.ai (microphone icon), 5) Canva AI (palette icon). Large bold hand-lettered
title at top. Warm, casual, teacher-on-whiteboard educational feel. Clean 2D flat
digital illustration, no photography. Sharp lines, 4K quality.
```

### Analogy — "What is RAG?"
```
Clean flat illustration infographic (portrait 4:5): "What is RAG?". Top/bottom
split layout. Top half: a cheerful illustrated librarian pulling a specific book
from a large shelf of organised books, label reads "You ask a question...". Bottom
half: an AI interface pulling a relevant document from a database grid, label
reads "...RAG finds the right info first". Bold centre connecting label:
"RAG = AI with a librarian". Bright colours: warm orange for the library scene,
cool blue for the AI scene. Flat vector illustration, clean bold outlines. Bold
title at top: "What is RAG?". Caption at bottom: "Better retrieval = smarter AI
answers". No photography. 4K quality.
```

### Manga — "Before vs After Using AI as a VA"
```
4-panel vertical manga-style comic infographic (portrait 4:5): "Before vs After
AI as Your VA". Full colour with warm energetic palette — orange stress tones in
early panels, bright cheerful greens and blues in later panels. Bold black panel
borders, white gutters. Style: modern educational manga, expressive characters,
clean line art.
Panel 1: Overwhelmed office worker buried in paper, stressed expression, speech
bubble "I have 200 emails to sort!".
Panel 2: Same worker slumped at desk, clock showing late hours, thought bubble
showing pile of tasks.
Panel 3: Worker types into AI chat interface, confident expression, AI responds
with a checklist.
Panel 4: Worker relaxing with coffee, tasks ticked off on screen, big smile,
speech bubble "Done in 5 minutes!".
Bold headline above panels: "YOUR AI VA IN 4 PANELS". Clean crisp digital manga
art style. 4K quality.
```

---

## Engagement Routine

Infographic posts that end with "comment for more" or promise additional tips in the comments
are covered by the shared `comment-engagement-responder` skill (hourly). Store any PDF/Drive
links tied to the post under the relevant platform map in `rotation-state.json` before
publishing so the responder can deliver them on demand.
