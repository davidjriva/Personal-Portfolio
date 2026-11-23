import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { checkRateLimit, getClientIp, validateOrigin } from '../../../lib/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const CHAT_COOKIE_NAME = 'chat_session';
const TOKEN_TTL_SECONDS = 60 * 5; // 5-minute short-lived session token
const MAX_TOKEN_REQUESTS_PER_MIN = 10;
const TOKEN_WINDOW_MS = 60 * 1000;

export async function POST(req) {
  try {
    const originCheck = validateOrigin(req);
    if (!originCheck.allowed) {
      console.warn('Origin blocked on /api/token:', originCheck.reason);
      return new Response(JSON.stringify({ error: originCheck.reason }), { status: 403 });
    }

    const ip = getClientIp(req);
    if (!checkRateLimit(`token:ip:${ip}`, MAX_TOKEN_REQUESTS_PER_MIN, TOKEN_WINDOW_MS)) {
      return new Response(JSON.stringify({ error: 'Too many token requests. Please wait a moment.' }), {
        status: 429,
      });
    }

    const { captchaToken } = await req.json();
    if (!captchaToken) {
      return new Response(JSON.stringify({ error: 'Missing captcha token' }), { status: 400 });
    }

    const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const captchaRes = await fetch(verifyEndpoint, {
      method: 'POST',
      body: `secret=${encodeURIComponent(process.env.TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(captchaToken)}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    const captchaData = await captchaRes.json();
    if (!captchaData.success) {
      return new Response(JSON.stringify({ error: 'Invalid captcha' }), { status: 403 });
    }

    const sessionId = uuidv4();
    const payload = { sid: sessionId, role: 'frontend' };
    const token = jwt.sign(payload, process.env.FRONTEND_JWT_SECRET, { expiresIn: TOKEN_TTL_SECONDS });

    const isSecure = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
    const cookieParts = [
      `${CHAT_COOKIE_NAME}=${token}`,
      'HttpOnly',
      'Path=/api/chat',
      'SameSite=Strict',
      `Max-Age=${TOKEN_TTL_SECONDS}`,
    ];
    if (isSecure) cookieParts.push('Secure');

    return new Response(JSON.stringify({ ok: true, expiresIn: TOKEN_TTL_SECONDS }), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieParts.join('; '),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('Error issuing token:', err);
    return new Response(JSON.stringify({ error: 'Could not create token' }), { status: 500 });
  }
}
