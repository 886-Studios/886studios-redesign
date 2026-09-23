import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { createHandler } from '../src/server.mjs';

const handler = createHandler({ root: fileURLToPath(new URL('..', import.meta.url)), code: process.env.PERKS_ACCESS_CODE, secret: process.env.PERKS_SESSION_SECRET, origin: process.env.APP_ORIGIN || 'https://www.886studios.com', basePath: process.env.APP_BASE_PATH ?? '/perks' });
createServer(handler).listen(Number(process.env.PORT || 4186), '127.0.0.1');
