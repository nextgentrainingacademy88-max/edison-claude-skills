---
name: Prefer cheaper models for non-critical work
description: Edison wants Haiku (or cheapest capable model) used for routine/parallel subtasks to conserve context and cost
type: feedback
originSessionId: 42f8fa17-a57a-4d1d-903e-8d50449b4999
---
Use the cheapest capable Claude model (Haiku 4.5 by default) for routine subtasks, parallel dispatches, research loops, or anything that doesn't need Opus-level reasoning. Reserve Opus for complex planning, final copywriting, and architecture decisions.

**Why:** Edison is running a long-lived social media automation routine that fires 2x daily across 5 platforms. Token/cost management matters for sustainability. He explicitly flagged this during the first LinkedIn demo run.

**How to apply:**
- When spawning Agent/Task subagents for research, scraping, or mechanical work, pass `model: "haiku"`.
- When generating images or running tool pipelines where Claude is just orchestrating API calls, default to Haiku.
- Keep Opus for: skill orchestration, final post copy, strategic angle decisions, troubleshooting.
- If unsure, ask rather than assume Opus.
