---
name: facebook-content-creator
description: >
  Edison Chua's complete Facebook content creation system. Handles all 7 Facebook post types:
  plain text on black, YouTube thumbnail style (face + tool icons + bold text), celebrity/news
  photo + text overlay, text list posts, meme + caption, person collage + headline, and face +
  flow diagram posts. Generates images with Nano Banana Pro where needed, writes post copy, and
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

**Route by post type. Face-required post types MUST go through kie.ai first.**

### Face-required Facebook post types (MUST use kie.ai with face_input)

- Type 2 (YouTube Thumbnail face + tools)
- Type 7 (Face + Flow Diagram)
- Type 8 (Kanji-style Branded Post — PREFERRED DEFAULT)
- Pin comment images (Edison pointing down)

For these: call kie.ai Nano Banana Pro FIRST with `image_input: [face_primary.blotato_url]`
pulled from assets-manifest.json. Do NOT use Blotato built-in templates (Tutorial Carousel,
Quote Card, etc.) — those are text-to-image and will produce a generic Asian male.

Fallback order if kie.ai fails:
1. Retry kie.ai once with simplified prompt.
2. Blotato Instagram Carousel Slideshow template (`53cfec04-2500-41cf-8cc1-ba670d2c341a`)
   with `model: "nano-banana-pro"` AND the face URL as input.
3. Manual queue log (do NOT post without face).

### Face-free Facebook post types

- Type 1 (Plain text on black) — no image or Blotato Quote Card template
- Type 3 (News photo) — use sourced photo, no generation
- Type 4 (Text list) — no image
- Type 5 (Meme) — sourced meme image
- Type 6 (Person collage) — sourced photos

Priority order:
1. Blotato built-in template if one matches.
2. kie.ai Nano Banana Pro direct if custom prompt needed.

Log the path used per image in `rotation-state.json` → `image_generation.last_path_used`.

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
**Example trigger:** "NotebookLM + Gemini hack", "OpenClaw + Nano Banana = $20,000 websites"
**Production:** Requires Nano Banana Pro. Uses Edison's face photo. See Part 2.

### Type 3 — News Photo + Bold Text Overlay
**When to use:** Celebrity or public figure news stories, viral internet moments, trending real-world events.
**Design:** Real news photo or public figure image. Bold yellow/white text overlaid at the bottom.
**Example trigger:** Khaby Lame story, Elon Musk news, tech CEO announcement
**Production:** Source a real photo (search online or screenshot from news). Add text overlay in the prompt OR describe as a captioned image. No Nano Banana Pro needed.

### Type 4 — Text List Post
**When to use:** Comparison lists, free alternatives, tool swaps, tips lists. Goes viral from pure usefulness.
**Design:** Plain text. No image at all. Just the list formatted cleanly.
**Example trigger:** "Don't pay for X, use Y", "10 AI tools you need", "Stop using X, try Y instead"
**Production:** Text only. No image. Skip to Step 4 (copy).

### Type 5 — Meme + Caption
**When to use:** Humorous takes on AI trends, relatable AI struggles, industry jokes.
**Design:** Well-known internet meme (Leonardo DiCaprio thinking, Drake meme, distracted boyfriend, etc.)
with a short AI-related caption or timeline above it.
**Example trigger:** "AI is getting wild", AI career progression jokes, "2022 student... 2027 farmer"
**Production:** Find a meme image online (search Google Images or screenshot). No Nano Banana Pro.
Write a short punchy caption above or below.

### Type 6 — Person Collage + Bold Headline
**When to use:** "Top X people/creators/tools" listicles, story-driven posts about multiple figures.
**Design:** Multiple real photos of people arranged together. Big bold headline text at bottom.
**Example trigger:** "5 AI creators who went from broke to millionaires", "These 3 CEOs changed AI forever"
**Production:** Screenshot or collage of real photos sourced online. Bold text overlay. No Nano Banana Pro.

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
**Production:** Requires Nano Banana Pro with Edison's face. Use the prompt template below.
**Post-posting:** ALWAYS pair with Strategy A comment thread (full tips in comments) AND pin the
first comment (see Pin Comment Protocol below).

**Nano Banana Pro prompt template for Type 8:**
```
Use the face from the uploaded reference photo exactly. Preserve exact likeness, skin tone,
hair, facial features. Young Asian man, black hair, slim build, warm confident smile, wearing
a clean modern outfit (dark blazer over white shirt, or smart casual shirt depending on topic).

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
**Production:** Requires Nano Banana Pro. Uses Edison's face photo. See Part 2.

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

### Search Nano Banana Pro Prompt Library

For Type 2 (YouTube Thumbnail style), search the library first:

```bash
curl -s "https://raw.githubusercontent.com/YouMind-OpenLab/nano-banana-pro-prompts-recommend-skill/main/references/manifest.json"
```

Then fetch relevant category file (youtube-thumbnail.json for Type 2):

```bash
curl -s "https://raw.githubusercontent.com/YouMind-OpenLab/nano-banana-pro-prompts-recommend-skill/main/references/youtube-thumbnail.json" \
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

### Generate with kie.ai Nano Banana Pro

```bash
curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer ${KIE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nano-banana-pro",
    "input": {
      "prompt": "[structured prompt from above]",
      "image_input": ["[publicUrl from Blotato upload]"],
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

### Pin Comment Protocol (MANDATORY for Type 8 and all Strategy A posts)

Every Type 8 post AND every Strategy A tips post MUST have its first comment pinned. The pinned
comment is a second branded image + a CTA block that carries the reader from the post into the
value drop (the full tip comments) or into a PDF/resource link.

**Step 1 — Generate the pin-comment image with Nano Banana Pro** (use Edison's face, 1:1 square):

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
- First pinned comment: the Nano Banana pin image + "PDF link in my reply below 👇".
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

| Type | Image Needed | Nano Banana | Best For |
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
