// Validates the bilingual catalogue: structure, references, language parity and text hygiene.
import { readFileSync } from 'node:fs';

const load = (lang) => JSON.parse(readFileSync(new URL(`../src/content/catalog/${lang}.json`, import.meta.url), 'utf8'));
const data = { en: load('en'), fa: load('fa') };
const errors = [];
const fail = (msg) => errors.push(msg);

const collections = ['groups', 'products', 'industries', 'solutions'];
const ids = (lang, key) => data[lang][key].map((x) => x.id);

for (const key of collections) {
  const en = ids('en', key), fa = ids('fa', key);
  if (en.join() !== fa.join()) fail(`${key}: English and Persian ids differ`);
  if (new Set(en).size !== en.length) fail(`${key}: duplicate ids`);
}

const walk = (value, path, visit) => {
  if (typeof value === 'string') visit(value, path);
  else if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`, visit));
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`, visit);
};

const banned = /lorem ipsum|\bTODO\b|\bTBD\b/i;

for (const lang of ['en', 'fa']) {
  const d = data[lang];
  const has = (key) => new Set(d[key].map((x) => x.id));
  const g = has('groups'), p = has('products'), i = has('industries'), s = has('solutions');
  const need = (set, id, where) => { if (!set.has(id)) fail(`${lang} ${where}: unknown id "${id}"`); };

  for (const prod of d.products) {
    const w = `product ${prod.id}`;
    need(g, prod.groupId, w);
    prod.industryApplicability.industryIds.forEach((x) => need(i, x, w));
    prod.solutionIds.forEach((x) => need(s, x, w));
    prod.relatedProductIds.forEach((x) => need(p, x, w));
    prod.distinctions.forEach((x) => need(p, x.productId, w));
    if (prod.industryApplicability.mode === 'selected' && prod.industryApplicability.industryIds.length === 0) fail(`${lang} ${w}: selected mode without industries`);
    const grp = d.groups.find((x) => x.id === prod.groupId);
    if (grp && !grp.productIds.includes(prod.id)) fail(`${lang} ${w}: missing from group ${grp.id}`);
  }
  for (const grp of d.groups) {
    const fromSub = grp.subgroups.flatMap((x) => x.productIds);
    if (fromSub.slice().sort().join() !== grp.productIds.slice().sort().join()) fail(`${lang} group ${grp.id}: subgroup products differ from product list`);
    grp.relatedIndustryIds.forEach((x) => need(i, x, `group ${grp.id}`));
  }
  for (const x of d.industries) { x.productIds.forEach((y) => need(p, y, `industry ${x.id}`)); x.solutionIds.forEach((y) => need(s, y, `industry ${x.id}`)); }
  for (const x of d.solutions) { x.productIds.forEach((y) => need(p, y, `solution ${x.id}`)); x.industryIds.forEach((y) => need(i, y, `solution ${x.id}`)); }

  const slugs = new Map();
  const seoTitles = new Map();
  for (const key of collections) for (const item of d[key]) {
    const slugKey = `${key}:${item.slug}`;
    if (slugs.has(slugKey)) fail(`${lang}: duplicate slug ${slugKey}`);
    slugs.set(slugKey, true);
    const t = item.seo?.title;
    if (!t || !item.seo?.description) fail(`${lang} ${key} ${item.id}: missing SEO text`);
    else if (seoTitles.has(t)) fail(`${lang}: SEO title shared by ${seoTitles.get(t)} and ${key}/${item.id}`);
    else seoTitles.set(t, `${key}/${item.id}`);
  }

  walk(d, lang, (text, path) => {
    if (!text.trim()) fail(`${path}: empty text`);
    if (banned.test(text)) fail(`${path}: contains disallowed wording`);
  });
}

// Persian copy should be Persian: a quick guard against untranslated English leaking in.
walk(data.fa, 'fa', (text, path) => {
  if (/\.(id|slug|acronym|groupId|subgroupId|productId|mode)$/.test(path) || /Ids?\[|seo\.|slug/.test(path)) return;
  if (path.includes('.name') || path.includes('acronym')) return;
  if (/^[\x00-\x7f]{60,}$/.test(text)) fail(`${path}: long text with no Persian characters`);
});

if (errors.length) {
  console.error(`Content check failed (${errors.length}):`);
  errors.slice(0, 40).forEach((e) => console.error(` - ${e}`));
  process.exit(1);
}
console.log(`Content check passed: ${data.en.products.length} products, ${data.en.industries.length} industries, ${data.en.solutions.length} solutions, ${data.en.groups.length} groups, EN/FA in parity.`);
