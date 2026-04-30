---
name: Pop Culture / Prompt Showcase content bucket
description: Trending AI image prompts (Nano Banana Pro era) sourced from Reddit, Twitter/X, Threads, Instagram. Each prompt has a KEYWORD for the comment-for-link CTA. Content bucket #4 — target ~30% of all daily posts. Face-required vs face-free split with a decision workflow.
type: project
---

> **DEPRECATED 2026-04-30 — Pop Culture / Prompt Showcase bucket retired.**
>
> Edison's directive: revert to the original 3-bucket value-focused content strategy (AI tool releases, practical how-to, money with AI tools). The pop-culture self-insert posts (F1 driver, cyberpunk, anime selfie, etc.) are no longer in rotation. The face-preservation issues with `gpt-image-2-image-to-image` made these visually unreliable, and the audience response to the F1 test post was negative.
>
> The 7 angle prompts in this file (F1, ANIME, POSTER, AD, CINEMATIC, TABLE, CYBERPUNK) are kept as a reference library only. They will not auto-fire in scheduled runs.
>
> Active content strategy lives in `memory/project_content_topic_strategy.md`. Image engine reverted to Nano Banana Pro (model `nano-banana-pro`, field `image_input`).

> **READ memory/feedback_viral_prompt_structure.md FIRST.** Every prompt in this file uses the 10-part viral anatomy (shot type + subject + action + setting + camera + lens + lighting + style + tech specs + face clause + constraints). If you source a NEW trending prompt from Reddit / Threads / X / Instagram, apply the anatomy check before using it. NEVER ship a free-form prompt. Swap variables only.

# Pop Culture / Prompt Showcase Bucket — Trending AI Image Prompts

**Bucket share of daily posts:** ~30%.
**Hook pattern:** short caption (1-3 lines) teasing a cool AI-generated image, then `Comment [KEYWORD] and I'll DM you the prompt.`
**Goal:** drive mass comments from people who want the prompt → DM auto-reply delivers the prompt → follower growth + algorithm boost.
**Image engine:** kie.ai `nano-banana-pro` (Nano Banana Pro).

---

## Face-detection decision workflow (read FIRST)

When sourcing a new trending prompt from Reddit / Twitter / Threads / Instagram, apply this test:

**Does the original creator's face (or a specific person's face) appear in the generated image?**

- **YES → FACE-REQUIRED path.** Edison swaps his face in. Pass `image_input: [face_primary.blotato_url]` to kie.ai. Examples: fisheye selfie with anime characters, movie poster character transformation, F1 driver cockpit shot, Marvel hero portrait, cyberpunk protagonist, One Piece crew member.
- **NO → FACE-FREE path.** Copy the prompt verbatim or make small brand-matching tweaks (colors → navy+yellow, tagline → Edison's). Pass `image_input: []` to kie.ai. Examples: brand static ads, periodic tables, infographics, product shots, dense UI mockups, stylized typography posters.

**Copy-and-adapt workflow for net-new prompts:**

1. Find a viral prompt (trending: >500 likes on Reddit, >100 replies on Threads, >1k RTs on X in last 7 days).
2. Copy the exact prompt text.
3. Classify: face-required vs face-free (use the test above).
4. If face-required, append: `Preserve the facial features from the uploaded reference photo exactly (young Asian man, black hair, slim build, warm confident smile).`
5. If brand-match needed: swap hex colors to `#0A1628` (navy) + `#FFD700` (yellow), swap any attribution text to `@aiwithedison` or `Edison Chua`.
6. Save the final prompt to this file under its angle section with attribution to the original creator.
7. Store the full prompt in `rotation-state.json → keyword_links[KEYWORD]` so the engagement responder can auto-DM it.

---

## Viral prompt library (7 angles)

### 1. F1 Driver Movie Poster (KEYWORD: `F1`) — FACE-REQUIRED
**Caption:**
> I turned myself into an F1 driver in 30 seconds using Nano Banana Pro.
>
> Comment F1 and I'll DM you the exact prompt.

**Prompt:**
```
Cinematic 9:16 movie poster of me as an F1 driver at [Monaco / Silverstone / Suzuka], standing on the grid in a [team-color] racing suit, helmet under arm, dramatic golden-hour sunset, motion-blurred cars streaking past in the background, bold typography "SEASON FINALE" stacked at top in yellow with thick black outline, photorealistic, 8K, shallow depth of field, shot on 85mm. Preserve exact facial features from the reference photo (young Asian man, black hair, slim build, warm confident smile). No em dashes.
```

### 2. Anime Selfie Fisheye (KEYWORD: `ANIME`) — FACE-REQUIRED
Viral on Threads Apr 2026. Fisheye selfie + anime characters + silly faces.

**Caption:**
> Made this with Nano Banana Pro. 30 seconds.
>
> Comment ANIME and I'll DM you the prompt.

**Prompt:**
```
Ultra-realistic 9:16 vertical fisheye selfie of me with [Naruto / Luffy / Goku / Gojo / Doraemon / Shinchan / Nobita] — pick 2-3 characters. We're all making silly, exaggerated faces. Set in a small bright living room with white tones. High camera angle. Extreme fisheye lens distortion. Realistic cinematic lighting. Anime characters rendered with stylized realism. Preserve exact facial features from the reference photo.
```

### 3. Character Movie Poster Transformation (KEYWORD: `POSTER`) — FACE-REQUIRED
10-style menu, perfect for a 10-slide carousel.

**Caption (carousel):**
> 10 ways Nano Banana Pro turned my face into a poster.
>
> Comment POSTER and I'll DM you all 10 prompts.

**Styles (one prompt per slide):** Pixar 3D, Studio Ghibli, One Piece (Oda style), Marvel comic, Shinchan, Avatar (Na'vi), Super Saiyan, shōnen anime key visual, Chibi Maruko-chan, 8-bit pixel.

**Prompt template:**
```
Transform the face in the reference image into [STYLE] movie poster — [style-specific details]. 9:16 vertical format. Keep identifiable facial features (eye shape, jawline, smile). Bold title text "[CHARACTER NAME]" at bottom. No em dashes.
```

### 4. Brand Static Ad Recreation (KEYWORD: `AD`) — FACE-FREE
`tegadesigns1` posted 4 brand ads → 127 likes / 55 comments on Threads. Appeals to designers + SME owners.

**Caption:**
> Clients pay designers $300 for this.
> Nano Banana Pro made it in 30 seconds.
>
> Comment AD and I'll DM you the prompt.

**Prompt (face-free, copy-and-adapt):**
```
[Nike / Big Mac / Knorr / Cetaphil / Coca-Cola] print ad, photorealistic product as hero, [brand color palette], bold English tagline "[TAGLINE]" in [brand typeface], clean studio lighting, minimal background, 4:5 portrait, high-end advertising aesthetic, 8K.
```

### 5. Cinematic Character Portrait (KEYWORD: `CINEMATIC`) — FACE-REQUIRED
Rain+neon is the signature dark aesthetic of 2026.

**Caption:**
> Nano Banana Pro turned me into a Marvel character.
>
> Comment CINEMATIC and I'll DM you the prompt.

**Prompt:**
```
Cinematic portrait of me as [Loki / Deku / Spider-Man / Gojo / Iron Man / Wolverine]. Dramatic rim lighting, rain + neon aesthetic (purple + cyan), rain droplets on skin and hair, slight motion blur in background, movie-poster composition. 9:16 vertical. Preserve exact facial features from the reference photo.
```

### 6. Multilingual Infographic / Periodic Table (KEYWORD: `TABLE`) — FACE-FREE
Proof-of-capability post. Images 2.0 is known for rendering small text / infographics flawlessly. Appeals to nerds + educators + SME owners.

**Caption:**
> Nano Banana Pro rendered a complete periodic table with zero typos.
>
> Nano Banana Pro never could. (Edison switched all image gen to Nano Banana Pro on 2026-04-24 — Nano Banana Pro is deprecated; the line stays as caption flavor.)
>
> Comment TABLE and I'll DM you the prompt.

**Prompt (face-free):**
```
Create a detailed periodic table of [AI tools 2026 / programming languages / F1 teams / anime series], clean minimalist design, white background with subtle grid, each cell contains the element symbol + full name + small descriptive tagline, orange accent highlights for "new" additions, clean sans-serif typography, 4:5 portrait, 8K.
```

### 7. Cyberpunk / Fiction-World Self-Insert (KEYWORD: `CYBERPUNK`) — FACE-REQUIRED
Edison dropped into cyberpunk, Blade Runner, One Piece crew, Marvel Avengers, Star Wars, etc. High-engagement because of the "put me in ___" hook.

**Caption:**
> Nano Banana Pro put me in a cyberpunk city.
>
> Comment CYBERPUNK and I'll DM you the prompt.

**Prompt template (swap the world):**
```
Cinematic 9:16 portrait of me standing in the middle of a rain-slicked neon-lit [Blade Runner-style cyberpunk megacity at night / One Piece Thousand Sunny deck at sunset / Marvel Avengers Tower rooftop at golden hour / Star Wars Mos Eisley cantina interior / Lord of the Rings Rivendell forest]. [World-specific outfit, e.g. long black trench coat with glowing cyan trim and subtle circuit-pattern details for cyberpunk]. [World-specific background details, e.g. flying cars streaking across the sky, towering holographic billboards in Japanese kanji, orange-pink sunset glow]. Dramatic rim lighting, volumetric fog, cinematic depth of field, shot on 35mm. Photorealistic 8K. Preserve exact facial features from the reference photo (young Asian man, black hair, slim build, warm confident smile). No em dashes.
```

**World menu to rotate across Cyberpunk-bucket posts:**
1. Cyberpunk 2077 / Blade Runner Tokyo at night
2. One Piece (Straw Hat crew member, Thousand Sunny deck)
3. Marvel Avengers (Stark Tower rooftop)
4. Star Wars (Mos Eisley / Tatooine / Jedi Temple)
5. Lord of the Rings (Rivendell / Minas Tirith)
6. Dune (Arrakis desert, stillsuit)
7. Naruto (Hidden Leaf Village rooftop at sunset)
8. GTA 6 Miami beach neon sunset
9. Squid Game pink-suit guard hallway
10. Wednesday Addams / Nevermore Academy gothic corridor

---

## Rotation rule

Inside this bucket, rotate angles so no angle repeats within 7 days. Track `rotation-state.json → pop_culture.last_angle`.
Default order:
`F1 → ANIME → CYBERPUNK → AD → POSTER → CINEMATIC → TABLE → F1 → ...`

For each post:
- Pick angle, pick sub-variant (e.g. which world for CYBERPUNK), pick outfit from `OUTFIT VARIETY TABLE` when face is in frame.
- Store the full filled-in prompt in this file under the angle section (append under "Past runs" if the angle has been used before).
- Save `rotation-state.json → keyword_links[KEYWORD]` = Drive link to PDF with the full prompt.
- Caption ≤3 lines. Don't explain, just hook.
- Carousel for menu-style posts (POSTER 10 styles, CYBERPUNK 5-7 worlds). Single hero image for all others.



## Hard rule: COPY VERBATIM, never write from scratch

When sourcing prompts for any face-required pop-culture post:

1. **Find a viral post on Threads or Twitter/X** where the creator literally pasted the prompt they used (e.g. "ChatGPT prompt below: [prompt text]"). Filter: the original generation must include a person's face. Verified-account creators preferred.
2. **Copy the prompt text verbatim** into the run. Do not paraphrase. Do not "improve" it. Do not split the structure.
3. **Only swap these variables:**
   - The original creator's face reference -> Edison's face URL (passed via `image_input: [face_primary.blotato_url]`)
   - The character/persona text inside the prompt (e.g. "wearing a Manchester United kit" -> "wearing a casual hoodie") if Edison wants a different costume
   - Brand colors / taglines if the prompt has them, swapped to navy #0A1628 / yellow #FFD700
4. **Save attribution + the verbatim prompt text** to the relevant angle section in this file. Future runs reuse the saved version.
5. **If you can't find a matching trending prompt for today's angle, scrape one before generating** — never write the prompt yourself.

This rule exists because:
- Trending prompts are over-engineered and battle-tested for the specific model (nano-banana-pro)
- Creators iterate dozens of times before they post; we get the optimal version free
- "Borrowed prompt" framing becomes part of the engagement hook ("comment KEYWORD for the prompt")

Where to source:
- Threads: search "chatgpt image 2.0 prompt", "gpt image 2 viral", "ai poster prompt", account names @misskatrinarose @lastaiupdate @techstuff01 @saprilpobud
- Twitter/X: @nickfloats, @javilopen, @icreatelife, @techhalla, @GuizangHei, replies under @sama announcements
- Reddit: r/ChatGPT, r/midjourney (filter: hot, last 7 days, score > 500)
- Instagram: #chatgptprompt #gptimage2 #aiart trending tab

Always credit the original creator in the engagement DM (not in the post caption itself, to keep captions short).

## Sourcing net-new prompts

When the bucket fires and none of the 7 above fit the day's vibe, scrape fresh trending prompts from:
- Reddit: r/ChatGPT, r/midjourney, r/singularity, r/StableDiffusion (hot, last 7 days, score > 500)
- Threads: search "chatgpt image 2.0 prompt", "ai poster prompt", "viral prompt", "gpt image 2 hot"
- Twitter/X: @nickfloats, @javilopen, @icreatelife, @techhalla, @GuizangHei, @sama viral replies
- Instagram: #chatgptprompt #aiart #gptimage2 #gptimage2prompt

Apply the face-detection decision workflow to each new prompt before saving.

## Past runs log

(engagement routine will append entries here as posts go live, tracking `date / angle / sub-variant / KEYWORD / top-performing platform / comments count`)
