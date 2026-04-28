---
name: Face-required images must use kie.ai first, never Blotato built-in templates
description: Blotato built-in templates are text-to-image; they cannot accept Edison's face reference and produce a generic Asian male
type: feedback
originSessionId: 42f8fa17-a57a-4d1d-903e-8d50449b4999
---
**HARD RULE:** Any image that must contain Edison's actual face (carousel cover, carousel
CTA slide, Facebook Type 2/7/8 posts, pin comment images, YouTube thumbnails, LinkedIn
Type 8 Kanji-style) MUST be generated via kie.ai ChatGPT Images 2.0 (gpt-image-2-image-to-image) with `input_urls[0]`
set to `face_primary.blotato_url` from `assets-manifest.json`.

**DO NOT** use Blotato built-in templates (Tutorial Carousel, Quote Card, Whiteboard
Infographic, Newspaper, Breaking News, Tweet Card, etc.) for face-required images. Those
templates are text-to-image only. They will happily generate a generic young Asian male
who looks nothing like Edison, and the rotation-state log will say it succeeded even
though the output is wrong.

**When it happened:** 2026-04-22 morning + afternoon runs. Routine picked Blotato Tutorial
Carousel for the LinkedIn carousel cover + CTA slides. Face URL was discarded by the
template. Edison noticed the generated face didn't look like him across multiple slides.

**Correct path:**
1. kie.ai ChatGPT Images 2.0 (gpt-image-2-image-to-image) with `input_urls: [face_primary.blotato_url]` — PRIMARY for
   face-required images.
2. Retry kie.ai once with simplified prompt if first call fails.
3. Blotato Instagram Carousel Slideshow template (id `53cfec04-2500-41cf-8cc1-ba670d2c341a`)
   with `model: "gpt-image-2-image-to-image"` AND face URL passed as input — only as a last resort.
4. Manual queue entry if all above fail. NEVER post a face-required image with a wrong face.

**Canonical face URL** (use this, not the Google Drive URL):
```
https://database.blotato.io/storage/v1/object/public/public_media/b035c60e-57fb-451a-a5c1-f7a2cbb9d990/b04dfb9c-5b63-4c13-8573-b3d5fc7b717e.jpeg
```
Stored under `assets-manifest.json` → `face_primary.blotato_url` (and also mirrored at
`face_primary.url` for compatibility).

**Face-free images** (numbered points, checklists, quote cards without face, decorative
infographic slides) can still use Blotato built-in templates in priority order — that's
still the fastest/cheapest path for text-only graphics.


**Updated 2026-04-25:** from the remote routine sandbox (Anthropic firewalled api.kie.ai), use the Cloudflare Worker proxy `https://edison-kie-proxy.nextgentrainingacademy88.workers.dev` instead. Same paths, same Authorization header, transparent passthrough. From local PC, hit api.kie.ai directly.
