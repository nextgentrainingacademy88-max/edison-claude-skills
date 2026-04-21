---
name: Check OLD skill bundles before saying an instruction does not exist
description: When Edison references a past instruction that isn't in current skills, always unzip and grep the OLD .skill bundles before declaring it missing
type: feedback
originSessionId: 42f8fa17-a57a-4d1d-903e-8d50449b4999
---
When Edison references an instruction he previously gave ("I remember I mentioned X before"), do NOT conclude it was never added until you have searched the OLD skill bundles at `D:/Claude Code/Projects/Social Media Marketing (OLD)/Social Media Marketing/Skills/*.skill`. These are ZIP archives — unzip each into a temp folder before grepping.

**Why:** Edison's skills drifted between April 16 (last OLD bundle versions) and the current local/GitHub versions. Logic that existed in older bundles was stripped out during a sync. Example: the "Blotato first, kie.ai second" priority rule existed in OLD `edison-infographic-creator.skill` line 163 but was missing from the current local skill. When Edison referenced this, I incorrectly said it never existed because I only searched current skills.

**How to apply:**
- Before responding "that instruction doesn't exist" or "it was never added," always extract and grep the OLD `.skill` bundles.
- Pattern: `for f in OLD_DIR/*.skill; do unzip -o -q "$f" -d TMP/$(basename "$f" .skill); done; grep -ril "pattern" TMP`
- If you find the instruction in an OLD bundle, treat that as the source of truth for what Edison intended, and propose restoring it to the current skill.
- The OLD bundles should be treated as a "git history" for the skills until proper version control is set up.
