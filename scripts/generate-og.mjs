// Generates 1200x630 Open Graph images into public/og/.
// Run after adding or renaming an article:  npm run og
// Uses only the portrait, the official MVP badge and real page/article text.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'public', 'og');
fs.mkdirSync(path.join(out, 'blog'), { recursive: true });

const W = 1200, H = 630;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) { lines.push(line); line = w; }
    else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[\s,:;]*\S*$/, '') + '…';
    return kept;
  }
  return lines;
}

function frontmatter(file) {
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = {};
  if (m) for (const l of m[1].split(/\r?\n/)) {
    const kv = l.match(/^(\w+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1');
  }
  return data;
}

async function render({ file, eyebrow, title, subtitle, titleSize = 60, maxChars = 20 }) {
  const lines = wrap(title, maxChars, 4);
  const lineH = Math.round(titleSize * 1.12);
  const titleTop = 200;
  const tspans = lines.map((l, i) => `<tspan x="72" y="${titleTop + i * lineH}">${esc(l)}</tspan>`).join('');
  const subY = titleTop + (lines.length - 1) * lineH + 62;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#070d1b"/><stop offset=".55" stop-color="#0a1630"/><stop offset="1" stop-color="#0d2347"/></linearGradient>
    <radialGradient id="disc" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#16305a"/><stop offset="1" stop-color="#0d1d39"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="960" cy="330" r="215" fill="url(#disc)" stroke="#4cb8ff" stroke-opacity=".14"/>
  <rect x="0" y="0" width="${W}" height="3" fill="#5ccfff" fill-opacity=".55"/>
  <text x="72" y="128" font-family="Segoe UI, DejaVu Sans, Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="4" fill="#7fd0f5">${esc(eyebrow.toUpperCase())}</text>
  <text font-family="Segoe UI, DejaVu Sans, Arial, sans-serif" font-size="${titleSize}" font-weight="700" fill="#eef4fc" letter-spacing="-1">${tspans}</text>
  ${subtitle ? `<text x="72" y="${subY}" font-family="Segoe UI, DejaVu Sans, Arial, sans-serif" font-size="24" fill="#a9bace">${esc(subtitle)}</text>` : ''}
  <text x="146" y="556" font-family="Segoe UI, DejaVu Sans, Arial, sans-serif" font-size="22" font-weight="600" fill="#e7f0fb">Essam Shaaban</text>
  <text x="146" y="584" font-family="Segoe UI, DejaVu Sans, Arial, sans-serif" font-size="17" fill="#7fc6ee">Microsoft MVP · Senior Software Engineer</text>
</svg>`;
  const portrait = await sharp(path.join(root, 'public', 'essam-shaaban-cutout.webp')).resize({ height: 520 }).toBuffer();
  const pMeta = await sharp(portrait).metadata();
  const badge = await sharp(path.join(root, 'public', 'badges', 'microsoft-mvp-2026-2027.webp')).resize(58, 58).toBuffer();
  await sharp(Buffer.from(svg))
    .composite([
      { input: portrait, left: Math.round(960 - pMeta.width / 2), top: H - pMeta.height },
      { input: badge, left: 72, top: 532 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(out, file));
  console.log('og/' + file);
}

await render({ file: 'home.jpg', eyebrow: 'Essam Shaaban', title: 'Architecting Intelligent Enterprise Solutions', subtitle: 'Power Platform · Agentic AI · Microsoft Foundry' });
await render({ file: 'certifications.jpg', eyebrow: 'Microsoft credentials', title: 'Microsoft Certifications', subtitle: 'Verified on Microsoft Learn' });
await render({ file: 'blog.jpg', eyebrow: 'Technical blog', title: 'Power Platform & AI Blog', subtitle: 'Power Apps · Power Automate · Dataverse · Agentic AI' });

const blogDir = path.join(root, 'src', 'content', 'blog');
for (const f of fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'))) {
  const d = frontmatter(path.join(blogDir, f));
  if (d.draft === 'true') continue;
  const date = d.date ? new Date(d.date + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : '';
  await render({ file: `blog/${f.replace(/\.md$/, '')}.jpg`, eyebrow: d.category || 'Article', title: d.title, subtitle: date, titleSize: 46, maxChars: 26 });
}
