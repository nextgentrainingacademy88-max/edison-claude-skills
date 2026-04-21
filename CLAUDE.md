# Social Media Automation — Project Context

## Project Goal
Automate Edison Chua's daily social media posting across 5 platforms (LinkedIn, Facebook, Instagram, Threads, X/Twitter) using a scheduled remote routine that runs twice daily at **9:00 AM and 1:00 PM MYT**. Each run researches latest AI news, then generates platform-optimized content using a library of skills.

## User Profile
- **Name:** Edison Chua
- **Role:** HRDC-certified AI educator & corporate trainer, also runs a funnel agency
- **Platforms:** LinkedIn, Facebook, Instagram, Threads, X/Twitter
- **Email:** nextgentrainingacademy88@gmail.com
- **Topic Split:** 70% AI/tech (Claude, ChatGPT, NotebookLM, Manus, Gemini, Perplexity) | 30% funnel/agency
- **Content Split:** 80% value | 20% humor/entertainment

---

## Connected Services

| Service | Status | Notes |
|---------|--------|-------|
| **GitHub** | ✅ Connected | PAT stored in `.env` as `GITHUB_TOKEN` |
| **Google Drive** | ✅ Connected | Edison's photos folder shared "Anyone with link" |
| **Blotato** | ✅ Connected (MCP) | Used for posting to all 5 platforms |
| **kie.ai Nano Banana Pro** | API-based | Image generation |

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
- Covers LinkedIn, Facebook, X/Twitter (public replies) + Instagram DMs (private replies).
- Auto-replies to every new commenter. Delivers Google Drive PDF guide when a commenter asks for it (PDF links stored in `rotation-state.json` under `{platform}_pdf_links[topic_slug]`).
- Every Type 8 / Strategy A tips post needs a branded pin-comment image (Edison pointing down at "ALL X BELOW"). Pinning is manual — the responder logs "MANUAL PIN REQUIRED" to `./generated/engagement-manual-queue.md`.

### Threads
- Rotates: meme + caption AND YouTube thumbnail style

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
- **Image aspect ratios:** LinkedIn 4:5, Facebook 1:1 or 4:5, Instagram 4:5, Threads 1:1 or 4:5, X 1:1 or 16:9
- **Edison's face appearance:** Young Asian man, black hair, slim build, casual outfits (no suits), warm confident smile — must remain identical across all AI-generated images
- **Branding colors:** Deep dark navy `#0A1628` + bold yellow `#FFD700` + white body text
