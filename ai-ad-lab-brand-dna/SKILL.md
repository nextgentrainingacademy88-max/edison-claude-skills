---
name: ai-ad-lab-brand-dna
description: "Use this skill when a user wants to create a Brand DNA document for a brand. Trigger on commands like /brand dna, /brand DNA, /create brand dna, /brand research, or when the user says 'I want to research a brand', 'build a brand DNA doc', 'let's do brand research', 'make a brand DNA for [brand]', or 'I need a brand DNA document'. Also trigger if the user is starting The AI Ad Lab workflow and wants to begin with brand research before making static ads. ALWAYS trigger this skill for any request involving Brand DNA creation, brand research, or brand identity documents."
---

# The AI Ad Lab — Brand DNA Document

This skill runs the Brand DNA research workflow. It reverse-engineers a brand's full visual and verbal identity and outputs a polished, downloadable HTML Brand DNA document ready to use as input for the 40 static ad prompts workflow.

---

## How to trigger this skill

User types any of:
- `/brand dna`
- `/brand DNA`
- `/create brand dna`
- `/brand research`
- "I want to research a brand"
- "Build a brand DNA doc"
- "Make a brand DNA for [brand]"
- "I need a brand DNA document"
- "Let's do brand research"
- "Start the AI Ad Lab workflow"

---

## The Workflow

### Step 1 — Ask the user for inputs

**Ask the user:**
> What brand do you want to research? Give me the **brand name** and the **target URL** (their website).

---

### Step 2 — Check for the Claude in Chrome extension (REQUIRED)

This skill REQUIRES the Claude in Chrome extension to produce the best possible Brand DNA document. Without it, Claude can only pull limited secondhand information from web search. With it, Claude can actually visit the brand's website, scroll through every page, read the real copy, and pull exact hex codes and typography directly from the source.

**Before doing any research, attempt to activate the browser tools:**

1. Search for the browser tools using `tool_search` with a query like `"browser navigate"` or `"tabs context"` to load the Claude in Chrome tools.
2. Once loaded, call `tabs_context_mcp` with `createIfEmpty: true` to check if the extension is connected.

**If the extension is connected** (a tab is returned successfully):
- Proceed to Step 3 (Live Site Research).

**If the extension is NOT connected** (the tool returns "Claude in Chrome is not connected" or an equivalent error):
- STOP the workflow immediately.
- Do NOT proceed with a degraded web-search-only version.
- Show the user the following setup instructions and wait for them to confirm they are connected before retrying:

> **The Claude in Chrome extension needs to be installed for the best Brand DNA document.**
>
> Without it I can only pull limited secondhand info from web search. With it, I can actually open the brand's website, scroll through it, read the real copy, and grab exact hex codes straight from the source.
>
> Here is how to set it up:
>
> 1. Install the extension: https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn
> 2. Sign in with your Claude account (paid plan required)
> 3. Make sure Chrome is open and the extension icon shows as connected
> 4. Reply "ready" and I will try again
>
> If you want me to proceed anyway without the extension using web search only, just tell me and I will do that instead (output quality will be noticeably lower).

Once the user confirms they are ready, re-run `tabs_context_mcp` to verify the connection and proceed.

---

### Step 3 — Live Site Research (with Chrome extension)

With the extension connected:

1. Navigate to the target URL using the `navigate` tool.
2. Take a screenshot to see the homepage live.
3. Scroll through the full homepage from top to bottom, taking screenshots at intervals to capture every section.
4. Navigate to the About, Product, and any mission/story pages (e.g. /pages/about, /pages/story, /pages/sustainability) and scroll through each one.
5. Use `get_page_text` on key pages to extract clean copy and CSS variable references (look for `background-color:`, `color:`, `font-family:` values in the inline styles).
6. Note the actual typography treatments, color palette hex codes, photography style, CTA styling, nav structure, and voice/tone patterns directly from what is rendered on screen.

Capture and record:
- Exact hex codes from the page's CSS (e.g. `#121212`, `#C9A84C`)
- The brand's typography stack (logo font, display font, body font)
- Real headlines, taglines, and micro-copy from the site
- Photography and art direction patterns
- Nav items, CTA copy, and footer structure
- Any unique brand details (loyalty program names, community terminology, etc.)

---

### Step 4 — Load and run the research prompt

Load the full research prompt from:
`references/brand-dna-prompt.md`

Run it using the live observations from Step 3 PLUS web search for external context (design agency credits, brand history, press coverage, competitive landscape). Substitute the user's brand name and URL into every `[BRAND]` and `[TARGET URL]` placeholder in the prompt. Do not change any other part of the prompt.

The live site observations from Step 3 take precedence over web search results whenever they conflict — the site is the source of truth.

---

## Output

A downloadable HTML Brand DNA document styled to match the brand's own visual identity. The document should:

- Use the brand's actual color palette (hex codes pulled live from the site), typography style, and visual mood
- Have a clean professional layout with clear section headers and generous spacing
- Be visually impressive — something you could show to a client or creative team
- Be immediately downloadable
- Include a "Live Site Copy" section that showcases the real headlines, taglines, and nav copy pulled directly from the site

Present the file to the user using the `present_files` tool.

---

## After presenting the file

Once the Brand DNA document is delivered, tell the user:

> Brand DNA is done! When you're ready to generate your 40 static ad prompts, use the `/40 static ads` command and upload this Brand DNA document along with your VOC research and product images.

---

## Important rules

- **The Claude in Chrome extension is required.** If it is not connected, stop the workflow and walk the user through installation before proceeding. Only fall back to web-search-only mode if the user explicitly asks for it.
- **Web search must also be on.** The brand research combines live site observation with external context from web search.
- **Do not change the Brand DNA prompt.** Fill in the brand name and URL, run it exactly as written in `references/brand-dna-prompt.md`.
- **Output must be an HTML file.** Not markdown, not plain text — a styled, downloadable HTML document.
- **Live site observations win.** When live site data conflicts with web search results, trust the live site.
