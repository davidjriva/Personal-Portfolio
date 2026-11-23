const MAX_CACHE_ENTRIES = 5000;
const CLEANUP_INTERVAL_MS = 60 * 1000;

// Shared in-memory sliding-window store across routes in the same process.
const store = globalThis.__rateLimitStore || (globalThis.__rateLimitStore = new Map());
let lastCleanup = globalThis.__rateLimitLastCleanup || 0;

function cleanupExpired(now) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS && store.size < MAX_CACHE_ENTRIES) {
    return;
  }
  lastCleanup = now;
  globalThis.__rateLimitLastCleanup = now;

  for (const [key, entry] of store.entries()) {
    if (now >= entry.expiresAt) {
      store.delete(key);
    }
  }

  // Evict oldest keys if still above cap
  if (store.size >= MAX_CACHE_ENTRIES) {
    const excess = store.size - MAX_CACHE_ENTRIES + 100;
    let removed = 0;
    for (const key of store.keys()) {
      store.delete(key);
      removed += 1;
      if (removed >= excess) break;
    }
  }
}

/**
 * Self-managed in-memory rate limiter with automatic TTL eviction.
 * @param {string} key - Unique bucket key (e.g. `chat:ip:1.2.3.4`)
 * @param {number} maxRequests - Max allowed requests within windowMs
 * @param {number} windowMs - Window duration in milliseconds
 * @returns {boolean} true if allowed, false if rate-limited
 */
export function checkRateLimit(key, maxRequests, windowMs) {
  const now = Date.now();
  cleanupExpired(now);

  let entry = store.get(key);
  if (!entry || now >= entry.expiresAt) {
    entry = { count: 1, expiresAt: now + windowMs };
    store.set(key, entry);
    return true;
  }

  entry.count += 1;
  return entry.count <= maxRequests;
}

/**
 * Extract client IP preferring Vercel's trusted edge header.
 * @param {Request} req
 * @param {string} [fallback='unknown']
 * @returns {string}
 */
export function getClientIp(req, fallback = 'unknown') {
  const vercelForwarded = req.headers.get('x-vercel-forwarded-for');
  if (vercelForwarded) {
    return vercelForwarded.split(',')[0].trim();
  }
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return fallback;
}

const PRODUCTION_ORIGINS = new Set(['https://www.davidriva.dev', 'https://davidriva.dev']);
const PREVIEW_HOST_PATTERN = /^personal-portfolio(?:-[a-z0-9-]+)?-davids-projects-32a5c1c9\.vercel\.app$/i;
const LOCAL_ORIGIN_PATTERN = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

function getAllowedPreviewOrigins(req) {
  const allowed = new Set();
  if (process.env.VERCEL_URL) {
    allowed.add(`https://${process.env.VERCEL_URL}`);
  }
  if (process.env.VERCEL_BRANCH_URL) {
    allowed.add(`https://${process.env.VERCEL_BRANCH_URL}`);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    allowed.add(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  // Also allow the Vercel preview host serving this request if it matches our Vercel project slug pattern
  const host = (req.headers.get('x-forwarded-host') || req.headers.get('host') || '').trim().toLowerCase();
  if (host && PREVIEW_HOST_PATTERN.test(host)) {
    allowed.add(`https://${host}`);
  }
  return allowed;
}

/**
 * Strictly verify that a POST request originates from our own frontend across:
 * 1. Production (`https://davidriva.dev`, `https://www.davidriva.dev`)
 * 2. Vercel Preview deployments (`VERCEL_URL`, `VERCEL_BRANCH_URL`, or matching project preview alias)
 * 3. Local development (`http://localhost:<port>`, `http://127.0.0.1:<port>`)
 *
 * @param {Request} req
 * @param {{ allowEvaluatorBypass?: boolean }} [options]
 * @returns {{ allowed: boolean, reason?: string }}
 */
export function validateOrigin(req, options = {}) {
  if (options.allowEvaluatorBypass) {
    return { allowed: true };
  }

  // 1. Require custom header sent by our frontend fetch calls (triggers CORS preflight on cross-origin attempts)
  const requestedWith = req.headers.get('x-requested-with');
  if (requestedWith !== 'XMLHttpRequest') {
    return { allowed: false, reason: 'Missing required frontend header' };
  }

  // 2. Enforce Sec-Fetch-Site when present (all modern browsers send `same-origin` on same-origin fetch)
  const secFetchSite = req.headers.get('sec-fetch-site');
  if (secFetchSite && secFetchSite !== 'same-origin') {
    return { allowed: false, reason: 'Cross-site request blocked' };
  }

  // 3. Require a valid Origin header (browsers always send Origin on POST requests)
  const origin = (req.headers.get('origin') || '').trim();
  if (!origin) {
    return { allowed: false, reason: 'Missing Origin header' };
  }

  // 4. If Referer is present, ensure its origin matches the Origin header
  const referer = req.headers.get('referer');
  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      if (refererOrigin !== origin) {
        return { allowed: false, reason: 'Referer origin mismatch' };
      }
    } catch {
      return { allowed: false, reason: 'Malformed Referer header' };
    }
  }

  const vercelEnv = process.env.VERCEL_ENV;
  const isProduction = vercelEnv === 'production';
  const isPreview = vercelEnv === 'preview';

  if (isProduction) {
    if (!PRODUCTION_ORIGINS.has(origin)) {
      return { allowed: false, reason: 'Origin not allowed in production' };
    }
    return { allowed: true };
  }

  if (isPreview) {
    const allowedPreview = getAllowedPreviewOrigins(req);
    if (!allowedPreview.has(origin)) {
      return { allowed: false, reason: 'Origin not allowed in preview' };
    }
    return { allowed: true };
  }

  // Local development (no VERCEL_ENV set, or VERCEL_ENV === 'development')
  if (!LOCAL_ORIGIN_PATTERN.test(origin)) {
    return { allowed: false, reason: 'Origin not allowed in development' };
  }

  const host = (req.headers.get('host') || '').trim();
  if (host) {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        return { allowed: false, reason: 'Origin host does not match local server host' };
      }
    } catch {
      return { allowed: false, reason: 'Malformed Origin header' };
    }
  }

  return { allowed: true };
}
