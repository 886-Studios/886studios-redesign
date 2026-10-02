import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { createProductionHandler } from '../src/runtime.mjs';
import { parsePort } from '../src/config.mjs';

const port = parsePort(process.env.PORT);
const handler = createProductionHandler({ root: fileURLToPath(new URL('..', import.meta.url)) });
createServer(handler).listen(port, '127.0.0.1');
