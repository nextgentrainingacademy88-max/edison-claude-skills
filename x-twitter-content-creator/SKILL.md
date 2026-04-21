# Edison's X/Twitter Content Creator

## Core Purpose
This skill creates X (Twitter) posts with **rotating image styles** — cycling between text-on-black, news photo overlay, AND YouTube thumbnail style (from `edison-content-image-creator`). Content is based on the latest AI news researched each morning. Posts are optimized for X's fast-moving feed — punchy, opinionated, built to be retweeted.

## Platform Specs
- **Platform:** X (Twitter)
- **Character Limit:** 280 characters for the main tweet
- **Thread Option:** Yes — expand into 3-5 tweet thread when topic has depth
- **Hashtags:** 1-2 maximum
- **Optimal Post Time:** 9:00 AM & 3:00 PM MYT

---

## Image Style Rotation

X rotates between 3 image styles across posts:

| Rotation | Style | When to Use |
|----------|-------|-------------|
| 1 | **Text on Black** | Opinions, hot takes, bold claims |
| 2 | **News Photo + Text Overlay** | Breaking news, trending stories |
| 3 | **YouTube Thumbnail** (from `edison-content-image-creator`) | Authority moments, tool comparisons, personal takes |

The routine tracks which style was last used and advances through the rotation. Within YouTube Thumbnail, rotate Y1/Y2/Y3 sub-styles:
- **Y1 (MrBeast Bold):** High-energy AI news, viral-style takes
- **Y2 (Half-Face Cyborg):** AI transformation topics, future of work
- **Y3 (Clean Authority):** Credibility posts, corporate training angles

---

## Style 1: Text on Black

### Purpose
Best for opinions, hot takes, quick insights — where the text IS the visual.

### Aspect Ratio
1:1 square

### Prompt
```
POST https://api.kie.ai/api/v1/jobs/createTask

Prompt: "Pure black background (#000000), bold white sans-serif text centered reading 
'[MAIN POINT IN 8 WORDS OR LESS]', clean minimal design, high contrast, 
Twitter/X post style, 1:1 square format"
```

---

## Style 2: News Photo + Text Overlay

### Purpose
Best for reactions to breaking AI news or trending stories.

### Aspect Ratio
16:9 or 1:1

### Prompt
```
POST https://api.kie.ai/api/v1/jobs/createTask

Prompt: "Photo of [NEWS SUBJECT/SCENE], bold yellow text overlay '[HEADLINE IN 8 WORDS]', 
news broadcast style, high contrast text, 16:9 or 1:1 format, professional journalism aesthetic"
```

Source the news photo via WebSearch first, then feed reference image to Nano Banana Pro.

---

## Style 3: YouTube Thumbnail (from edison-content-image-creator)

### Purpose
Used for authority-driven content — Edison's take on AI tools, personal insights, corporate training angles. Requires Edison's face.

### Aspect Ratio
16:9 or 1:1

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

---

## Post Structure

### Single Tweet (≤280 chars)
```
[Hook — bold claim or hot take in 1 line]

[2-3 lines of value or context]

[1-2 hashtags max, optional]
```

### Thread Format (when topic needs depth)
```
Tweet 1: Hook + bold claim (the "stop scrolling" line)
Tweet 2: The context — what happened
Tweet 3: Why it matters to businesses/workers
Tweet 4: The contrarian take or what most people miss
Tweet 5: Actionable takeaway + CTA
```

## Copy Style

**Voice:** Confident, direct, slightly provocative. Edison knows his stuff and isn't afraid to have an opinion.

**Inspired by:**
- Short punchy sentences (Dan Kennedy)
- Value-first structure (Alex Hormozi)
- Opinionated takes that spark discussion

### Hook Types for X
- **Hot take:** "Most AI tools are a waste of money. Here's the 3 that actually move the needle."
- **Contrarian:** "Stop trying to replace your team with AI. Do this instead."
- **News reaction:** "Claude just dropped something nobody's talking about."
- **Bold stat:** "I trained 200 employees on AI last quarter. Only 12% used it correctly."
- **Question:** "Which AI tool actually saved you time this week? (Be honest)"

### X-Specific Rules
- **First line must stand alone** — it shows in feed before "show more"
- **No em dashes** — use commas, colons, or line breaks
- **Max 2 hashtags** — place at end only
- **Retweet bait** — end threads with "RT if you agree" or "Bookmark this"
- **Numbers perform well** — use specifics ("3 tools", "12%", "200 staff")

---

## Style Selection Matching

| Topic Type | Recommended Style |
|------------|-------------------|
| Opinion / hot take | Style 1: Text on Black |
| Breaking AI news | Style 2: News Photo Overlay |
| Tool comparison / Edison's take | Style 3: YouTube Thumbnail |
| Personal insight | Style 3: YouTube Thumbnail |
| Company announcement | Style 2: News Photo Overlay |
| Contrarian take | Style 1: Text on Black |

If the rotation dictates a style but the topic doesn't fit, use the topic-appropriate style and advance the rotation anyway.

---

## Workflow

1. **Research** latest AI news via WebSearch
2. **Check rotation state** — advance to next style (text-on-black → news overlay → thumbnail → repeat)
3. **Within thumbnail:** advance Y1/Y2/Y3 sub-style
4. **Decide length** — single tweet or thread (thread if topic has 3+ distinct points)
5. **Generate image** via Nano Banana Pro
6. **Write tweet copy** — hook + body + 1-2 hashtags
7. **If thread:** write all 5 tweets before posting
8. **Post to X** via Blotato
9. **Update rotation state**

## Blotato Integration

### Single Tweet
```
POST /posts
{
  "accountId": "[X_ACCOUNT_ID]",
  "content": "[TWEET TEXT ≤280 CHARS]",
  "mediaUrls": ["[IMAGE_URL]"],
  "postType": "single"
}
```

### Thread
```
POST /posts
{
  "accountId": "[X_ACCOUNT_ID]",
  "content": "[TWEET 1]",
  "thread": ["[TWEET 2]", "[TWEET 3]", "[TWEET 4]", "[TWEET 5]"],
  "mediaUrls": ["[IMAGE_URL]"],
  "postType": "thread"
}
```

## Critical Rules
- Rotate through all 3 styles — never repeat the same style twice in a row
- Within Style 3 (thumbnail), rotate Y1 → Y2 → Y3 sequentially
- First line of every tweet must hook without needing "show more"
- Max 2 hashtags — algorithm penalizes more
- Single tweets for quick takes, threads for deep dives — never write a shallow thread
- Always base content on the day's researched AI news
- Never post more than once per time slot from this routine
