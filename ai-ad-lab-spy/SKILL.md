---
name: ai-ad-lab-spy
description: "Use this skill when a user types /spy, /ad spy, /find winning ads, /competitor ads, /swipe file, or says they want to find winning competitor ads, spy on competitors, research what's working in their niche, or find ads to reverse-engineer. This skill scrapes the Meta Ad Library via Apify (curious_coder/facebook-ads-library-scraper), scores every ad for 'winner signals' (still active, long run duration, impression tier), and delivers a premium HTML swipe file showing creative images, ad copy, advertiser details, and a strategic 'why this wins' breakdown ready to feed directly into the /rebuild workflow. ALWAYS trigger this skill when the user mentions finding winning ads, competitor research, ad intelligence, swipe files, or wants to know what ads are working in a niche."
---

# The AI Ad Lab — Ad Spy & Winner Intelligence

This skill finds winning Meta ads in any niche or from specific competitors. It calls the Apify scraper, scores ads for winner signals, and delivers a premium HTML swipe file — ready to plug straight into the `/rebuild` workflow.

---

## ⚠️ Requirements

**Apify MCP connector must be connected.** If the Apify MCP tool is not available in your connected tools, stop immediately and tell the user:

> "To use the Ad Spy skill you need to connect the **Apify** integration. Go to **Settings → Integrations**, find Apify, connect it, then come back and run `/spy` again."

Do not attempt to proceed without the Apify MCP tool available.

---

## Step 1 — Gather Inputs

Ask the user for these inputs before running anything. Keep the ask short and clean:

> **Ad Spy Setup**
>
> Give me 3 quick things:
>
> **1. What are you spying on?**
> — A competitor brand name (e.g. "Huel", "AG1", "Gymshark")
> — OR a niche keyword (e.g. "protein powder", "skincare", "posture corrector")
>
> **2. Country** — Which market? (Default: US. Type a 2-letter country code or just say "US", "UK", "SE" etc.)
>
> **3. How many ads?** — How many to pull? (Default: 30. Max recommended: 100)
>
> Reply with all three and I'll start the scan.

Do not proceed until you have all three. If the user only gives a brand/keyword, default country to US and count to 30.

---

## Step 2 — Build the Ad Library URL

Construct the Meta Ad Library search URL from the user's inputs:

**For keyword/brand search (most common):**
```
https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country={COUNTRY}&q={KEYWORD}&search_type=keyword_unordered&media_type=all
```

Replace `{COUNTRY}` with the user's country code (e.g. `US`, `GB`, `SE`) and `{KEYWORD}` with the brand name or keyword, URL-encoded (spaces become `%20`).

**Examples:**
- `q=huel&country=US` → searches for Huel ads in the US
- `q=protein%20powder&country=US` → searches for protein powder ads in the US

Keep `active_status=active` to focus on currently-running (proven) ads by default.

---

## Step 3 — Run the Apify Scraper

Call the Apify MCP tool to run actor `curious_coder/facebook-ads-library-scraper`.

Pass this input:
```json
{
  "url": "<THE_URL_YOU_BUILT_IN_STEP_2>",
  "maxResults": <USER_REQUESTED_COUNT>
}
```

Tell the user while it runs:
> "🔍 Scanning the Meta Ad Library... this usually takes 30–90 seconds."

Wait for the results. The actor returns a JSON array of ad objects.

---

## Step 4 — Score Each Ad for Winner Signals

For each ad in the results, calculate a **Winner Score** using these signals. Read the ad object fields carefully.

### Key Fields to Read
- `is_active` — boolean, true = ad is currently running
- `start_date` — unix timestamp or date string of when ad started
- `end_date` — null if still running
- `snapshot` — object containing: `body` (ad copy), `title` (headline), `link_url` (destination), `cta_text` (button text), `images` (array of image URLs), `videos` (array of video URLs)
- `page_name` — advertiser/brand name
- `publisher_platform` — array of platforms (FACEBOOK, INSTAGRAM, etc.)
- `impressions_with_index` — impression tier (lower index = higher volume)
- `reach_estimate` — estimated audience reached

### Winner Scoring Rules

Calculate **days_running**: difference between start_date and today (or end_date if inactive).

| Signal | Badge | Criteria |
|--------|-------|----------|
| 🏆 PROVEN WINNER | Gold | `is_active = true` AND `days_running >= 60` |
| 🔥 HOT RUNNER | Orange | `is_active = true` AND `days_running >= 21` |
| ⚡ ACTIVE AD | Blue | `is_active = true` AND `days_running < 21` |
| ✅ RETIRED WINNER | Grey | `is_active = false` AND `days_running >= 60` |
| ⬜ SHORT RUN | Dim | `is_active = false` AND `days_running < 60` |

**Priority sort order for output:**
1. 🏆 PROVEN WINNER (highest)
2. 🔥 HOT RUNNER
3. ⚡ ACTIVE AD
4. ✅ RETIRED WINNER
5. ⬜ SHORT RUN (lowest — include only if few results)

**Only show SHORT RUN ads if total results after filtering is fewer than 5.**

---

## Step 5 — Generate the "Why This Wins" Analysis

For every ad with badge 🏆, 🔥, or ⚡ — write a 2–3 sentence strategic breakdown. Cover:

1. **Hook type** — what stops the scroll (visual disruption, bold claim, social proof, curiosity gap, problem call-out, transformation, etc.)
2. **Awareness level** — Problem Aware / Solution Aware / Product Aware / Most Aware
3. **Why it's working** — what structural or psychological element is driving performance (urgency, specificity, contrast, identity, fear/desire, etc.)

Ground the analysis in what you can see: the copy, the creative description, the CTA, how long it's been running.

---

## Step 6 — Build the Premium HTML Output

Load the HTML template guide from:
`references/html-template.md`

Follow it exactly to build the output HTML file.

Save the file as:
`/mnt/user-data/outputs/adspy-[keyword]-[date].html`

Use today's date formatted as YYYYMMDD for `[date]`.

Present the file using the `present_files` tool.

---

## Step 7 — Post-Output Message

After presenting the file, send this message to the user:

> **Your swipe file is ready.** 🎯
>
> Found **[X] ads** — **[Y] potential winners** flagged.
>
> **Next step:** Take any 🏆 or 🔥 ad you like the look of and run `/rebuild` — upload the ad image, your Brand DNA, and your VOC doc and I'll rebuild it for your brand.

---

## Rules

- **Never invent ad data.** Only use what the Apify scraper returns. If an ad has no image URL, skip the image slot — don't substitute a placeholder.
- **Always sort by winner score.** Best ads first. Always.
- **Be brutally honest about signals.** An ad that's been active for 3 days is not a "proven winner." Label it accurately.
- **Protect brand context.** If the user is spying on a specific competitor, the "why this wins" analysis should reference what it means for their niche — not just describe the ad generically.
- **Cap display at 20 ads** in the HTML output (the top 20 by score). If more were scraped, note it: "Showing top 20 of [X] ads scraped."
- **Missing fields:** If `snapshot.body` is empty, label it "No copy visible". If no image is available, show a placeholder card with the ad ID.
