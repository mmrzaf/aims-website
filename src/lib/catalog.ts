import enData from '../content/catalog/en.json';
import faData from '../content/catalog/fa.json';
import type { CatalogData, Group, Industry, Lang, Product, Solution } from './types';

const sources: Record<Lang, CatalogData> = { en: enData as CatalogData, fa: faData as CatalogData };

function lookup<T extends { id: string }>(items: T[], label: string) {
  const index = new Map(items.map((item) => [item.id, item]));
  return (id: string): T => {
    const found = index.get(id);
    if (!found) throw new Error(`Unknown ${label}: ${id}`);
    return found;
  };
}

export function getCatalog(lang: Lang) {
  const data = sources[lang];
  const groups = [...data.groups].sort((a, b) => a.order - b.order);
  const industries = [...data.industries].sort((a, b) => a.order - b.order);
  const solutions = [...data.solutions].sort((a, b) => a.order - b.order);
  const products: Product[] = data.products;

  const group = lookup<Group>(groups, 'group');
  const product = lookup<Product>(products, 'product');
  const industry = lookup<Industry>(industries, 'industry');
  const solution = lookup<Solution>(solutions, 'solution');

  return {
    groups, products, industries, solutions, pages: data.pages,
    group, product, industry, solution,
    productsOf: (ids: string[]) => ids.map(product),
  };
}
export type Catalog = ReturnType<typeof getCatalog>;
