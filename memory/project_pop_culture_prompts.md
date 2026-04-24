---
name: Pop Culture / Prompt Showcase content bucket
description: Trending AI image prompts (ChatGPT Images 2.0 era) sourced from Reddit, Twitter/X, Threads, Instagram. Each prompt has a KEYWORD for the comment-for-link CTA. Content bucket #4 — target ~30% of all daily posts.
type: project
---

# Pop Culture / Prompt Showcase Bucket — Trending AI Image Prompts

**Bucket share of daily posts:** ~30%.
**Hook pattern:** short caption (1-3 lines) teasing a cool AI-generated image, then `Comment [KEYWORD] and I'll DM you the prompt.`
**Goal:** drive mass comments from people who want the prompt → Instagram/FB DM auto-reply delivers the prompt → follower growth + engagement signal.
**Image engine:** kie.ai `gpt-image-2-image-to-image` (ChatGPT Images 2.0) with Edison's face in `image_urls` when the image should include him, empty `image_urls` when it shouldn't.

---

## Top 6 viral prompt templates (2026-04)

### 1. F1 Driver Movie Poster (KEYWORD: `F1`)
**Caption example:**
> I turned myself into an F1 driver in 30 seconds using ChatGPT Images 2.0.
>
> Comment F1 and I'll DM you the exact prompt.

**Prompt template (face-required):**
```
Cinematic 9:16 movie poster of me as an F1 driver at [Monaco / Silverstone / Suzuka], standing on the grid in a [team-color] racing suit and helmet under arm, dramatic golden-hour sunset, motion-blurred cars streaking past in the background, bold typography "SEASON FINALE" stacked at top in yellow with thick black outline, photorealistic, 8K, shallow depth of field, shot on 85mm. Preserve exact facial features from reference photo. No em dashes.
```

### 2. Anime Selfie Fisheye (KEYWORD: `ANIME`)
**Why it works:** viral on Threads in April 2026 — fisheye selfie + recognizable anime characters + silly faces. Universal nostalgia hook.

**Caption example:**
> Made this with ChatGPT Images 2.0. Took 30 seconds.
>
> Comment ANIME and I'll DM you the prompt.

**Prompt template (face-required):**
```
Ultra-realistic 9:16 vertical fisheye selfie of me with [Naruto / Luffy / Goku / Gojo / Doraemon / Shinchan / Nobita] — pick 2-3 characters. We're all making silly, exaggerated faces. Set in a small, bright living room with white tones. High camera angle. Extreme fisheye lens distortion. Realistic cinematic lighting. Anime characters rendered with stylized realism, their line work subtly preserved against the photoreal environment. Preserve exact facial features from reference photo.
```
Character picks (rotate): Naruto, Luffy, Goku, Gojo Satoru, Doraemon, Shinchan, Nobita, Saitama, Mikasa, Spider-Man, Deku.

### 3. Character Movie Poster Transformation (KEYWORD: `POSTER`)
**Why it works:** 10-style poster menu lets one post visually present many options.

**Caption example (carousel):**
> 10 ways ChatGPT Images 2.0 turned my face into a poster.
>
> Comment POSTER and I'll DM you all 10 prompts.

**Style menu (one prompt per slide):**
1. Pixar 3D
2. Studio Ghibli
3. One Piece (Eiichiro Oda style)
4. Marvel comic poster
5. Shinchan
6. Avatar (James Cameron Na'vi)
7. Super Saiyan (Dragon Ball Z)
8. Anime shōnen key visual
9. Chibi Maruko-chan
10. Minecraft / 8-bit pixel

**Prompt template per style:**
```
Transform the face in the reference image into [STYLE] movie poster — [style-specific details, e.g. "Pixar 3D, soft cinematic lighting, wide expressive eyes, subtle subsurface scattering on skin, wearing a cozy hoodie"]. 9:16 vertical movie poster format. Keep identifiable facial features (eye shape, jawline, smile). Bold title text "[CHARACTER NAME]" at bottom. No em dashes.
```

### 4. Brand Static Ad Recreation (KEYWORD: `AD`)
**Why it works:** `tegadesigns1` posted 4 brand ads (Saka / Big Mac / Knorr / MrBeast) on Threads and hit 127 likes / 55 comments. Appeals to freelance designers + SME owners.

**Caption example:**
> Clients pay designers $300 for this.
> ChatGPT Images 2.0 made it in 30 seconds.
>
> Comment AD and I'll DM you the prompt.

**Prompt templates (face-free — text-to-image):**
```
[Nike / Big Mac / Knorr / Cetaphil / Coca-Cola] print ad, photorealistic product as hero, [brand color palette], bold English tagline "[TAGLINE]" in [brand typeface], clean studio lighting, minimal background, 4:5 portrait, high-end advertising aesthetic, 8K.
```

Sample taglines:
- McDonald's: "Better Together." "$6.49 Classic Combo."
- Nike: "Just show up." "The work is the win."
- Knorr: "Taste Comes Alive."
- Cetaphil: "Gentle. Proven. Cetaphil."

### 5. Cinematic Character Portrait (KEYWORD: `CINEMATIC`)
**Why it works:** Rain + neon is the signature "dark aesthetic" trend of 2026.

**Caption example:**
> ChatGPT Images 2.0 turned my face into a Marvel character.
>
> Comment CINEMATIC and I'll DM you the prompt.

**Prompt template (face-required):**
```
Cinematic portrait of me as [Loki / Deku / Spider-Man / Gojo Satoru / Iron Man / Wolverine]. Dramatic rim lighting, rain + neon aesthetic (purple + cyan), rain droplets visible on skin and hair, slight motion blur in background, movie poster composition. 9:16 vertical. Character-appropriate outfit detail. Preserve exact facial features from reference photo.
```

### 6. Multilingual Infographic Demo (KEYWORD: `TABLE`)
**Why it works:** Images 2.0 is known for rendering small text / infographics / periodic tables accurately — a "proof of capability" post. Appeals to nerds + educators.

**Caption example:**
> ChatGPT Images 2.0 just rendered a complete periodic table with zero typos.
>
> Nano Banana Pro could never.
>
> Comment TABLE and I'll DM you the prompt.

**Prompt template (face-free):**
```
Create a detailed periodic table of [AI tools 2026 / programming languages / F1 teams / anime series], clean minimalist design, white background with subtle grid, each cell contains element symbol + full name + small descriptive tagline, orange accent highlights for "new" additions, clean sans-serif typography, 4:5 portrait, 8K.
```

---

## Rotation rule

Inside the Pop Culture bucket, rotate the 6 angles so no angle repeats within 7 days. Track in `rotation-state.json` → `pop_culture.last_angle`.
Default order: `F1 → ANIME → POSTER → AD → CINEMATIC → TABLE → F1 → ...`

For each pop-culture post, always:
- Store the full prompt in `memory/project_pop_culture_prompts.md` under the angle section
- Save `rotation-state.json → keyword_links[KEYWORD]` = Drive link to the PDF with the full prompt (auto-generated if missing)
- Caption stays under 3 lines. Don't explain, just hook.
- Carousel OR single image — carousel is better for multi-style showcases (Angle #3), single image for hero-shot angles (1, 2, 5).

## Sourcing

When the bucket fires and none of the 6 above fit the day, scrape fresh prompts from:
- Reddit: r/ChatGPT, r/midjourney, r/singularity, r/StableDiffusion (filter: hot, last 7 days, score > 500)
- Threads: search "chatgpt image 2.0 prompt", "ai poster prompt", "viral prompt"
- Twitter/X: @nickfloats, @javilopen, @icreatelife, @techhalla, @GuizangHei
- Instagram: #chatgptprompt #aiart #gptimage2

Pick trends that are (a) visually striking, (b) easy to demo with Edison's face, (c) tagged by creators so we can credit them (credit goes in the DM, not the post caption).
