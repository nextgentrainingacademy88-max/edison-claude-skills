# Edison's Instagram Carousel Creator

## Core Purpose
This skill generates branded Instagram carousels (6-9 slides) featuring Edison Chua's dark navy and yellow branding, with his face on cover and CTA slides, internet memes on content slides, and Nano Banana Pro for image generation. Content is based on the latest AI news researched each morning.

## Platform Specs
- **Platform:** Instagram
- **Aspect Ratio:** 4:5 portrait (1080x1350px) for all slides
- **Slide Count:** 6-9 slides maximum
- **Post Type:** Carousel (multi-image)
- **Caption:** Visual-first, hook + value bullets + hashtags
- **Hashtags:** 10-15 relevant hashtags at end of caption

## Key Branding Elements
- **Background:** Deep dark navy (#0A1628)
- **Headlines:** Bold yellow (#FFD700)
- **Body text:** White
- **Brand:** "AI with Edison"
- **Aesthetic:** Professional, modern, corporate trainer meets AI expert

## Slide Types & Treatment

| Type | Face | Meme | Method |
|------|------|------|--------|
| Cover | Yes | No | Image-to-image with Nano Banana Pro |
| Hook/Problem | No | Yes | Graphic + web meme |
| Numbered Points | No | Optional | Graphic ± meme |
| Checklist | No | No | Graphic only |
| Key Insight | No | No | Graphic + bold stat or quote |
| CTA | Yes (circle) | No | Image-to-image |

## Edison's Appearance Requirements
Young Asian man, black hair, slim build, confident smile. **Facial features must remain identical across all slides.** Poses should vary naturally — crossed arms, gesturing, pointing, leaning forward — never static. Outfits stay casual: graphic tees, polos, rolled-sleeve shirts. **No suits unless explicitly requested.**

## Caption Structure
```
[Hook line — 1 sentence, stops the scroll]

[2-3 lines of value or tension]

Slide through to learn [benefit] →

[10-15 hashtags]
```

### Caption Rules
- No em dashes. Use commas, colons, or full stops instead.
- Keep caption under 150 words (Instagram favors concise captions)
- Hook must reference the AI news topic of the day
- Hashtag mix: 5 broad (#AI #ChatGPT), 5 niche (#AIForBusiness #CorporateTraining), 5 branded (#AIWithEdison #EdisonChua)
- Always end with a save/share CTA: "Save this for later" or "Share with your team"

## Workflow

1. **Research** latest AI news via WebSearch — pick the top story of the day
2. **Plan** carousel structure (6-9 slides) based on the news topic
3. **Upload** Edison's face via Blotato presigned URL for cover/CTA slides
4. **Source memes** from imgflip API for content slides
5. **Generate each slide** using Nano Banana Pro with prompt templates below
6. **Poll kie.ai** every 25-30 seconds for results
7. **Write caption** with hook, value teaser, and hashtags
8. **Post to Instagram** via Blotato

## Image Generation

### API Endpoint
```
POST https://api.kie.ai/api/v1/jobs/createTask
```

### Cover Slide Prompt Template
```
Ultra-realistic photo, young Asian man in casual outfit standing confidently against deep dark navy 
background (#0A1628), bold yellow text overlay reading "[TOPIC IN 6 WORDS OR LESS]", professional 
lighting, Instagram carousel cover style, 4:5 aspect ratio, "AI with Edison" branding in corner
```

### Content Slide Prompt Template
```
Dark navy background (#0A1628), bold yellow headline "[SLIDE HEADLINE]", white body text 
"[1-2 LINE POINT]", clean modern layout, Instagram carousel slide style, 4:5 portrait
```

### Meme Slide Treatment
- Source meme template from imgflip: `GET https://api.imgflip.com/get_memes`
- Pick a recognizable format relevant to the AI topic
- Add Edison's brand colors as overlay border (navy frame, yellow accent)

### Polling Endpoint
```
GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId={taskId}
```
Poll every 25-30 seconds until status = "SUCCESS"

## Blotato Integration

### Upload Edison's Face
```
POST to Blotato presigned URL endpoint
Content-Type: image/jpeg
```

### Create Instagram Post
```
POST /posts
{
  "accountId": "[INSTAGRAM_ACCOUNT_ID]",
  "content": "[CAPTION]",
  "mediaUrls": ["[SLIDE_1_URL]", "[SLIDE_2_URL]", ...],
  "postType": "carousel"
}
```

## Slide Planning Template

For a 7-slide carousel on an AI news topic:
1. **Cover** — Edison's face + topic headline ("X Just Changed AI Forever")
2. **Hook** — What happened + why it matters (meme)
3. **Point 1** — Key detail or feature
4. **Point 2** — Impact on businesses/workers
5. **Point 3** — What most people get wrong
6. **Checklist** — 3-5 action steps readers can take
7. **CTA** — Edison's face + "Follow for daily AI updates"

## Critical Rules
- Always base content on the day's researched AI news — never recycle old topics
- Target 6-9 slides maximum (credit limits on kie.ai)
- Keep embedded slide text minimal — max 8 words per headline, 2 lines of body
- Never leave text vague in prompts — specify exact outfit, pose, and content
- Check if Edison's photo is available before generating cover/CTA slides
- 4:5 aspect ratio is mandatory for all slides (Instagram carousel requirement)
- Always include a "Save this" CTA — saves boost Instagram algorithmic reach
