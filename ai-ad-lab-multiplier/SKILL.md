---
name: ai-ad-lab-multiplier
description: "Use this skill when a user types /multiply, /multiply ads, /ad variations, or says they want to create variations of a static ad prompt, generate more ads from a template, or multiply a Nano Banana 2 prompt. This skill takes one existing Nano Banana 2 prompt the user liked, their VOC research document, and their Brand DNA document, then generates 5–8 fully written Nano Banana 2 prompts — each a strategically distinct concept with a different angle, hook, awareness level, AND a different visual scene so Meta's Andromeda algorithm treats every variation as a genuinely different ad. Always trigger this skill when the user wants more versions, more angles, or more variations of an existing static ad."
---

# The AI Ad Lab — Static Ad Multiplier

This skill takes one Nano Banana 2 prompt you already liked and multiplies it into 5–8 strategically distinct, Andromeda-compliant variations. Each variation has a different creative angle AND a different visual scene — so Meta treats every ad as a genuinely new concept, not a copy.

---

## Why this skill exists

Meta's Andromeda algorithm groups ads that look visually similar into the same category and only shows one of them. If you generate 8 ads that all use the same layout with different copy, Andromeda treats them as one ad and suppresses the other 7.

To get 8 auction tickets instead of 1, each ad must be genuinely different in both: the strategic angle AND the visual world it lives in.

This skill handles both.

---

## What the User Needs to Provide

When the user activates this skill, ask them for everything in one message:

> To multiply your ad I need four things:
>
> **1. The Nano Banana 2 prompt you liked** — paste the full prompt text
>
> **2. Which template number it is** — just the number (e.g. "Template 3" or "Template 17"). If you're not sure, describe what the ad looks like and I'll identify it.
>
> **3. Your VOC research document** — paste the full text or upload the file
>
> **4. Your Brand DNA document** — paste the full text or upload the file
>
> Reply with all four and I'll get started.

Do not proceed until you have all four inputs.

---

## The Workflow — Three Phases

---

### PHASE 1 — Understand the Source Prompt

Load the template library from:
`references/templates.md`

Find the template the user specified. Read it carefully to understand:
- The structural layout (what visual zones exist)
- The text elements and their approximate sizes/positions
- The visual composition style (product placement, background treatment, any lifestyle or UGC elements)
- What makes this template format work — its core conversion mechanic

This is your structural constraint. Every variation must use this template's layout logic — the visual skeleton stays. What changes is the scene, the color world, and the copy strategy inside it.

---

### PHASE 2 — Build the Variation Strategy

Load the variation engine from:
`references/variation-engine.md`

Follow it exactly. Using the VOC document and Brand DNA document, build a strategy table of 5–8 variations. Each row in the table is one variation and must specify:

- **Variation number**
- **Copy angle** — which VOC pain point, desire, or insight drives the message
- **Hook mechanic** — the psychological mechanism (curiosity gap, bold claim, pattern interrupt, relatability, social proof, fear/loss, aspiration)
- **Awareness level** — Unaware / Problem-Aware / Solution-Aware / Product-Aware / Most-Aware
- **Emotional register** — the dominant feeling this ad activates
- **Visual scene** — a specific, distinct scene for this variation (what environment, what context, what composition the product lives in)
- **Color world** — the dominant palette and mood (distinct from other variations)
- **How it differs visually** — one sentence confirming it is genuinely different from every other variation

No two variations can share the same visual scene. No two variations can use the same hook mechanic. No two variations can target the same awareness level. If any two are too similar, replace one before proceeding.

Show the user the strategy table before writing prompts. Ask them to confirm or adjust.

---

### PHASE 3 — Write the Prompts

Once the user confirms the strategy, write all 5–8 complete Nano Banana 2 prompts.

Each prompt must:
- Use the structural layout of the original template (the visual skeleton)
- Specify a genuinely different scene, environment, lighting, and color world
- Have all copy written in full — no placeholders, no brackets left unfilled
- Use verbatim customer language from the VOC document wherever possible
- Stay within the Brand DNA's voice, colors, and aesthetic guardrails
- Be immediately paste-ready into Nano Banana 2 with zero editing

Number and label each variation clearly:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VARIATION 1 — [Angle name]
Awareness Level: [level]
Hook: [mechanic]
Emotion: [register]
Visual Scene: [brief description]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Full prompt here]
```

---

## Rules

- **Visual variation is mandatory.** Every variation must specify a meaningfully different scene. Same layout with different copy and same visual context = one Andromeda Entity ID. Different visual scene = new Entity ID = new auction ticket.
- **Copy must come from the documents.** All angles, headlines, and body copy must be grounded in the VOC document (customer language) and Brand DNA (voice and positioning). No generic ad copy.
- **No two variations can be semantically the same.** If two variations communicate the same core message to the same audience with the same visual context, they will be clustered by Andromeda. Replace one with something genuinely different.
- **Match the template structure.** The layout, text zones, and composition logic of the original template must be preserved in every variation. What changes is the scene, the color world, and the strategic content.
- **Show the strategy table first.** Do not write prompts until the user has confirmed the variation strategy. This prevents wasted work if the member wants to adjust the angles.
