---
name: facebook-content-creator
description: >
  Edison Chua's complete Facebook content creation system. Handles all 7 Facebook post types:
  plain text on black, YouTube thumbnail style (face + tool icons + bold text), celebrity/news
  photo + text overlay, text list posts, meme + caption, person collage + headline, and face +
  flow diagram posts. Generates images with ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) where needed, writes post copy, and
  schedules to Facebook via Blotato.

  Trigger when Edison says: "create a Facebook post", "make a Facebook image", "post this to
  Facebook", "create a Flash-style image", "make a superhero post", "create a text post for
  Facebook", "make a meme post", "create a list post", "make a news announcement post",
  "Facebook content about [topic]", or any request to produce Facebook content — even if
  Edison just says "Facebook post" or "post this".

  TEST MODE triggers (generate a single image, no post, no Blotato posting):
  - "test facebook post" or "test facebook image" → default to Type 8 Kanji-style
  - "test type 8" or "test kanji" or "test kanji post" → Type 8 Kanji-style specifically
  - "test facebook type [N]" → specific post type
  - "test pin comment" → generate the 1:1 Edison-pointing-down pin-comment image
  - "sample facebook cover" → Type 8 Kanji cover with placeholder topic
  Follow the exact prompt template in this file for the chosen type — read the Type section
  verbatim before generating.

  Always trigger for Facebook content requests. This skill decides which of the 8 post types
  fits best (Type 8 Kanji-style is the preferred default for AI tool/tip posts), generates
  the image if needed, writes the copy, and posts via Blotato.
---

## IMAGE GENERATION PRIORITY RULE

**kie.ai ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) is the ONLY path for every face-required Facebook post type.
Zero Blotato template fallbacks.**

### BLACKLIST — These Blotato templates are BANNED from this skill (they produced
the face-less plain-navy slide that was posted to Edison's Facebook on 2026-04-23):
- `/base/v2/tutorial-carousel/e095104b-e6c5-4a81-a89d-b0df3d7c5baf/v1` (Tutorial Carousel Monocolor)
- `/base/v2/tutorial-carousel/2491f97b-1b47-4efa-8b96-8c651fa7b3d5/v1` (Tutorial Carousel Flat)
- `/base/v2/quote-card/*` (Quote Card carousels)
- `/base/v2/tweet-card/*` (Tweet Card carousels)
- `9f4e66cd-b784-4c02-b2ce-e6d0765fd4c0` (Single Centered Text Quote)
- `/base/v2/image-slideshow/*`, `/base/v2/images-with-text/*` (slideshow templates)
- `53cfec04-2500-41cf-8cc1-ba670d2c341a` (Instagram Carousel Slideshow — will ignore
  passed face URL and still generate a generic Asian male)

### Face-required Facebook post types (kie.ai ONLY — no Blotato fallback)

- Type 2 (YouTube Thumbnail face + tools)
- Type 7 (Face + Flow Diagram)
- Type 8 (Kanji-style Branded Post — PREFERRED DEFAULT)
- Pin comment images (Edison pointing down)

kie.ai call template:
```
POST https://api.kie.ai/api/v1/jobs/createTask
Headers:
  Authorization: Bearer 6a2b2e230329d9a5ef971f5cc266b3ea
  Content-Type: application/json

{
  "model": "gpt-image-2-image-to-image",
  "input": {
    "prompt": "[full prompt]",
    "image_urls": ["[face_primary.blotato_url from assets-manifest.json]"],
    "aspect_ratio": "4:5",
    "resolution": "2K"
  }
}
```

The `${KIE_API_KEY}` value is `6a2b2e230329d9a5ef971f5cc266b3ea` — substitute it inline
when running from an environment where .env does not load (e.g. Anthropic remote
routines). Do NOT rely on env-var resolution.

If kie.ai fails: retry exactly twice (full prompt, then simplified prompt). If both
still fail, write the intended prompt + topic to `generated/engagement-manual-queue.md`,
SKIP the Facebook post for this run, move on. **NEVER publish a Facebook post with a
face-less or wrong-face image. Skipping is always preferred over publishing trash.**

### Face-free Facebook post types

- Type 1 (Plain text on black) — use kie.ai with empty image_input for the black canvas + text
- Type 3 (News photo) — use sourced photo, no generation
- Type 4 (Text list) — use kie.ai with empty image_input for branded list image
- Type 5 (Meme) — sourced meme image from imgflip / Reddit
- Type 6 (Person collage) — sourced photos

For Type 1 / Type 4 / any branded-graphic-only need, use kie.ai direct with
`image_urls: []`. The Blotato Whiteboard / Chalkboard / Manga / Newspaper templates
lock in a generic "Follow me for more | Repost" footer that doesn't match Edison's
branding — avoid them.

Log the path used per image in `rotation-state.json` → `image_generation.last_path_used`.

---




## OUTFIT VARIETY RULE (read before writing any image prompt)

Edison is DONE with the "dark navy blazer + white tee" default. Rotate outfits aggressively so he
looks like a real person with a wardrobe, not a corporate stock photo. Pick based on the scene
vibe and topic:

| # | Outfit | When to use |
|---|--------|-------------|
| 1 | Oversized black hoodie + simple chain | AI/tech tool news, late-night hacker vibe |
| 2 | Bright yellow bomber jacket + white tee | High-energy MrBeast thumbnail, shocked/excited poses |
| 3 | Denim jacket over black graphic tee | Instagram carousel, casual confident |
| 4 | Cream oversized crewneck + baseball cap | Chill tip/tutorial posts, "texting a friend" vibe |
| 5 | Olive utility jacket + olive cargo + white sneaker | Streetwear fashion-forward, pop culture posts |
| 6 | Washed indigo denim shirt (open) over plain tee | Warm "behind the scenes" / founder story |
| 7 | Techwear black zip-up + minimal cargo | Cyberpunk / agentic-AI themes |
| 8 | Heather-grey zip hoodie + black tee | Productivity, "how to" list posts |
| 9 | Retro color-block track jacket (navy+orange+cream) | Fun high-contrast pop culture / meme moments |
| 10 | Smart casual: navy blazer over a color tee with jeans | Only for "BREAKING / big announcement" posts — use sparingly, max 15% of runs |

**Hard rules:**
- NEVER a full suit, NEVER a tie, NEVER a dress shirt tucked in with slacks.
- The blazer-on-tee combo (#10) is a premium variant, not the default. Use at most 1 in every 7 posts.
- Rotate — never repeat the same outfit two posts in a row. Track `rotation-state.json` → `image_generation.last_outfit` across runs.
- Topic-match wins over strict rotation: a techwear topic uses #7 regardless of rotation.
- Keep his face, skin, and hair consistent (young Asian man, black hair, slim build, warm smile) — only the clothes change.

Substitute the outfit from this table verbatim into any skill template that says
"wearing a clean modern outfit" or "dark blazer over white tee". Do NOT paste the table
into the image prompt — paste only the chosen outfit line.

---

# Edison's Facebook Content Creator

## Overview

This skill covers the full pipeline for Facebook posts:
1. Pick the right post type based on the topic
2. Generate the image (if needed)
3. Write the post copy
4. Schedule and post via Blotato

---

## Content Strategy

**80% value content** — actionable tips, how-to guides, tool comparisons, AI news translated into
practical use cases. The post must teach or inform the audience something useful.

**20% meme/fun content** — relatable AI humor, industry jokes, trending memes. Light and shareable.
Use Type 5 (Meme + Caption) for these. Never two meme posts in a row.

**Topic split:**
- 70% AI and tech: trending tools, Claude, NotebookLM, Manus, Gemini, GPT, automation workflows
- 30% funnel/agency: lead gen tips, funnel hacks, client acquisition, offer building

**Target audience — business owners, NOT trainers (see memory/project_target_audience.md):**
Every post addresses business owners, solopreneurs, SME founders, agency owners, and
operators juggling multiple roles (accounting / HR / admin / marketing alone). NEVER
address trainers, training providers, L&D professionals, or employers. Frame content as:
"replace a hire with AI", "run leaner", "do 3 jobs alone", "save 10 hours/week" — never
"teach your team", "train your staff", or "your L&D department".

**Content focus (every post fits one of these three buckets — see memory/project_content_topic_strategy.md):**
1. Latest AI news / tool updates / new features (last 24-72 hrs only) — Claude updates, ChatGPT new features, NotebookLM, Manus, Gemini, Perplexity, Sora, Veo, etc.
2. Practical how-to tips — "Here's how to use [tool] for [outcome]", copy-paste prompts, workflow chains.
3. How to make money with AI tools — "How to make money with Claude Code", "AI side-hustle stack", case studies.

**Comment-for-link CTA pattern:** Every post promising a resource ends with `"Comment [KEYWORD] and I'll DM you the [GitHub link / prompt pack / PDF]."` Examples: `Comment CLAUDE` (GitHub repo), `Comment PROMPT` (prompt pack), `Comment AGENT` (agent template), `Comment GUIDE` (PDF). Store the keyword + resource link in `rotation-state.json` under `facebook_pdf_links[topic_slug]` before publishing.

---

## Post Type Rotation

Vary post types so the feed doesn't feel repetitive. A good rotation pattern across 8 posts:
Type 8 → Type 2 → Type 1 → Type 4 → Type 5 (meme) → Type 7 → Type 3 → Type 6

**Type 8 (Kanji-Style Branded Post) is the PREFERRED default for AI tool/tip posts.** Lean on it
for any post that teaches a tool, lists tips, or announces a new AI product. Only drop to other
types when Type 8 doesn't fit the topic (e.g. pure opinion, meme, or celebrity news).

Never use the same type twice in a row. Never use Type 5 (meme) back to back.

---

## Step 1: Research Trending Topic

Before every post, search for the most discussed AI topic right now. Use WebSearch:
- "AI news today [current month year]"
- "Claude update 2026", "ChatGPT new feature", "Manus AI", "trending AI tools"
- "AI tool comparison [tool name]"

Pick the topic that is:
- Most discussed right now (high engagement signals on LinkedIn, Twitter/X, Facebook)
- Translatable to practical value for Malaysian business professionals
- Fits the 70/30 content split

---

## Step 2: Choose the Post Type

Pick based on topic. Here are the 7 types:

### Type 1 — Plain Text on Black
**When to use:** Breaking news statements, opinions, short punchy announcements, "unpopular opinion" takes.
**Design:** Bold white or yellow centered text on solid black background. No image, no face.
**Example trigger:** "AI is getting wild", "NotebookLM just got a huge update", "Unpopular opinion"
**Production:** Text only. No image generation needed. Skip to Step 4 (copy).

### Type 2 — YouTube Thumbnail Style (Face + Tool Icons + Bold Text)
**When to use:** AI tool comparisons, "X + Y = Result" posts, tool stack reveals, high-energy how-to.
**Design:** Edison's face on the left in dramatic lighting. Tool logos/icons arranged right or bottom.
Bold oversized white/yellow text as the headline. Dark background.
**Example trigger:** "NotebookLM + Gemini hack", "OpenClaw + ChatGPT Images 2.0 = $20,000 websites"
**Production:** Requires ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image). Uses Edison's face photo. See Part 2.

### Type 3 — News Photo + Bold Text Overlay
**When to use:** Celebrity or public figure news stories, viral internet moments, trending real-world events.
**Design:** Real news photo or public figure image. Bold yellow/white text overlaid at the bottom.
**Example trigger:** Khaby Lame story, Elon Musk news, tech CEO announcement
**Production:** Source a real photo (search online or screenshot from news). Add text overlay in the prompt OR describe as a captioned image. No ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) needed.

### Type 4 — Text List Post
**When to use:** Comparison lists, free alternatives, tool swaps, tips lists. Goes viral from pure usefulness.
**Design:** Plain text. No image at all. Just the list formatted cleanly.
**Example trigger:** "Don't pay for X, use Y", "10 AI tools you need", "Stop using X, try Y instead"
**Production:** Text only. No image. Skip to Step 4 (copy).

### Type 5 — Meme + Caption
**When to use:** Humorous takes on AI trends, relatable AI struggles, industry jokes.
**Design:** Real internet meme with a short AI-related caption or timeline above it.
**Example trigger:** "AI is getting wild", AI career progression jokes, "2022 student... 2027 farmer"

**HARD RULES (see carousel-creator skill Meme Rules section for full details):**
1. **NEVER use a placeholder.** The actual meme image must be sourced and used. If no
   meme fits, don't publish a Type 5 — pick a different post type.
2. **Pick the meme that fits THIS topic.** Don't default to a fixed list like Drake or
   Distracted Boyfriend just because they're common.
3. **Prefer current trending memes** — check imgflip API / Reddit r/memes top-week /
   knowyourmeme trending / Giphy meme trending FIRST before falling back to classics.
4. No romantic memes, no love hearts. Professional and funny only.

**Sourcing:**
```bash
# Preferred: imgflip top 100 trending
curl -s "https://api.imgflip.com/get_memes" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for m in d['data']['memes'][:30]:
    print(m['name'], '->', m['url'])
"
```
Fallbacks: `https://knowyourmeme.com/memes/trending`,
`https://www.reddit.com/r/memes/top/.json?t=week`, `https://giphy.com/explore/meme`.

**Production:** Download the chosen meme, pass to Blotato with a text overlay caption OR
post directly as the media with the caption in the post body. No ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) needed.
Write a short punchy caption above or below.

### Type 6 — Person Collage + Bold Headline
**When to use:** "Top X people/creators/tools" listicles, story-driven posts about multiple figures.
**Design:** Multiple real photos of people arranged together. Big bold headline text at bottom.
**Example trigger:** "5 AI creators who went from broke to millionaires", "These 3 CEOs changed AI forever"
**Production:** Screenshot or collage of real photos sourced online. Bold text overlay. No ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image).

### Type 8 — Kanji-Style Branded Post (PREFERRED DEFAULT)
**When to use:** AI tool spotlights, "how to master [tool]" guides, tip lists, product announcements,
"BREAKING:" style posts. This is the default for 60%+ of Facebook posts. Inspired by Kanji Low's
viral Facebook format.

**Design (locked structure — follow exactly):**
- **Aspect ratio:** 4:5 portrait
- **Top 60% of frame:** cinematic hero scene. Edison holding or standing beside a large glowing
  3D brand logo of the featured tool (Claude, NotebookLM, Gemini, ChatGPT, Manus, Perplexity, etc.),
  OR the two tool logos connected with a glowing energy line (for "X + Y" posts), OR Edison looking
  at floating UI panels representing the topic. Warm cinematic lighting, slight lens flare, orange/
  gold accent light. The brand logo must be big, crisp, and readable.
- **Middle strip:** thin horizontal divider line.
- **Author badge (just below divider):** small circular headshot of Edison on the LEFT, then the
  name "Edison Chua" with a small blue verified tick next to it, and directly under the name in
  smaller grey text the tagline "AI Marketing Strategist" (or "HRDC Certified AI Trainer" when
  the post is about corporate training).
- **Bottom 30% of frame:** solid dark navy (#0A1628) block. Bold oversized headline text in 2 to
  3 stacked lines. Use WHITE for most words and YELLOW (#FFD700) for the key/emphasized words.
  Keep it under 14 words total. Examples:
  - "BREAKING: I STOPPED WASTING HOURS READING TEXTBOOKS COVER TO COVER."
  - "HOW TO MASTER CLAUDE COWORK A COMPLETE GUIDE"
  - "CLAUDE CAN NOW THINK LIKE A $100M FOUNDER — USE THESE 8 PROMPTS"
- **Very bottom center:** the text "COMMENT FOR MORE" in small clean white uppercase.

**Headline hook styles:**
- "BREAKING: I STOPPED [painful old habit]."
- "HOW TO MASTER [TOOL] — A COMPLETE GUIDE"
- "[TOOL] CAN NOW [surprising new capability]. USE THESE [X] PROMPTS."
- "[TOOL A] + [TOOL B] — HOW TO CONNECT THESE POWERFUL TOOLS FOR FREE."
- "USE [TOOL] TO [OUTCOME] 100X FASTER. THE ONLY [X] PROMPTS YOU NEED."

**Example trigger:** "How to use NotebookLM", "Claude Opus 4.7 just shipped", "5 Gemini prompts"
**Production:** Requires ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) with Edison's face. Use the prompt template below.
**Post-posting:** ALWAYS pair with Strategy A comment thread (full tips in comments) AND pin the
first comment (see Pin Comment Protocol below).

**ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) prompt template for Type 8:**
```
Use the face from the uploaded reference photo exactly. Preserve exact likeness, skin tone,
hair, facial features. Young Asian man, black hair, slim build, warm confident smile, wearing [OUTFIT FROM OUTFIT VARIETY TABLE — pick the one that matches the topic vibe, rotate across runs].

Scene: Edison is [holding a large glowing 3D [TOOL] logo floating above his open palm / standing
between two large glowing 3D logos ([TOOL A] on left, [TOOL B] on right) with a curved glowing
energy line connecting them / looking up at floating holographic UI panels showing [topic]].
Warm cinematic lighting with orange and gold accent glow from the logo, clean studio-style
background with soft light rays, slight lens flare. The logo must be crisp, high-resolution,
immediately recognizable.

Composition: subject occupies the TOP 60 percent of frame. BOTTOM 30 percent is a solid dark
navy block (#0A1628) containing bold oversized stacked headline text: line 1 "[HEADLINE WORDS]"
and line 2 "[HEADLINE WORDS]", with key words in bright yellow (#FFD700) and the rest in white,
clean sans-serif font. Above the navy block, a thin horizontal divider, and immediately under
the divider a small circular headshot of Edison on the left, the name "Edison Chua" with a
small blue verified tick beside it, and beneath the name the smaller grey tagline
"AI Marketing Strategist". Centered at the very bottom inside the navy block, small clean white
uppercase text reading "COMMENT FOR MORE".

Aspect ratio 4:5. Ultra realistic, photorealistic, 8K, cinematic lighting, sharp, high contrast.
Preserve exact facial features from reference photo. No em dashes in any text.
```

**Save path:** `./generated/ Media Marketing/facebook_kanji_[topic]_[date].jpg`

---

### Type 7 — Face + Flow Diagram
**When to use:** Step-by-step processes, funnels, journey maps, "how I went from X to Y" content.
**Design:** Edison's face on one side. A visual curve or flow diagram with labeled steps on the other.
Bold title text at bottom.
**Example trigger:** Affiliate marketing steps, funnel stages, AI learning journey
**Production:** Requires ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image). Uses Edison's face photo. See Part 2.

---

## Part 2: Image Generation (Types 2, 7, and 8)

### Face Photos — Permanent Blotato URLs (no upload needed)

**Do NOT re-upload Edison's face. Use these permanent URLs directly as `image_input` in kie.ai.**

| Photo | Blotato URL | Best For |
|-------|-------------|----------|
| Edison Chua Face.jpeg (PRIMARY) | `<face_primary.url from assets-manifest.json>` | AI tools, tech, most Facebook posts |
| edison2.jpeg | Upload once if needed, save URL here | Tech/gaming vibe |
| edison3.jpeg | Upload once if needed, save URL here | Outdoor/travel feel |

**Photo selection:**
- AI tools, tech content → PRIMARY URL above (use directly)
- Outdoor/travel feel → `edison3.jpeg` (upload once, then save URL here)
- Tech/gaming vibe → `edison2.jpeg` (upload once, then save URL here)

Skip the upload step for Types 2, 7, and 8 — use the PRIMARY URL directly in `image_input`.

### Search ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image) Prompt Library

For Type 2 (YouTube Thumbnail style), search the library first:

```bash
curl -s "https://raw.githubusercontent.com/YouMind-OpenLab/gpt-image-2-image-to-image-prompts-recommend-skill/main/references/manifest.json"
```

Then fetch relevant category file (youtube-thumbnail.json for Type 2):

```bash
curl -s "https://raw.githubusercontent.com/YouMind-OpenLab/gpt-image-2-image-to-image-prompts-recommend-skill/main/references/youtube-thumbnail.json" \
  -o /tmp/yt_thumbnails.json

python3 -c "
import json
with open('/tmp/yt_thumbnails.json') as f:
    data = json.load(f)
keywords = ['superhero', 'action', 'dramatic', 'movie', 'thumbnail']
for item in data:
    content = item.get('content','').lower()
    title = item.get('title','').lower()
    if any(k in content or k in title for k in keywords):
        print(f'ID:{item[\"id\"]} | {item[\"title\"]}')
        print(item.get('content','')[:300])
        print()
"
```

### Superhero / Movie Character Style Prompt (Type 2, locked structure)

Use this structure for movie-character-style posts (like The Flash reference image):

```json
{
  "prompt": {
    "subject": "Use the face from the uploaded image. Young Asian man, black hair, slim build. Wearing a full superhero costume — [specific hero color/style matching the topic]. Dramatic cinematic pose, intense expression.",
    "background": "Dark moody background with [color] light rays or energy effects. Epic cinematic atmosphere.",
    "text_overlay": "Large bold white text at bottom: '[HEADLINE LINE 1]' on first line, '[HEADLINE LINE 2]' on second line. Yellow accent on key word. Clean sans-serif font.",
    "logo_element": "[Tool or brand logo] as a circular badge in top-left corner.",
    "author_badge": "Small circular author badge bottom-center with Edison's face thumbnail and '@edisonchua' handle.",
    "style": "Ultra realistic, 8K, photorealistic, cinematic, dramatic lighting, bold graphic design, YouTube thumbnail aesthetic",
    "aspect_ratio": "16:9"
  }
}
```

**Movie/hero character selection by topic:**
- Claude / AI tools → The Flash, Iron Man (speed and power)
- Learning / education → Professor X, Doctor Strange
- Funnels / money → Batman, Gordon Gekko style
- AI automation → Terminator, Optimus Prime concept
- Creativity / design → Spider-Man, creative aesthetic
- Any topic → Search Google Images for a relevant movie still, describe the character

### Upload Photo to Blotato (SKIP for primary face — already uploaded)

The primary face photo is already on Blotato. Use the permanent URL from the table above directly.

Only run the upload step if using a photo that does NOT yet have a saved URL:
```bash
curl -X PUT "[presignedUrl]" \
  --data-binary "@[local_file_path]" \
  -H "Content-Type: image/jpeg"
```
Then save the new `publicUrl` into the table above for permanent reuse.

### Generate with kie.ai ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image)

```bash
curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer ${KIE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2-image-to-image",
    "input": {
      "prompt": "[structured prompt from above]",
      "image_urls": ["[publicUrl from Blotato upload]"],
      "aspect_ratio": "16:9",
      "resolution": "2K"
    }
  }'
```

### Poll for Result

Poll every 25-30 seconds. Typical wait: 60-180 seconds.

```bash
curl -s "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=[taskId]" \
  -H "Authorization: Bearer ${KIE_API_KEY}"
```

When `data.state` is `"success"`, extract: `data.resultJson` (parse as JSON string) → `resultUrls[0]`

### Download and Save

```bash
curl -s -o "./generated/ Media Marketing/facebook_[topic]_[date].jpg" \
  "[resultUrl]"
```

Show the image to Edison for review before posting.

---

## Step 3: Write the Post Copy

**Format rules (strict):**
- No em dashes anywhere
- Max 5 hashtags, at the very end only
- Short punchy sentences. One idea per line.
- Hook on line 1 — must stop the scroll
- Body: numbered tips, story beats, or list items
- White space between sections

**Hook formulas by type:**
- News: "BREAKING: [thing] just happened. Here's what it means for you."
- List: "Don't pay for [X]. Use [Y] instead."
- Opinion: "Unpopular opinion: [bold take]"
- Meme: Short caption only. Let the meme do the work.
- Tip: "[Number] [AI tool] prompts that changed how I work."
- Story: "I found [X] who [dramatic outcome]. Here's how."

**70% AI/tech topics:**
- Trending tools: Claude, NotebookLM, Manus, Gemini, GPT-4o, Perplexity
- Practical use cases: "Use this to save 3 hours a week"
- Tool comparisons: free vs paid, old way vs AI way
- AI news translated to plain English for Malaysian professionals

**30% funnel/agency topics:**
- Lead gen hacks
- Funnel structure tips
- Client acquisition stories
- Offer building frameworks

---

## Comment Thread Strategy

The comment section is a second content layer. It serves two purposes:
1. **Boosts the algorithm** — more comments = more reach. People engage to get the full content.
2. **Delivers the real value** — the post hooks them, the comments pay it off.

There are two comment strategies depending on the post type:

---

### Strategy A: Tips/Hacks Posts — Full Content in Comments

Use this when the post promises numbered tips, prompts, hacks, or steps.

The post caption stays SHORT and scroll-stopping — it does NOT give away the tips. It ends with
a teaser that points people to the comments:

> "Dropping all [X] below 👇"
> or: "Check the comments for all [X] 👇"
> or: "Here they are 👇 (save this)"

Then write ONE comment per tip. Each comment must include the COMPLETE, USABLE content — not a
teaser, not a summary. The person reading that comment should be able to act on it immediately.

For a prompt post, include the full prompt text they can copy-paste.
For a hack post, include the full step-by-step instruction.
For a tool post, include what it does, the link, and how to use it.

The goal: people comment, reply, and interact to get value — which signals the algorithm to
push the post to more people.

**Comment format for tips:**
```
1️⃣ [TIP NAME IN CAPS]

[Full explanation — 3 to 6 lines. Be specific and practical.]

[If it's a prompt, include the actual prompt in quotes or as a block.]
```

**Example — post: "5 Claude prompts that 10x your work speed"**

Post ends with: "All 5 prompts below 👇 (save before Facebook hides this)"

Comment 1:
```
1️⃣ THE MEETING SUMMARY PROMPT

Paste your raw meeting notes and use this prompt:

"Here are my meeting notes: [paste notes]. Summarize the key decisions made, action items with owners, and any unresolved questions. Format as a clean bullet list."

Works in 30 seconds. Saves 20 minutes of cleanup.
```

Comment 2:
```
2️⃣ THE EMAIL REWRITER PROMPT

When you have a long email to write, use this:

"I need to send an email to [person/team] about [topic]. My main point is [your point]. Make it professional, clear, and under 100 words."

No more staring at a blank screen.
```

...and so on for each tip.

---

### Strategy B: News/Story Posts — Source Links in Comments

Use this when the post covers trending news, a viral story, or references external tools,
videos, or articles.

The post caption tells the story. The first comment (or first few comments) provide the receipts:
links to the original article, the tool mentioned, the video, or related resources.

This builds credibility and gives curious readers somewhere to go next.

**Comment format for sources:**
```
Sources and links 👇

1/ [Description of source] → [URL]
2/ [Description of source] → [URL]
3/ [Description of source] → [URL]
```

Or for a single resource:
```
Watch the full breakdown here 👇👇👇
[URL]
```

**Example — post about Khaby Lame divorce story:**

Comment 1:
```
Sources 👇

1/ Original Reuters article on the $975M deal → [link]
2/ Full story on the asset protection strategy → [link]
3/ Similar case: Achraf Hakimi explained → [link]
```

**Example — post about a new AI tool:**

Comment 1:
```
Links to everything mentioned 👇

1/ Try [Tool Name] free → [link]
2/ Full tutorial video → [link]
3/ My full review → [link]
```

Search for and include real URLs when writing source comments. Use WebSearch to find
the actual article or tool page before writing the comment.

---



---

## Type 8 Sub-Variants — Kanji-Style Single-Image Format (FACE-FREE options allowed)

Edison also wants to post Kanji-style single images that are NOT always a portrait of him.
Reference examples (real Kanji Low posts that went viral): a person at a laptop with money
flying out + 3D Claude logo, a 3D tool logo inside a vault with floating icons, a phone
mockup showing a tool's usage-limit meter with a 3D character smashing it, a NotebookLM
tutorial screenshot with bold yellow overlay text, and 4-panel AI-confusion memes.

Rotate these sub-variants alongside the original face-hero Type 8 (Edison holding the logo).
Roughly **45% face-hero / 55% face-free across Facebook + Instagram Kanji single-image posts.**

All sub-variants share the same bottom treatment:
- Thin horizontal divider
- Tiny Edison headshot + "Edison Chua ✓ / AI Marketing Strategist" byline (OR omit entirely for meme variant)
- Bottom navy block `#0A1628` with oversized stacked headline (key words in yellow `#FFD700`)
- "COMMENT FOR MORE" footer

### 8a — Scene Hero (face optional)
Person sits at a laptop, warm window light, steam from a coffee cup. Money (or icons, or
glowing papers) fly out of the laptop screen. A large 3D brand logo floats beside the laptop.
Style: cinematic stock-photo energy, shallow depth of field, warm orange highlights. Edison
can appear from the side (hand + cuff of hoodie, shoulder + jawline) — face is optional but
brand consistency improves if his face is partially visible.

**Prompt template (kie.ai gpt-image-2-image-to-image):**
```
A young Asian man ([outfit from OUTFIT VARIETY TABLE]) sits at a wooden cafe table in front
of an open laptop. Warm side-window light, visible coffee cup with steam. A burst of floating
US dollar bills and a large glowing 3D [TOOL] logo erupts out of the laptop screen, with
orange and gold sparkle particles. Shallow depth of field, cinematic photograph, shot at 50mm.
Only the top half of his face is visible (we see his smile and the coffee cup he's holding).

Composition: the scene fills the TOP 65 percent of the frame. BOTTOM 30 percent is a solid
dark navy block #0A1628. Above the block a thin horizontal divider, then the Edison Chua
verified byline + "AI Marketing Strategist". Inside the navy block, bold stacked headline
text: [HEADLINE LINE 1 with KEY WORDS in yellow #FFD700, rest in white], [HEADLINE LINE 2].
Centered at the bottom, "COMMENT FOR MORE" in small uppercase white.

Aspect ratio 4:5 portrait. Photorealistic, 8K, sharp, cinematic lighting. No em dashes.
```

### 8b — Iconographic (no face)
No human. Just a 3D tool logo as the hero, elevated on a product-launch podium or floating
inside a glowing vault, with 6-10 smaller floating icons (code brackets, lightbulb, chart,
document, gear, magic wand, etc.) arranged around it like a product showcase.

**Prompt template:**
```
A large 3D brand logo of [TOOL] (specify logo shape: e.g. the orange Claude asterisk, the
black ChatGPT spiral, the blue Gemini gem, the NotebookLM arc) sits centered on a glowing
round product-podium. Around it floats a halo of 6 to 10 smaller 3D pastel icons representing
the use cases (code brackets, lightbulb, bar chart, document, gear, magic wand, chat bubble,
shield, rocket, pencil). Soft studio lighting with slight orange rim light, clean pale
neutral background, subtle floor shadow. Showroom/product-reveal aesthetic.

Composition: scene fills TOP 60 percent. Edison Chua verified byline band over the lower
boundary. BOTTOM 30 percent navy block #0A1628 with stacked headline [LINE 1 / LINE 2],
key words yellow, rest white. "COMMENT FOR MORE" small uppercase centered footer.

Aspect ratio 4:5. Ultra sharp, photorealistic 3D render, premium product-launch style. No em dashes.
```

### 8c — Meme (no face, no byline, no headline block)
Pure meme. Use a known template (4-panel wholesome/frustration meme, Distracted Boyfriend,
Expanding Brain, "Is this X?" conversational meme, etc.) adapted to the day's AI-topic joke.
No byline, no navy block. Keep it as a native meme so it reads as organic humor.

**Prompt template:**
```
Recreate the [SPECIFIC MEME FORMAT] meme format. [Scene description with dialogue/captions
appropriate to today's AI topic]. Classic meme aesthetic, flat cartoon style OR clean
photorealistic style depending on the chosen template. Square 1:1 or 4:5 portrait.

No em dashes. No Edison Chua byline. No navy block. No COMMENT FOR MORE text. Just the meme.
```

Never fabricate captions that misrepresent a tool (no "Claude killed my grandma" etc.).
Keep it warm, self-aware, and safe-for-work.

### 8d — Phone / Product Mockup (no face)
A 3D-rendered phone or laptop shows the tool's real interface (or a realistic mockup).
A small 3D character, floating object, or dramatic effect interacts with the screen to
dramatize a problem or capability — e.g. a tiny hammer smashing a "usage limit" progress
bar, a 3D arrow shooting out of a chart, a floating character holding up a tool icon.

**Prompt template:**
```
A realistic 3D render of a modern smartphone (or open laptop) on a clean neutral surface.
The screen shows a realistic mockup of [TOOL] interface: [DESCRIBE THE SPECIFIC UI — e.g.
Claude usage limit progress bar at 98 percent, ChatGPT main chat window, NotebookLM library
sidebar]. Beside or on top of the phone, a small charming 3D character in matching brand
colors interacts with the screen: [DESCRIBE THE ACTION — e.g. swinging a hammer to smash
the progress bar, holding up a magnifying glass, lifting a glowing document]. Soft studio
lighting, product-photography aesthetic, subtle floor reflection.

Composition: scene TOP 65 percent. Edison Chua verified byline band. BOTTOM 30 percent
navy block #0A1628 with stacked headline, key words yellow. "COMMENT FOR MORE" footer.

Aspect ratio 4:5. Photorealistic 3D render, 8K, sharp. No em dashes.
```

### 8e — Tutorial Screenshot Overlay (no face)
Layer a real (or mocked) screenshot of the tool's interface with bold yellow+white overlay
text + a small tool logo badge. Think MrBeast-tutorial energy but for AI tools. Great for
"here's what NotebookLM just shipped" announcements.

**Prompt template:**
```
A photorealistic mockup of the [TOOL] app or web interface as it would appear on a laptop
screen or full-screen monitor (fill approximately the top 65 percent of the frame). The
interface shows [SPECIFIC FEATURE OR SCREEN]. Slight glow / light leak from one edge, soft
drop shadow under the monitor.

Over the interface, a large semi-transparent dark navy overlay on the BOTTOM half of the
screenshot with bold overlay text: [HEADLINE LINE 1], with key words in bright yellow #FFD700
and rest in bold white. A small 3D rounded-square badge of the [TOOL] logo in the top-left
corner. Edison Chua verified byline band. "COMMENT FOR MORE" footer.

Aspect ratio 4:5. Photorealistic, 8K, sharp. No em dashes.
```

### Rotation
Track in `rotation-state.json` → `facebook.last_type8_subvariant` and `instagram.last_type8_subvariant`.
Default rotation order across a 7-post Kanji-single-image block:
`8-face-hero → 8a-scene → 8b-icono → 8d-phone → 8-face-hero → 8e-screenshot → 8c-meme`

Memes (8c) are sparse by design (every ~7 posts). Never back-to-back memes.

---

### Pin Comment Protocol (MANDATORY for Type 8 and all Strategy A posts)

Every Type 8 post AND every Strategy A tips post MUST have its first comment pinned. The pinned
comment is a second branded image + a CTA block that carries the reader from the post into the
value drop (the full tip comments) or into a PDF/resource link.

**Step 1 — Generate the pin-comment image with ChatGPT Images 2.0 (kie.ai gpt-image-2-image-to-image)** (use Edison's face, 1:1 square):

Prompt template:
```
Use the face from the uploaded reference photo exactly. Preserve exact likeness, skin tone,
hair, facial features. Young Asian man, black hair, slim build, warm confident smile, pointing
down with his index finger toward the bottom of the frame, friendly inviting expression.
Scene: Edison on the right side, a large bold yellow arrow curving down from him toward the
bottom-left corner. Background: clean dark navy (#0A1628) with soft golden light rays.

Bold yellow (#FFD700) text on the LEFT side, stacked in 2 to 3 lines: "[CTA HEADLINE]" (examples:
"FULL GUIDE BELOW", "ALL 7 PROMPTS BELOW", "GET THE FREE PDF", "LINK IN THE REPLY"). Under the
headline in smaller white text: a one-line descriptor (e.g. "Save this before Facebook hides it").

Small "Edison Chua | AI Marketing Strategist" tag at bottom. Aspect ratio 1:1. Ultra realistic,
photorealistic, 8K, cinematic, sharp. Preserve exact facial features. No em dashes.
```

Save as: `./generated/ Media Marketing/facebook_pin_[topic]_[date].jpg`

**Step 2 — Post the pinned comment** immediately after the main post. The comment text:

For a tips post (Strategy A):
```
All [X] below 👇 save this before Facebook hides it.

[image attached: the pin-comment image from Step 1]
```

For a resource/PDF post:
```
Grab the free PDF guide 👇 link in my first reply.

[image attached: the pin-comment image from Step 1]
```

Then post the tip comments OR the PDF link as reply-to-pin (so everything cascades under the pin).

**Step 3 — Pin it.** Blotato does not currently support programmatic pinning. Log "MANUAL PIN
REQUIRED" in the post status so Edison pins it by hand in the Facebook app the first time he
sees the post go live.

---

### PDF / Resource Delivery via Google Drive

When a post topic involves a guide, cheat sheet, prompt pack, or step-by-step walkthrough, create
a PDF and share it via Google Drive. This is what the pin comment promises ("Grab the free PDF").

**Creation flow:**
1. Write the full guide as clean markdown (no em dashes, same voice as the post).
2. Convert to PDF. Save to `./generated/ Media Marketing/pdfs/[topic_slug]_[date].pdf`.
3. Upload to Google Drive folder: `1MyvXqCm8Mhs02OCX1qyWotsT3Pj37Sm-` (the shared folder from CLAUDE.md).
4. Set sharing to "Anyone with the link can view".
5. Grab the shareable link. Store it in `rotation-state.json` under:
   ```json
   "facebook_pdf_links": { "[topic_slug]": "https://drive.google.com/..." }
   ```

**Posting flow:**
- First pinned comment: the ChatGPT Images 2.0 pin image + "PDF link in my reply below 👇".
- Reply under the pinned comment: the Google Drive share link + one line on what's inside.

**Auto-reply to commenters asking for the link:** when someone comments asking for the guide
(e.g. "link?", "can you share?", "interested", "yes please"), reply to their comment with:
```
Hey [first name] 👋 here you go, free guide: [Drive link]. If you find it useful, a share means a lot 🙏
```

This flow is driven by the `facebook-comment-responder` scheduled task (see below).

---

### When to use which strategy

| Post type | Comment strategy |
|-----------|-----------------|
| Tips, hacks, prompts, steps (3+) | Strategy A: full content per comment |
| News, viral stories, tool reviews | Strategy B: source links |
| Meme posts (Type 5) | No comment thread needed |
| Short opinion posts (Type 1) | No comment thread needed |
| List posts (Type 4) under 3 items | No comment thread needed |

Output format: write the post caption first, clearly labeled. Then write each comment
labeled as "Comment 1:", "Comment 2:", etc. so Edison can paste them in sequence.

---

## Step 4: Schedule via Blotato

Check Edison's Facebook account ID first:
```
Tool: mcp__519a64f8-a8a3-437b-a8c0-da574ff4903f__blotato_list_accounts
```

Then create the post:
```
Tool: mcp__519a64f8-a8a3-437b-a8c0-da574ff4903f__blotato_create_post
  accountId: [Edison's Facebook account ID]
  content: [post copy]
  mediaUrls: [image URL if applicable, or empty]
  scheduledTime: [ISO 8601 UTC time]
```

**Default posting times (MYT = UTC+8):**
- Morning: 09:00 AM MYT = 01:00 UTC
- Afternoon: 1:00 PM MYT = 05:00 UTC

---

## Common Prompt Fixes

| Issue | Fix |
|-------|-----|
| Face changed too much | Add: "preserve exact facial features, skin tone, hair — do not alter the face" |
| Text garbled in image | Simplify to fewer words, remove punctuation from text overlay |
| Background too busy | Add: "clean dramatic background, minimal distractions" |
| Hero costume looks fake | Add: "photorealistic superhero suit, cinematic quality, real fabric texture" |
| Image too dark | Add: "dramatic but well-lit, strong rim lighting, face clearly visible" |

---

## Post Type Quick Reference

| Type | Image Needed | ChatGPT Images 2.0 | Best For |
|------|-------------|-------------|----------|
| 1. Plain text on black | No | No | Opinions, breaking news |
| 2. YouTube thumbnail | Yes | Yes | Tool combos, hacks |
| 3. News photo + text | Yes (sourced) | No | Celebrity/trending stories |
| 4. Text list | No | No | Comparison lists, tips |
| 5. Meme + caption | Yes (meme) | No | Humor, relatable AI takes |
| 6. Person collage | Yes (sourced) | No | Top X creators/tools |
| 7. Face + flow diagram | Yes | Yes | Funnels, step-by-step |
| 8. Kanji-style branded (DEFAULT) | Yes | Yes | AI tool spotlights, tips, "HOW TO" posts |

---

## Engagement Routine (cross-platform)

Every Type 8 post and every Strategy A tips post is handled by the shared
`comment-engagement-responder` skill. That skill runs hourly and:

1. Polls Facebook (and LinkedIn, Instagram DMs) for new comments on Edison's recent posts.
2. Replies to every new comment in Edison's voice (warm, helpful, under 20 words).
3. If the commenter asks for the guide/link/PDF, replies with the Google Drive link from
   `rotation-state.json` → `facebook_pdf_links[topic_slug]`.
4. Flags posts missing a pinned comment as "MANUAL PIN REQUIRED".

The responder skill is invoked by the `social-media-engagement-hourly` scheduled task.
See `comment-engagement-responder/SKILL.md` for the full flow.
