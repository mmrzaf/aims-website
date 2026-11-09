// Builds the client-side search index from the generated HTML.
// Pages opt in with <main data-search-body>; the search page and 404 do not.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep, extname } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
const languages = ['en', 'fa'];
const docs = Object.fromEntries(languages.map((lang) => [lang, []]));

const decode = (html) =>
  html
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');

const text = (html) =>
  decode(
    html
      .replace(/<(script|style|svg|noscript)\b[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<nav\b[\s\S]*?<\/nav>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();

const pageTitle = (html) => {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!match) return '';
  const full = text(match[1]);
  const at = full.lastIndexOf(' · ');
  return at > 0 ? full.slice(0, at) : full;
};

const add = (file) => {
  const html = readFileSync(file, 'utf8');
  const main = html.match(/<main\b[^>]*\bdata-search-body\b[^>]*>([\s\S]*?)<\/main>/i);
  if (!main) return;
  const body = text(main[1]);
  if (!body) return;
  const path = relative(root, file).split(sep).join('/');
  const lang = path.startsWith('fa/') ? 'fa' : 'en';
  docs[lang].push({
    url: `/${path.replace(/index\.html$/, '')}`,
    title: pageTitle(html) || path,
    text: body,
  });
};

const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (extname(full) === '.html') add(full);
  }
};

walk(root);

for (const lang of languages) {
  docs[lang].sort((a, b) => a.url.localeCompare(b.url));
  writeFileSync(join(root, `search-index.${lang}.json`), JSON.stringify(docs[lang]));
  console.log(`Search index: ${docs[lang].length} pages (${lang}).`);
}
