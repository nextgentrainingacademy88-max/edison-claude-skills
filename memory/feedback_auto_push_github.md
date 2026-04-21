---
name: Auto-push to GitHub on every change
description: After editing any skill, CLAUDE.md, memory file, or rotation-state.json, push to GitHub immediately without asking
type: feedback
originSessionId: 42f8fa17-a57a-4d1d-903e-8d50449b4999
---
Whenever you change any of the following files, push the change to the GitHub repo
`nextgentrainingacademy88-max/edison-claude-skills` immediately and automatically — do NOT
ask for confirmation first.

Covered files:
- Any `.staging/<skill>/SKILL.md`
- `CLAUDE.md` (project root)
- `rotation-state.json` (project root)
- `assets-manifest.json` (project root)
- Any memory file under `C:\Users\ediso\.claude\projects\D--Claude-Code-Social-media-automation\memory\`

**Why:** The skills and state are consumed at runtime by the scheduled tasks that run
twice daily (9am + 1pm MYT) AND hourly (engagement responder). If local edits are not
pushed, the remote run uses stale data and the automation breaks or posts the wrong
style. Edison wants the repo to always match the local staging state, no drift.

**How to apply:** After every successful local edit, run the Python GitHub Contents API
push script using `${GITHUB_TOKEN}` from `.env`. Use the full Windows python path:
`C:\Users\ediso\AppData\Local\Programs\Python\Python313\python.exe`. Push pattern: GET
current sha → base64 encode content → PUT with sha. Batch pushes when multiple files
change in one turn, but never leave a turn without pushing what was changed.

Memory files push to a `memory/` subfolder in the repo (not the local Claude Code path).

Do not ask "should I push?" — just push and report one-line confirmation.
