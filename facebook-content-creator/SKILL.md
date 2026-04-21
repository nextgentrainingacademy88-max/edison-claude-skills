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

  Always trigger for Facebook content requests. This skill decides which of the 7 post types
  fits best, generates the image if needed, writes the copy, and posts via Blotato.
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

Vary post types so the feed doesn't feel repetitive. A good rotation pattern across 7 posts:
Type 2 → Type 1 → Type 4 → Type 5 (meme) → Type 7 → Type 3 → Type 6

Never use the same type twice in a row. Never use Type 5 (meme) back to back.
When in doubt, pick whichever type best fits the topic — rotation is a guide, not a strict rule.

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

### Type 7 — Face + Flow Diagram
**When to use:** Step-by-step processes, funnels, journey maps, "how I went from X to Y" content.
**Design:** Edison's face on one side. A visual curve or flow diagram with labeled steps on the other.
Bold title text at bottom.
**Example trigger:** Affiliate marketing steps, funnel stages, AI learning journey
**Production:** Requires Nano Banana Pro. Uses Edison's face photo. See Part 2.

---

## Part 2: Image Generation (Types 2 and 7 only)

### Face Photos

```
/sessions/[current-session]/mnt/Social Media Marketing/Edison Chua photos/Edison Face only/Edison Chua Face.jpeg
/sessions/[current-session]/mnt/Social Media Marketing/Edison Chua photos/Edison Face only/edison2.jpeg
/sessions/[current-session]/mnt/Social Media Marketing/Edison Chua photos/Edison Face only/edison3.jpeg
```

On Windows (D: drive):
```
D:\NEXTGEN ACADEMY\LinkedIn Sample Posting\Social Media Marketing\Edison Chua photos\Edison Face only\Edison Chua Face.jpeg
```

**Photo selection:**
- AI tools, LinkedIn tips, tech content → `Edison Chua Face.jpeg`
- Workshop/training/teaching → blue blazer workshop shot
- Outdoor/travel feel → `edison3.jpeg`
- Tech/gaming vibe → `edison2.jpeg`

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

### Upload Photo to Blotato

```
Tool: mcp__519a64f8-a8a3-437b-a8c0-da574ff4903f__blotato_create_presigned_upload_url
  filename: "edison_face.jpeg"
```

Returns `presignedUrl` and `publicUrl`. Then upload:

```bash
curl -X PUT "[presignedUrl]" \
  --data-binary "@[local_file_path]" \
  -H "Content-Type: image/jpeg"
```

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
curl -s -o "/sessions/[current]/mnt/Social Media Marketing/facebook_[topic]_[date].jpg" \
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
- Morning: 10:00 AM MYT = 02:00 UTC
- Evening: 6:00 PM MYT = 10:00 UTC

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
