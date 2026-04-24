---
name: Use viral prompt structure, never freestyle
description: Every AI image prompt Edison ships MUST be built from a proven viral prompt structure sourced from Reddit / Twitter / Threads / Instagram / prompt libraries. Copy the anatomy (camera, subject, composition, lens, lighting, style, tech specs, face clause, constraints), then only swap variables. No from-scratch prose.
type: feedback
---

# Use viral prompt structure, never freestyle

**Rule:** Every AI image prompt ships using the exact STRUCTURE of a prompt that has already gone viral (>500 likes on Reddit, >100 replies on Threads, >1k RTs on X, or pulled from `nano-banana-pro-prompts-recommend-skill`'s 10,000-prompt library). Fill in variables. Do NOT write original prompt prose.

**Why:** Free-form prompts produce mid-tier images. Viral prompts are over-engineered — they hit the model's best response patterns (specific camera / lens / lighting / composition cues) and consistently generate save-worthy results. Copying the structure lets Edison ride proven performance.

**How to apply:**

1. Start every image generation by answering: "Which existing viral prompt has the closest structure to what I need?"
   - Check `memory/project_pop_culture_prompts.md` (7 angles, each with its own vetted prompt)
   - Check `nano-banana-pro-prompts-recommend-skill` (10,000+ prompts)
   - Check `memory/project_kanji_style_facebook.md`
   - If nothing fits, scrape fresh viral prompts from Reddit r/ChatGPT / r/midjourney (hot, last 7 days), Threads "gpt image 2 hot", Twitter @nickfloats @javilopen @icreatelife @GuizangHei
2. Copy the ENTIRE structure of the closest match.
3. Swap variables only:
   - Subject → Edison's face (if face-required) or the target product/tool (if face-free)
   - Scene / setting → today's topic
   - Colors / tagline → Edison's brand (navy #0A1628 + yellow #FFD700, "Edison Chua" / "AI Marketing Strategist")
4. Save the filled-in prompt to the angle's section in `memory/project_pop_culture_prompts.md` for future reuse and attribution.

## The 10-part viral prompt anatomy (always present in high-performing prompts)

1. **Shot type / aspect** — "Ultra-realistic 9:16 vertical fisheye selfie", "Cinematic 4:5 portrait", "Wide-angle hero shot 16:9"
2. **Subject (+ identity clause)** — "of me (face as per uploaded reference)", "of Edison Chua", "of a 3D Claude logo"
3. **Interaction / pose / action** — "making silly, exaggerated faces", "holding a glowing logo above his palm", "leaning forward, mouth open in surprise"
4. **Setting / scene** — "small, bright living room with white tones", "on the F1 grid at Monaco at sunset", "rain-slicked neon-lit cyberpunk megacity"
5. **Camera angle** — "high camera angle", "low-angle hero shot", "eye-level intimate framing"
6. **Lens / distortion** — "extreme fisheye distortion", "shot on 85mm", "tilt-shift miniature look"
7. **Lighting** — "realistic cinematic lighting", "dramatic rim lighting", "warm golden-hour light with lens flare"
8. **Style / era modifiers** — "photorealistic", "Pixar 3D", "Studio Ghibli", "MrBeast YouTube thumbnail aesthetic", "1980s Miami neon"
9. **Technical fidelity specs** — "8K", "ultra sharp", "photorealistic, high contrast", "shallow depth of field"
10. **Face-preservation clause (face-required only)** — "Preserve exact facial features from the reference photo (young Asian man, black hair, slim build, warm confident smile)."
11. (Constraint line) — "No em dashes. No extra text beyond what is specified."

Every prompt you write must have items 1, 2, 3, 4, 7, 9, 11 at minimum. Items 5, 6, 8 are the accelerators that separate "decent" from "viral".

## Where this rule applies

- Every Facebook Type 8 + Type 8a-8e image (facebook-content-creator)
- Every LinkedIn carousel cover + content slide + CTA (carousel-creator)
- Every Threads Kanji-style image (threads-x-content-creator)
- Every X MrBeast thumbnail (threads-x-content-creator)
- Every Instagram carousel (carousel-creator)
- Every pop-culture prompt showcase post (`memory/project_pop_culture_prompts.md` — bucket #4)
- Every edison-content-image-creator output

Exception: none. If you can't find a viral prompt structure that fits, SCRAPE ONE before writing. Delay beats freestyling.

## Red flags (stop and consult a viral source)

- You're about to write "a nice image of Edison holding..."
- You're about to describe an image in your own words without quoting a structure
- You're about to ship a prompt that's <150 words long
- You haven't named a camera / lens / lighting cue
- You have no identity-preservation clause when Edison's face should appear
