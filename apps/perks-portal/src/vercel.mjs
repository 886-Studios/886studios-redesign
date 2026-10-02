import { fileURLToPath } from 'node:url';
import { createProductionHandler } from './runtime.mjs';

let handler;
export default function request(req, res) {
  handler ??= createProductionHandler({ root: fileURLToPath(new URL('..', import.meta.url)), vercel: true });
  return handler(req, res);
}
