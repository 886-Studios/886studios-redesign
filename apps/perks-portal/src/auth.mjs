import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const SESSION_SECONDS = 7 * 24 * 60 * 60;
const digest = value => createHash('sha256').update(value).digest();
export const equal = (a, b) => timingSafeEqual(digest(a), digest(b));

export function createAuth({ code, secret, secure = true, now = Date.now }) {
  if (typeof code !== 'string' || code.length < 6 || typeof secret !== 'string' || secret.length < 32) {
    throw new Error('Configure a portfolio access code of at least 6 characters and a session secret of at least 32 characters.');
  }
  // Rotating either credential immediately invalidates all existing sessions.
  const key = createHmac('sha256', secret).update(code).digest();
  const sign = value => createHmac('sha256', key).update(value).digest('base64url');
  const cookieName = secure ? '__Host-886_perks' : '886_perks';
  const attributes = `Path=/; HttpOnly; SameSite=Strict${secure ? '; Secure' : ''}`;
  return {
    verifyCode: value => equal(String(value), code),
    issue() {
      const payload = `${Math.floor(now() / 1000)}.${randomBytes(24).toString('base64url')}`;
      return `${cookieName}=${payload}.${sign(payload)}; Max-Age=${SESSION_SECONDS}; ${attributes}`;
    },
    valid(cookie = '') {
      const tokens = cookie.split(';').map(s => s.trim()).filter(s => s.startsWith(`${cookieName}=`));
      if (tokens.length !== 1) return false;
      const token = tokens[0].slice(cookieName.length + 1);
      if (!/^\d{10}\.[\w-]{32}\.[\w-]{43}$/.test(token)) return false;
      const [issued, nonce, signature] = token.split('.');
      const age = Math.floor(now() / 1000) - Number(issued);
      return age >= 0 && age < SESSION_SECONDS && equal(signature, sign(`${issued}.${nonce}`));
    },
    clear: () => `${cookieName}=; Max-Age=0; ${attributes}`,
  };
}

export function createRateLimiter({ now = Date.now, limit = 8, windowMs = 900_000 } = {}) {
  const attempts = new Map();
  return {
    blocked(key) {
      const entry = attempts.get(key);
      return entry && entry.until > now() && entry.count >= limit;
    },
    fail(key) {
      for (const [id, entry] of attempts) if (entry.until <= now()) attempts.delete(id);
      const entry = attempts.get(key) ?? { count: 0, until: now() + windowMs };
      entry.count += 1;
      if (attempts.size < 10_000 || attempts.has(key)) attempts.set(key, entry);
    },
    reset: key => attempts.delete(key),
  };
}
