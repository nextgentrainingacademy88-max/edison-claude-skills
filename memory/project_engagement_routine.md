---
name: Hourly engagement routine — Claude-in-Chrome primary + manual fallback
description: X auto via Blotato; FB/IG/LinkedIn auto via Claude-in-Chrome when PC awake, manual DM package when asleep
type: project
originSessionId: 42f8fa17-a57a-4d1d-903e-8d50449b4999
---
Edison's hourly comment-engagement routine: skill `comment-engagement-responder` +
scheduled task `social-media-engagement-hourly`.

**X / Twitter** — always automated via Blotato API. Runs regardless of PC state.

**Facebook, Instagram (feed comments + DMs), LinkedIn** — primary path is AUTOMATED via
Claude-in-Chrome MCP driving Edison's real, logged-in browser session:
- Real cookies, real user agent, real device fingerprint.
- Typing cadence 50-120ms per char (not paste-all-at-once).
- Randomized 8-20s delay between replies.
- Per-run caps: FB ≤8, IG ≤8, LinkedIn ≤5.
- Only runs when Edison's PC is awake. At start of each run, probe Claude-in-Chrome MCP
  with a lightweight call; if no response within 5s, `pc_awake = false`.

**Fallback (when pc_awake is false OR a browser reply fails mid-run):** the responder
prepares a full "DM package" per unreplied comment:
1. Original comment text (for context).
2. Ready-to-send DM wording: "Hey [First Name] 👋 thanks for commenting on my post!
   Here's the free guide: [Drive link]. Hope it helps. If you find it useful, a share
   means a lot 🙏"
3. Drive resource link from `rotation-state.json` → `{platform}_pdf_links[topic_slug]`.

Packages are written to `./generated/engagement-manual-queue.md` AND printed to the run's
stdout so Edison sees them in the task notification or chat. Edison copy-pastes from his
phone.

**Auto-PDF generation:** if a post promised a guide and no Drive link exists yet under
`{platform}_pdf_links[topic_slug]`, the responder auto-generates a branded PDF (navy
#0A1628 + yellow #FFD700, "AI with Edison" cover, one tip per page, CTA page), uploads to
Drive folder `1MyvXqCm8Mhs02OCX1qyWotsT3Pj37Sm-` with "Anyone with link" sharing, saves
the link to rotation-state.json, and pushes the updated state file to GitHub.

**Abort-on-risk rule:** if any reply attempt on FB/IG/LinkedIn hits a login wall, 2FA
prompt, rate-limit banner, captcha, or selector-not-found error, STOP that platform
immediately for the whole run, fall through to manual queue for remaining items, and log
the failure reason. Better one skipped run than a banned account.

**Decision history (2026-04-22):**
- Initial plan: auto-reply across all 4 platforms via headless cloud browser (Browserbase).
- Rejected: headless cloud browsers get detected on Meta/LinkedIn, ban risk too high.
- Then: X only, everything else manual.
- Final (this version): Claude-in-Chrome (Edison's own browser) for FB/IG/LinkedIn when PC
  awake — this IS a human browser, so Meta/LinkedIn don't flag it. Manual queue fallback
  for when PC is off.

**How to apply:** Never revert to Browserbase/Playwright-cloud for FB/IG/LinkedIn. Never
remove the pc_awake probe or the per-platform caps. If Edison adds a new post promising a
PDF, make sure the Drive link is saved in rotation-state.json before the hourly run.
