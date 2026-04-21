---
name: facebook-content-creator
descriptio

---

## Asset Management & Workshop Variant (80/20 Rotation)

All asset URLs (face photo, workshop photos) live in `assets-manifest.json` at repo root. Always fetch at start:
```
GET https://raw.githubusercontent.com/nextgentrainingacademy88-max/edison-claude-skills/main/assets-manifest.json
```

### 80/20 Rotation
- **80% standard** — use the default branded style documented above
- **20% workshop variant** — use real workshop photos with darkened overlay + bold text

See `WORKSHOP-VARIANT-GUIDE.md` at repo root for full workshop variant prompts, rotation logic, and state tracking via `rotation-state.json`.

### Face Photo (for face-required slides/images)
Use `face_primary.url` from manifest — primary Edison face photo (stable Google Drive URL).

### Workshop Photos (for 20% rotation variant)
Random pick from `workshop_photos[]` array in manifest (28 photos).

### Rotation State
Tracked in `rotation-state.json` at repo root. Check `posts_since_workshop` — when it reaches 4, next post must use workshop variant.
