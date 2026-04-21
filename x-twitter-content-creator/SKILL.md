# Edison's X/Twitter Content Creator

## Core Purpose
This skill creates X (Twitter) posts using two formats: text-on-black and news photo + text overlay. Content is based on the latest AI news researched each morning. Posts are optimized for X's fast-moving feed — punchy, opinionated, and built to be retweeted.

## Platform Specs
- **Platform:** X (Twitter)
- **Post Types:** Two formats (see below)
- **Character Limit:** 280 characters for the main tweet
- **Thread Option:** Yes — expand into a 3-5 tweet thread when topic warrants depth
- **Hashtags:** 1-2 maximum (X penalizes hashtag-heavy posts in algorithm)
- **Optimal Post Time:** 9:00 AM MYT

## The Two Post Formats

### Format 1: Text on Black
- Bold white text on pure black (#000000) background
- Best for: opinions, hot takes, bold claims, quick insights
- No face required — text is the visual
- Aspect ratio: 1:1 square

### Format 2: News Photo + Text Overlay
- Real news/event photo as background
- Bold text overlay with Edison's take on the story
- Best for: reacting to breaking AI news, trending stories
- Aspect ratio: 16:9 or 1:1

## Post Structure

### Single Tweet (≤280 chars)
```
[Hook — bold claim or hot take in 1 line]

[2-3 lines of value or context]

[1-2 hashtags max]
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

**Voice:** Confident, direct, slightly provocative. Edison knows his stuff and isn't afraid to have an opinion. Not aggressive — just clear.

**Inspired by:**
- Short punchy sentences like Dan Kennedy
- Value-first structure like Alex Hormozi
- Opinionated takes that spark discussion

### Hook Types for X
- **Hot take:** "Most AI tools are a waste of money. Here's the 3 that actually move the needle."
- **Contrarian:** "Stop trying to replace your team with AI. Do this instead."
- **News reaction:** "Claude just dropped something nobody's talking about."
- **Bold stat:** "I trained 200 employees on AI last quarter. Only 12% used it correctly. Here's why."
- **Question:** "Which AI tool actually saved you time this week? (Be honest)"

### X-Specific Rules
- **First line must stand alone** — it shows in feed before "show more"
- **No em dashes** — use commas, colons, or line breaks
- **Max 2 hashtags** — place at end only, never mid-sentence
- **Retweet bait** — end threads with "RT if you agree" or "Bookmark this"
- **Numbers perform well** — use specific numbers when possible ("3 tools", "12%", "200 staff")

## Image Generation

### Format 1: Text on Black
```
POST https://api.kie.ai/api/v1/jobs/createTask

Prompt: "Pure black background (#000000), bold white sans-serif text centered reading 
'[MAIN POINT IN 8 WORDS OR LESS]', clean minimal design, high contrast, 
Twitter/X post style, 1:1 square format"
```

### Format 2: News Photo + Text Overlay
- Source relevant news/tech photo via WebSearch
- Apply bold text overlay using Nano Banana Pro:
```
POST https://api.kie.ai/api/v1/jobs/createTask

Prompt: "Photo of [NEWS SUBJECT/SCENE], bold yellow text overlay '[HEADLINE IN 8 WORDS]', 
news broadcast style, high contrast text, 16:9 or 1:1 format, professional journalism aesthetic"
```

### Polling Endpoint
```
GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId={taskId}
```
Poll every 25-30 seconds until status = "SUCCESS"

## Format Selection Guide

| Topic Type | Best Format |
|------------|-------------|
| Opinion / hot take | Format 1: Text on Black |
| Breaking AI news | Format 2: News Photo Overlay |
| Tool comparison | Format 1: Text on Black |
| Company announcement | Format 2: News Photo Overlay |
| Personal insight | Format 1: Text on Black |
| Trending story | Format 2: News Photo Overlay |

## Workflow

1. **Research** latest AI news via WebSearch — pick top story of the day
2. **Decide format** — opinion/insight → Format 1, breaking news → Format 2
3. **Decide length** — single tweet or thread (thread if topic has 3+ distinct points)
4. **Generate image** via Nano Banana Pro
5. **Write tweet copy** — hook + body + 1-2 hashtags
6. **If thread:** write all 5 tweets before posting
7. **Post to X** via Blotato

## Blotato Integration

### Post Single Tweet with Image
```
POST /posts
{
  "accountId": "[X_ACCOUNT_ID]",
  "content": "[TWEET TEXT ≤280 CHARS]",
  "mediaUrls": ["[IMAGE_URL]"],
  "postType": "single"
}
```

### Post Thread
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
- Always base content on the day's researched AI news — never recycle topics
- First line of every tweet must hook without needing "show more"
- Max 2 hashtags — algorithm penalizes more than that on X
- Single tweets for quick takes, threads for deep dives — never write a shallow thread
- Text-on-black images must have enough contrast to read on both light and dark mode
- Never post more than once per day from this routine
