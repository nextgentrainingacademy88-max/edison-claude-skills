# Manual Engagement Queue
**Last updated:** 2026-04-23T01:24Z
**Last run:** Morning automation 2026-04-23 (ChatGPT Workspace Agents)

---

## Infrastructure Status

Engagement logging system online
- Blotato accounts verified: Facebook, Instagram, LinkedIn, Threads, X/Twitter
- Manual queue ready for DM packages
- Engagement log: `engagement-log.jsonl`

## Current Limitation
Blotato MCP does not expose `list-posts` or `list-comments` endpoints. To proceed,
comment data must be provided via:
1. Manual CSV/JSON feed of recent comments
2. Direct API integration (Graph API for FB/IG, LinkedIn API, Twitter API v2)
3. Browser-based scraping with comment screenshots (Claude-in-Chrome when PC awake)

---

## Manual Queue Items

### MANUAL PIN REQUIRED - 2026-04-23 morning posts
Edison must manually pin the first reply / pinned comment on each platform once posts go live:
- LinkedIn: pin the "All 5 below" comment after posting Comment 1 in the thread
- Facebook: pin the "All 5 below" comment after posting Comment 1 in the thread
- Instagram: pin the "All 5 below" comment

Published post URLs:
- LinkedIn: https://linkedin.com/feed/update/urn:li:share:7452889662685175809
- Facebook: https://facebook.com/726492947207808_122173498700887913
- Instagram: https://www.instagram.com/p/DXdKTTvIMCF/
- Threads: https://www.threads.com/@edisonchuaofficial/post/DXdKG0JEU4b
- X / Twitter: https://x.com/aiwithedison/status/2047124153648521315

### Strategy A comment thread copy (paste under each post manually)
**Topic:** ChatGPT Workspace Agents launched April 22, 2026. Free until May 6.

Comment 1 (PIN this one):
```
All 5 workspace agent recipes below. Save this before you forget.
```

Comment 2:
```
1. LEAD-QUALIFIER AGENT

Reads new leads in your inbox or CRM. Scores Hot, Warm, or Cold.
Drafts a first reply in your voice. You approve, hit send.
Replaces a junior SDR for $0.

Setup prompt: "You are my lead-qualifier agent. When a new lead enters my inbox, score Hot, Warm, Cold using my rubric. Draft an 80-word reply in my voice. Wait for my approval before sending."
```

Comment 3:
```
2. WEEKLY CONTENT AGENT

Every Monday at 7am: pulls top 5 stories in your niche from the last 7 days.
Drafts 5 ready-to-post pieces in your voice.
Saves 6 hours of staring at a blank screen.

Setup prompt: "Every Monday 7am, search the web for top 5 stories on AI tools. Draft 5 posts (hook + 3-5 numbered insights + soft CTA). 220 words max each. No em dashes. No hashtags except 3 at the end."
```

Comment 4:
```
3. INVOICE CHASER AGENT

Tracks every unpaid invoice. Drafts polite follow-ups at day 7, 14, 30.
Most clients pay 23 days faster.

Setup prompt: "Each week I share unpaid invoices. Draft a polite follow-up matched to overdue stage: day 7 friendly nudge (60w), day 14 warmer + offer call, day 30 firm but polite + late fee policy. Sign off as Edison Chua | AI with Edison."
```

Comment 5:
```
4. SUPPORT TRIAGE AGENT

Sorts incoming tickets by urgency. Drafts replies to the easy 70 percent.
You only handle the tough 30.

Setup prompt: "When I forward support tickets, sort URGENT (handle me), EASY (draft reply), SPAM (mark delete). For EASY, draft warm 1-paragraph reply, sign off Edison from AI with Edison."
```

Comment 6:
```
5. COMPETITOR WATCH AGENT

Scans 5 competitor sites every Friday. Summarises pricing changes, new features,
fresh offers. Lands in your inbox before lunch.

Setup prompt: "Every Friday 10am visit my 5 competitor URLs. Compare to last week. Summarise pricing changes, new features, new headlines, new testimonials. End with strategic implications for AI with Edison. Under 600 words total."
```

---

### Auto-DM responses (when commenter says AGENT)

When a commenter on any of today's posts comments AGENT (or asks for the link / guide /
DM / interested), reply with:

```
Hey [first name], here you go: https://github.com/nextgentrainingacademy88-max/edison-claude-skills/blob/main/pdfs/chatgpt-workspace-agents-recipes.md

Full setup for all 5 workspace agents inside. If it helps, a share or repost means a lot.
```

Note: the file is currently on the dev branch `claude/intelligent-mayer-EmOIC`. Once
merged to `main` the link above will resolve. Until then use the dev-branch URL:
https://github.com/nextgentrainingacademy88-max/edison-claude-skills/blob/claude/intelligent-mayer-EmOIC/pdfs/chatgpt-workspace-agents-recipes.md

---

### IMAGE REGENERATION QUEUE - face-required hero images skipped this run
KIE_API_KEY not exposed in this remote session. Per `feedback_face_required_kie_ai_first.md`,
face-required images must NOT use Blotato text-to-image templates because they produce a
generic Asian male. The morning run therefore used the IG Carousel intro slide (face-free,
branded navy + yellow tutorial template) as the cross-platform hero image for LinkedIn,
Facebook, Threads, and X. Below are the prompts Edison should regenerate locally with
Nano Banana Pro and replace before the post goes evergreen / re-promoted.

#### 1. LinkedIn paired image (edison-content-image-creator, Style B Concept, 4:5)
```
Use the face from the uploaded reference photo exactly. Preserve exact likeness.
Young Asian man, black hair, slim build, warm confident smile.

Outfit: bright cobalt blue bomber jacket over a fitted white tee.

Pose: standing slightly off-center, one hand gesturing outward as if explaining,
looking directly at camera with confident expression.

Scene: clean studio background with deep dark navy #0A1628, large bright white soft
glowing circle behind Edison (mandatory). Floating around him: 5 small glowing
3D-style robot agent icons each labelled (in tiny crisp text) LEAD, CONTENT,
INVOICE, SUPPORT, COMPETITOR. Warm orange-gold rim light, slight lens flare.

Top of frame, very large bold white text: "5 CHATGPT WORKSPACE AGENTS".
Below in bold yellow #FFD700: "(to build today as a solo founder)".
Bottom-left small white text: "Edison Chua | AI Educator + Growth Funnel Expert".

Aspect ratio 4:5. Ultra realistic, photorealistic, 8K, cinematic, sharp.
Render only the headline, subtitle, and bottom-left tag.
image_input: face_primary.blotato_url
```

#### 2. Facebook Type 8 Kanji-style branded post (4:5, face-required)
```
Use the face from the uploaded reference photo exactly. Preserve exact likeness.
Young Asian man, black hair, slim build, warm confident smile, wearing a clean
dark blazer over white shirt.

Scene: Edison in TOP 60 percent of frame, holding a large glowing 3D ChatGPT logo
floating above his open palm. Warm cinematic lighting with orange and gold accent
glow from the logo, clean studio-style background with soft light rays, slight lens
flare. The ChatGPT logo must be crisp, high-resolution, immediately recognizable.

BOTTOM 30 percent: solid dark navy #0A1628 block with bold oversized stacked headline.
Line 1 in WHITE: "STOP HIRING. START DELEGATING TO".
Line 2 in YELLOW #FFD700: "CHATGPT WORKSPACE AGENTS".

Above the navy block, a thin horizontal divider, and immediately under the divider a
small circular headshot of Edison on the left, the name "Edison Chua" with a small
blue verified tick beside it, and beneath the name the smaller grey tagline
"AI Marketing Strategist".

Centered at the very bottom inside the navy block, small clean white uppercase text
reading "COMMENT FOR MORE".

Aspect ratio 4:5. Ultra realistic, photorealistic, 8K, cinematic, sharp.
image_input: face_primary.blotato_url
```

#### 3. Instagram carousel cover slide (carousel-creator Type A, 4:5)
```
Use the face from the uploaded reference photo. Preserve exact likeness.
Young Asian man, black hair, slim build, warm confident smile.

Outfit: bright cobalt blue bomber jacket over a white tee.
Pose: holding a small floating 3D agent robot companion in his palm, looking at it
with curious confident smile.

Layout: Instagram carousel cover, 4:5 portrait. Solid vibrant flat background color
#0D47A1 (bright cobalt). Edison stands center, 3/4 body. Behind Edison, a large
bright white soft glowing circle (mandatory). Floating 3D-style icons of small
agent robots around him.

At the top: very large bold white text reading "5 CHATGPT WORKSPACE AGENTS".
Below in bold yellow: "(stop hiring. start delegating.)".
Bottom-left corner: small white "Edison Chua" with subtext "AI Educator + Growth Funnel Expert".

Soft studio lighting, natural skin tone, subtle rim light.
Ultra realistic, 8K, photorealistic, cinematic, sharp.
image_input: face_primary.blotato_url
```

#### 4. X / Twitter MrBeast-style thumbnail (16:9 landscape, face-required)
```
YouTube thumbnail style, 16:9 landscape.
Use the face from the uploaded reference photo. Preserve exact likeness.
Young Asian man, black hair, slim build, casual fashion (clean streetwear or polo,
no suits), wide-eyed surprised excited expression, leaning slightly forward,
pointing at the text on the right.

Background: bold dark navy #0A1628 with yellow #FFD700 light rays radiating from
the text area. WHITE glow rim light behind Edison's head.

Bold oversized white text with thick black stroke on the right side, in 2 stacked
lines: line 1 "CUSTOM GPTs" line 2 "ARE DEAD" with key word "DEAD" in bright yellow.

Studio quality, bright front lighting, sharp 4K, MrBeast YouTube thumbnail energy.
image_input: face_primary.blotato_url
```

#### 5. Pin-comment image for LinkedIn + Facebook (1:1 square, face-required)
```
Use the face from the uploaded reference photo. Preserve exact likeness.
Young Asian man, black hair, slim build, warm confident smile, pointing down with
his index finger toward the bottom of the frame, friendly inviting expression.

Scene: Edison on the right side, a large bold yellow #FFD700 arrow curving down from
him toward the bottom-left corner. Background: clean dark navy #0A1628 with soft
golden light rays.

Bold yellow #FFD700 text on the LEFT side, stacked in 2 lines: "ALL 5 AGENTS BELOW".
Under the headline in smaller white text: "Save this before you forget".

Small "Edison Chua | AI Marketing Strategist" tag at bottom.
Aspect ratio 1:1. Ultra realistic, 8K, photorealistic.
image_input: face_primary.blotato_url
```

---

### Blotato issues encountered this run (for ops review)
- Whiteboard infographic template (id `ae868019-820d-434c-8fe1-74c9da99129a`) failed
  3 of 4 generations with `creation-from-template-failed`. Only 1 succeeded after a
  retry with a simplified prompt.
- Breaking News template (id `8800be71-52df-4ac7-ac94-df9d8a494d0f`) returned
  `insufficient-credits` - Edison should top up at https://my.blotato.com/settings/billing
- Blotato visual generation appears rate-limited when 5 templates are submitted in
  parallel. Sequential submissions with 5-10s gaps work better.
- Instagram caption was rejected at first for having more than 5 hashtags. The
  documented LinkedIn convention (10-15 hashtags) does not pass IG validation via
  Blotato. Cap IG hashtags at 5 in the skill files.

---
