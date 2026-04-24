# Social Media Automation — Project Context

## Project Goal
Automate Edison Chua's daily social media posting across 5 platforms (LinkedIn, Facebook, Instagram, Threads, X/Twitter) using a scheduled remote routine that runs twice daily at **9:00 AM and 1:00 PM MYT**. Each run researches latest AI news, then generates platform-optimized content using a library of skills.

## User Profile
- **Name:** Edison Chua
- **Role (Edison's background):** HRDC-certified AI educator & corporate trainer, also runs a funnel agency. Note: this is his credential, NOT his audience.
- **Target audience (who the content speaks TO):** Business owners, solopreneurs, SME founders, agency owners, and operators juggling multiple jobs (accounting / HR / admin / marketing). NEVER address trainers, training providers, L&D professionals, or employers. See `memory/project_target_audience.md` for the full framing guide.
- **Platforms:** LinkedIn, Facebook, Instagram, Threads, X/Twitter
- **Email:** nextgentrainingacademy88@gmail.com
- **Topic Split:** 70% AI/tech (Claude, ChatGPT, NotebookLM, Manus, Gemini, Perplexity) | 30% funnel/agency
- **Content Split:** 80% value | 20% humor/entertainment

### Content Focus (see memory/project_content_topic_strategy.md)
Every post falls into one of three buckets:
1. **Latest AI news / tool updates / new feature releases** (last 24-72 hrs only) — Claude updates, ChatGPT new features (e.g. GPT-5 image gen), NotebookLM, Manus, Gemini, Perplexity, Midjourney, Runway, ElevenLabs, Sora, Veo.
2. **Practical how-to tips** — "Here's how to use [tool] for [outcome]". Copy-paste prompts, workflow chains (Claude+NotebookLM, ChatGPT+Manus).
3. **How to make money with AI tools** — "How to make $1K/month with Claude Code", "The AI side-hustle stack", case studies.

### Comment-for-Link CTA Pattern
Every post promising a resource ends with: *"Comment [KEYWORD] and I'll DM you the [link/guide/PDF]."* Examples: `Comment CLAUDE` (GitHub repo), `Comment PROMPT` (prompt pack), `Comment GUIDE` (PDF), `Comment AGENT` (agent template). Keyword + Drive/GitHub link stored in `rotation-state.json` under `{platform}_pdf_links[topic_slug]` so the hourly engagement responder auto-delivers it.

---

## Connected Services

| Service | Status | Notes |
|---------|--------|-------|
| **GitHub** | ✅ Connected | PAT stored in `.env` as `GITHUB_TOKEN` |
| **Google Drive** | ✅ Connected | Edison's photos folder shared "Anyone with link" |
| **Blotato** | ✅ Connected (MCP) | Used for posting to all 5 platforms |
| **kie.ai ChatGPT Images 2.0 (model `gpt-image-2-image-to-image`, field `image_urls`)** | API-based | Image generation |

### Key Files & URLs
- **GitHub repo:** https://github.com/nextgentrainingacademy88-max/edison-claude-skills (public)
- **Google Drive folder:** https://drive.google.com/drive/folders/1MyvXqCm8Mhs02OCX1qyWotsT3Pj37Sm-
- **Drive folder ID:** `1MyvXqCm8Mhs02OCX1qyWotsT3Pj37Sm-`
- **Face photos subfolder ID:** `1_dYFMpgJIu_l08d3smTz1PJvYDAICJVO`
- **Workshop photos subfolder ID:** `1_Q7BHAyM9H7ebYFT4zENFtSVkzRN-8bo`

### Primary Face Photo (for AI image generation reference)
- **File:** `Edison Chua Face.jpeg`
- **Drive ID:** `1xtRHfRctuDwNtOcg9cAhupE5zC1NUikh`
- **Drive URL:** https://lh3.googleusercontent.com/d/1xtRHfRctuDwNtOcg9cAhupE5zC1NUikh
- **Blotato URL:** (to be added after first upload — see `assets-manifest.json`)

### Face Alternatives
- `edison2.jpeg` — ID: `1H3sn_ubomQ3CIlVQhTdc0LeLgIPG9fUd`
- `edison3.jpeg` — ID: `1W5-MWJtap3jqix5kJ6-95HW7yiXKXA1N`

---

## Skill Library (in GitHub repo)

| Skill | Platform(s) | Purpose |
|-------|-------------|---------|
| `linkedin-content-writer` | LinkedIn | Copy-only (must pair with image skill) |
| `edison-content-image-creator` | LinkedIn, Facebook | Workshop/Classroom/YouTube Thumbnail styles |
| `carousel-creator` | LinkedIn, Facebook, Instagram | Branded carousels (navy + yellow OR workshop rotation) |
| `edison-infographic-creator` | LinkedIn | Whiteboard/Analogy/Manga styles |
| `facebook-content-creator` | Facebook | 7 rotating post types |
| `threads-x-content-creator` | Threads, X/Twitter | Threads infographic + X bold thumbnail |
| `comment-engagement-responder` | LinkedIn, Facebook, Instagram DMs, X/Twitter | Hourly auto-reply to comments and DMs, delivers Google Drive PDF links on request, flags manual-pin items |

### LinkedIn Content Type Rotation (80/20 logic)
Every LinkedIn post = `linkedin-content-writer` + ONE image skill:
- **Standard rotation (80%):**
  - `edison-content-image-creator` (Workshop/Classroom/Thumbnail)
  - `carousel-creator` (branded navy + yellow)
  - `edison-infographic-creator` (Whiteboard/Chalkboard/Manga)
- **Workshop rotation (20%):**
  - `carousel-creator` workshop variant (Edison face cover + darkened workshop photo slides)

### Instagram Carousel
- Uses same style as LinkedIn `carousel-creator` (branded navy + yellow + Edison face)
- 80% standard / 20% workshop rotation

### Facebook
- 8 post types rotated (`facebook-content-creator`)
- **Type 8 (Kanji-style branded post) is the PREFERRED default** for AI tool/tip posts — Edison holding a floating brand logo, navy bottom block, yellow + white stacked headline, "Edison Chua | AI Marketing Strategist" verified badge, "COMMENT FOR MORE" CTA at the bottom. Inspired by Kanji Low's Facebook style.
- 80% standard / 20% workshop-photo-based (new subtype)

### Engagement / Comment Reply Routine
- Runs hourly via `comment-engagement-responder` skill + `social-media-engagement-hourly` scheduled task.
- **X/Twitter** — always automated via Blotato API (runs regardless of PC state).
- **Facebook, Instagram, LinkedIn** — automated via Claude-in-Chrome MCP driving Edison's real, logged-in browser session. Human-like typing cadence (50-120ms per char) and randomized 8-20s delays between replies keep it indistinguishable from Edison typing himself. Runs ONLY when Edison's PC is awake (probe Claude-in-Chrome at start of run; if it doesn't respond within 5s, assume PC asleep).
- **Fallback when PC is asleep OR a browser reply fails mid-run:** the responder prepares a full "DM package" (original comment + ready-to-send DM wording + Drive PDF link) and writes to `./generated/engagement-manual-queue.md` + prints to run summary. Edison copy-pastes from his phone.
- **Auto-PDF generation:** if a post promised a guide and no Drive link exists under `{platform}_pdf_links[topic_slug]` yet, the responder auto-generates a branded PDF (navy + yellow, "AI with Edison"), uploads to Drive, saves the link.
- Per-run caps to stay human: FB ≤8, IG ≤8, LinkedIn ≤5, X ≤20. If any reply attempt hits a login wall, 2FA prompt, rate-limit banner, or selector-not-found error, STOP that platform immediately for the run and fall through to manual queue.
- Pin-comment on Type 8 / Strategy A posts is always manual (platforms don't expose programmatic pin).

### Threads
- Uses the **Kanji-style branded image** (same visual family as Facebook Type 8) — Edison holding or standing beside a glowing 3D tool logo, verified author badge ("Edison Chua | AI Marketing Strategist"), bottom navy block with bold yellow + white stacked headline, "COMMENT FOR MORE" footer. Aspect ratio **4:5 portrait**, face-required (kie.ai ChatGPT Images 2.0 (model `gpt-image-2-image-to-image`, field `image_urls`) with permanent face URL).
- Hero-scene rotation: `logo_palm` → `two_logos` → `holo_panels` (tracked in `rotation-state.json` → `threads.last_kanji_hero`).
- Same topic as X/Twitter, adapted for each platform's format.

### X/Twitter
- Rotates: text-on-black, news photo overlay, YouTube thumbnail

---

## Daily Routine Design

**Schedule:** Daily at **9:00 AM and 1:00 PM MYT** (cron: `0 1,5 * * *` UTC)

**Flow per run:**
1. **Research** — WebSearch latest AI news (last 24 hrs) focusing on Claude, ChatGPT, NotebookLM, Manus, Gemini, Perplexity
2. **Pick top story** → use it as core topic for all 5 platforms
3. **Generate content per platform** (each skill applies its own voice/style):
   - LinkedIn → writer + rotated image skill
   - Facebook → facebook-content-creator (rotate types)
   - Instagram → carousel-creator
   - Threads + X/Twitter → threads-x-content-creator
4. **Post via Blotato** to all 5 connected accounts
5. **Update `rotation-state.json`** in GitHub with last-used styles

---

## State Management (remote memory)

Because routines run remotely with no persistent memory, state is stored in GitHub:

### `assets-manifest.json` (GitHub root)
Permanent asset URLs: face photo Blotato URL, workshop photo Drive URLs, etc.

### `rotation-state.json` (GitHub root)
Tracks last-used style per skill. Read at start of each run, updated at end.

Example structure documented in skills.

---



## Image Engine (as of 2026-04-24)

All face-required image generation uses **kie.ai ChatGPT Images 2.0** — model `gpt-image-2-image-to-image`, face reference passed in `image_urls: [face_primary.blotato_url]`. Replaces Nano Banana Pro as the default because Images 2.0 has better photorealism, better text rendering, and matches the "eat your own dogfood" rule (we post about Images 2.0, so we generate with Images 2.0).

Tool-match override: if a post's TOPIC is a specific image model (e.g. post about Midjourney 7, Seedream v5, Flux), generate the demo image with THAT tool when possible. Otherwise default to ChatGPT Images 2.0.

## Outfit Variety Rule (as of 2026-04-24)

Every skill file (facebook-content-creator, carousel-creator, threads-x-content-creator, edison-content-image-creator) now carries an **Outfit Variety Table** near the top. Rotate across 10 outfits — hoodies, bombers, denim, techwear, oversized crewnecks, etc. The old "dark navy blazer over white tee" default is DEPRECATED as the go-to look. Smart-casual blazer-on-tee is allowed at most 15% of runs for "BREAKING / big announcement" posts only. Rotation tracked via `rotation-state.json` → `image_generation.last_outfit`.



## Content Bucket #4 — Pop Culture / Prompt Showcase (as of 2026-04-24)

**Share: 30% of all daily posts.** See [memory/project_pop_culture_prompts.md](memory/project_pop_culture_prompts.md) for the full prompt library with 6 rotating angles (F1, ANIME, POSTER, AD, CINEMATIC, TABLE).

Pattern: a cool ChatGPT Images 2.0 generation + short caption + comment-for-prompt CTA. Keep captions under 3 lines. The KEYWORD matches the angle (F1 → F1 prompt, POSTER → 10 style prompts, etc.). The engagement responder auto-DMs the prompt via  → Drive PDF.

Rotation tracked via .

## Decisions Made

1. **Every LinkedIn post needs an image** — `linkedin-content-writer` is copy only, always paired with image skill.
2. **Instagram uses same style as LinkedIn carousel** — not Facebook-style.
3. **Threads rotates memes + YouTube thumbnails** — not meme-only.
4. **X/Twitter rotates 3 styles** — text-on-black, news overlay, YouTube thumbnail.
5. **80/20 split** — 80% standard content rotation, 20% workshop photo rotation.
6. **Face photo:** Upload `Edison Chua Face.jpeg` to Blotato ONCE, save URL permanently.
7. **Workshop photos:** Use Google Drive direct URLs (public), darken + text overlay for background use.
8. **GitHub PAT:** Stored in `.env` as `GITHUB_TOKEN` for auto-updating repo.

---

## Pending / Next Steps

- [x] Push all 6 skills to GitHub (done 2026-04-22)
- [x] Delete obsolete instagram-carousel-creator, threads-content-creator, x-twitter-content-creator dirs
- [x] rotation-state.json created with initial values
- [ ] Upload `Edison Chua Face.jpeg` to Blotato, save permanent URL to `assets-manifest.json`
- [ ] Collect all workshop photo Drive URLs into `assets-manifest.json`
- [ ] Push `assets-manifest.json` to GitHub

---

## Key Conventions

- **No em dashes** in any generated content (Edison's rule across all skills)
- **Hashtags:** LinkedIn 3-5, Facebook 5 max, Instagram 10-15, Threads 0, X 1-2 max
- **Image aspect ratios:** LinkedIn 4:5, Facebook 1:1 or 4:5, Instagram 4:5, Threads **4:5 (Kanji-style)**, X 1:1 or 16:9
- **Edison's face appearance:** Young Asian man, black hair, slim build, casual outfits (no suits), warm confident smile — must remain identical across all AI-generated images
- **Branding colors:** Deep dark navy `#0A1628` + bold yellow `#FFD700` + white body text
