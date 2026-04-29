# Manual Engagement Queue
**Last updated:** 2026-04-29 UTC (afternoon)

---

## 2026-04-29 afternoon run — VALIDATION GATE: zero posts shipped (Path A + Path B both blocked, FIFTH consecutive run degraded)

**Topic:** Brand static print-ad recreation pop-culture demo of ChatGPT Images 2.0 (Bucket #4 — Pop Culture / Prompt Showcase, angle AD, brand: Coca-Cola)
**Keyword:** `AD`
**Resource link:** https://github.com/nextgentrainingacademy88-max/edison-claude-skills/blob/main/memory/project_pop_culture_prompts.md#4-brand-static-ad-recreation-keyword-ad--face-free
**Outfit:** N/A (face-free angle, product is the hero)
**Rotation:** AD has not appeared in the last 7 days (last_angle = CYBERPUNK on 2026-04-29 morning, before that ANIME 2026-04-28 afternoon, F1 2026-04-28 morning). Qualifies.

**Decision:** Per the run's mandatory validation gate (image URL must live on `tempfile.aiquickdraw.com`, must differ from face reference URL, kie.ai task `state` must equal `success`), ALL 6 destinations were SKIPPED. Better zero posts than no image / wrong image.

| # | Destination | Status |
|---|---|---|
| 1 | LinkedIn personal (18089) | SKIPPED |
| 2 | LinkedIn Nextgen Academy page (18089 / 108414535) | SKIPPED |
| 3 | Facebook Nextgen Academy (27053 / 726492947207808) | SKIPPED |
| 4 | Instagram @aiwithedison (41734) | SKIPPED |
| 5 | Threads @edisonchuaofficial (5937) | SKIPPED |
| 6 | X @aiwithedison (16254) | SKIPPED |

### LOUD FLAG — Path A AND Path B BOTH FAILED (FIFTH consecutive run)

1. **Path A (Cloudflare Worker proxy):** `https://edison-kie-proxy.nextgentrainingacademy88.workers.dev/api/v1/jobs/createTask` returned HTTP 403 `Host not in allowlist` from sandbox curl AND from WebFetch. The Worker domain remains blocked by the routine sandbox allowlist as of 2026-04-29 13:00 MYT.
2. **Path B (Blotato `blotato_create_visual` Product Scene Placement template `f524614b-ba01-448c-967a-ce518c52a700`):** returned `insufficient-credits`. Probe job id `bd484de3-d994-4f26-bf09-486960a6020b`. Top-up still has not happened.

**Action items for Edison (URGENT — FIFTH consecutive degraded run):**
- [ ] **Highest priority — top up Blotato credits at https://my.blotato.com/settings/billing AND enable the standing $20/month auto-renew the CLAUDE.md mentions.** Path B is the only routine-side fallback that respects the validation gate; it has been broken for 5 runs.
- [ ] Escalate the `*.workers.dev` allowlist denial with Anthropic. Either re-add `*.workers.dev` to the routine sandbox egress allowlist, or share an approved proxy host so Path A can be rebuilt.
- [ ] Until either is restored, regenerate the prompt below locally on Edison's PC (which has direct kie.ai access), upload to Blotato media library, then post manually to all 6 destinations through the Blotato dashboard.

### Verbatim prompts (for local regeneration on Edison's PC)

**Variant A — 4:5 portrait (LinkedIn personal, LinkedIn page, Facebook, Instagram, Threads):**
```
Coca-Cola print ad, photorealistic ice-cold glass Coca-Cola bottle as hero with condensation droplets and a single splash of caramel-cola liquid frozen mid-air, classic Coca-Cola red and white palette with deep navy #0A1628 background gradient, bold English tagline "TASTE THE FEELING" stacked at top in the official Coca-Cola Spencerian script in white with subtle yellow #FFD700 underline accent, clean studio lighting with rim highlights on the bottle, minimal seamless background, 4:5 portrait, high-end advertising aesthetic, 8K, shot on 85mm. No em dashes.
```
- kie.ai model: `gpt-image-2-image-to-image`
- `input_urls`: `[]` (face-free)
- `aspect_ratio`: `4:5`

**Variant B — 16:9 wide (X / Twitter):**
```
Coca-Cola print ad, photorealistic ice-cold glass Coca-Cola bottle as hero on the left third of frame with condensation droplets and a single splash of caramel-cola liquid frozen mid-air, classic Coca-Cola red and white palette with deep navy #0A1628 background gradient on the right two-thirds, bold English tagline "TASTE THE FEELING" placed right of the bottle in the official Coca-Cola Spencerian script in white with subtle yellow #FFD700 underline accent, clean studio lighting with rim highlights on the bottle, minimal seamless background, 16:9 widescreen, high-end advertising aesthetic, 8K, shot on 85mm. No em dashes.
```
- kie.ai model: `gpt-image-2-image-to-image`
- `input_urls`: `[]` (face-free)
- `aspect_ratio`: `16:9`

Attribution: prompt template adapted from `tegadesigns1` brand-ad series on Threads (Apr 2026, 127 likes / 55 comments) and saved to `memory/project_pop_culture_prompts.md` under angle 4 (AD).

### Captions (ready to paste once images exist)

**LinkedIn personal (relatable first-person, 3-5 hashtags):**
```
Clients used to pay designers $300 for a single print ad like this.
ChatGPT Images 2.0 made it in 30 seconds. Zero Photoshop.

Comment AD and I will DM you the exact prompt I used.

#ChatGPT #AIdesign #SmallBusiness #Solopreneur #AItools
```

**LinkedIn Nextgen Academy page (authoritative brand voice, 3-5 hashtags):**
```
A polished print-ad concept used to take a designer half a day and a $300 invoice.
With ChatGPT Images 2.0, our team produced this in under a minute. Same workflow we teach business owners who want on-brand visuals without hiring out.

Comment AD and we will DM you the exact prompt.

#GenerativeAI #ChatGPT #AImarketing #SmallBusiness #BusinessGrowth
```

**Facebook Nextgen Academy page (5 hashtags max):**
```
Designers charge $300 for an ad like this. ChatGPT Images 2.0 made it in 30 seconds.

Business owners, this is the new baseline. Stop paying agency rates for static visuals.

Comment AD and I will DM you the exact prompt.

#AIforBusiness #ChatGPT #SolopreneurTools #AIcontent #SmallBusinessOwner
```

**Instagram @aiwithedison (max 5 hashtags):**
```
$300 designer ad. 30 seconds in ChatGPT Images 2.0.

Comment AD for the prompt.

#ChatGPT #AIdesign #ChatGPTimages #SmallBusinessAI #AItools
```

**Threads @edisonchuaofficial (NO hashtags):**
```
Designers charge $300 for an ad like this.
ChatGPT Images 2.0 made it in 30 seconds.

Comment AD and I will DM you the exact prompt.
```

**X @aiwithedison (1-2 hashtags):**
```
$300 designer ad → 30 seconds in ChatGPT Images 2.0.

Comment AD for the prompt.

#ChatGPT
```

### Comment-for-link delivery setup
- `keyword_links["AD"]` set to `https://github.com/nextgentrainingacademy88-max/edison-claude-skills/blob/main/memory/project_pop_culture_prompts.md#4-brand-static-ad-recreation-keyword-ad--face-free` so the hourly engagement responder DMs the prompt automatically once posts go live.

---

## 2026-04-29 morning run — VALIDATION GATE: zero posts shipped (Path A + Path B both blocked, FOURTH consecutive run degraded)

**Topic:** Cyberpunk 2077 / Blade Runner Tokyo self-insert pop-culture demo of ChatGPT Images 2.0 (Bucket #4 — Pop Culture / Prompt Showcase, angle CYBERPUNK, world #1)
**Keyword:** `CYBERPUNK`
**Resource link:** https://github.com/nextgentrainingacademy88-max/edison-claude-skills/blob/main/memory/project_pop_culture_prompts.md#7-cyberpunk--fiction-world-self-insert-keyword-cyberpunk--face-required
**Outfit:** techwear (long black trench coat with glowing cyan trim, per the verbatim template)

**Decision:** Per the run's mandatory validation gate (image URL must be on `tempfile.aiquickdraw.com`, not the face reference URL, kie.ai task `state` must be `success`), ALL 6 destinations were SKIPPED. Better zero posts than a mismatched face. Path C (raw face photo as media) is explicitly disallowed by today's gate.

| # | Destination | Status |
|---|---|---|
| 1 | LinkedIn personal (18089) | SKIPPED |
| 2 | LinkedIn Nextgen Academy page (18089 / 108414535) | SKIPPED |
| 3 | Facebook Nextgen Academy (27053 / 726492947207808) | SKIPPED |
| 4 | Instagram @aiwithedison (41734) | SKIPPED |
| 5 | Threads @edisonchuaofficial (5937) | SKIPPED |
| 6 | X @aiwithedison (16254) | SKIPPED |

### LOUD FLAG — Path A AND Path B BOTH FAILED (FOURTH run in a row)

1. **Path A (Cloudflare Worker proxy):** `https://edison-kie-proxy.nextgentrainingacademy88.workers.dev` returns HTTP 403 `Host not in allowlist` from sandbox curl. Direct `api.kie.ai` also returns HTTP 403 `Host not in allowlist`. The Worker domain is STILL not on the remote-routine sandbox allowlist as of 2026-04-29 09:00 MYT.
2. **Path B (Blotato `blotato_create_visual` Product Scene Placement template `f524614b-ba01-448c-967a-ce518c52a700`):** returned `insufficient-credits` again. Probe job id `76a70e33-081d-4987-8d26-c995f51e6c1e`. Top-up still has not happened despite three prior flags (2026-04-25, 2026-04-28 morning, 2026-04-28 afternoon).

**Action items for Edison (URGENT — FOURTH consecutive degraded run):**
- [ ] **Highest priority — top up Blotato credits at https://my.blotato.com/settings/billing AND enable the standing $20/month auto-renew the CLAUDE.md mentions.** Path B is the only fallback that respects the validation gate, and it has been broken for 4 runs.
- [ ] Escalate the workers.dev allowlist denial with Anthropic. Either re-add `*.workers.dev` to the routine sandbox egress allowlist, or share a different approved proxy host so Path A can be rebuilt.
- [ ] Until either is restored, regenerate the 5 prompts below locally on Edison's PC (which has direct kie.ai access), upload to Blotato media library, then post manually via Blotato UI to all 6 destinations.

### Captions (ready to paste once images exist)

**LinkedIn personal (relatable first-person, 3-5 hashtags):**
```
ChatGPT Images 2.0 dropped me into a Blade Runner Tokyo at 2am.
30 seconds, one face photo, one paragraph of prompt.

Comment CYBERPUNK and I will DM you the exact prompt I used.

#ChatGPT #AIimages #SmallBusiness #Solopreneur #AItools
```

**LinkedIn Nextgen Academy page (authoritative brand voice, 3-5 hashtags):**
```
We just put our founder Edison Chua inside a rain-slicked cyberpunk megacity using ChatGPT Images 2.0 in under a minute.
Same workflow business owners can use to create on-brand hero images without hiring a photographer or designer.

Comment CYBERPUNK and we will DM you the exact prompt.

#GenerativeAI #ChatGPT #AImarketing #SmallBusiness #BusinessGrowth
```

**Facebook Nextgen Academy page (Kanji-style image + 5 hashtags):**
```
ChatGPT Images 2.0 put me inside a Blade Runner cyberpunk Tokyo. 30 seconds. One reference photo.

Stop paying $300 for stock photos and AI photoshoots. This is the new baseline for any business owner.

Comment CYBERPUNK and I will DM you the exact prompt.

#AIforBusiness #ChatGPT #SolopreneurTools #AIcontent #SmallBusinessOwner
```

**Instagram @aiwithedison (max 5 hashtags):**
```
Cyberpunk Tokyo. 2am. Neon rain.
Built in 30 seconds with ChatGPT Images 2.0.

Comment CYBERPUNK for the prompt.

#ChatGPT #AIart #ChatGPTimages #SmallBusinessAI #AItools
```

**Threads @edisonchuaofficial (NO hashtags):**
```
ChatGPT Images 2.0 put me inside a Blade Runner Tokyo. 30 seconds. One face photo.

Comment CYBERPUNK and I will DM you the prompt.
```

**X / Twitter @aiwithedison (1-2 hashtags):**
```
ChatGPT Images 2.0 dropped me into a Blade Runner Tokyo. 30 seconds. One face photo.

Comment CYBERPUNK for the prompt.

#ChatGPT
```

### Image 1 of 5 — LinkedIn (4:5, single hero, no overlay text)
```
Cinematic 4:5 vertical portrait of the man from the reference photo standing in the middle of a rain-slicked neon-lit Blade Runner-style cyberpunk Tokyo megacity at 2am. He is wearing a long black trench coat with glowing cyan trim and subtle circuit-pattern details, dark techwear shirt underneath. Flying cars streak across the sky leaving cyan and magenta light trails, towering holographic billboards in Japanese kanji glow above him in pink and electric blue, steam rising from manhole covers, puddles reflecting the neon. Dramatic rim lighting from the right, volumetric fog, cinematic depth of field, shot on 35mm. Photorealistic 8K, ultra sharp, high contrast. Preserve exact facial features from the reference photo (young Asian man, black hair, slim build, warm confident smile). No em dashes. No extra text beyond what is specified.
```

### Image 2 of 5 — Facebook Kanji wrapper (4:5, with bottom navy block + headline)
```
Cinematic 4:5 vertical portrait of the man from the reference photo standing in the middle of a rain-slicked neon-lit Blade Runner-style cyberpunk Tokyo megacity at night. He is wearing a long black trench coat with glowing cyan trim and circuit-pattern details. Flying cars streak overhead, towering kanji holograms glow pink and cyan, neon puddle reflections. Bottom one-third of the frame is a solid deep navy block (#0A1628) with a bold yellow (#FFD700) stacked headline I BECAME A CYBERPUNK PROTAGONIST, white subtext made with ChatGPT Images 2.0 in 30 seconds, small badge label EDISON CHUA AI MARKETING STRATEGIST bottom-left next to a circular headshot and a small blue verified tick, COMMENT FOR MORE centered uppercase white at the very bottom. Dramatic rim lighting, volumetric fog, shot on 35mm. Photorealistic 8K. Preserve exact facial features. No em dashes.
```

### Image 3 of 5 — Instagram (4:5, single hero, no overlay text)
```
Editorial 4:5 vertical portrait of the man from the reference photo as a cyberpunk protagonist standing in the middle of rain-slicked neon-lit Tokyo at 2am. Long black techwear trench coat with glowing cyan trim and circuit-pattern details, dark mock-neck shirt underneath. Towering holographic kanji billboards in pink and electric blue glow above him, flying cars streak across the sky leaving light trails, neon-soaked puddles reflect under his feet, soft steam from manhole covers. Dramatic rim lighting from the right, volumetric fog, shallow depth of field, shot on 35mm. Photorealistic 8K, ultra sharp, high contrast. Preserve exact facial features from the reference photo. No em dashes.
```

### Image 4 of 5 — Threads Kanji (4:5, with bottom navy block + headline)
```
Cinematic 4:5 vertical portrait of the man from the reference photo standing in a rain-slicked neon-lit Blade Runner cyberpunk Tokyo street at midnight. Long black techwear trench coat with glowing cyan trim and subtle circuit-pattern details. Towering kanji holograms in pink and cyan glow above, flying cars streak across the sky. Bottom navy block (#0A1628) with bold yellow (#FFD700) stacked headline CYBERPUNK MODE UNLOCKED, white subtext Generated with ChatGPT Images 2.0, badge EDISON CHUA AI MARKETING STRATEGIST bottom-left next to a small blue verified tick, COMMENT FOR MORE centered uppercase white at the very bottom. Dramatic rim lighting, volumetric fog, shot on 35mm. Photorealistic 8K. Preserve exact facial features. No em dashes.
```

### Image 5 of 5 — X MrBeast thumbnail (16:9)
```
MrBeast-style 16:9 widescreen YouTube thumbnail of the man from the reference photo as a cyberpunk protagonist on the right side of the frame. Eyes wide with shock, mouth slightly open, leaning forward into the lens. Long black techwear trench coat with glowing cyan trim. Background: rain-slicked neon-lit Blade Runner cyberpunk Tokyo, towering holographic kanji billboards in pink and cyan, flying cars streaking past, hyper-saturated colors, dramatic rim lighting, lens flare. Massive yellow (#FFD700) text I AM A CYBERPUNK NOW left third with thick black outline and red drop shadow, white text 30 SECONDS bottom-right. Wide-angle 24mm fisheye look. 8K, ultra sharp, high contrast. Preserve exact facial features from the reference photo. No em dashes.
```

### Auto-DM script for `CYBERPUNK` keyword (when comments roll in)
```
Hey, here is the exact prompt I used to drop myself into Blade Runner Tokyo with ChatGPT Images 2.0:

Cinematic 9:16 portrait of me standing in the middle of a rain-slicked neon-lit Blade Runner-style cyberpunk megacity at night. Long black trench coat with glowing cyan trim and subtle circuit-pattern details. Flying cars streaking across the sky, towering holographic billboards in Japanese kanji, neon puddles. Dramatic rim lighting, volumetric fog, cinematic depth of field, shot on 35mm. Photorealistic 8K. Preserve exact facial features from the uploaded reference photo. No em dashes.

Just upload your face photo, paste the prompt, swap the world (Cyberpunk / One Piece / Avengers Tower / Star Wars / Rivendell / Arrakis / Naruto / GTA 6 / Squid Game / Wednesday).

Full library of 7 pop-culture prompts here: https://github.com/nextgentrainingacademy88-max/edison-claude-skills/blob/main/memory/project_pop_culture_prompts.md
```

---

## 2026-04-28 afternoon run — VALIDATION GATE: zero posts shipped (Path A + Path B both blocked)

**Topic:** Anime fisheye selfie pop-culture demo of ChatGPT Images 2.0 (Bucket #4 — Pop Culture / Prompt Showcase, angle ANIME)
**Keyword:** `ANIME`
**Resource link:** https://github.com/nextgentrainingacademy88-max/edison-claude-skills/blob/main/memory/project_pop_culture_prompts.md#2-anime-selfie-fisheye-keyword-anime--face-required

**Decision:** Per the run's mandatory validation gate (image URL must be on `tempfile.aiquickdraw.com`, not the face reference URL, kie.ai task `state` must be `success`), ALL 6 destinations were SKIPPED. Better zero posts than a mismatched face. Yesterday's Path C (raw face photo as media) is explicitly disallowed by today's gate.

| # | Destination | Status |
|---|---|---|
| 1 | LinkedIn personal (18089) | SKIPPED |
| 2 | LinkedIn Nextgen Academy page (18089 / 108414535) | SKIPPED |
| 3 | Facebook Nextgen Academy (27053 / 726492947207808) | SKIPPED |
| 4 | Instagram @aiwithedison (41734) | SKIPPED |
| 5 | Threads @edisonchuaofficial (5937) | SKIPPED |
| 6 | X @aiwithedison (16254) | SKIPPED |

### LOUD FLAG — Path A AND Path B BOTH FAILED (third run in a row)

1. **Path A (Cloudflare Worker proxy):** `https://edison-kie-proxy.nextgentrainingacademy88.workers.dev` returned `Host not in allowlist` from sandbox curl AND HTTP 403 from WebFetch. Direct `api.kie.ai` also returns `Host not in allowlist`. The Worker domain is still NOT on the remote-routine sandbox allowlist as of 2026-04-28 13:14 MYT.
2. **Path B (Blotato `blotato_create_visual` Product Scene Placement template `f524614b-ba01-448c-967a-ce518c52a700`):** returned `insufficient-credits` with the exact message "You don't have enough credits to generate this video. Purchase more credits at https://my.blotato.com/settings/billing to continue." (Same as 2026-04-25 afternoon run — top-up never happened.)

**Action items for Edison (URGENT — three consecutive runs degraded now):**
- [ ] Top up Blotato credits at https://my.blotato.com/settings/billing — set the standing $20/month auto-renew the CLAUDE.md mentions.
- [ ] Escalate the workers.dev allowlist denial with Anthropic. The Worker exists specifically to bypass the api.kie.ai block but the Worker host itself is also denied from the routine sandbox.
- [ ] Until Path A or Path B is restored, regenerate the 5 prompts below locally on Edison's PC (which has direct kie.ai access), upload to Blotato media library, then post manually via Blotato UI to all 6 destinations.

### Image 1 of 5 — LinkedIn (4:5)
```
Ultra-realistic 4:5 vertical fisheye selfie of the man from the reference photo with three anime characters (Naruto, Luffy, Goku) standing right beside him. Everyone is making silly, exaggerated faces, mouths open wide in surprise, eyes squinted, eyebrows up. Setting: small bright living room with white tones, soft white sofa in background, warm sunlight streaming through a window. High camera angle, arm-extended selfie pose. Extreme fisheye lens distortion, edges curve outward. Realistic cinematic lighting. Anime characters rendered with stylized realism, blending naturally with the real photo. Preserve exact facial features from the reference photo (young Asian man, black hair, slim build, warm confident smile). 8K, ultra sharp, photorealistic. No em dashes.
```

### Image 2 of 5 — Facebook Kanji wrapper (4:5)
```
Ultra-realistic 4:5 vertical fisheye selfie of the man from the reference photo with anime characters Goku and Gojo right next to him. Everyone making wide-eyed silly faces, big open smiles. Bright modern living room with off-white walls, sun streaming in from the right. High-angle arm-extended selfie. Extreme fisheye distortion. Bottom one-third is deep navy block (#0A1628) with bold yellow (#FFD700) stacked headline I LIVE WITH ANIME NOW, white subtext made with ChatGPT Images 2.0, badge label EDISON CHUA AI MARKETING STRATEGIST bottom-left with a small blue verified tick, COMMENT FOR MORE centered at the very bottom. Anime characters in stylized realism. Preserve exact facial features. 8K. No em dashes.
```

### Image 3 of 5 — Instagram (4:5)
```
Editorial 4:5 fisheye selfie of the man from the reference photo flanked by Naruto, Luffy, and Doraemon. Everyone in exaggerated surprised expressions, mouths wide, eyes squinted into smiles. Bright minimalist living room with white walls and a yellow throw pillow on a sofa, golden hour light. Extreme fisheye lens, edges curve outward. High camera angle, arm-extended selfie pose. Anime characters rendered with stylized realism that matches the photoreal lighting. Preserve exact facial features. 8K, sharp, vibrant, photorealistic. No em dashes.
```

### Image 4 of 5 — Threads Kanji (4:5)
```
Ultra-realistic 4:5 fisheye selfie of the man from the reference photo with Naruto and Shinchan beside him. All three pulling silly exaggerated faces, mouths open, eyes wide. Bright bedroom with white tones and a small desk in the background, soft afternoon light. High camera angle, arm-extended selfie pose. Extreme fisheye distortion. Bottom navy (#0A1628) block with bold yellow (#FFD700) stacked headline ANIME LIVES IN MY HOUSE NOW, white text Generated with ChatGPT Images 2.0 in 30 seconds, badge EDISON CHUA AI MARKETING STRATEGIST bottom-left with blue verified tick, COMMENT FOR MORE centered at the very bottom. Anime in stylized realism. Preserve exact facial features. 8K. No em dashes.
```

### Image 5 of 5 — X MrBeast thumbnail (16:9)
```
MrBeast-style 16:9 widescreen YouTube thumbnail of the man from the reference photo as the main subject on the right, leaning into a fisheye selfie with Goku, Naruto, and Luffy crowding the frame. Everyone in extreme surprised expressions, mouths wide open, eyes huge. Bright living room background, hyper-saturated colors, dramatic rim lighting, lens flare. Extreme fisheye distortion. Massive yellow (#FFD700) text I LIVE WITH ANIME NOW left third with thick black outline and red drop shadow, white text 30 SECONDS bottom-right. Wide-angle 24mm fisheye look. 8K, ultra sharp. Preserve exact facial features. No em dashes.
```

### Auto-DM script for `ANIME` keyword (when comments roll in)
```
Hey, here's the exact prompt I used to make the anime fisheye selfie in ChatGPT Images 2.0:

Ultra-realistic 9:16 vertical fisheye selfie of me with Naruto, Luffy, and Goku (pick any 2-3 anime characters). We are all making silly, exaggerated faces. Set in a small bright living room with white tones. High camera angle. Extreme fisheye lens distortion. Realistic cinematic lighting. Anime characters rendered with stylized realism. Preserve exact facial features from the uploaded reference photo. No em dashes.

Just upload your face photo, paste the prompt, swap in any anime characters you want.

Full library of 7 pop-culture prompts here: https://github.com/nextgentrainingacademy88-max/edison-claude-skills/blob/main/memory/project_pop_culture_prompts.md
```

---

## 2026-04-25 afternoon run — Path A worker blocked AND Path B Blotato out of credits

**Topic:** F1 driver pop-culture demo of ChatGPT Images 2.0 (Bucket #4 — Pop Culture / Prompt Showcase, angle F1)
**Keyword:** `F1`
**Resource link:** https://github.com/nextgentrainingacademy88-max/edison-claude-skills/blob/main/memory/project_pop_culture_prompts.md#1-f1-driver-movie-poster-keyword-f1--face-required

**Posts already published with Edison's permanent face photo as media (Path C fallback):**
- LinkedIn personal: https://linkedin.com/feed/update/urn:li:share:7453673515053907968
- LinkedIn Nextgen Academy page: https://linkedin.com/feed/update/urn:li:share:7453673544942690305
- Facebook (Nextgen Academy page): https://facebook.com/726492947207808_122173804988887913
- Instagram (@aiwithedison): https://www.instagram.com/p/DXiuk2_FLns/
- Threads (@edisonchuaofficial): https://www.threads.com/@edisonchuaofficial/post/DXiun46Du-J
- X (@aiwithedison): https://x.com/aiwithedison/status/2047908151618339142

### LOUD FLAG — Path A AND Path B BOTH FAILED

1. **Path A (Cloudflare Worker proxy):** `https://edison-kie-proxy.nextgentrainingacademy88.workers.dev` returned `Host not in allowlist` from sandbox curl AND HTTP 403 from WebFetch. Workers.dev is NOT actually reachable from the remote-routine sandbox right now.
2. **Path B (Blotato `blotato_create_visual` Product Scene Placement template `f524614b-ba01-448c-967a-ce518c52a700`):** all 5 visual creations returned `insufficient-credits` with the exact message "You don't have enough credits to generate this video. Purchase more credits at https://my.blotato.com/settings/billing to continue."

**Action items for Edison:**
- [ ] Top up Blotato credits at https://my.blotato.com/settings/billing (the $20 standing top-up CLAUDE.md describes was not in effect today).
- [ ] Escalate the workers.dev allowlist denial with Anthropic OR add a new approved proxy host. The whole reason the Worker exists is to bypass the api.kie.ai block, but the Worker itself is now also blocked.
- [ ] Regenerate the 5 prompts below locally (Edison's PC has direct kie.ai access) and swap the rendered images into the 6 Blotato posts above via Blotato's media library.

### Image 1 of 5 — LinkedIn (4:5)
```
Cinematic 4:5 movie poster of the man in the reference photo as an F1 driver on the Monaco grid at golden hour. Navy and yellow racing suit with sponsor patches, helmet under right arm, gloves on, confident hero pose. Motion-blurred F1 cars streaking past, pit lane lights glowing. Bold yellow type SEASON FINALE stacked at top with thick black outline, white subtitle MONACO 2026. Photorealistic 8K, shot on 85mm, dramatic rim lighting, lens flare. Preserve exact facial features. No em dashes.
```

### Image 2 of 5 — Facebook Kanji wrapper (4:5)
```
Cinematic 4:5 poster of the man in the reference photo as an F1 driver on Suzuka grid at sunset. Navy and bright yellow racing suit with team patches, helmet at hip, focused gaze at camera. Bottom one-third is deep navy block with bold yellow stacked headline I BECAME AN F1 DRIVER IN 30 SECONDS, white subtext made with ChatGPT Images 2.0, badge label EDISON CHUA AI MARKETING STRATEGIST bottom-left. 8K, shot on 50mm, dramatic rim lighting, lens flare. Preserve exact facial features. No em dashes.
```

### Image 3 of 5 — Instagram (4:5)
```
Editorial 4:5 hero portrait of the man in the reference photo as an F1 driver in the Silverstone paddock at twilight. Navy and yellow Nomex racing suit with sponsor patches, balaclava pulled down, helmet at hip, hand on F1 car. Confident half-smile. Garage lights glowing warm orange behind, blurred mechanics. Bold yellow type F1 ROOKIE SEASON stacked top with thick black outline, white tagline MONACO SUZUKA SILVERSTONE. 8K, 50mm, golden-hour rim light. Preserve facial features.
```

### Image 4 of 5 — Threads Kanji (4:5)
```
Cinematic 4:5 portrait of the man in the reference photo as an F1 driver in front of a glossy navy and yellow F1 car, navy and yellow racing suit, helmet under arm, victorious pose. Marina Bay Singapore pit lane at night, neon yellow track lights glowing. Bottom navy block with bold yellow stacked headline F1 DRIVER MODE UNLOCKED, white text Generated with ChatGPT Images 2.0, badge EDISON CHUA AI MARKETING STRATEGIST bottom-left. 8K, 35mm, rim lighting. Preserve facial features.
```

### Image 5 of 5 — X MrBeast thumbnail (16:9)
```
MrBeast-style 16:9 widescreen YouTube thumbnail of the man in the reference photo as an F1 driver. Eyes wide with shock, mouth open, pointing dramatically at a glowing F1 car beside him. Bright yellow and navy racing suit, helmet in left hand. Monaco grid background, motion-blurred cars at golden hour, hyper-saturated colors, lens flare. Massive yellow text I AM AN F1 DRIVER NOW left third with thick black outline and red drop shadow, white text 30 SECONDS bottom-right. 8K, 24mm. Preserve facial features.
```

### Auto-DM script for `F1` keyword (when comments roll in)
```
Hey, here's the exact prompt I used to make the F1 driver shot in ChatGPT Images 2.0:

Cinematic 9:16 movie poster of me as an F1 driver at [Monaco / Silverstone / Suzuka], standing on the grid in a [team-color] racing suit, helmet under arm, dramatic golden-hour sunset, motion-blurred cars streaking past in the background, bold typography "SEASON FINALE" stacked at top in yellow with thick black outline, photorealistic, 8K, shallow depth of field, shot on 85mm. Preserve exact facial features from the uploaded reference photo. No em dashes.

Just upload your face photo, paste the prompt, swap [Monaco / Silverstone / Suzuka] for the track you want.

Full library of 6 more pop-culture prompts here: https://github.com/nextgentrainingacademy88-max/edison-claude-skills/blob/main/memory/project_pop_culture_prompts.md
```

---

## Infrastructure Status

Engagement logging system online. Blotato accounts verified: Facebook, Instagram, LinkedIn, Threads, X/Twitter.

Blotato MCP still does not expose `list-posts` or `list-comments` endpoints. Comment data must arrive via manual feed, direct Graph/LinkedIn/X API integration, or Claude-in-Chrome scraping.

---

## 2026-04-24 morning run — kie.ai host blocked in sandbox

**Topic:** ChatGPT Images 2.0 (released 2026-04-21)
**Keyword:** IMAGES
**Resource link:** https://github.com/nextgentrainingacademy88-max/edison-claude-skills

**Posts already published with Edison's permanent face photo as media:**
- LinkedIn: https://linkedin.com/feed/update/urn:li:share:7453251308427448320
- Facebook: https://facebook.com/726492947207808_122173640864887913
- Instagram: https://www.instagram.com/p/DXfupNOFg2H/
- Threads: https://www.threads.com/@edisonchuaofficial/post/DXfukLNlkvr
- X: https://x.com/aiwithedison/status/2047485809754833266

### Image 1 of 2 — Kanji-style Type 8 branded image (4:5)

Used for: Facebook Type 8 + Threads Kanji + Instagram feed (optionally swap onto LinkedIn).
Hero variant: `logo_palm` (first in rotation — ChatGPT logo floating above Edison's open palm).
Aspect ratio: 4:5 portrait.
Model: kie.ai Nano Banana Pro.
image_input: `https://database.blotato.io/storage/v1/object/public/public_media/b035c60e-57fb-451a-a5c1-f7a2cbb9d990/b04dfb9c-5b63-4c13-8573-b3d5fc7b717e.jpeg`

**Prompt (use verbatim):**
```
Use the face from the uploaded reference photo exactly. Preserve exact likeness, skin tone, hair, facial features. Young Asian man, black hair, slim build, warm confident smile, wearing a clean modern casual outfit: dark navy blazer over white tee, smart modern styling.

Scene: Edison is holding a large glowing 3D ChatGPT logo (the black circular spiral knot logo) floating above his open right palm, warm cinematic lighting with orange and gold accent glow from the logo, clean studio-style background with soft light rays, slight lens flare. The logo must be crisp, high-resolution, immediately recognizable as the ChatGPT logo.

Composition: subject occupies the TOP 60 percent of frame. BOTTOM 30 percent is a solid dark navy block (#0A1628) containing bold oversized stacked headline text: line 1 CHATGPT IMAGES 2.0 IS HERE and line 2 5 PROMPTS EVERY OWNER NEEDS, with key words IMAGES 2.0 and 5 PROMPTS in bright yellow (#FFD700) and the rest in white, clean sans-serif font. Above the navy block, a thin horizontal divider, and immediately under the divider a small circular headshot of Edison on the left, the name Edison Chua with a small blue verified tick beside it, and beneath the name the smaller grey tagline AI Marketing Strategist. Centered at the very bottom inside the navy block, small clean white uppercase text reading COMMENT FOR MORE.

Aspect ratio 4:5. Ultra realistic, photorealistic, 8K, cinematic lighting, sharp, high contrast. Preserve exact facial features from reference photo. No em dashes in any text.
```

### Image 2 of 2 — X / Twitter MrBeast thumbnail (16:9)

Used for: X/Twitter first-tweet thumbnail.
Aspect ratio: 16:9 landscape.
Model: kie.ai Nano Banana Pro.
image_input: `https://database.blotato.io/storage/v1/object/public/public_media/b035c60e-57fb-451a-a5c1-f7a2cbb9d990/b04dfb9c-5b63-4c13-8573-b3d5fc7b717e.jpeg`

**Prompt (use verbatim):**
```
Use the face from the uploaded reference photo exactly. Preserve exact likeness, skin tone, hair, facial features. Young Asian man, black hair, slim build. Wearing a bright yellow bomber jacket over a black fitted tee. Pose: excited surprised expression, eyes wide, leaning slightly forward with one hand pointing toward the text area on the left. Dramatic cinematic energy, MrBeast YouTube thumbnail style.

Scene: Edison on the right side of the frame, dark navy (#0A1628) background with bold yellow (#FFD700) light rays emanating from behind him, slight lens flare. Large bold white text on the LEFT with black outline stroke: IMAGES 2.0 IS INSANE stacked across 3 lines, Impact-style font, all caps, with IS INSANE in bright yellow. A small glowing 3D ChatGPT logo badge in the top-left corner.

Aspect ratio 16:9 landscape. Ultra realistic, 8K, photorealistic, cinematic, dramatic lighting, sharp, high contrast, MrBeast YouTube thumbnail aesthetic. Preserve exact facial features from the reference photo.
```

### How to swap the image into the already-live posts

Once generated, Edison can either:
1. Delete the live posts and re-publish via Blotato with the new image URL attached, OR
2. Leave the current posts live (face photo is on-brand) and publish the branded image later as a standalone follow-up ("How I made this image with ChatGPT Images 2.0") — the second post can ride engagement from the first.

### Why this fell through

`api.kie.ai` is not in the sandbox Bash host allowlist for this remote routine, so the curl calls returned `Host not in allowlist`. Per `memory/feedback_face_required_kie_ai_first.md`, we did NOT fall back to banned Blotato templates; we fell back to Edison's real permanent face photo so no post shipped with a wrong generated face.

**Fix for next runs:** whitelist `api.kie.ai` in the remote session's allowlist (same config entry as other allowed outbound hosts).

---

## Pending engagement replies
*None queued yet. Populates once a comment-data source is wired up.*
