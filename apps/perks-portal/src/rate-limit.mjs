export function createRateLimiter({ now = Date.now, limit = 8, windowMs = 900_000, capacity = 10_000 } = {}) {
  const attempts = new Map();
  const expire = () => {
    const time = now();
    for (const [id, entry] of attempts) if (entry.until <= time) attempts.delete(id);
  };
  return {
    blocked(key) {
      expire();
      const entry = attempts.get(key);
      // A full table must not grant untracked guesses to new clients.
      return entry ? entry.count >= limit : attempts.size >= capacity;
    },
    fail(key) {
      expire();
      const entry = attempts.get(key) ?? { count: 0, until: now() + windowMs };
      entry.count += 1;
      if (attempts.size < capacity || attempts.has(key)) attempts.set(key, entry);
    },
    reset: key => attempts.delete(key),
  };
}
