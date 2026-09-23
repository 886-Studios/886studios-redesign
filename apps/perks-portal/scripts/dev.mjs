import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createHandler } from '../src/server.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const configPath = new URL('../private/dev-access.json', import.meta.url);
if (!existsSync(configPath)) writeFileSync(configPath, JSON.stringify({ code: randomBytes(12).toString('base64url'), secret: randomBytes(32).toString('base64url') }), { mode: 0o600 });
const config = JSON.parse(readFileSync(configPath, 'utf8'));
const port = Number(process.env.PORT ?? 4186);
const origin = `http://localhost:${port}`;
const server = createServer(createHandler({ root, code: config.code, secret: config.secret, origin, secure: false }));
server.listen(port, '127.0.0.1', () => {
  console.log(`Local preview: ${origin}\nLocal access code: ${config.code}\nThis code is for this local preview only. No deployment has been made.`);
});
