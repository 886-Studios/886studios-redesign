import { cpSync, mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { loadCatalog } from '../src/catalog.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const catalog = loadCatalog(join(root, 'private/catalog.json'));
for (const perk of catalog.perks) if (perk.logo && !existsSync(join(root, 'public', perk.logo))) throw new Error(`Missing logo: ${perk.id}`);
for (const weight of [400, 500, 600, 700]) if (!existsSync(join(root, `public/assets/fonts/geist-${weight}.ttf`))) throw new Error('Missing Geist font.');
const output = join(root, '.vercel/output');
rmSync(output, { recursive: true, force: true });
const fn = join(output, 'functions/index.func');
mkdirSync(join(fn, 'private'), { recursive: true });
cpSync(join(root, 'src'), join(fn, 'src'), { recursive: true });
cpSync(join(root, 'public'), join(fn, 'public'), { recursive: true });
cpSync(join(root, 'private/catalog.json'), join(fn, 'private/catalog.json'));
writeFileSync(join(fn, '.vc-config.json'), JSON.stringify({ runtime: 'nodejs22.x', handler: 'src/vercel.mjs', launcherType: 'Nodejs', shouldAddHelpers: false }));
// All requests pass through the same server. No HTML, JSON, or source snapshots
// are emitted as static public files; private source records stay local.
writeFileSync(join(output, 'config.json'), JSON.stringify({ version: 3, routes: [{ src: '/(.*)', dest: '/index' }] }, null, 2));
console.log(`Built ${catalog.perks.length} partner entries for www.886studios.com/perks. Local output only; nothing deployed.`);
