#!/usr/bin/env node
const https = require('https');
const fs = require('fs');
const { exec } = require('child_process');

const TOKEN = process.env.GITHUB_TOKEN;
if (!TOKEN) { console.error('GITHUB_TOKEN missing. Set it in .env or env var.'); process.exit(1); }
const REPO = 'nextgentrainingacademy88-max/edison-claude-skills';

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
        'User-Agent': 'restore-script',
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

async function restore(filePath) {
  // Get all commits for this file
  const commitsResp = await fetch(`https://api.github.com/repos/${REPO}/commits?path=${encodeURIComponent(filePath)}&per_page=10`);
  const commits = JSON.parse(commitsResp.body);

  console.log(`\n${filePath}: ${commits.length} commits found`);
  commits.forEach((c, i) => console.log(`  [${i}] ${c.sha.substring(0,12)} - ${c.commit.message.substring(0, 60)}`));

  // Get oldest commit SHA (original)
  const originalSha = commits[commits.length - 1].sha;
  console.log(`  Using original: ${originalSha}`);

  // Fetch file content at that commit
  const rawResp = await fetch(`https://api.github.com/repos/${REPO}/contents/${filePath}?ref=${originalSha}`, {
    headers: { 'Accept': 'application/vnd.github.raw' }
  });

  if (rawResp.status !== 200) {
    console.log(`  ✗ Fetch failed: ${rawResp.status}`);
    return;
  }

  const originalContent = rawResp.body;
  console.log(`  Original size: ${originalContent.length} chars, ${originalContent.split('\n').length} lines`);

  if (originalContent.length < 500) {
    console.log(`  ✗ Original content suspiciously small, skipping`);
    return;
  }

  // Get current file SHA for PUT
  const currentResp = await fetch(`https://api.github.com/repos/${REPO}/contents/${filePath}`);
  const currentSha = JSON.parse(currentResp.body).sha;

  // Push restore
  const base64Content = Buffer.from(originalContent).toString('base64');
  const putResp = await fetch(`https://api.github.com/repos/${REPO}/contents/${filePath}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Restore ${filePath.split('/').pop()} to original`,
      content: base64Content,
      sha: currentSha
    })
  });

  const putResult = JSON.parse(putResp.body);
  if (putResult.content) {
    console.log(`  ✓ Restored`);
  } else {
    console.log(`  ✗ Push failed: ${putResult.message}`);
  }
}

(async () => {
  for (const f of files) {
    await restore(f);
  }
})();
