---
name: Always consult ChatGPT-Images-2.0-prompts-recommend-skill (formerly gpt-image-2-image-to-image (ChatGPT Images 2.0)-prompts-recommend-skill — same library, all prompts compatible with gpt-image-2) before generating images
description: Before calling kie.ai ChatGPT Images 2.0, always invoke the prompt recommendation skill to pull from the 10,000+ curated prompt library instead of freestyling
type: feedback
originSessionId: 42f8fa17-a57a-4d1d-903e-8d50449b4999
---
Every time an image needs to be generated, first invoke `ChatGPT-Images-2.0-prompts-recommend-skill (formerly gpt-image-2-image-to-image (ChatGPT Images 2.0)-prompts-recommend-skill — same library, all prompts compatible with gpt-image-2)` to find a proven prompt template from its 10,000+ curated library. Only after that skill recommends a prompt structure should you craft the final kie.ai prompt.

**Why:** Edison noticed that freestyled prompts (written from memory or reference-matching) produce generic, decorative output. The curated library has tested prompt structures that reliably match specific visual styles. He wants reference-accurate reproduction, not creative reinterpretation.

**How to apply:**
- Before any kie.ai `createTask` call for a new image concept, run the prompt-recommend skill with the topic + desired style.
- When the skill surfaces the matching prompt structure, embed that structure into the relevant Edison skill (edison-infographic-creator, edison-content-image-creator, etc.) so future runs inherit it.
- Push the updated skill to GitHub so the remote scheduled routine uses the same library-backed prompts.
- Exception: if regenerating a variant where the prompt structure is already validated in the skill, reuse the stored structure without re-consulting the library.
- Goal: final infographics should look nearly identical to Edison's reference examples (Charlie Hills, Fatima Khan style).


**As of 2026-04-25:** image engine is `gpt-image-2-image-to-image` via Cloudflare Worker proxy at `https://edison-kie-proxy.nextgentrainingacademy88.workers.dev`. Field name is `input_urls` (NOT `input_urls`).
