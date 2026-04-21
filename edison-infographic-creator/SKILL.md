---
name: edison-infographic-creator
description: >
  Edison Chua's infographic creation system for AI and tech topics. Creates
  visually engaging infographics using Nano Banana Pro in three distinct styles:
  whiteboard hand-drawn, chalkboard teacher style, and manga/comic panel.

  Trigger when Edison mentions: "create an infographic", "make an infographic
  about", "infographic on [topic]", "explain [AI/tech topic] as an infographic",
  "whiteboard infographic", "chalkboard style", "manga panel", "4-panel comic",
  or any request to visually explain an AI or tech concept as an educational image.

  This skill handles: searching the Nano Banana Pro prompt library, selecting
  the right style, crafting the prompt, generating via kie.ai Nano Banana Pro,
  and saving the result.
---

# Edison's Infographic Creator

## Overview

This skill creates educational infographic images on AI and tech topics using
three rotating visual styles. It does NOT require Edison's face — these are
concept-first, education-first visuals. The content is the hero.

---

## PART 1: Style Selection

### Step 1: Ask for the Topic (if not provided)

If Edison hasn't specified a topic, ask:
- What is the topic? (e.g., "5 AI tools to replace your VA", "How RAG works",
  "ChatGPT vs Claude", "3 ways AI saves time")
- Any preference on style? (whiteboard / chalkboard / manga — or auto-select)

If no style preference, auto-select based on topic:
- **Step-by-step / how-to / numbered tips** → Whiteboard style
- **News summary / concept explainer / "what is X"** → Chalkboard style
- **Story-based / before-after / scenario** → Manga/comic panel style

---

### Style Guide

#### Style W: Whiteboard Hand-Drawn
**When to use**: How-to guides, numbered tips, step-by-step processes, tool comparisons
**Feel**: Casual, educational, relatable — like a teacher drew it live
**Reference**: Charlie Hill whiteboard infographic style — multi-panel grid,
hand-drawn icons, marker-style text, coloured arrows, light warm white bg
**Key elements**: Black marker lines, coloured accent highlights (orange, blue,
yellow), hand-lettered titles, simple stick-figure or icon illustrations, grid
layout with 4-8 sections

**Prompt pattern**:
```
Whiteboard-style hand-drawn infographic about [TOPIC]. Clean white background,
bold black marker strokes, coloured accent highlights in [orange/blue/yellow].
[NUMBER] sections arranged in a grid layout. Each section has a simple hand-drawn
icon, a short bold hand-lettered title, and 1-2 bullet points in neat marker
handwriting. Title at the top reads: [HEADLINE]. The overall feel is a teacher
explaining concepts on a whiteboard — casual, clear, educational. No photographic
elements. Flat 2D illustration style.
```

---

#### Style C: Chalkboard Teacher
**When to use**: Concept explanations, AI news summaries, "what is X", definitions,
comparisons, anything where Edison is "teaching" a concept
**Feel**: Academic, warm, authoritative — like a professor's blackboard
**Reference**: Charlie Hill chalkboard infographics — dark green/black bg,
chalk-white and coloured chalk text, hand-drawn diagrams, annotations with arrows
**Key elements**: Deep green or near-black background, chalk-white text and
diagrams, coloured chalk accents (yellow, orange, pink, light blue), drawn boxes
and underlines, hand-lettered titles, annotated arrows connecting ideas

**Prompt pattern**:
```
Chalkboard-style educational infographic about [TOPIC]. Dark green chalkboard
background, chalk-white hand-drawn text and diagrams, coloured chalk accents in
yellow and light blue. Topic: [HEADLINE]. Layout includes: [describe sections —
e.g., definition top left, 3 key points centre, diagram on right]. Hand-drawn
arrows connecting concepts, chalk-style doodle icons, occasional underlines and
stars for emphasis. Warm, educational teacher-on-blackboard atmosphere. No
photography, pure chalk illustration.
```

---

#### Style M: Manga / Comic Panel
**When to use**: Story-based topics, before/after scenarios, "what happens when
you use AI" narratives, relatable everyday struggles, funny/relatable takes on
tech concepts
**Feel**: Engaging, entertaining, shareable — comic strip teaching format
**Reference**: Charlie Hill manga 4-panel strips — black and white with yellow
accents, bold panel borders, expressive character (can be Edison-inspired),
speech bubbles, action lines, clear panel progression
**Layout options**:
- **4-panel vertical** (portrait 4:5 or 9:16) — top-to-bottom story flow
- **6-panel grid** (landscape 16:9 or square 1:1) — 2x3 or 3x2 layout

**Prompt pattern**:
```
[4-panel vertical / 6-panel grid] manga-style comic infographic about [TOPIC].
Black and white with yellow accent highlights. Bold panel borders with clean
white gutters. Style: modern educational manga, expressive characters, clean
line art. Each panel progresses the story: [Panel 1: setup / Panel 2: conflict
or problem / Panel 3: solution or tool / Panel 4: result or punchline]. Speech
bubbles with short punchy dialogue. Topic headline at top: [HEADLINE]. No
photographic elements. Clean crisp digital manga art style.
```

---

## PART 2: Prompt Crafting

### Step 2: Search the Nano Banana Pro Library

Before writing the final prompt, search these categories for style inspiration:

**Infographic styles** (519 prompts):
```bash
curl -s "https://raw.githubusercontent.com/YouMind-OpenLab/nano-banana-pro-prompts-recommend-skill/main/references/infographic-edu-visual.json" \
  -o /tmp/infographic.json

python3 -c "
import json
with open('/tmp/infographic.json') as f:
    data = json.load(f)
keywords = ['whiteboard', 'chalkboard', 'hand-drawn', 'chalk', 'diagram', 'tips']
for item in data:
    if any(k in item.get('content','').lower() or k in item.get('title','').lower() for k in keywords):
        print(f'ID:{item[\"id\"]} | {item[\"title\"]}')
        print(item.get('content','')[:200])
        print()
"
```

**Comic/manga styles** (357 prompts):
```bash
curl -s "https://raw.githubusercontent.com/YouMind-OpenLab/nano-banana-pro-prompts-recommend-skill/main/references/comic-storyboard.json" \
  -o /tmp/comic.json

python3 -c "
import json
with open('/tmp/comic.json') as f:
    data = json.load(f)
keywords = ['manga', 'panel', '4-panel', 'comic strip', 'educational']
for item in data:
    if any(k in item.get('content','').lower() or k in item.get('title','').lower() for k in keywords):
        print(f'ID:{item[\"id\"]} | {item[\"title\"]}')
        print(item.get('content','')[:200])
        print()
"
```

**Key reference prompts to study:**
- ID:509 — Chalkboard-style AI news summary (exact chalkboard template)
- ID:498 — Hand-drawn style header image from photo
- ID:13133 — Diagram Style Prompts (5 creative diagram formats)
- ID:13276 — Manga page prompt for Nano Banana Pro
- ID:12935 — Four-Panel Manga (full scene-by-scene breakdown format)

---

### Step 3: Craft the Final Prompt

Combine the library learnings with the style pattern. Always include:

1. **Style declaration** — state the style explicitly at the start
2. **Topic** — the specific AI/tech concept to explain
3. **Headline** — the title text that appears in the infographic
4. **Layout** — number of sections/panels and their arrangement
5. **Content outline** — what goes in each section (Claude fills in the actual
   content based on the topic)
6. **Visual language** — specific colours, line style, icon types
7. **Quality closers** — "clean digital illustration, high contrast, sharp lines,
   no blurriness, 4K quality"

**No source photo needed** — these infographics are concept-only, no face input.
Set `image_input` to `[]` in the API call.

---

## PART 3: Generation Pipeline

### Step 4: Generate with kie.ai Nano Banana Pro

```bash
curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer ${KIE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nano-banana-pro",
    "input": {
      "prompt": "[crafted prompt]",
      "image_input": [],
      "aspect_ratio": "[chosen ratio]",
      "resolution": "2K"
    }
  }'
```

**Aspect ratios by style:**
- Whiteboard grid → `"1:1"` (square) or `"16:9"` (landscape)
- Chalkboard → `"4:5"` (portrait) or `"1:1"` (square)
- Manga 4-panel → `"4:5"` (portrait) or `"9:16"` (vertical)
- Manga 6-panel → `"16:9"` (landscape) or `"1:1"` (square)

Returns a `taskId`.

---

### Step 5: Poll for Result

Poll every 25-30 seconds. Typical wait: 60-180 seconds.

```bash
curl -s "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=[taskId]" \
  -H "Authorization: Bearer ${KIE_API_KEY}"
```

When `data.state` is `"success"`, get the URL from `data.resultJson.resultUrls[0]`.

---

### Step 6: Download and Save

```bash
curl -s -o "/sessions/jolly-brave-ride/mnt/Edison Chua photos/infographic_[topic_slug]_[style].jpg" \
  "[resultUrl]"
```

Use descriptive filenames like:
- `infographic_5_ai_tools_whiteboard.jpg`
- `infographic_chatgpt_vs_claude_chalkboard.jpg`
- `infographic_ai_saves_time_manga.jpg`

Display to Edison using the Read tool for review.

---

## Quick Reference

| Style | Background | Key Colours | Best For | Ratio |
|-------|-----------|-------------|----------|-------|
| Whiteboard | White | Black + orange/blue accents | Tips, steps, tools | 1:1 or 16:9 |
| Chalkboard | Dark green | Chalk white + yellow | Explainers, news, concepts | 4:5 or 1:1 |
| Manga | White + black | B&W + yellow | Stories, before/after, scenarios | 4:5 or 9:16 |

---

## Common Prompt Fixes

| Issue | Fix |
|-------|-----|
| Text garbled or unreadable | Reduce text, use only short labels in prompt — no long sentences |
| Too many details crammed | Limit to 4-6 sections max, each with 1-2 short bullet points |
| Style not consistent | Add: "consistent illustration style throughout, uniform line weight" |
| Background not dark enough (chalkboard) | Add: "very dark forest green chalkboard texture, near black" |
| Manga panels blending together | Add: "bold thick black panel borders, clean white gutter between panels" |
| Icons look too generic | Add: "hand-drawn doodle icons, imperfect slightly wobbly lines" |

---

## Example Prompts

### Whiteboard — "5 AI Tools to Save Time"
```
Whiteboard-style hand-drawn infographic: "5 AI Tools That Save You Time".
Clean white background, bold black marker strokes, orange and blue accents.
5 sections in a grid layout. Each section: a simple hand-drawn icon + short
bold title + 1 sentence description. Sections: 1) ChatGPT (chat bubble icon),
2) Perplexity (search icon), 3) Notion AI (document icon), 4) Otter.ai
(microphone icon), 5) Canva AI (palette icon). Large bold hand-lettered title
at top. Warm, casual, teacher-on-whiteboard educational feel. Clean 2D flat
digital illustration, no photography. Sharp lines, 4K quality.
```

### Chalkboard — "What is RAG?"
```
Chalkboard-style educational infographic: "What is RAG? (Retrieval Augmented
Generation)". Deep green chalkboard texture background. Chalk-white text and
diagrams with yellow and light blue chalk accents. Layout: bold title top centre,
simple definition in a chalk box, then a hand-drawn flow diagram showing 3 steps:
User Query → Knowledge Base → AI Response. Arrows in yellow chalk connecting
steps. Simple chalk doodle icons. Footer text: "RAG = smarter AI answers".
Hand-drawn, imperfect chalk style, warm academic classroom atmosphere. No
photography. 4K quality.
```

### Manga — "Before vs After Using AI as a VA"
```
4-panel vertical manga infographic: "Before vs After AI as Your VA".
Black and white with yellow accent highlights. Bold black panel borders, white
gutters. Panel 1: Overwhelmed person at desk, piles of paper, speech bubble
"I have 200 emails to sort!". Panel 2: Person types into laptop with AI chat
interface visible. Panel 3: AI lists tasks in chat — "Done: 12 emails sorted,
3 meetings scheduled, 2 docs summarised". Panel 4: Person relaxing, coffee in
hand, thumbs up — speech bubble "AI does it in 5 minutes". Bold headline above:
"YOUR AI VA IN 4 PANELS". Clean digital manga art, expressive simple characters.
```
