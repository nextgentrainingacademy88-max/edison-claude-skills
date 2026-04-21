# Prompt Builder — Nano Banana 2 Reference Image Prompt

This guide tells you how to construct the Nano Banana 2 prompt. The user will upload the competitor ad image as the reference image in Nano Banana 2, alongside their product image. Your prompt is the text instruction that tells Nano Banana 2 what to change and what to keep.

---

## How Nano Banana 2 Reference Image Prompts Work

Nano Banana 2 uses the uploaded reference image as a structural and compositional template. It reads your text prompt to understand what to modify. Your job is to:

1. Lock the layout — tell NB2 to preserve the original composition
2. Specify every visual swap — product, colours, brand elements
3. Pre-write every text swap — give NB2 the exact words to use
4. Never leave decisions to NB2 — if you don't specify it, NB2 will improvise

---

## Prompt Structure

Build the prompt in this exact order:

---

### SECTION 1 — REFERENCE INSTRUCTION

Open with a single sentence that tells NB2 how to treat the uploaded image:

> "Use the uploaded image as the compositional reference. Preserve the exact layout, visual zones, text placement positions, and overall structure. Do not redesign — only replace the specific elements listed below."

---

### SECTION 2 — BRAND IDENTITY SWAPS

Pull from the Brand DNA document. List every brand-level visual change:

**Format:**
> "Replace the brand colour palette with: [primary colour hex], [secondary colour hex], [accent colour hex]. Apply these to backgrounds, text elements, and graphic shapes."
>
> "Replace any logo or brand name visible in the ad with: [brand name] in [brand font style if specified in Brand DNA, otherwise: clean sans-serif]."
>
> "Maintain the overall colour mood/temperature as [warm/cool/neutral] — shift the palette toward [brand palette description from Brand DNA]."

---

### SECTION 3 — PRODUCT IMAGE SWAP

The user is uploading their product image separately into NB2. Write the instruction:

> "Replace the product in the reference image with the second uploaded product image. Place the product in the same position and at the same scale as the original product in the reference. Maintain the same angle and orientation if possible. [Add any specific product context from Brand DNA — e.g. 'The product is a glass bottle with a gold cap' — so NB2 renders it correctly.]"

If the original had a lifestyle context (product being held, product in a scene), specify:
> "Keep the [lifestyle element / background scene] from the reference image. Integrate the new product into this scene naturally."

---

### SECTION 4 — TEXT SWAPS

This is the most critical section. For every text element identified in the ad analysis, write the exact replacement.

**Format for each text element:**

> "HEADLINE: Replace the headline text with: '[YOUR EXACT HEADLINE HERE]'
> Keep the same font weight (bold), same font size relative to the image, same position ([top/centre/bottom], [left/centre/right]), same colour treatment ([white text / dark text / coloured text as in original])."

> "SUBHEADLINE: Replace the subheadline with: '[YOUR EXACT SUBHEADLINE HERE]'
> Same size, position, and colour as original."

> "BODY COPY: Replace the body text with: '[YOUR EXACT BODY COPY HERE]'
> Maintain the same approximate line count ([X lines]) and text block dimensions."

> "CTA: Replace the CTA text with: '[YOUR EXACT CTA HERE]'
> Keep the same button/text style, colour, and position."

**Rules for writing the replacement copy:**

- **Match the original word count and character count as closely as possible.** A 3-word headline gets a 3-word replacement. A 6-word CTA gets a 6-word replacement. This preserves the visual balance.
- **Use verbatim customer language from the VOC document wherever possible.** Pull real phrases, not invented copy.
- **Align the hook mechanic to the original.** If the original used a bold result claim, your replacement uses a bold result claim — just for this brand's product. If it used a problem hook, yours uses a problem hook.
- **Match the tone.** Casual = casual. Clinical = clinical. Check the Brand DNA tone of voice.
- **For the headline:** Extract the single most powerful pain point or desire from the VOC document that matches the hook mechanic of the original. Compress it to the original word count.
- **For body copy:** Use the feature-to-benefit language and customer phrases from the VOC document. Do not write generic ad copy.
- **For the CTA:** Match the original CTA type (discovery CTA like "Learn More" / commitment CTA like "Shop Now" / soft CTA like "See How"). Check the brand's preferred CTA language in the Brand DNA doc.

---

### SECTION 4b — CAMPAIGN OR OFFER LAYER (only if the user provided one)

If the user specified a campaign, discount, promotion, or specific offer, weave it into the ad as follows:

**If the original ad has a CTA button or badge**, this is the primary place to inject the offer:
> "CTA: Replace the CTA with: '[OFFER-DRIVEN CTA — e.g. "Get 20% Off", "Claim Free Trial", "Shop the Sale"]'. Keep the same button style, colour, and position."

**If the original ad has a badge, label, or callout element**, use it for the offer:
> "Badge/Label: Replace with: '[OFFER TEXT — e.g. "Limited Time", "20% Off This Week", "Free Shipping"]'. Keep the same position and style."

**If the offer changes the promise of the ad** (e.g. it's a launch deal that would affect the headline angle), reflect it in the headline:
> "Adjust the headline to incorporate the offer: '[HEADLINE WITH OFFER ANGLE — e.g. "Finally Clear Skin — Now 20% Off"]'. Match the original word count as closely as possible."

**If no offer was provided**, skip this section entirely. Do not add a generic offer or invent a promotion.

**Offer integration rules:**
- The offer must be real — use exactly what the user described, not a paraphrase
- Do not force an offer into a placement that doesn't exist in the original ad's layout
- If the original ad has no badge/callout element, inject the offer into the CTA only
- Keep the offer language concise — match the character length of the original element it replaces

End the prompt with explicit keep-as-is instructions:

> "Keep the following elements exactly as they appear in the reference image:
> — Overall layout and compositional zones
> — Text placement positions and hierarchy
> — Background style and atmosphere [unless colour swap specified above]
> — Visual style and image treatment
> — Any graphic elements not listed above for replacement"

---

### SECTION 6 — QUALITY INSTRUCTION

Close with a single quality directive:

> "The output should look like a polished, production-ready static Meta ad. All text must be sharp, legible, and correctly spelled. Brand elements should feel cohesive and intentional."

---

## How to Source the Copy from the Documents

### From the Brand DNA document, extract:
- Brand name and product name
- Core product positioning statement
- Key product benefits (in brand's language)
- Brand visual identity (colours, font style, aesthetic)
- Tone of voice descriptors
- Any specific phrases or language the brand uses consistently

### From the VOC document, extract:
- The most emotionally resonant pain point matching the hook mechanic of the original ad
- The most powerful desire/dream outcome phrases
- Before/after language pairs
- High-intensity phrases from the Language Goldmine section
- Identity language that matches the audience level of the original ad
- The dominant awareness level — use language appropriate to it

### Matching hook mechanic to VOC section:
- Bold result / transformation hook → use After-State Visual Descriptions + Before/After pairs from VOC
- Problem-agitation hook → use top pain points + struggling moment language from JTBD section
- Curiosity gap hook → use "I wish" and unmet desire language from Language Goldmine
- Relatability hook → use identity language + situation descriptions from ICP section
- Social proof hook → use top testimonials from Social Proof Arsenal
- Direct offer hook → use Value Equation language — Dream Outcome + Time Delay

---

## Prompt Length and Format

The finished prompt should be 200–400 words. Long enough to be precise, short enough to be processed cleanly by Nano Banana 2.

Write in clear, direct instruction language. No bullet points inside the prompt itself — write it as flowing instructions that Nano Banana 2 reads as a directive. Avoid decorative language. Be surgical.

---

## Self-Check Before Finalising

Before outputting the prompt, verify:

- [ ] Every text element from the ad analysis has an exact replacement written — no placeholders
- [ ] Replacement headline matches original word count (within 1 word)
- [ ] All replacement copy is sourced from Brand DNA or VOC — no invented generic phrases
- [ ] Product swap instruction references the user's uploaded product image
- [ ] Brand colour swaps reference specific values from the Brand DNA doc
- [ ] Preserve instruction lists everything that should stay unchanged
- [ ] Prompt reads as a complete, self-contained directive — user can copy-paste with zero edits
