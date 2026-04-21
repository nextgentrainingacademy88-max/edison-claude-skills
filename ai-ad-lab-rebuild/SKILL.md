---
name: ai-ad-lab-rebuild
description: "Use this skill when a user types /rebuild, /rebuild ad, /reverse engineer ad, or says they want to rebuild or recreate a competitor ad for their own brand. This skill takes a competitor's winning static ad image, a Brand DNA document, and a VOC research document, then produces a fully written Nano Banana 2 reference image prompt that transforms the competitor ad into a new ad for the user's brand — with all text, product, and visual swaps written out explicitly. Optionally generates 5 buyer persona variations. Always trigger this skill when the user mentions rebuilding a competitor ad, recreating a winning ad, or using a reference image for Nano Banana 2."
---

# The AI Ad Lab — Competitor Ad Rebuild for Nano Banana 2

This skill turns a competitor's winning static ad into a ready-to-use Nano Banana 2 reference image prompt for your brand. You upload the ad, your Brand DNA doc, and your VOC doc — the skill analyses the original ad and writes every text and visual swap explicitly so Nano Banana 2 knows exactly what to change and what to keep.

---

## What the User Needs to Provide

When the user activates this skill, immediately ask them to provide all of the following in one message:

> To build your ad rebuild prompt I need three things plus two quick answers:
>
> **1. The competitor's winning ad** — paste or upload the static image directly into this chat
>
> **2. Your Brand DNA document** — paste the full text, or upload the file
>
> **3. Your VOC research document** — paste the full text, or upload the file
>
> **4. Do you have a specific campaign, offer, or promotion to include?**
> For example: a discount ("20% off this week"), a bundle deal, a free trial, a seasonal campaign, a launch offer, or any specific CTA you want the ad to drive toward. If yes, describe it briefly. If no, just say "no offer" and the rebuild will focus on the product and brand positioning.
>
> **5. Do you want 5 persona variations of this rebuild?**
> Each variation will use the same layout and structure as the original ad, but swap to a different buyer persona angle from your VOC research.
>
> Reply with all three inputs and your answers to 4 and 5.

Do not proceed until you have the image, the Brand DNA doc, and the VOC doc. If any is missing, ask again.

---

## The Workflow — Three Phases

---

### PHASE 1 — Analyse the Competitor Ad

Read the ad image carefully. Load the ad analysis framework from:
`references/ad-analysis.md`

Follow it exactly. Produce a complete internal analysis of the competitor ad covering every structural, visual, and copy element. This analysis is your working document — you use it in Phase 2 to make precise swaps.

Do not show the full analysis to the user. After Phase 1, tell the user:
> "Ad analysed. Building your rebuild prompt now..."

---

### PHASE 2 — Build the Rebuild Prompt

Load the prompt construction guide from:
`references/prompt-builder.md`

Using the Phase 1 analysis, the Brand DNA document, and the VOC document, build the full Nano Banana 2 reference image prompt. This prompt tells Nano Banana 2 exactly what to change and what to keep — every text swap is pre-written by you with the exact words to use.

The user will:
1. Upload the competitor ad image directly into Nano Banana 2 as the reference image
2. Upload their own product image alongside it
3. Paste your prompt into the Nano Banana 2 text field

Your prompt must be complete and self-contained — the user should be able to copy it straight in with zero editing.

---

### PHASE 3 — Persona Variations (if requested)

If the user said yes to persona variations, load:
`references/persona-variations.md`

Generate 5 complete variation prompts, each targeting a different buyer persona from the VOC document. Each variation is a full standalone Nano Banana 2 prompt — not a partial diff. Label each clearly:

**VARIATION 1 — [Persona Name/Description]**
[Full prompt]

**VARIATION 2 — [Persona Name/Description]**
[Full prompt]

...and so on through all 5.

---

## Output Format

Deliver the output in this order:

1. **AD ANALYSIS SUMMARY** — a brief 4–6 line breakdown of what made the original ad work (hook type, layout, text approach, awareness level). Short and strategic.

2. **THE REBUILD PROMPT** — the full Nano Banana 2 prompt, clearly labelled, ready to copy-paste.

3. **PERSONA VARIATIONS** — only if requested. All 5, fully written, clearly numbered and labelled.

---

## Rules

- **You decide the words, not Nano Banana 2.** Every text element in the prompt must have the exact replacement copy written out. Never write "replace headline with something relevant" — write the actual headline.
- **Match the original format.** If the winning ad has a 4-word headline, your replacement headline is 4 words. If the CTA is 2 words, yours is 2 words. Structure and length are what made it win — preserve them.
- **Persona variations use the same layout.** The structure, text placement, and visual hierarchy of the original ad stays identical across all variations. Only the copy angles, pain points, and customer language change.
- **Ground every word in the documents.** All replacement copy must come from the Brand DNA doc (voice, positioning, product details) and the VOC doc (customer language, pain points, desires). Do not invent generic ad copy.
- **No creative interpretation.** This skill rebuilds and adapts — it does not redesign. The original ad's layout is the template. Your job is precise substitution, not reimagination.
