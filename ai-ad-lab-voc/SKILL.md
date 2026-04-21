---
name: ai-ad-lab-voc
description: "Use this skill when a user types /voc, /voc research, /voice of customer, or asks to run VOC research for a product. This skill runs the full The AI Ad Lab VOC workflow for static Meta ads — conducting deep product and brand research across multiple platforms to produce a raw research report, then formatting it into a professional downloadable HTML document a copywriter uses to write static Meta ads. Always trigger this skill when the user mentions VOC research, voice of customer, customer language mining, or wants to research what customers say about a product before writing ads. Requires web search to be enabled."
---

# The AI Ad Lab — VOC Research for Static Meta Ads

This skill runs the full two-phase VOC research workflow. The output is a professional downloadable HTML document containing raw, verbatim customer language and strategic analysis — everything needed to write static Meta ad copy, generate image prompts, and build creative briefs.

---

## ⚠️ Before Starting

Web search MUST be enabled. If it is not on, stop and tell the user to enable it before proceeding.

---

## Inputs Required

Ask the user for these two things before starting anything:

1. **Target product URL** — the specific product page (not the homepage). Example: `brand.com/products/product-name`
2. **Target product name** — the exact product name as the brand calls it

Do not proceed until you have both.

---

## The Workflow — Two Phases, Run in Order

Do not skip ahead. Phase 2 depends on Phase 1 output.

---

### PHASE 1 — VOC Research

Load the research prompt from:
`references/research-prompt.md`

Follow it exactly. Substitute the user's product URL and product name into every `{product_url}` and `{product_name}` placeholder. Do not change any other part of the prompt.

Run the research with **web search active**. Keep searching until the minimum quote thresholds in the prompt are met. If searches return insufficient results, try different search terms, synonyms, related products, and adjacent communities — do not stop early.

When Phase 1 is complete, tell the user:
> "Research complete. Building your document now..."

Do not show the raw research output to the user — go straight to Phase 2.

---

### PHASE 2 — HTML Document

Load the formatting instructions from:
`references/html-format.md`

Follow them exactly. Use the Phase 1 research as the source material. Output a single self-contained HTML file with no external dependencies.

Save the file as:
`/mnt/user-data/outputs/voc-[product-name].html`

Present the file to the user using the `present_files` tool.

---

## Rules

- **Web search is not optional.** All quotes must come from real sources found during live research. No synthetic language, no paraphrasing of what customers "probably say."
- **Works for any brand size.** The research prompt has a built-in triage cascade — if direct product reviews are thin, it automatically falls back to competitor VOC, then problem-space research. A brand with zero reviews still gets a full, rich document.
- **Product first, brand second.** Research the specific product page and product-level reviews before expanding to brand-level data.
- **Verbatim only.** Every customer quote must be preserved exactly as written — slang, grammar errors, ALL CAPS, ellipses, emotional punctuation included.
- **No hooks or headlines.** This skill gathers and analyses raw VOC data. It does not write ad copy. The output is a research document for copywriters and creative strategists, not a copy deck.
- **Static ads only.** All analysis and language collection is scoped to what is useful for static image Meta ads. Do not include video scripting notes, UGC direction, or spoken language guidance.
