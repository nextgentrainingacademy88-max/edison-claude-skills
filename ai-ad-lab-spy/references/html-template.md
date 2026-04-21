# Ad Spy HTML Template — Premium Output Guide

Build a single self-contained HTML file. No external CSS frameworks. No CDN dependencies. Everything inline.

---

## Design System

```css
/* Color Palette */
--bg-primary: #080b10;
--bg-card: #0f1520;
--bg-card-hover: #141c2e;
--border: #1e2d45;
--border-accent: #2a4070;
--text-primary: #f0f4ff;
--text-secondary: #8a9bbf;
--text-dim: #4a5a78;
--accent-gold: #f5c842;
--accent-orange: #ff6b35;
--accent-blue: #4d9fff;
--accent-green: #3dd68c;
--accent-grey: #556070;
--gradient-header: linear-gradient(135deg, #0a1628 0%, #0f2044 50%, #091830 100%);
```

```css
/* Typography */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

---

## Page Structure

### 1. `<head>`
Include all CSS inline in a `<style>` block. Set `<meta charset="UTF-8">` and a descriptive `<title>` like `Ad Spy — [keyword] — [date]`.

### 2. Header Section

Full-width header with gradient background. Contains:

```
[THE AI AD LAB]          Ad Spy Report
                         [KEYWORD/BRAND] • [COUNTRY] • [DATE]
```

Below the header, show **3 stat pills** in a row:
- `[X] ADS SCANNED`
- `[Y] POTENTIAL WINNERS`  
- `[Z] STILL ACTIVE`

Stat pills: dark pill shape, subtle border, small ALL-CAPS label above a large bold number.

### 3. Filter Bar (sticky, top of page when scrolling)

A sticky bar just below the header with 5 filter buttons:
- `ALL` (default selected)
- `🏆 PROVEN`
- `🔥 HOT`
- `⚡ ACTIVE`
- `✅ RETIRED`

Style: dark background, pill buttons, selected state has border highlight. Use JavaScript `onclick` to filter cards by `data-badge` attribute.

### 4. Ad Cards Grid

Two-column responsive grid (`grid-template-columns: repeat(auto-fill, minmax(480px, 1fr))`).

Each card is a premium dark card. Structure per card:

```
┌─────────────────────────────────────────────────────┐
│ [BADGE PILL]              [DAYS RUNNING] · [PLATFORMS]│
│                                                       │
│ ┌─────────────────────────────────────────────────┐  │
│ │                                                 │  │
│ │              AD CREATIVE IMAGE                  │  │
│ │         (max-height: 320px, object-fit: cover)  │  │
│ │                                                 │  │
│ └─────────────────────────────────────────────────┘  │
│                                                       │
│ BRAND NAME                              [Ad Library →]│
│                                                       │
│ HEADLINE                                              │
│ (large, bold, white)                                  │
│                                                       │
│ Body copy text goes here — full ad copy visible       │
│ (secondary color, readable size 14-15px)              │
│                                                       │
│ [CTA BUTTON TEXT]                                     │
│                                                       │
│ ─────────────────────────────────────────────────    │
│                                                       │
│ 🧠 WHY THIS WINS                                      │
│ Strategic analysis text here. 2-3 sentences covering  │
│ hook type, awareness level, and why it's working.     │
│                                                       │
│ [Hook: Social Proof] [Level: Solution Aware]          │
│                                                       │
│ ─────────────────────────────────────────────────    │
│                                                       │
│ [📋 COPY FOR /REBUILD]    Started: Jan 12, 2025       │
└─────────────────────────────────────────────────────┘
```

### Card Styling Details

**Badge Pill styles by type:**
- 🏆 PROVEN WINNER → `background: rgba(245,200,66,0.15); border: 1px solid #f5c842; color: #f5c842`
- 🔥 HOT RUNNER → `background: rgba(255,107,53,0.15); border: 1px solid #ff6b35; color: #ff6b35`
- ⚡ ACTIVE AD → `background: rgba(77,159,255,0.15); border: 1px solid #4d9fff; color: #4d9fff`
- ✅ RETIRED WINNER → `background: rgba(61,214,140,0.15); border: 1px solid #3dd68c; color: #3dd68c`
- ⬜ SHORT RUN → `background: rgba(85,96,112,0.15); border: 1px solid #556070; color: #556070`

**Creative image:** Full-width within card, rounded corners (8px), max-height 320px, object-fit cover. If no image URL available, show a dark placeholder with the ad ID centered.

**Headline:** 18–20px, font-weight 700, color #f0f4ff. If empty, show "No headline".

**Body copy:** 14px, color #8a9bbf, line-height 1.6. Show full copy — do not truncate.

**CTA button text:** Small pill in brand-gold color. Only show if `cta_text` is available.

**"Why This Wins" section:** Separated by a subtle divider line. Small section header "🧠 WHY THIS WINS" in accent color. Then the analysis paragraph. Below that, 2–3 small tag pills for hook type and awareness level.

**Tag pill styles:** `background: #1a2540; border: 1px solid #2a4070; color: #8a9bbf; font-size: 11px; padding: 3px 10px; border-radius: 100px`

**"Copy for /rebuild" button:** Ghost button, bottom-left of card. On click, copies a text block to clipboard containing: Advertiser, Headline, Body, CTA, Ad Library URL, Start Date. The text is formatted so the user can paste it straight into the /rebuild chat.

The copy block format:
```
--- AD FOR /REBUILD ---
Advertiser: [PAGE_NAME]
Headline: [TITLE]
Body: [BODY]
CTA: [CTA_TEXT]
Ad Library Link: https://www.facebook.com/ads/library/?id=[AD_ARCHIVE_ID]
Running since: [START_DATE]
Badge: [BADGE]
```

**Ad Library link:** Small external link icon top-right of the card. Links to `https://www.facebook.com/ads/library/?id=[AD_ARCHIVE_ID]`. Opens in new tab.

### 5. Footer

Simple footer:
```
The AI Ad Lab — Ad Spy Report | [DATE] | [X] ads from Meta Ad Library via Apify
Next step: Take a winning ad image → run /rebuild → get your Nano Banana 2 prompt
```

---

## JavaScript Requirements

Include inline `<script>` at bottom of `<body>`:

1. **Filter function** — when filter buttons clicked, show/hide cards with `data-badge="proven"` etc. 'ALL' shows everything.

2. **Copy-to-clipboard function** — for each "Copy for /rebuild" button, copy the pre-formatted text block to clipboard, then briefly change button text to "✓ Copied!" for 1.5 seconds.

3. **Card hover effect** — subtle `transform: translateY(-2px)` and border glow on card hover using CSS transitions (not JS).

---

## Data Injection

Inject ad data as a JavaScript array at the top of the script block:

```javascript
const ADS_DATA = [
  {
    badge: "proven",     // "proven" | "hot" | "active" | "retired" | "short"
    badgeLabel: "🏆 PROVEN WINNER",
    badgeColor: "#f5c842",
    advertiser: "Brand Name",
    headline: "Ad headline text",
    body: "Full body copy of the ad...",
    cta: "Shop Now",
    imageUrl: "https://...",
    adLibraryUrl: "https://www.facebook.com/ads/library/?id=123456",
    adArchiveId: "123456",
    startDate: "Jan 12, 2025",
    daysRunning: 87,
    platforms: ["Facebook", "Instagram"],
    isActive: true,
    whyItWins: "Strategic analysis paragraph...",
    hookType: "Social Proof",
    awarenessLevel: "Solution Aware",
    copyBlock: "--- AD FOR /REBUILD ---\nAdvertiser: Brand Name\n..."
  },
  // ... more ads
];
```

Then render cards from this data array using JavaScript's `innerHTML` or a simple loop — do not hardcode cards in HTML. This keeps the HTML lean and filterable.

---

## Quality Standards

- No external fonts, no CDN links, no images that aren't from the actual ad data
- Cards must render cleanly even if headline, body, or image are missing
- Mobile-responsive: single column below 768px
- The page should feel like a premium intelligence tool, not a basic list
- Total file size should be manageable — embed only what's needed
