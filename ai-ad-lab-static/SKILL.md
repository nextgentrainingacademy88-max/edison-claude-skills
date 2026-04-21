---
name: ai-ad-lab-static
description: "Use this skill when a user explicitly asks to create static ads, generate 40 static ad prompts, or run the Nano Banana 2 workflow. Trigger on commands like /create static ads, /40 static ads, /40 Nano Banana 2 prompts, or clear phrases like 'generate my static ad prompts', 'let's do the 40 prompts', or 'I want to make static ads'. Do NOT trigger on vague requests like 'make me ads', 'create ads', or general ad help — the user must specifically mention static ads, 40 prompts, or Nano Banana 2."
---

# The AI Ad Lab — 40 Static Ad Prompts for Nano Banana 2

This skill generates 40 fully finished Nano Banana 2 prompts for a specific product. It requires a Brand DNA document as input. If the user does not have one yet, direct them to run `/brand dna` first.

---

## How to trigger this skill

User types any of:
- `/create static ads`
- `/40 static ads`
- `/40 Nano Banana 2 prompts`
- "I want to make static ad prompts"
- "Let's do The AI Ad Lab workflow"
- "Generate my 40 Nano Banana 2 prompts"
- "I want to create static ads"
- "Let's generate 40 static prompts"

**Do not trigger** on vague requests like "make me ads", "create some ads", or general ad questions — the user must explicitly reference static ads, 40 prompts, or Nano Banana 2.

---

## Inputs required

When this skill triggers, ask the user for:

> To generate your 40 prompts I need:
> 1. **Brand DNA document** — upload the HTML Brand DNA doc (run `/brand dna` first if you don't have one)
> 2. **Specific product name** — which product are we making ads for?
> 3. **VOC research doc** (optional) — upload any customer research, reviews, or voice-of-customer notes if you have them
> 4. **Product images** (optional) — upload 1–3 product photos

If the user has not done Brand DNA yet, tell them:
> You'll need a Brand DNA document first. Type `/brand dna` to create one, then come back here with it.

---

## The Workflow

Once you have the Brand DNA document and product name, load the 40 templates from:
`references/40-templates.md`

Run the prompt wrapper at the top of that file. Substitute:
- `[BRAND NAME]` → the brand name from the Brand DNA document
- `[SPECIFIC PRODUCT]` → the product name the user provided
- The Brand DNA document content — use it as the primary brand reference
- VOC research doc (if uploaded) — use as copywriting reference only, not to copy directly
- Product images (if uploaded) — reference as brand/product visual context

Fill in **all 40 templates** completely. Every prompt must be:
- Fully written out with no remaining placeholder brackets
- Ready to paste directly into Nano Banana 2 with zero edits
- Standalone — each prompt works on its own without needing any other prompt

---

## Output

A single downloadable document (HTML) containing all 40 finished prompts. Structure it like this:

```
THE AI AD LAB — 40 STATIC AD PROMPTS
Brand: [Brand Name]
Product: [Specific Product]
Generated: [Date]

─────────────────────────────────

1. HEADLINE
[Full finished prompt]

─────────────────────────────────

2. OFFER/PROMOTION
[Full finished prompt]

... (continue through all 40)
```

Each prompt block must be easy to select and copy. Include a "Copy" button per prompt block in the HTML output.

Present the file to the user using the `present_files` tool.

---

## Important rules

- **Do not change the template prompts.** The structure, layout instructions, and format of all 40 templates must stay exactly as written in `references/40-templates.md`. Only the bracketed placeholders get filled in.
- **VOC is a reference, not a source.** Use it to understand customer language — do not copy-paste from it into the prompts.
- **If no product images are uploaded**, proceed anyway and note in the output that images should be attached when pasting each prompt into Nano Banana 2.
- **If no VOC doc is uploaded**, proceed without it — the Brand DNA doc provides enough context.
- **If no Brand DNA doc is uploaded**, do not proceed. Ask the user to run `/brand dna` first.
