import type { Lang } from '../config/languages';
export type { Lang };

export interface Seo { title: string; description: string }
export interface Faq { question: string; answer: string }

export interface Subgroup { id: string; name: string; description?: string; productIds: string[] }

export interface Group {
  id: string; slug: string; order: number;
  name: string; summary: string; introduction: string;
  subgroups: Subgroup[]; productIds: string[];
  seo: Seo;
}

export interface IndustryApplicability {
  mode: 'selected' | 'cross-industry';
  industryIds: string[];
}

export interface Product {
  id: string; slug: string; groupId: string; subgroupId: string;
  name: string; brand: string; acronym: string | null;
  shortDescription: string; definition: string; problem: string;
  capabilities: string[]; workflow: string[]; users: string[]; connects: string[];
  distinctions: Array<{ productId: string; text: string }>;
  faqs: Faq[];
  industryApplicability: IndustryApplicability;
  solutionIds: string[]; relatedProductIds: string[];
  seo: Seo;
}

export interface Industry {
  id: string; slug: string; order: number;
  name: string; summary: string; overview: string;
  subsectors: Array<{ id: string; name: string; description: string }>;
  processes: string[]; challenges: string[]; integration: string[];
  productIds: string[]; solutionIds: string[];
  faqs: Faq[]; seo: Seo;
}

export interface Solution {
  id: string; slug: string; order: number;
  name: string; summary: string; problem: string;
  stakeholders: string[]; steps: string[]; outcomes: string[]; integration: string[];
  productIds: string[]; industryIds: string[];
  faqs: Faq[]; seo: Seo;
}

export interface TextBlock { title: string; text: string }

export interface Pages {
  home: {
    seo: Seo; eyebrow: string; title: string; lead: string; primaryCta: string; secondaryCta: string;
    facts: TextBlock[];
    groups: { eyebrow: string; title: string; lead: string };
    industries: { eyebrow: string; title: string; lead: string };
    approach: { eyebrow: string; title: string; lead: string; steps: TextBlock[]; link: string };
    solutions: { eyebrow: string; title: string; lead: string };
    cta: { title: string; text: string };
  };
  software: PageIntro; industries: PageIntro; solutions: PageIntro;
  platform: PageIntro & { sections: TextBlock[] };
  how: PageIntro & { steps: TextBlock[]; needTitle: string; need: string[] };
  about: PageIntro & { sections: TextBlock[] };
  contact: PageIntro & { includeTitle: string; include: string[] };
  privacy: PageIntro & { sections: TextBlock[] };
}
export interface PageIntro { seo: Seo; eyebrow: string; title: string; lead: string }

export interface CatalogData {
  groups: Group[]; products: Product[]; industries: Industry[]; solutions: Solution[]; pages: Pages;
}

export type RouteKind =
  | 'home' | 'software' | 'group' | 'product' | 'industries' | 'industry'
  | 'solutions' | 'solution' | 'platform' | 'how' | 'about' | 'contact' | 'privacy' | 'search';

export interface Route { kind: RouteKind; segments: string[]; id?: string }
