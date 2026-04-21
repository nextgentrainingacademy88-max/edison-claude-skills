---
name: ai-ad-lab-ugc
description: Use this skill to generate AI UGC ad scripts for DTC brands. Trigger when a user provides a Voice of Customer document, Brand DNA document, and/or product image and asks for UGC scripts, AI UGC ads, or video ad scripts. Also trigger on commands like /ugc, /ugc scripts, /create ugc, /ai ugc, or when the user says they want talking-head scripts, UGC video ads, or Kling video scripts for a product. This skill generates 3 fully written AI UGC scripts — each with a different angle, awareness stage, and script format — with 3 hooks per script (1 primary hook scene + 2 alternative hook lines). Every line is written to sound like natural spoken human speech, never like written ad copy. Output is production-ready and formatted for downstream AI video generation (ai-ad-lab-ugc-video skill, Kling 3.0, HeyGen, Arcads, etc.).
---

# The AI Ad Lab — AI UGC Script Generator

This skill generates 3 complete, production-ready AI UGC ad scripts from the user's inputs.
The scripts are then pasted into a separate AI video generation skill that turns them into AI UGC ads — so **the dialogue lines in every script are actually going to be spoken out loud by an AI voice**. If the lines are written like ad copy, the AI voice will sound like a robot reading ad copy. That is the single failure mode this skill is designed to avoid.

Think internally through all phases — but only output the final deliverable.

---

## THE PRIME DIRECTIVE — READ THIS FIRST, EVERY TIME

**Every line of dialogue in every script must sound like real, natural human speech — not written ad copy.** Not a single exception.

Before doing anything else, load and internalize `references/Natural_Speech_Rules.md`. That file is the most important file in this skill. It contains the 12 rules of natural UGC speech and ~30 before/after examples of robot lines vs. human lines.

The rules in that file are not suggestions. They are enforced in the naturalization pass (Phase 4.5) and the naturalness check (part of Phase 5). Scripts that fail the naturalness check get rewritten, not shipped.

**The single biggest mistake to avoid:** taking phrases directly out of the VOC document and stuffing them into hook patterns. VOC gives you the *emotion* customers feel. Use that emotion to write a line a real person would say. Do not paste VOC keywords into hook templates. That is the robot-output trap.

---

## What This Skill Produces

Scripts designed for fully AI-generated video. No human filming required.
Every scene, B-roll instruction, and visual hook is chosen because AI video can reliably generate it.
Every line of spoken dialogue is written for the ear, not the eye.

The primary tools these scripts target (via the downstream ai-ad-lab-ugc-video skill):
- **Talking head / A-roll:** Kling 3.0, HeyGen, Arcads
- **Product B-roll:** Kling 3.0, Veo 3, Runway Gen-4.5
- **Assembly:** CapCut, Premiere, or any timeline editor

---

## Required Inputs

The user must provide:
1. **Voice of Customer (VOC) document** — customer language, pain points, objections, desires
2. **Brand DNA document** — brand personality, tone, positioning, claims
3. **Product image** — used to understand the product visually

Optional overrides the user may provide:
- Specific angle to force
- Specific script format to force
- Specific offer or CTA to include
- Target platform (TikTok / Meta Reels / Meta Feed / YouTube Shorts)
- Target awareness stage
- Competitor context
- Special claims or proof points

If the user hasn't provided required inputs, ask for them before proceeding.

---

## Internal Workflow (Do Not Show in Output)

Work through these phases silently. Only the final output is shown.

### Phase 1 — Read and Extract (Emotion-First)
- Read the VOC document. Do NOT extract phrases to copy-paste. Extract **emotions, feelings, sentiments, frustrations, and desires** that customers express. The VOC is a window into how they *feel*, not a dictionary of exact words to reuse.
- Read the Brand DNA document: extract tone of voice, positioning, key claims, differentiators
- Understand the product from the image: what it is, how it works, who it's for

### Phase 2 — Detect and Infer
From the inputs, determine:
- **DTC category** → use `references/DTC_Category_Angle_Playbook.md` to guide angle selection
- **Best awareness stage** for this brand/product (unless user forces one)
- **Emotional drivers** (from VOC feelings, not VOC keywords)
- **Key objections** (from VOC feelings, not VOC keywords)
- **Winning angle territories** (3 distinct angles from approved angle types only)

### Phase 3 — Generate 3 Angles
Select 3 distinct angles from the approved angle types in `references/Angle_Library_Expanded.md`.
- Each angle must use a different angle type
- Each angle must target the right awareness stage (or the one forced by the user)
- Each angle must use a different emotional arc (see `references/Script_Pacing_Guide.md`)

### Phase 4 — Build 3 Script Drafts (Structure First)
For each angle, draft a script with structure in place:
1. Select a script format from `references/UGC_Script_Formats_Expanded.md` — Format 1 (Fast DR) must always be one of the 3 chosen
2. Build the hook scene using a hook pattern from `references/UGC_Hook_Library_150.md` + a visual hook from `references/Visual_Hook_Library.md` — only use hooks from the AI-generatable section. **Treat hook patterns as shapes, not fill-in-the-blank templates** (see `references/Natural_Speech_Rules.md` section "The Hook Pattern Translation Move").
3. Draft 2 alternative hook lines (same visual scene, different verbal delivery — each a genuinely different angle of attack, not a keyword swap of the first)
4. Draft the full base script using the layout from `references/UGC_Script_Layout_Premium_Template.md`
5. For every talking-head scene, assign a home environment that fits the product, angle, and character — always a real room in a home (bedroom, bathroom, kitchen, living room, balcony, etc.). The environment must feel like authentic UGC, not a lifestyle or brand shoot. Vary the room between scripts when possible.
6. Select the CTA from `references/CTA_Library.md` matching the awareness stage (or use the forced CTA)
7. Apply pacing rules from `references/Script_Pacing_Guide.md`

At the end of Phase 4, you have 3 structurally complete script drafts. They may still sound written. That is what Phase 4.5 is for.

### Phase 4.5 — MANDATORY NATURALIZATION REWRITE PASS (Do not skip)

This is the phase that separates a shippable script from a robotic one. **Every single line of spoken dialogue** in all 3 scripts — including primary hooks, alternative hook lines, body scenes, B-roll voiceovers, and CTAs — must go through the 8-step rewrite pass from `references/Natural_Speech_Rules.md`:

1. **Read it as speech** — Does this sound like speech or like written text?
2. **Contraction check** — Any uncontracted forms? Contract them (I'm, you're, it's, don't, can't, haven't, I've, you'll).
3. **Buzzword check** — Any marketing words from the banned list (game-changer, revolutionary, unlock, elevate, transform your life, introducing, discover, premium, state-of-the-art, seamlessly, optimal results, cutting-edge, harness, moreover, furthermore, additionally)? Rewrite the entire line from scratch.
4. **Abstract check** — Any vague benefit claims ("feel better", "improved skin", "more energy")? Make them concrete and specific.
5. **Rhythm check** — Are all lines similar length? Vary them using complete clauses of different lengths (4 words, 11 words, 7 words, 14 words — all complete thoughts).
6. **STINGER CHECK (CRITICAL — #1 failure mode)** — Does any line end with a short 1–3 word fragment tacked onto a sentence that's already complete? ("...died on Meta. Two seconds." / "...for four days. Four.") If yes, delete the fragment or fold it naturally into the main clause. This must be zero across all 3 scripts. Not "fewer." Zero.
7. **Friend test** — Would you text this line to your best friend about a product you liked? If no, rewrite.
8. **Emotional authenticity** — Does this line sound like it came from a feeling, or from a VOC keyword list? If keyword list, rewrite from the feeling.

Additional rewrite moves during this pass:
- Add strategic contractions everywhere
- Add 1–2 mid-thought openers per script ("So —", "Honestly,", "Okay so —", "Look,") — but not more
- Add 2–3 filler words per script total (like, kind of, literally, honestly, I mean, basically) — not per line, per script
- **Vary line length deliberately using complete clauses** — short complete thoughts mixed with long complete thoughts. NEVER vary length by tacking fragments onto the ends of sentences for "punch." That is a written-ad trick and it is banned in this skill.
- Replace any abstract benefit claim with a concrete specific one
- Remove every adjective stack (e.g. "fast-absorbing, premium, clinically-tested") — one idea per line

After Phase 4.5, read each script silently as if a real person were saying it on their phone camera to a friend. If any line sounds like written copy — especially if any line ends with a punchy echo fragment — rewrite it. Do not move to Phase 5 until every line passes.

### Phase 5 — Final Quality Check (Internal)
Before outputting, verify every script against these rules:

**NATURALNESS CHECK (run first — highest priority):**
- [ ] Every spoken line passes the text-a-friend test
- [ ] Zero banned marketing words or phrases present anywhere in any script
- [ ] Contractions used wherever grammatically possible
- [ ] No uncontracted "I am / you are / it is / do not / cannot / will not / have not"
- [ ] No abstract benefit claims — all results described concretely
- [ ] No adjective stacks — every line is one clean thought
- [ ] Line lengths are varied within each script (not all 7–9 words) — varied using complete clauses of different lengths
- [ ] **ZERO cutoff-stinger fragments** — no line ends with a short 1–3 word fragment tacked onto an already-complete sentence ("...on Meta. Two seconds." / "...four days. Four."). This check must be zero. Any instance = rewrite the line.
- [ ] No VOC phrases copy-pasted into hook patterns — every hook is a rewritten, spoken version
- [ ] Each alternative hook line is a distinct angle of attack, not a keyword swap
- [ ] Every line, read aloud mentally, sounds like a real person talking to their phone camera — not written copy, not a press release, not a static ad

**TIMING CHECK:**
- [ ] Every scene has an estimated duration assigned — including all 3 hook options (primary + both alternatives)
- [ ] No single scene exceeds 8 seconds
- [ ] Total estimated duration is within 15–25 seconds
- [ ] Total estimated duration does NOT exceed 30 seconds
- [ ] If any scene is over 8s or total exceeds 25s — cut or split scenes before outputting
- [ ] All durations are whole numbers — no decimals like 0.5s or 3.5s

**ENVIRONMENT CHECK:**
- [ ] Every talking-head scene has a 🏠 Environment line
- [ ] Every environment is a real home setting — bedroom, bathroom, kitchen, living room, balcony, backyard, home desk, etc.
- [ ] No commercial sets, studios, gyms, branded backdrops, or outdoor public spaces
- [ ] Environment description includes: room type, background detail, lighting source, overall vibe — specific enough to Kling-prompt directly
- [ ] The space feels authentic and lived-in — slight imperfection, casual home feel, not staged

**TALKING HEAD:**
- [ ] One character only — no multi-person scenes
- [ ] No fast movement scripted — slow approach or static only
- [ ] Creator can hold product in a medium/wide shot — no close-up hand focus, no product manipulation

**B-ROLL:**
- [ ] Every B-roll shot is from the AI-reliable B-roll list (product beauty, lifestyle without hands, flat lay, texture close-up, nature/mood)
- [ ] No hands applying, opening, squeezing, or pouring anything
- [ ] No liquid pouring, cooking, fabric in dynamic motion
- [ ] No shots requiring readable text on packaging or screen
- [ ] If B-roll has a voiceover line, that voiceover line ALSO passes the naturalness check

**VISUAL HOOKS:**
- [ ] Only hooks from the AI-generatable section of the Visual Hook Library used
- [ ] No finger tap, unboxing, mirror shot, hand gesture, or chaotic burst-in scripted

**POST-PRODUCTION ITEMS:**
- [ ] Any text callout, caption, or number graphic is marked as post-production
- [ ] Any split screen or green screen composite is marked as post-production
- [ ] Before/after visuals are marked as post-production if used

**SCRIPT QUALITY:**
- [ ] Every hook uses an approved hook pattern (as a shape) — no invented patterns
- [ ] Every angle uses an approved angle type — no invented types
- [ ] CTA matches the awareness stage
- [ ] Every scene shows: what is said / how it is said / what we see / footage type
- [ ] Every scene is EITHER main footage OR B-roll — never both in the same scene
- [ ] No cuts within a single scene — if a cut is needed, it must be a new scene
- [ ] B-roll scenes always state voiceover (word-for-word) OR no voiceover (music only)
- [ ] CTA is always the final scene
- [ ] Tone matches Brand DNA, emotional register matches VOC sentiment (not VOC keywords)

If any NATURALNESS CHECK line fails, go back to Phase 4.5 and rewrite. Do not ship a script that sounds written. Ever.

---

## Timing Estimation System

Use these rules to estimate duration for every scene — including the primary hook and both alternative hook lines. Apply judgment. These are strong guidelines, not rigid laws.

### Formulas

| Line type | Formula |
|-----------|---------|
| Normal spoken line | `word_count × 0.5` |
| Hook line | `word_count × 0.375` |

- If the scene includes visual action (holding product, gesturing, moving, reacting, showing something on screen) → add **0.5s** before rounding
- Always round to the **nearest whole second**
- **Never output decimals** — every duration must be a whole number (e.g. 4s, not 3.5s)

### Examples

- "This is how we create AI UGC ads." → 8 words → 8 × 0.5 = 4s
- An 8-word hook line → 8 × 0.375 = 3s
- A normal 7-word line with visual action → (7 × 0.5) + 0.5 = 4.0 → **4s**
- A hook 9-word line with visual action → (9 × 0.375) + 0.5 = 3.875 → **4s**

### Judgment overrides

- If the estimated result feels unnatural for the actual line, delivery, or scene pacing → adjust to the nearest reasonable whole second
- Hooks are tighter and faster than normal lines
- Scenes with extra movement, product interaction, or visual emphasis may need more time even if word count is low
- Lines with natural pauses (ellipses, em-dashes, sentence fragments) may run slightly longer than pure word count — add 1s if the line has a clear pause moment

### Apply timing to ALL hook options

Every hook variant — the primary hook scene AND both alternative hook lines — must have its own estimated duration. Apply the hook formula to each alternative line independently.

---

## Output Format

Output exactly this structure — no preamble, no explanations, no internal reasoning shown.

```
---

ANGLE 1:
Angle name: [Name]
Angle type: [Approved angle type from library]
Angle statement: [One-sentence positioning statement — this is the internal concept, NOT a line to be spoken]
Awareness stage: [Stage name]
Script format: [Format name from library]
Emotional arc: [Arc type from pacing guide]
Visual hook for Scene 1: [Hook name + brief description of what we see]
Estimated total duration: [X seconds]

Scene 1 (Primary Hook) — Est. [X]s
🗣 Spoken line (word-for-word, natural speech):
(Emotion + speaking style)
🎥 Main Footage: [What we see — composition, angle, framing]
🏠 Environment: [Where the character is + what the space looks, feels, and is set up like — e.g. "Standing in a minimal white kitchen, morning light from a window to the left, clean counter behind her, no clutter, casual home feel"]
(AUDIO: sync talking to camera)

Alternative Hook Line 2 — Est. [X]s
🗣 Spoken line (word-for-word, natural speech):
(Emotion + speaking style)
🎥 Note: Same hook scene

Alternative Hook Line 3 — Est. [X]s
🗣 Spoken line (word-for-word, natural speech):
(Emotion + speaking style)
🎥 Note: Same hook scene

Base Script

Scene 2 — Est. [X]s
🗣 Spoken line (word-for-word, natural speech):
(Emotion + speaking style)

[CHOOSE ONE — delete the other:]
🎥 Main Footage: [What we see — composition, angle, framing]
🏠 Environment: [Where the character is, what the space looks like, what's in the background, lighting, mood — describe it as a Kling prompt would need it]
(AUDIO: sync talking to camera)

[OR:]
🎬 B-roll: [What we see — must be from AI-reliable list]
🔊 Background voice during B-roll: Voiceover (word-for-word, natural speech): [OR] No voiceover (music only)

[Repeat scene structure for all middle scenes — each scene is one type only]

Scene [X] (CTA) — Est. [X]s
🗣 Spoken line (word-for-word, natural speech):
(Emotion + speaking style)
🎥 Main Footage: Creator talking to camera
🏠 Environment: [Where the character is + space description]
(AUDIO: sync talking to camera)

---

ANGLE 2:
[Same structure]

---

ANGLE 3:
[Same structure]
```

**Note on the label "Spoken line (word-for-word, natural speech):"** — "word-for-word" means the line is locked and ready to be voiced by AI. "Natural speech" means it must read like speech, with contractions, rhythm, and no buzzwords. If the line reads like ad copy, rewrite it before output.

---

## Non-Negotiable Rules

**Naturalness rules (HIGHEST PRIORITY — these beat everything else):**
1. Every spoken line must pass the 8-step naturalization pass from `references/Natural_Speech_Rules.md`
2. **ZERO cutoff-stinger fragments** — no line may end with a short 1–3 word echo fragment appended to an already-complete sentence (e.g. "...died on Meta. Two seconds." / "...for four days. Four."). This is the #1 failure mode and it is banned outright. Vary line length using complete clauses of different lengths, never by tacking fragments onto sentence ends.
3. Zero banned marketing words or phrases anywhere in any script (game-changer, revolutionary, unlock, elevate, transform your life, introducing, discover, premium, state-of-the-art, seamlessly, optimal results, cutting-edge, harness, moreover, furthermore, additionally)
4. Contractions used wherever grammatically possible — no robotic full forms
5. VOC is used for EMOTION and SENTIMENT, never for literal keyword insertion
6. Hook patterns are SHAPES — translate every one into natural speech before writing it into a scene. Never leave `[brackets]` filled in verbatim.
7. Every line passes the text-a-friend test

**Script rules:**
8. All hooks must come from the approved hook pattern library — no invented patterns
9. All angles must come from the approved angle type library — no invented types
10. Every hook must have both a verbal hook AND a visual hook (from the AI-generatable section only)
11. The 2 alternative hook lines must use the same visual scene as the primary hook, but must each be a genuinely distinct verbal angle (not a keyword swap)
12. CTA must always be the final scene
13. Every scene must show: what is said / how it is said / what we see / footage type
14. Every scene is EITHER main footage OR B-roll — never both in the same scene
15. No cuts within a single scene — if a cut is needed, start a new scene
16. B-roll scenes must always state voiceover (word-for-word) OR no voiceover (music only)
17. Format 1 (Fast DR) must always be one of the 3 script formats selected
18. Tone must match Brand DNA, emotional register must match VOC sentiment
19. If the user forces an angle, format, or CTA — respect it and still produce all 3 scripts

**Timing rules (non-negotiable):**
20. Every scene must include an estimated duration — including both alternative hook lines
21. Use the Timing Estimation System formulas — hook lines use `word_count × 0.375`, normal lines use `word_count × 0.5`
22. Add 0.5s for any scene with visual action (holding product, gesturing, moving, reacting, showing on screen) before rounding
23. Always round to the nearest whole second — never output decimals
24. No single scene may exceed 8 seconds — split the scene if dialogue is longer
25. Total estimated duration must land within 15–25 seconds
26. Hard maximum: 30 seconds total — scripts exceeding this must be cut before output
27. Optimal target: 20 seconds total

**Environment rules (non-negotiable):**
28. Every talking-head (main footage) scene must include a 🏠 Environment line describing exactly where the character is, what the space looks like, the background, lighting, and mood — detailed enough to use directly as part of a Kling prompt
29. Every environment MUST be a real, lived-in home setting — no studios, no branded backdrops, no clean commercial sets, no offices, no gyms, no outdoor public spaces unless it is explicitly the backyard or balcony of a home
30. Approved home environments: bedroom, bathroom, kitchen, living room, couch, bathroom counter, bedroom mirror, bathroom mirror, morning bed setup, kitchen counter, home desk, hallway, laundry room, balcony, backyard
31. Every environment description must feel like authentic UGC — slight imperfection in the background, real home lighting (natural window light, ring light, or lamp), casual but intentional framing, lived-in space that does not look staged or commercial
32. The space should feel like a real person filmed this on their phone in their own home — not a lifestyle shoot, not a brand shoot, not a content studio

**AI generation rules (non-negotiable):**
33. Only visual hooks from the AI-generatable section of the Visual Hook Library
34. No complex hand-product interaction — creator can hold product in a medium/wide shot only
35. No B-roll that requires hands, liquid pouring, cooking, or readable text
36. No multi-person scenes — one character only
37. No fast movement — slow, controlled movement only
38. All text overlays, split screens, green screens, and composite elements must be marked as post-production

---

## Reference Files

Load these files as needed during script generation. **Natural_Speech_Rules.md is mandatory reading before every generation.**

| File | When to load | Priority |
|------|--------------|----------|
| `references/Natural_Speech_Rules.md` | **BEFORE starting. Every time.** The core of this skill. | CRITICAL |
| `references/UGC_Hook_Library_150.md` | Phase 4 — selecting hook patterns (as shapes, not templates) | High |
| `references/Visual_Hook_Library.md` | Phase 4 — selecting visual hooks (AI-generatable section only) | High |
| `references/Angle_Library_Expanded.md` | Phase 2–3 — selecting angle types | High |
| `references/Awareness_Stages_Expanded.md` | Phase 2 — matching awareness stage | High |
| `references/DTC_Category_Angle_Playbook.md` | Phase 2 — category-specific angle guidance | Medium |
| `references/CTA_Library.md` | Phase 4 — selecting CTAs by awareness stage | High |
| `references/Script_Pacing_Guide.md` | Phase 4 — scene count, timing, emotional arc, AI constraints | High |
| `references/UGC_Script_Formats_Expanded.md` | Phase 4 — selecting script format (8 formats available) | High |
| `references/UGC_Script_Layout_Premium_Template.md` | Phase 4 — writing each scene, AI B-roll rules, natural speech examples | High |
