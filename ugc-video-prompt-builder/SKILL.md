---
name: ugc-video-prompt-builder
description: >
  Transform simple video ideas into fully structured, cinematic, one-paragraph prompts
  ready for Seedance 2.0, Sora, or any AI video generator. Use this skill whenever
  Edison (or a user) wants to generate a video prompt — even if they just describe
  a scene casually. Trigger on phrases like: "write a video prompt", "create a prompt for",
  "make a Seedance prompt", "UGC video prompt", "TikTok video prompt", "cinematic scene
  prompt", "turn this idea into a video prompt", or any request involving AI video
  generation. Always trigger even if the user only gives a one-line idea — this skill
  expands it into a full structured prompt. Works for UGC, TikTok-style, cinematic,
  commercial, documentary, hybrid, and vlog formats.
---

# Video Prompt Builder (UGC / Cinematic)

Transforms any simple idea into a fully structured, one-paragraph, AI video-ready prompt.
Default output target: **Seedance 2.0** (also compatible with Sora, Kling, Hailuo, etc.)

---

## Step 1: Extract the Idea

Read the user's input. It can be as short as one sentence. Extract:

- Who or what is the subject
- What is happening (action, emotion, situation)
- What vibe or format they want (UGC, cinematic, TikTok, documentary, etc.)
- Any location, time of day, or environment clues

If the idea is too vague (no subject, no action, no vibe), ask ONE clarifying question max before proceeding.

---

## Step 2: Fill the Master Template

Use the structure below internally to plan the prompt. Do NOT output this as a list or bullet format — it is your drafting scaffold only.

```
[TITLE — Hook Name]

Audience locale and tone note
Reference images (if any)
Subject type and description
Key features: environment, props, wardrobe, motion, imperfections
Lighting: source, direction, softness, contrast, exposure
Grade: color palette, contrast, saturation, grain, realism vs stylized
Visual taste: UGC / vlog / documentary / cinematic / commercial / anime / hybrid
Background/Location: specific place, time of day, weather, environment
Camera: selfie / handheld / tripod / tracking; shake level; framing; imperfections
Lens/Focus: lens type; depth of field; autofocus behavior; imperfections
Coverage: continuous take / jump cuts / inserts; pacing
Persist: elements that must stay consistent across the scene

BGM: genre, tempo, mood
SFX: environment sounds, Foley, realism details
Audio cues: timestamps + key events

Dialogue / VO lines (if any): [timestamp] "spoken line"
```

---

## Step 3: Apply UGC Boost (for TikTok / UGC / raw vibe outputs)

When the user's vibe is UGC, TikTok, raw, or chaotic — add at least 2 of these realism elements into the final prompt:

- auto-exposure shifts
- awkward reframing
- partial face crop
- wind noise or mic clipping
- lens smudges or droplets
- background interruptions
- unscripted pauses or laughter

For cinematic or commercial outputs, skip the UGC boost.

---

## Step 4: Write the Final Prompt

Output the prompt as **ONE paragraph only**. Rules:

- No bullet points
- No section headers in the output
- No line breaks between sections — all flows as one paragraph
- Language is cinematic and structured throughout
- Include ALL sections (visual, camera, audio, grade, motion, consistency rules)
- Keep it between 150 and 300 words
- End with a production style note (e.g., "Shot to feel like a 2024 viral TikTok, not an ad.")

---

## Pro Tips (apply these during drafting)

- Prefer specific actions over general vibes ("she slams the cup down" beats "she looks frustrated")
- Add motion to every scene (walking, turning, reacting, wind in hair, rain on lens)
- Pair emotion with body language ("he laughs mid-sip, spilling slightly")
- Environment should feel alive: traffic, crowd murmur, wind, rain, ambient noise
- Imperfections = realism — especially for TikTok and UGC outputs
- Always include a visual consistency rule at the end ("lighting and subject wardrobe must remain consistent throughout")

---

## Output Format

Return exactly two things:

1. A short line with the title (e.g., **Prompt: "Rain Rant — Chaotic TikTok"**)
2. The full one-paragraph prompt below it

Nothing else. No explanations. No breakdowns. The paragraph should be ready to paste directly into Seedance 2.0 or any AI video tool.

---

## Example

**Input:** "guy ranting in the rain, selfie, chaotic TikTok vibe"

**Output:**

**Prompt: "Rain Rant — Chaotic TikTok"**

Mid-20s Malaysian man standing outside a mamak stall at night, soaked to the chest, holding his phone in selfie mode and ranting directly into the camera with exaggerated frustration; locale: Kuala Lumpur, Malaysia; tone: chaotic, raw TikTok UGC. Subject wears a drenched plain white tee, hair matted to forehead, water dripping off chin; background shows blurred neon signage, passing motorcycles, and shallow puddles reflecting orange streetlight. Lighting is mixed practical — harsh overhead fluorescent from the stall spilling onto his face, with warm amber pollution glow from the street; exposure fluctuates naturally as clouds shift. Color grade is desaturated with a slight cool teal push, high contrast, light film grain, realistic and gritty. Camera is handheld selfie, constant micro-shake, periodic awkward reframing as he gestures wide; lens occasionally smudges from rain droplets hitting the front element; autofocus hunts briefly when he leans forward. Coverage is one continuous take with no cuts. BGM is absent — full ambient audio only: rain on pavement, distant motorbike engines, faint mamak crowd noise, wind interference on the mic. Subject speaks in casual Malay-English mix: [0:02] "Bro, I told them la — THREE TIMES" followed by unscripted laughter and a head shake. Auto-exposure shifts twice as a motorbike headlight sweeps across frame. Wardrobe and lighting must remain consistent throughout. Shot to feel like a genuine accidental TikTok viral moment, not a produced video.
