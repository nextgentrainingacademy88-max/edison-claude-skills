# Workshop Variant Guide — Shared Across Skills

This guide defines the **20% workshop-photo rotation variant** that applies to:
- `carousel-creator` (LinkedIn, Instagram, Facebook carousels)
- `edison-content-image-creator` (LinkedIn single images)
- `facebook-content-creator` (Facebook single images)

## Rotation Logic: 80/20 Split

| % | Variant | Description |
|---|---------|-------------|
| **80%** | Standard | Use the skill's default branded style (navy + yellow + Edison's face via Nano Banana Pro) |
| **20%** | Workshop | Use real workshop photos from Google Drive as darkened backgrounds with text overlays |

When the routine runs, check `rotation-state.json` for `last_20_percent_trigger`. If 4 standard posts have run since the last workshop post, next one MUST be workshop variant.

---

## Asset Sources

All asset URLs live in `assets-manifest.json` in the repo root. Always fetch this file at the start of a run.

```
GET https://raw.githubusercontent.com/nextgentrainingacademy88-max/edison-claude-skills/main/assets-manifest.json
```

### Face photo (for slide 1 / cover)
Use `face_primary.url` from manifest:
```
https://lh3.googleusercontent.com/d/1xtRHfRctuDwNtOcg9cAhupE5zC1NUikh
```

### Workshop photos (for slides 2+ / backgrounds)
Randomly pick from `workshop_photos[]` array in manifest (28 photos available). Pick enough unique photos for the carousel (e.g. 5-8 photos for a 6-9 slide carousel, skipping slide 1).

---

## Workshop Variant — Carousel Format

### Slide 1: Cover (Edison's Face)
Same as standard — Nano Banana Pro image-to-image using `face_primary.url` as reference.

**Prompt:**
```
Ultra-realistic photo, young Asian man in casual outfit (graphic tee or polo), 
confident pose, deep dark navy background (#0A1628), bold yellow text overlay 
reading "[TOPIC IN 6 WORDS OR LESS]", "AI with Edison" branding bottom-right, 
4:5 aspect ratio (or 1:1 for Instagram story, 16:9 for wider LinkedIn)
```

### Slides 2-N: Workshop Photo + Darkened Overlay + Bold Text
Pick a different workshop photo per slide. Apply this treatment via Nano Banana Pro:

**Prompt template:**
```
Use this reference image: [WORKSHOP_PHOTO_URL]. Apply 60% dark navy (#0A1628) 
overlay on top to darken the photo. Add bold yellow (#FFD700) headline text 
"[SLIDE HEADLINE]" centered in upper third, white body text "[1-2 LINE POINT]" 
in lower third. Keep the workshop photo recognizable but backgrounded. 
4:5 aspect ratio, professional authority aesthetic.
```

### Final CTA Slide
Back to Edison's face (Nano Banana Pro image-to-image using `face_primary.url`) — same treatment as cover but with CTA text like "Follow for daily AI insights" or "DM 'TRAIN' for corporate workshops".

---

## Workshop Variant — Single Image Format

For `edison-content-image-creator` and `facebook-content-creator`, the workshop variant is a **single image**, not a carousel.

**Prompt:**
```
Use this reference image: [WORKSHOP_PHOTO_URL]. Apply 55% dark navy (#0A1628) 
overlay to darken. Add bold yellow (#FFD700) headline "[TOPIC IN 8 WORDS]" 
centered, optional white supporting text below "[1-LINE SUBHEADLINE]". 
"AI with Edison" watermark bottom-right in small white text. 
Aspect ratio 4:5 for LinkedIn or 1:1 for Facebook/Instagram.
```

This produces a credibility/authority post showing Edison's real workshop context with a punchy text overlay.

---

## When to Use Workshop Variant (Content Fit)

The workshop variant performs best for these topic types:
- **Corporate training announcements** ("I just trained 40 managers on Claude")
- **Client results or case studies** ("This is what 1 day of AI training looks like")
- **Credibility moments** ("200 staff trained this quarter — here's what worked")
- **Behind-the-scenes** ("Here's what my last workshop covered")
- **Authority takes** on AI topics with a "from the trenches" angle

If the topic doesn't fit (e.g. pure AI news commentary), skip workshop variant for this run and bump the rotation counter — next eligible run uses workshop.

---

## Copy Treatment

The caption/copy style follows each platform's existing skill rules. No special caption format for workshop variant — just ensure the topic supports the authority/credibility angle.

---

## Rotation State Update

After posting a workshop variant, update `rotation-state.json`:
```json
{
  "[skill-name]": {
    "workshop_last_run": "2026-04-22T09:00:00+08:00",
    "posts_since_workshop": 0,
    "last_workshop_photo_id": "1GtALysAkdK0Tfe4bqM5RxuVj9dQ3nPur"
  }
}
```

Increment `posts_since_workshop` after each standard post. When it reaches 4, next post must be workshop.

---

## Summary

1. Check rotation state → decide standard or workshop for this run
2. If workshop: fetch `assets-manifest.json`, pick random workshop photos
3. Generate slides/image with workshop photo + dark overlay + bold text
4. Post to platform via Blotato
5. Update rotation state
