---
name: Do not use the Y2 Cyborg half-face style
description: Edison dislikes the Y2 half-face human/cyborg split image style. Skip it from all rotations.
type: feedback
originSessionId: 42f8fa17-a57a-4d1d-903e-8d50449b4999
---
Never generate the Y2 Cyborg / Half-Face AI concept image for Edison's social posts. He reviewed a sample and said he does not like it.

**Why:** Edison reviewed the six LinkedIn rotation variants generated on 2026-04-22 and explicitly rejected the Y2 Cyborg half-face split. His brand is warm, educator-friendly, Malaysian audience — the dystopian cyborg aesthetic conflicts with that positioning.

**How to apply:**
- Remove Y2 Cyborg from the YouTube Thumbnail rotation in `edison-content-image-creator`.
- Only rotate between Y1 (MrBeast) and Y3 (Clean Authority) for thumbnails.
- If a future instruction asks explicitly for the half-face concept, confirm with Edison first — don't generate by default.
- Update the skill's rotation logic when pushing to GitHub so the cron never picks Y2.
