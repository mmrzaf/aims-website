import { defaultLang } from '../config/languages';
import type { Catalog } from './catalog';
import type { Lang, Product, Route } from './types';

export function localePath(lang: Lang, segments: string[] = []): string {
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  const body = segments.filter(Boolean).join('/');
  return body ? `${prefix}/${body}/` : `${prefix}/`;
}

export const groupPath = (lang: Lang, groupId: string) => localePath(lang, ['software', groupId]);
export const productPath = (lang: Lang, product: Pick<Product, 'groupId' | 'slug'>) =>
  localePath(lang, ['software', product.groupId, product.slug]);
export const industryPath = (lang: Lang, id: string) => localePath(lang, ['industries', id]);
export const solutionPath = (lang: Lang, id: string) => localePath(lang, ['solutions', id]);

export function buildRoutes(catalog: Catalog): Route[] {
  return [
    { kind: 'home', segments: [] },
    { kind: 'software', segments: ['software'] },
    ...catalog.groups.map<Route>((g) => ({ kind: 'group', segments: ['software', g.slug], id: g.id })),
    ...catalog.products.map<Route>((p) => ({ kind: 'product', segments: ['software', p.groupId, p.slug], id: p.id })),
    { kind: 'industries', segments: ['industries'] },
    ...catalog.industries.map<Route>((i) => ({ kind: 'industry', segments: ['industries', i.slug], id: i.id })),
    { kind: 'solutions', segments: ['solutions'] },
    ...catalog.solutions.map<Route>((s) => ({ kind: 'solution', segments: ['solutions', s.slug], id: s.id })),
    { kind: 'platform', segments: ['platform'] },
    { kind: 'how', segments: ['how-we-work'] },
    { kind: 'about', segments: ['about'] },
    { kind: 'contact', segments: ['contact'] },
    { kind: 'privacy', segments: ['privacy'] },
    { kind: 'search', segments: ['search'] },
  ];
}
