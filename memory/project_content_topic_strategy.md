---
name: Content topic strategy — AI news + how-to + monetization + comment-for-link
description: Every post focuses on latest AI news / tool updates / practical how-to tips / how to make money with AI tools, with a "Comment [KEYWORD] for the link" CTA
type: project
originSessionId: 42f8fa17-a57a-4d1d-903e-8d50449b4999
---
**Core content focus** (across LinkedIn, Facebook, Instagram, Threads, X):

1. **Latest AI news / tool updates / new feature releases** — anything just shipped in
   the last 24-72 hours across Claude, ChatGPT, NotebookLM, Manus, Gemini, Perplexity,
   Midjourney, Runway, ElevenLabs, Sora, Veo, etc. Don't cover "old" news or evergreen
   explainers unless tied to a current release.

2. **Practical how-to tips** — "Here's how to use [tool] for [specific outcome]". Every
   post should leave the reader with something they can copy-paste or apply today. For
   AI-educator content specifically:
   - How to use Claude Code / Claude Agents for real work
   - How to use ChatGPT's new features (e.g. GPT-5 image gen, canvas, agents)
   - How to use NotebookLM to study/research faster
   - How to chain tools together (Claude + NotebookLM, ChatGPT + Manus, etc.)

3. **How to make money with AI tools** — monetization angles are high-engagement:
   - "How to make money with Claude Code"
   - "I built [X] with ChatGPT agents and made [$]"
   - "The AI side-hustle stack that pays [$] per month"
   - Case studies or teardown of how real people monetize AI skills

**CTA pattern — "Comment for the link":** Every post that promises a resource (prompt
pack, GitHub repo, PDF guide, workflow template) should end with a comment-gated CTA:

- `"Comment CLAUDE and I'll DM you the GitHub link."`
- `"Comment PROMPT and I'll send you the prompt pack."`
- `"Comment GUIDE and I'll send you the full PDF."`
- `"Comment NOTEBOOK and I'll DM you the NotebookLM setup."`

Pick a short memorable KEYWORD per post (CLAUDE / PROMPT / GUIDE / NOTEBOOK / AGENT / etc).
Store the resource link under `rotation-state.json` → `{platform}_pdf_links[topic_slug]`
before publishing so the hourly engagement responder can auto-deliver it when someone
comments the KEYWORD.

**Example resources Edison can share via comment-gated CTA:**
- GitHub link to his `edison-claude-skills` repo (for Claude Code skill posts)
- Drive PDF: "50 Claude Prompts for Corporate Training"
- Drive PDF: "How to Make $1K/month with Claude Code — Step-by-step"
- Drive PDF: "ChatGPT Image Gen 2.0 — 20 money-making use cases"
- Drive PDF: "NotebookLM for Students — Complete Workflow"
- Drive PDF: "Claude Agents — Build Your First Automation"

**What NOT to post:**
- Generic motivational content with no AI angle
- Evergreen explainers ("What is AI?") — boring, low engagement
- Funnel/agency-only content at the top of feed — Edison's 30% funnel content goes to a
  different angle (lead gen frameworks, client acquisition case studies) but always keep
  it grounded in a real current example.
- Political or controversy takes

**How to apply in every run:**
1. Research step: search for news from the last 24-72 hours. Prioritize NEW tool releases
   or NEW features. If nothing breaking, pivot to a high-engagement how-to or money angle
   using a recently-released tool.
2. Writing step: lead with the news or the practical hook. Include a concrete how-to or
   framework. End with "Comment [KEYWORD]" CTA if a resource is promised.
3. Engagement step: the hourly responder delivers the linked resource when someone
   comments the matching KEYWORD.

## Reaffirmed 2026-04-30 — 3-bucket value strategy, no pop-culture self-insert

Active content buckets per post:
- (a) NEW AI tool releases / NEW features (Claude updates, ChatGPT new features, NotebookLM, Manus, Gemini, Perplexity, Sora, Veo, Kling, etc.) — **40%**
- (b) Practical how-to tips with copy-paste prompts and stack combos — **35%**
- (c) How to make money with AI tools (case studies, side hustle stack, agency builds) — **25%**

Pop-culture self-insert (F1, cyberpunk, anime poster, etc.) was tested on 2026-04-29/30 and DEPRECATED — face preservation via `gpt-image-2-image-to-image` was unreliable and the F1 test post received negative feedback. See `memory/project_pop_culture_prompts.md` for the deprecation note.

Image engine: Nano Banana Pro (model `nano-banana-pro`, field `image_input`) via direct kie.ai calls when running locally on Edison's PC. The Cloudflare Worker proxy is no longer needed in this setup.

