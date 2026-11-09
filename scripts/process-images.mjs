// Converts the artwork in images-src/ to optimised WebP in public/images/.
// The folder layout is mirrored, and every file produces two sizes:
//   images-src/industries/energy.png  ->  public/images/industries/energy-1200.webp
//                                         public/images/industries/energy-640.webp
// A file's path without extension is its image slot name (see src/lib/visuals.ts).
import { readdirSync, mkdirSync, existsSync, rmSync, statSync } from 'node:fs';
import { join, parse, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

let sharp;
try { ({ default: sharp } = await import('sharp')); }
catch { console.error('The "sharp" package is required: npm install --no-save sharp'); process.exit(1); }

const src = fileURLToPath(new URL('../images-src/', import.meta.url));
const out = fileURLToPath(new URL('../public/images/', import.meta.url));
const sizes = [1200, 640];

if (!existsSync(src)) { console.error('images-src/ not found.'); process.exit(1); }

const walk = (dir) => readdirSync(dir).flatMap((entry) => {
  const path = join(dir, entry);
  return statSync(path).isDirectory() ? walk(path) : /\.(png|jpe?g|webp)$/i.test(entry) ? [path] : [];
});

const files = walk(src);
if (!files.length) { console.log('No source images found in images-src/.'); process.exit(0); }

rmSync(out, { recursive: true, force: true });
for (const file of files) {
  const { dir, name } = parse(relative(src, file));
  mkdirSync(join(out, dir), { recursive: true });
  for (const width of sizes) {
    await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(join(out, dir, `${name}-${width}.webp`));
  }
  console.log(`✓ ${join(dir, name)}`);
}
console.log(`${files.length} image(s) processed.`);
