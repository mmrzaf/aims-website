import { existsSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), 'public', 'images');

/** True when the optimised image for a slot exists (e.g. "industries/energy"). */
export const hasImage = (slot: string) => existsSync(join(root, `${slot}-1200.webp`));
