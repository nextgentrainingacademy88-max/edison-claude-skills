---
name: Never post the raw reference face photo as media — always audit before publish
description: Edison's permanent face photo (face_primary.blotato_url and face_primary.drive_url) is a kie.ai INPUT only, never a Blotato post payload. If image generation fails, SKIP the platform — do not substitute the raw photo.
type: feedback
---
**HARD RULE:** The raw reference face photo (`face_primary.blotato_url`, `face_primary.drive_url`, anything carrying drive ID `1xtRHfRctuDwNtOcg9cAhupE5zC1NUikh`, and any URL in `face_alternatives[]`) is a generation INPUT only. It must NEVER be attached as media on a Blotato post. Same rule applies to raw `workshop_photos[]` URLs — workshop photos require darkening + text overlay before they go live.

**When it happened:**
- 2026-04-22: a Blotato Tutorial Carousel template ignored the face URL and posted a generic Asian male — fixed by `feedback_face_required_kie_ai_first.md`.
- 2026-04-24 morning run: kie.ai host was blocked in the remote sandbox. Routine refused the banned Blotato text templates (correct), then substituted `face_primary.blotato_url` directly as the media on LinkedIn, Facebook, Instagram, Threads, and X (wrong). Five posts shipped with Edison's raw passport-style face photo and no branding.

**Mandatory pre-publish audit (in `remote-routines.md` Step 4a):**
For every image URL before it's passed to Blotato, all four checks must pass:
1. **Identity** — URL is not face_primary, not a face alternative, not a raw workshop photo.
2. **Provenance** — URL traces back to a kie.ai task ID generated in THIS run (or to a Blotato upload made FROM that kie.ai output during this run).
3. **Content** — for face-required branded posts, the kie.ai prompt must have included the navy block + yellow/white headline + "COMMENT FOR MORE" / verified-badge clauses. If a retry stripped them, re-run with the full prompt.
4. **Sanity** — image size > 50KB and byte-length differs from the reference face photo.

If ANY check fails, the platform is SKIPPED and the prompt + topic is logged to `generated/engagement-manual-queue.md`. Posting nothing is always preferred over posting the raw reference photo.

**Logging:** Per-platform audit result goes into `rotation-state.json` → `image_generation.last_audit_result` (e.g. `"pass_kie_ai_branded"`, `"reject_raw_face_photo"`, `"reject_no_kie_task_id"`, `"reject_branding_missing"`).

**The fallback hierarchy is now:** kie.ai full prompt → kie.ai simplified prompt → SKIP. There is NO step that posts the raw reference photo. That option is removed permanently.
