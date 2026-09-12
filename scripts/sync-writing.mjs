// Sync the Writing archive from the author's Medium RSS feed.
//
// Reads src/data/writing.json (source of truth for /writing/ and the Home
// "Recent Writing" list) and appends any Medium posts not already present,
// deriving id/title/date/tags/summary from the feed. Existing entries are
// never modified — hand-tuned summaries and tags are preserved. The array is
// re-sorted newest-first on write.
//
// Idempotent: re-running with no new posts leaves the file byte-identical, so
// the CI job only opens a PR when something actually changed.
//
// Usage: node scripts/sync-writing.mjs
// Env:   MEDIUM_FEED_URL (optional) overrides the default feed.

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const FEED_URL =
  process.env.MEDIUM_FEED_URL || 'https://medium.com/feed/@adilburaksen';
const DATA_PATH = resolve('src/data/writing.json');
const MAX_TAGS = 3;
const SUMMARY_MAX = 200;

function stripCdata(s) {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

function decodeEntities(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? stripCdata(m[1]).trim() : '';
}

// Medium article URLs end with "-<12+ hex id>"; the site uses the clean slug.
function slugFromLink(link) {
  const path = link.split('?')[0].replace(/\/+$/, '');
  const last = path.split('/').pop() || '';
  return last.replace(/-[0-9a-f]{6,}$/i, '');
}

function cleanLink(link) {
  return link.split('?')[0];
}

function toIsoDate(pubDate) {
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function titleCaseTag(category) {
  return category
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function deriveTags(block) {
  const cats = [...block.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((m) =>
    stripCdata(m[1]).trim()
  );
  const seen = new Set();
  const tags = [];
  for (const c of cats) {
    const t = titleCaseTag(c);
    const key = t.toLowerCase();
    if (t && !seen.has(key)) {
      seen.add(key);
      tags.push(t);
    }
    if (tags.length >= MAX_TAGS) break;
  }
  return tags.length ? tags : ['Writing'];
}

function deriveSummary(block) {
  const raw = tag(block, 'content:encoded') || tag(block, 'description');
  const text = decodeEntities(raw.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return '';
  if (text.length <= SUMMARY_MAX) return text;
  const cut = text.slice(0, SUMMARY_MAX);
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '));
  if (lastStop > 80) return cut.slice(0, lastStop + 1).trim();
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim() + '…';
}

async function fetchFeed(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'hackwith.me-writing-sync/1.0 (+https://hackwith.me)' },
  });
  if (!res.ok) throw new Error(`feed fetch failed: HTTP ${res.status}`);
  return res.text();
}

function parseItems(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => {
    const block = m[1];
    const link = cleanLink(tag(block, 'link'));
    return {
      id: slugFromLink(link),
      title: tag(block, 'title'),
      date: toIsoDate(tag(block, 'pubDate')),
      summary: deriveSummary(block),
      tags: deriveTags(block),
      externalLink: link,
    };
  });
}

function isValid(post) {
  return Boolean(post.id && post.title && post.date && post.externalLink);
}

async function main() {
  const existing = JSON.parse(readFileSync(DATA_PATH, 'utf8'));
  const known = new Set(
    existing.flatMap((p) => [p.externalLink, p.id].filter(Boolean).map((v) => v.toLowerCase()))
  );

  const xml = await fetchFeed(FEED_URL);
  const items = parseItems(xml).filter(isValid);

  const added = [];
  for (const item of items) {
    if (known.has(item.externalLink.toLowerCase()) || known.has(item.id.toLowerCase())) continue;
    known.add(item.externalLink.toLowerCase());
    known.add(item.id.toLowerCase());
    existing.push(item);
    added.push(item);
  }

  existing.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  writeFileSync(DATA_PATH, JSON.stringify(existing, null, 2) + '\n');

  if (added.length === 0) {
    console.log('sync-writing: up to date, no new posts.');
  } else {
    console.log(`sync-writing: added ${added.length} post(s):`);
    for (const p of added) console.log(`  • ${p.date}  ${p.title}`);
    console.log('Review the generated summary/tags before merging.');
  }
}

main().catch((err) => {
  console.error('sync-writing failed:', err.message);
  process.exit(1);
});
