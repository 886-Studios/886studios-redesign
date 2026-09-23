import { readFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createAuth, createRateLimiter } from './auth.mjs';
import { renderDirectory, renderLogin } from './render.mjs';
import { CATEGORIES, loadCatalog, normalizeSort } from './catalog.mjs';

const TYPES = { '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.avif': 'image/avif', '.webp': 'image/webp', '.png': 'image/png', '.ttf': 'font/ttf', '.txt': 'text/plain' };
const HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  'CDN-Cache-Control': 'no-store',
  'Vercel-CDN-Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'; object-src 'none'",
};

function publicFiles(directory, prefix = '') {
  const assets = new Map();
  for (const item of readdirSync(directory, { withFileTypes: true })) {
    if (item.isSymbolicLink() || item.name.startsWith('.')) continue;
    const path = join(directory, item.name);
    const url = `${prefix}/${item.name}`;
    if (item.isDirectory()) for (const entry of publicFiles(path, url)) assets.set(...entry);
    else if (TYPES[extname(item.name)]) assets.set(url, { path, type: TYPES[extname(item.name)] });
  }
  return assets;
}

async function readBody(req) {
  if (Number(req.headers['content-length']) > 2048) throw Object.assign(new Error('Request is too large.'), { status: 413 });
  const chunks = [];
  let length = 0;
  for await (const chunk of req) {
    length += chunk.length;
    if (length > 2048) throw Object.assign(new Error('Request is too large.'), { status: 413 });
    chunks.push(chunk);
  }
  return new URLSearchParams(Buffer.concat(chunks).toString('utf8'));
}

export function createHandler({ root, code, secret, origin, basePath = '', secure = true, now, catalog, limiter = createRateLimiter() }) {
  if (basePath && !/^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(basePath)) throw new Error('Invalid application base path.');
  const publicOrigin = new URL(origin).origin;
  const home = basePath || '/';
  const loginPage = options => renderLogin({ ...options, basePath });
  if (secure && new URL(origin).protocol !== 'https:') throw new Error('Production requires an HTTPS origin.');
  const assets = publicFiles(join(root, 'public'));
  let auth;
  let perks;
  try {
    auth = createAuth({ code, secret, secure, now, basePath });
    perks = catalog ?? loadCatalog(join(root, 'private/catalog.json'));
  } catch (error) {
    // Fail closed: never render the catalog if credentials or data are missing.
    console.error(`Perks configuration: ${error.message}`);
  }
  return async function handler(req, res) {
    for (const [name, value] of Object.entries(HEADERS)) res.setHeader(name, value);
    if (secure) res.setHeader('Strict-Transport-Security', 'max-age=31536000');
    const send = (status, body, type = 'text/html; charset=utf-8') => {
      res.writeHead(status, { 'Content-Type': type });
      res.end(req.method === 'HEAD' ? undefined : body);
    };
    const redirect = location => { res.writeHead(303, { Location: location }); res.end(); };
    try {
      const url = new URL(req.url, publicOrigin);
      if (basePath && url.pathname !== basePath && !url.pathname.startsWith(`${basePath}/`)) return send(404, 'Not found.', 'text/plain');
      const path = url.pathname.slice(basePath.length) || '/';
      if (req.method === 'GET' || req.method === 'HEAD') {
        if (path === '/robots.txt') return send(200, 'User-agent: *\nDisallow: /\n', 'text/plain; charset=utf-8');
        if (assets.has(path)) {
          const asset = assets.get(path);
          res.setHeader('Cache-Control', 'public, max-age=3600');
          return send(200, readFileSync(asset.path), asset.type);
        }
        if (path !== '/' && path !== '/login') return send(404, 'Not found.', 'text/plain; charset=utf-8');
        if (!auth || !perks) return send(503, loginPage({ ready: false }));
        if (!auth.valid(req.headers.cookie)) return send(200, loginPage());
        if (path === '/login') return redirect(home);
        const query = (url.searchParams.get('q') ?? '').slice(0, 200).trim();
        const category = CATEGORIES.includes(url.searchParams.get('category')) ? url.searchParams.get('category') : '';
        const sort = normalizeSort(url.searchParams.get('sort'));
        return send(200, renderDirectory(perks, { query, category, sort, basePath }));
      }
      if (req.method !== 'POST') { res.setHeader('Allow', 'GET, HEAD, POST'); return send(405, 'Method not allowed.', 'text/plain'); }
      if (!['/login', '/logout'].includes(path)) return send(404, 'Not found.', 'text/plain');
      if (req.headers.origin !== publicOrigin || req.headers['sec-fetch-site'] === 'cross-site') return send(403, 'Please submit this form from the perks website.', 'text/plain');
      if (!auth || !perks) return send(503, loginPage({ ready: false }));
      if (path === '/logout') { res.setHeader('Set-Cookie', auth.clear()); return redirect(home); }
      if (!String(req.headers['content-type'] ?? '').startsWith('application/x-www-form-urlencoded')) return send(415, 'Unsupported form format.', 'text/plain');
      // Vercel overwrites this platform header. Never trust arbitrary forwarded-for headers.
      const ip = secure && process.env.VERCEL ? req.headers['x-vercel-forwarded-for'] || 'unknown' : req.socket?.remoteAddress || 'unknown';
      if (limiter.blocked(ip)) { res.setHeader('Retry-After', '900'); return send(429, loginPage({ error: 'Too many attempts. Please try again in 15 minutes.' })); }
      const form = await readBody(req);
      const value = form.get('code');
      if (!value || value.length > 256 || !auth.verifyCode(value)) {
        limiter.fail(ip);
        return send(401, loginPage({ error: 'That code doesn’t look right. Please try again or ask the 886 team.' }));
      }
      limiter.reset(ip);
      res.setHeader('Set-Cookie', auth.issue());
      return redirect(home);
    } catch (error) {
      if (!res.headersSent) return send(error.status ?? 500, error.status ? error.message : 'Something went wrong. Please try again.', 'text/plain');
      res.end();
    }
  };
}
