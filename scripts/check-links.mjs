// Verifies that every internal link and asset reference in dist/ resolves to a file.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
const pages = [];
if (!existsSync(root)) {
  console.error('Generated site not found. Run `npm run build` before `npm run check-links`.');
  process.exit(1);
}
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (extname(full) === '.html') pages.push(full);
  }
})(root);

const problems = [];
const attr = /\s(?:href|src)="([^"]+)"/g;

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const [, raw] of html.matchAll(attr)) {
    if (/^(https?:|mailto:|tel:|#|data:)/.test(raw)) continue;
    const path = raw.split('#')[0].split('?')[0];
    if (!path) continue;
    if (!path.startsWith('/')) {
      problems.push(`${page.replace(root, '')}: relative link ${raw}`);
      continue;
    }
    const target = join(root, path);
    const ok = path.endsWith('/') ? existsSync(join(target, 'index.html')) : existsSync(target);
    if (!ok) problems.push(`${page.replace(root, '')}: broken ${raw}`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`\n${problems.length} problem(s) in ${pages.length} pages`);
  process.exit(1);
}
console.log(`Checked ${pages.length} pages: all internal links resolve.`);
