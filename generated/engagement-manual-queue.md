# Engagement Manual Queue — 2026-04-23 Hourly Run

**Mode:** Infrastructure setup (comment data source unavailable)

## Status

- **X/Twitter:** Blotato MCP does not expose `list_posts` or `list_replies` endpoints
- **Facebook / Instagram / LinkedIn:** Claude-in-Chrome MCP not available in this environment
- **Data source:** Required to fetch Edison's recent posts and their comments/replies

## Next Steps

When Blotato's full API becomes available via MCP, the engagement routine will:
1. Fetch X posts from last 48h via `blotato_list_posts` (or equivalent endpoint)
2. Fetch replies via `blotato_list_replies` 
3. Auto-reply with the classification logic and templates defined in `comment-engagement-responder/SKILL.md`
4. Generate PDFs on-the-fly for resource requests without existing Drive links

**Infrastructure readiness:** ✅ Complete
- Rotation state tracking: ready
- PDF generation templates: ready  
- Engagement log de-duplication: ready
- Manual DM package format: ready

---
