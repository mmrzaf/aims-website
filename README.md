# Company website

Bilingual (English `/`, Persian `/fa/`) static website for an industrial and enterprise software company. Built with Astro; search by Pagefind. No runtime server is needed.

## Run

```bash
npm ci
cp .env.example .env     # set company name, domain and contact details
npm run dev              # http://localhost:4321
npm run build            # checks content, builds dist/, builds the search index
npm run check-links      # verifies every internal link in dist/
```

Requires Node 22.23.4 or newer.

## Where things live

| Path | Purpose |
|---|---|
| `src/content/catalog/{en,fa}.json` | All text: 4 families, 59 software pages, 8 industries, 14 solutions, and the platform, how-we-work, about, contact and privacy pages |
| `src/i18n/{en,fa}.json` | Interface labels, navigation, form messages |
| `src/config/site.mjs` | Company name, domain and contact channels (from environment variables) |
| `src/lib/visuals.ts` | Which image slot each page uses |
| `src/templates/`, `src/components/` | Page layouts and shared parts |
| `src/styles/` | Design tokens and styles (logical properties, so right-to-left needs no separate sheet) |
| `public/` | Static files served as-is: `favicon.svg` and `images/` (generated, see Images) |
| `images-src/` | Original artwork (PNG), not in git; converted into `public/images/` |
| `deploy/` | Compose file and env template for the server |

`npm run verify` validates the catalogue: references between items, English/Persian parity, unique page titles, and empty text.

## Company name

The company is AIMS (Advanced Integrated Management Systems; Persian display name آیمز). Defaults live in `src/config/site.mjs`; override with `PUBLIC_COMPANY_NAME_EN` and `PUBLIC_COMPANY_NAME_FA`. Every product has a `brand` name ("AIMS Maintain") in the catalogue; its `name` is the generic category ("Computerized Maintenance Management System"), shown beside it. The logo mark (an "A" with a connected apex node) is drawn inline in `src/components/Brand.astro` and mirrored in `public/favicon.svg`; change both together.

## Images

Original artwork lives in `images-src/`, grouped in folders. A file's path without the extension is its image slot (see `src/lib/visuals.ts`):

| Folder | Content | Slots |
|---|---|---|
| `home/` | Home page hero (also the social preview) | `hero` |
| `groups/` | The four software families | `industrial`, `business`, `corporate`, `data` |
| `industries/` | The eight industries | `manufacturing`, `oil-gas`, `energy`, `mining-metals`, `construction`, `food-agriculture`, `healthcare`, `logistics` |
| `platform/` | Platform page | `base-and-modules`, `integration-hub`, `deployment` |
| `interfaces/` | Interface illustrations shown on product pages | `operations`, `maintenance`, `procurement`, `analytics`, `quality`, `warehouse`, `people`, `documents`, `sales`, `integration`, `performance`, `projects`, `it-services`, `governance`, `assets`, `sustainability` |

`npm install --no-save sharp && npm run images` converts every file into `public/images/<folder>/<name>-1200.webp` and `<name>-640.webp` (the smaller size is used for menu thumbnails). To change which interface illustration a product page uses, edit `productInterfaces` in `src/lib/visuals.ts`. A slot without a file shows a neutral placeholder.

Fonts (IBM Plex Sans, Vazirmatn) are bundled from npm packages, and the site makes no requests to third-party hosts. There are no analytics or tracking scripts.

## Contact form

- With `PUBLIC_CONTACT_FORM_ENDPOINT` set, the form sends JSON (`name`, `email`, `company`, `phone`, `message`) by POST to that URL.
- Without it, the form opens the visitor's email app addressed to `PUBLIC_CONTACT_EMAIL`.
- Without either, the form shows an error message, so configure one before publishing.

## Deploy

Pushes to `main` are built and deployed by Gitman (`.gitman.yml`): the image `aims-website:<version>` is built from `Dockerfile` (Node build, `cerv` runtime) and started with `deploy/docker-compose.yml` behind Traefik.

One-time server setup:

1. Create the deploy directory (`DEPLOY_DIR` in `.gitman.yml`) and copy `deploy/.env.example` to `.env` there. Set `WEBSITE_DOMAIN`.
2. Make sure the external Docker network `proxy` and the Traefik middlewares named in `TRAEFIK_MIDDLEWARES` exist.
3. Make sure the runner has `node:22-bookworm-slim` and `cerv:1.0`.

Company name, site URL and contact channels are build-time values: set them under `env` and `targets` in `.gitman.yml`.

To build locally:

```bash
docker build -t aims-website --build-arg NPM_REGISTRY=https://registry.npmjs.org/ --build-arg PUBLIC_SITE_URL=http://localhost:8080 .
docker run --rm -p 8080:8080 aims-website
```

Alternatively upload `dist/` to any static host.

## Content notes

- Industry relevance is either listed per product or marked as cross-industry; edit `industryApplicability` in the catalogue.
- The privacy page is general text; have it reviewed against the company's actual data handling before launch.
