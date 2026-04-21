# Edison's Threads Content Creator

## Core Purpose
This skill creates Threads posts with **rotating image styles** — alternating between meme + caption format AND YouTube thumbnail style (from `edison-content-image-creator`). Content is based on the latest AI news researched each morning. Posts feel organic to Threads — no hashtags, no hard sells, just genuine value with humor and authority.

## Platform Specs
- **Platform:** Threads (Meta)
- **Character Limit:** 500 characters per post
- **Hashtags:** None (Threads does not use hashtags effectively)
- **Tone:** Conversational, witty, genuine — like texting a smart friend
- **Optimal Post Time:** 9:00 AM & 3:00 PM MYT

## Image Style Rotation

Threads rotates between 2 image styles across posts:

| Rotation | Style | When to Use |
|----------|-------|-------------|
| 1 | **Meme + Caption** | Humor/relatable takes, trending moments |
| 2 | **YouTube Thumbnail** (from `edison-content-image-creator`) | Authority moments, tool comparisons, AI news |

The routine tracks which style was last used and alternates. Within the YouTube Thumbnail style, rotate across 3 Y-sub-styles:
- **Y1 (MrBeast Bold):** High-energy AI news, tool lists, viral-style
- **Y2 (Half-Face Cyborg):** AI transformation, future of work, agentic AI
- **Y3 (Clean Authority):** Corporate training, credibility posts

## Content Philosophy
Content Split: **80% AI/tech value | 20% humor/entertainment**
Voice: Casual Edison — the same guy who trains CEOs but also laughs at AI memes

---

## Style 1: Meme + Caption

### Structure
```
[Meme image — recognizable internet format, AI-relevant]

[1-3 line caption — conversational, punchy, no hashtags]

[Optional: question to spark replies]
```

### Meme Sourcing
- Use **recognizable formats**: Drake, Distracted Boyfriend, This Is Fine, Expanding Brain, etc.
- `GET https://api.imgflip.com/get_memes` → pick top trending relevant to topic
- Max 6 words per meme text block
- Never use offensive, political, or divisive memes

### Custom Meme via Nano Banana Pro (when imgflip doesn't fit)
```
POST https://api.kie.ai/api/v1/jobs/createTask

Prompt: "Internet meme style image, [MEME FORMAT DESCRIPTION], bold white impact font text 
'[TOP TEXT]' and '[BOTTOM TEXT]', classic meme aesthetic, square 1:1 format"
```

### Caption Examples

**Observation style:**
```
Everyone's using ChatGPT for emails.
Nobody's using it to prepare for hard conversations.
Big mistake.
```

**Relatable frustration:**
```
Asked AI to summarise a 50-page report.
Got back a 48-page summary.
We need to talk.
```

**Insight drop:**
```
Claude just updated again.
Most people won't notice the difference.
The ones who do will be 3x faster by Friday.
```

---

## Style 2: YouTube Thumbnail (from edison-content-image-creator)

### Purpose
Used for authority-driven content on Threads — tool comparisons, AI news with commentary, credibility moments. Drawn from Edison's existing `edison-content-image-creator` skill with the Y1/Y2/Y3 sub-rotation.

### Aspect Ratio
- 16:9 for thumbnail feel, OR 4:5 for better Threads feed visibility

### Y1 — MrBeast Bold
```
Ultra-bright colors, Edison's shocked/excited face large on left, 
giant bold white text with yellow outline on right reading "[TOPIC]", 
explosive visual energy, clickbait style
```

### Y2 — Half-Face Cyborg
```
Edison's face on left side (50% human), right side showing AI/tech cyborg half 
with circuit overlays, bold yellow text "[TOPIC]" at top, dark cinematic background
```

### Y3 — Clean Authority
```
Edison in professional attire on right side, clean dark background, 
bold white headline "[TOPIC]" on left, minimalist corporate thumbnail style
```

### Caption Style for YouTube Thumbnail Posts
```
[Direct statement about AI tool or news — 1 line]

[1-2 lines of insight or take]

[Optional: question]
```

Example:
```
Claude 4.5 is the first AI that genuinely thinks before replying.

Most people will still use it like ChatGPT.
Biggest waste of a model in 2026.
```

---

## Caption Writing Rules (both styles)

- **No hashtags** — hard rule for Threads
- **No em dashes** — use commas, colons, line breaks
- **Max 3 lines** — Threads favors punchy text
- **One idea per line**
- **End with a question** 3x per week to drive replies
- **No hard CTAs** — no "follow me", no "link in bio"
- **Sound human** — contractions, casual phrasing

## Tone Reference

**Sound like this:**
> Claude 4 drops and suddenly everyone's a prompt engineer.
> Meanwhile I've been doing this for 2 years.
> Welcome to the club I guess.

**Not like this:**
> Exciting news! Claude 4 has been released with groundbreaking new features! #AI #Claude #Productivity

---

## Workflow

1. **Research** latest AI news via WebSearch — pick top story
2. **Check rotation state** — is it meme turn or YouTube thumbnail turn?
3. **If meme turn:**
   - Pick recognizable meme format from imgflip
   - Write meme top/bottom text
   - Generate or source meme image
4. **If YouTube thumbnail turn:**
   - Rotate Y1/Y2/Y3 sub-style (check last_y_style)
   - Generate thumbnail via Nano Banana Pro with Edison's face
5. **Write caption** — match style to image type (humor for meme, insight for thumbnail)
6. **Post to Threads** via Blotato
7. **Update rotation state** — flip style for next run

## Blotato Integration

```
POST /posts
{
  "accountId": "[THREADS_ACCOUNT_ID]",
  "content": "[CAPTION]",
  "mediaUrls": ["[IMAGE_URL]"],
  "postType": "single_image"
}
```

## Critical Rules
- Always alternate between meme and YouTube thumbnail styles across posts
- Within YouTube thumbnail, rotate Y1 → Y2 → Y3 sequentially
- Meme = humor/relatable | Thumbnail = authority/insight (match caption tone to style)
- No hashtags ever (hard rule)
- Post under 500 characters total
- Content must always be based on day's researched AI news
