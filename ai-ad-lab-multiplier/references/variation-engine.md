# Variation Engine — Andromeda-Compliant Creative Multiplication

This file governs how Claude generates variations that are genuinely different in Meta's eyes. The core principle: **copy variation alone is not enough.** Each variation must differ in both strategic direction AND visual world. Same layout with different copy = one Entity ID = one auction ticket. Different visual scene = new Entity ID = new auction ticket.

---

## Step 1 — Extract from the VOC Document

Before building the strategy table, extract these five layers from the VOC document:

**Pain point territories** (not individual complaints — grouped thematic clusters):
- Identify 5–7 distinct pain point territories
- Tag each with emotional intensity (Low / Medium / High / Extreme)
- Tag each with awareness level (what stage is someone in when they voice this pain?)
- Note the verbatim customer phrases that anchor each territory

**Desire clusters** (what customers want to feel/achieve/become):
- Identify 5–7 distinct desire clusters
- Tag emotional register (aspiration / relief / pride / belonging / transformation)
- Note verbatim phrases

**JTBD dimensions:**
- Functional job: what they're practically trying to do
- Emotional job: how they want to feel
- Social job: how they want to be perceived

**Awareness level distribution:**
- What % of quotes are Unaware / Problem-Aware / Solution-Aware / Product-Aware / Most-Aware?
- Which level dominates? Which is underrepresented?

**Language goldmine:**
- Top 10 verbatim phrases with highest emotional intensity
- Top 5 before/after language pairs
- Identity language ("I'm the kind of person who...")

---

## Step 2 — Extract from the Brand DNA Document

**Hard constraints** (must apply to every variation):
- Core brand voice descriptors
- Words or phrases never to use
- Claim limitations
- Color palette (primary, secondary, accent)

**Soft constraints** (can flex within a range):
- Tone spectrum (e.g. "confident but warm — can shift between mentor and friend, never corporate or aggressive")
- Photography style range (e.g. "clean studio to warm lifestyle — never dark or gritty")

**Freedom zones:**
- Which emotional registers are explicitly on-brand?
- Which persona types does the brand serve?
- What visual aesthetics reflect the brand?

---

## Step 3 — Build the Visual Scene Library

Before mapping copy to visuals, define 6–8 distinct visual scenes available for this product. Each scene must:
- Place the product in a genuinely different context or environment
- Create a different emotional feeling when seen
- Differ visually enough that Andromeda's computer vision assigns a different embedding

### Scene categories to draw from:

**Environment-based scenes:**
- Morning ritual (bathroom counter, natural light, skincare/coffee/supplement context)
- Kitchen/dining (preparation, ingredients visible, food styling)
- Workspace/desk (productivity context, mid-task placement)
- Gym bag / active (sports kit, water bottle, post-workout)
- Outdoor / lifestyle (park bench, café table, natural setting)
- Bedroom / sleep ritual (nightstand, soft evening light)
- Travel (hotel, suitcase, airport)

**Composition-based scenes:**
- Product hero (clean background, product as sole subject)
- Hand-held (product held by a person in natural light)
- Flatlay (product among complementary objects, overhead)
- In-use (product being actively used in context)
- Ingredient explode (product surrounded by key ingredients)
- Before/after framing (problem context vs. result context)
- Social/sharing moment (product being shown to or shared with someone)

**Color world variations:**
- Light and airy (white, cream, soft morning light)
- Dark and moody (deep backgrounds, dramatic shadows)
- Warm and earthy (wood, terracotta, natural textures)
- Bright and bold (saturated brand colors, energetic)
- Clinical/clean (crisp white, precise lighting)
- Vintage/editorial (grain, muted tones, analog feel)

**Important:** Never use the same scene AND the same color world in two variations. If two variations share a scene category, they must diverge significantly in color world, composition angle, or accompanying props.

---

## Step 4 — Build the Strategy Table

Create a table with one row per variation (5–8 rows). Each row specifies:

| # | Copy Angle | Hook Mechanic | Awareness Level | Emotional Register | Visual Scene | Color World | Differentiator (vs other rows) |
|---|---|---|---|---|---|---|---|

**Rules for the table:**
- No two rows can share the same Hook Mechanic
- No two rows can share the same Awareness Level
- No two rows can share the same Visual Scene
- No two rows can share the same Emotional Register
- At least one row must be Problem-Aware
- At least one row must be Solution-Aware or Most-Aware
- At least one row must use VOC Language Goldmine phrases as the primary copy angle
- At least one row must be identity-led (Unaware stage, no product mention in hook)

**Hook Mechanic options** (pick one distinct mechanic per row):
- Curiosity gap — creates an information gap that demands resolution
- Bold claim — specific, falsifiable result or statistic
- Pattern interrupt — says or shows something unexpected
- Relatability — mirrors the customer's lived experience precisely
- Social proof — adoption numbers, testimonials, peer behavior
- Fear/loss — what they stand to lose by not acting
- Aspiration — paints the desired identity or outcome

**Emotional Register options** (pick one distinct register per row):
- Frustration/relief — acknowledges the pain and promises resolution
- Pride/achievement — appeals to desire for accomplishment
- Belonging/community — connects to tribe or peer identity
- Fear/urgency — activates loss aversion
- Aspiration/transformation — paints the future self
- Curiosity/intrigue — makes them want to know more
- Validation/permission — tells them it's okay to want this

---

## Step 5 — Write Each Variation Prompt

For each row in the strategy table, write a complete Nano Banana 2 prompt following this structure:

### Section 1 — Template Structure (locked)
Open with the template's structural instructions adapted to this variation's scene. The layout zones (headline position, product position, text placement hierarchy) must match the original template. Do NOT change the structural logic.

Example: If the user's source template is Template 3 (Testimonials), every variation must maintain the format of lifestyle background + product slightly out of focus + white text overlay + stars + attribution. What changes is the lifestyle setting, the background color world, the specific copy, and the product placement context.

### Section 2 — Visual Scene Specification (unique per variation)
Be specific about:
- **Setting/environment:** exact location and context (e.g. "a sun-drenched kitchen with marble countertops and herbs in small terracotta pots near the window")
- **Lighting:** specific quality and direction (e.g. "warm morning light from a window left of frame, golden tone")
- **Color world:** dominant palette (e.g. "warm whites, sage green, terracotta — no cool tones")
- **Surface/props:** what the product sits on or is surrounded by
- **Camera treatment:** distance, angle, depth of field where relevant

### Section 3 — Product Placement
Specify exactly how the product appears in this variation:
- Is it hero-lit or environmental?
- Is it held, placed, or in use?
- What angle and orientation?
- What scale relative to the frame?

### Section 4 — Copy (unique per variation)
Write all copy in full with no placeholders:
- Headline (matched to original template's character count)
- Subheadline or supporting copy if template includes it
- Any stats, bullets, or callouts the template includes
- CTA text if the template includes it

Copy rules:
- Pull verbatim phrases from the VOC Language Goldmine wherever possible
- Match the awareness level of this variation (don't use product-aware copy for an Unaware-stage variation)
- Use the Brand DNA voice guardrails
- Never use the same headline or key phrase across two variations

### Section 5 — Social Proof (where template includes it)
If the template includes a review, testimonial, or quote:
- Use real language drawn from the VOC Social Proof Arsenal
- Match the emotional register of this variation
- Ensure the quote supports the copy angle — different variations should feature different quotes

---

## Step 6 — Differentiation Audit

Before finalizing, compare all variations side by side. For each pair, confirm:

**Visual differentiation test:** If you removed all the text, would these two ads look genuinely different to a human viewer? If someone saw both in a feed would they feel like they'd seen different ads? If no → one of them needs a different scene.

**Message differentiation test:** Do these two ads make the same promise to the same person? If yes → one needs a different angle or awareness level.

**Entity ID likelihood:** Would Meta's computer vision system (which analyzes color, composition, object placement, and spatial patterns) likely assign different embeddings to these two images? Use this checklist:
- Different dominant color/palette → ✓ new Entity ID likely
- Different background environment → ✓ new Entity ID likely
- Different product positioning (hero vs. in-use vs. held) → ✓ new Entity ID likely
- Different composition structure (product left vs. centered vs. right) → ✓ new Entity ID likely
- Only different copy, same visual → ✗ same Entity ID likely

Each variation must pass all three tests before the prompts are written.

---

## Output Format for the Strategy Table

Present the strategy table to the user like this:

```
Here are the 6 variations I'm planning. Each uses Template [X]'s layout but with a genuinely different visual scene and strategic direction — so Meta treats them as 6 separate ads.

VARIATION 1
Angle: [which VOC pain point or desire]
Hook: [mechanic]
Awareness level: [stage]
Emotional register: [feeling]
Visual scene: [brief description of scene, lighting, color world]
Why it's different: [one sentence on how it diverges visually from the others]

VARIATION 2
[same structure]

... (continue through all variations)

Confirm to proceed and I'll write all 6 complete prompts.
```

Wait for user confirmation before writing the full prompts. If the user wants to adjust any variation (different angle, different scene, swap one out), revise the table before proceeding.

---

## Common Mistakes to Avoid

**Mistake 1 — Synonym swaps disguised as variation**
Writing "Fix your skin" vs. "Transform your skin" vs. "Heal your skin" are not different variations. They're the same message with different words. The angle must differ — one leads with pain, one leads with identity, one leads with social proof.

**Mistake 2 — Same visual template for all variations**
Even if the structural layout is preserved, if every variation has a white studio background with a product centered on a plain surface, Andromeda clusters them. Each variation must have a distinct environment.

**Mistake 3 — Same awareness level for multiple variations**
Running 5 product-aware variations in the same campaign limits your reach to people who already know the brand. Spread across awareness levels to unlock different audience segments.

**Mistake 4 — Generic ad copy not grounded in VOC**
If the copy doesn't contain verbatim customer language, it sounds like AI-written marketing. Andromeda doesn't punish this — but real humans do. Every variation's key phrase should be traceable to the VOC document.

**Mistake 5 — Forgetting the template's conversion mechanic**
Each template works because of a specific mechanic. Template 11's power is the truncated "...Read more." Template 9's power is the fake negative review. If your variation breaks the mechanic, it breaks the ad. Always preserve the structural logic while changing the content inside it.
