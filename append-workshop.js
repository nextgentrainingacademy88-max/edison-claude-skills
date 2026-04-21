#!/usr/bin/env node
const https = require('https');

const TOKEN = process.env.GITHUB_TOKEN;
if (!TOKEN) { console.error('GITHUB_TOKEN missing. Set it in .env or env var.'); process.exit(1); }
const REPO = 'nextgentrainingacademy88-max/edison-claude-skills';

const APPEND = `

---

## Asset Management & Workshop Variant (80/20 Rotation)

All asset URLs (face photo, workshop photos) live in \`assets-manifest.json\` at repo root. Always fetch at start:
\`\`\`
GET https://raw.githubusercontent.com/nextgentrainingacademy88-max/edison-claude-skills/main/assets-manifest.json
\`\`\`

### 80/20 Rotation
- **80% standard** — use the default branded style documented above
- **20% workshop variant** — use real workshop photos with darkened overlay + bold text

See \`WORKSHOP-VARIANT-GUIDE.md\` at repo root for full workshop variant prompts, rotation logic, and state tracking via \`rotation-state.json\`.

### Face Photo (for face-required slides/images)
Use \`face_primary.url\` from manifest — primary Edison face photo (stable Google Drive URL).

### Workshop Photos (for 20% rotation variant)
Random pick from \`workshop_photos[]\` array in manifest (28 photos).

### Rotation State
Tracked in \`rotation-state.json\` at repo root. Check \`posts_since_workshop\` — when it reaches 4, next post must use workshop variant.
`;

const files = [
  'carousel-creator/SKILL.md',
  'edison-content-image-creator/SKILL.md',
  'facebook-content-creator/SKILL.md',
  'instagram-carousel-creator/SKILL.md'
];

function fetch(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: opts.method || 'GET',
      headers: {
        'Authorization': `token ${TOKEN}`,
        'User-Agent': 'append-script',
        'Accept': 'application/vnd.github+json',
        ...(opts.headers || {})
      }
    }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (opts.body) req.write(opts.body);
    req.end();
  });
}

async function appendTo(filePath) {
  // Fetch raw content
  const rawResp = await fetch(`https://api.github.com/repos/${REPO}/contents/${filePath}`, {
    headers: { 'Accept': 'application/vnd.github.raw' }
  });
  if (rawResp.status !== 200) { console.log(`✗ ${filePath}: fetch failed`); return; }

  const currentContent = rawResp.body;
  // Check if already has workshop section
  if (currentContent.includes('Workshop Variant (80/20 Rotation)')) {
    console.log(`  — ${filePath} already has workshop section, skipping`);
    return;
  }

  const newContent = currentContent + APPEND;

  // Get current SHA
  const metaResp = await fetch(`https://api.github.com/repos/${REPO}/contents/${filePath}`);
  const currentSha = JSON.parse(metaResp.body).sha;

  const base64Content = Buffer.from(newContent).toString('base64');
  const putResp = await fetch(`https://api.github.com/repos/${REPO}/contents/${filePath}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Add workshop variant reference to ${filePath.split('/').pop()}`,
      content: base64Content,
      sha: currentSha
    })
  });

  const putResult = JSON.parse(putResp.body);
  if (putResult.content) {
    console.log(`✓ ${filePath}: ${currentContent.length} → ${newContent.length} chars`);
  } else {
    console.log(`✗ ${filePath}: ${putResult.message}`);
  }
}

(async () => {
  for (const f of files) {
    await appendTo(f);
  }
})();
