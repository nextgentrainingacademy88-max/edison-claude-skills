---
name: Always use the skill's prompt template verbatim — never improvise
description: When a skill has a documented prompt template for a slide/image type, use it exactly, fill in variables against it — do not write prompts from scratch
type: feedback
originSessionId: 42f8fa17-a57a-4d1d-903e-8d50449b4999
---
**HARD RULE:** When generating any image, infographic, carousel slide, or thumbnail,
FIRST re-read the exact prompt template for that asset type from the relevant skill file,
then fill in the variables against the template. NEVER write a prompt from scratch when
the skill already defines one.

**Why:** On 2026-04-22, during a 6-image test generation for the Claude Opus 4.7 topic,
the carousel-creator skill had a precise cover slide spec (lines 235-286):
- VIBRANT solid flat color background (not dark navy)
- MANDATORY large white glowing circle behind Edison
- Topic-matched outfit with props (detective + magnifying glass, fishing rod, etc.)
- Specific title/subtitle/bottom-left-name layout

Instead of re-reading that section and filling in variables, I wrote a generic prompt
from memory using dark navy background with Edison on the right — completely missing the
white circle, missing the topic-matched outfit, missing the vibrant flat color rule.
The skill file was right there in local + GitHub, I just didn't consult it.

**Applies equally to:**
- `carousel-creator` — Cover Slide (Type A), Content Slides (Type B-E), CTA Slide
- `edison-content-image-creator` — Workshop Action, Real Classroom, YouTube Thumbnail Y1/Y2/Y3
- `edison-infographic-creator` — Whiteboard (W), Analogy (A), Manga (M) styles
- `facebook-content-creator` — Types 1-8, especially Type 8 Kanji-style and pin-comment images
- `threads-x-content-creator` — X MrBeast thumbnail, Threads infographic

**How to apply:**
1. Identify which skill handles the asset.
2. Open the skill file at `.staging/<skill>/SKILL.md`.
3. Find the exact section for that asset type (grep for "Cover Slide", "Type 8", "Whiteboard", etc.).
4. Copy the prompt template verbatim.
5. Fill in the topic-specific variables only (headline, outfit, prop, hex color).
6. DO NOT add or remove structural elements the template specifies.
7. If the template says "mandatory" for a visual element (like the white glowing circle),
   include it without exception.

**Enforce before every generation run:** mentally check "did I read the template section
from the skill file for THIS specific image type?" If no, go back and read it.
