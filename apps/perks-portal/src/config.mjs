export const ACCESS_CODE_MIN = 16;
export const ACCESS_CODE_MAX = 256;
export const SESSION_SECRET_MIN = 43; // Base64url encoding of 32 random bytes.

export class ConfigurationError extends Error {
  constructor(variable) {
    super(`Invalid or missing ${variable}.`);
    this.name = 'ConfigurationError';
  }
}

const placeholder = value => /^(.)\1+$/u.test(value) ||
  /changeme|replaceme|placeholder|youraccesscode|yoursessionsecret|testportfoliocode|testsessionsecret/i.test(value.replace(/[^a-z0-9]/gi, ''));

export function validateCredentials({ code, secret }, { strict = true } = {}) {
  // Preserve existing runtime credentials until a coordinated rotation.
  // Release preflight applies the stronger policy before the next release.
  if (typeof code !== 'string' || code.length < (strict ? ACCESS_CODE_MIN : 6) || code.length > ACCESS_CODE_MAX ||
      (strict && (code !== code.trim() || /[\p{Cc}\p{Cf}]/u.test(code) || placeholder(code)))) {
    throw new ConfigurationError('PERKS_ACCESS_CODE');
  }
  if (typeof secret !== 'string' || secret.length < (strict ? SESSION_SECRET_MIN : 32) ||
      (strict && (secret.length > 512 || !/^[A-Za-z0-9+/_=-]+$/.test(secret) || placeholder(secret) || secret === code))) {
    throw new ConfigurationError('PERKS_SESSION_SECRET');
  }
}

export function validateOrigin(value, { secure = true, variable = 'APP_ORIGIN' } = {}) {
  let url;
  try { url = new URL(value); } catch { throw new ConfigurationError(variable); }
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (typeof value !== 'string' || value !== value.trim() || /[\s\\?#]/u.test(value) ||
      !/^https?:\/\//.test(value) || url.username || url.password ||
      url.pathname !== '/' || url.search || url.hash ||
      (secure ? url.protocol !== 'https:' : !loopback || !['http:', 'https:'].includes(url.protocol))) {
    throw new ConfigurationError(variable);
  }
  // Compare the original authority/path too: URL parsing can erase dot segments.
  if (!/^https?:\/\/[^/@]+\/?$/.test(value)) throw new ConfigurationError(variable);
  return url.origin;
}

export function validateBasePath(value) {
  if (typeof value !== 'string' || (value && !/^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(value))) {
    throw new ConfigurationError('APP_BASE_PATH');
  }
  return value;
}

export function parsePort(value = '4186') {
  if (typeof value !== 'string' || !/^[1-9]\d{0,4}$/.test(value) || Number(value) > 65535) {
    throw new ConfigurationError('PORT');
  }
  return Number(value);
}

export function readRuntimeConfig(env, { strict = false } = {}) {
  const code = env.PERKS_ACCESS_CODE;
  const secret = env.PERKS_SESSION_SECRET;
  validateCredentials({ code, secret }, { strict });
  const origin = validateOrigin(env.APP_ORIGIN ?? (strict ? undefined : 'https://www.886studios.com'));
  // An explicitly empty base path supports a separate, root-mounted deployment.
  const basePath = validateBasePath(env.APP_BASE_PATH ?? (strict ? undefined : '/perks'));
  const port = parsePort(env.PORT);
  return { code, secret, origin, basePath, port };
}
