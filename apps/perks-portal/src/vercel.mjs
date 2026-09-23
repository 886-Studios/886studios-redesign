import { fileURLToPath } from 'node:url';
import { createHandler } from './server.mjs';

let handler;
export default function request(req, res) {
  handler ??= createHandler({ root: fileURLToPath(new URL('..', import.meta.url)), code: process.env.PERKS_ACCESS_CODE, secret: process.env.PERKS_SESSION_SECRET, origin: process.env.APP_ORIGIN || 'https://perks.886studios.com' });
  return handler(req, res);
}
