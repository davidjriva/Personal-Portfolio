import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TOKEN_TTL = '5m'; // short-lived token

export async function POST(req) {
  try {
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

    // Get origin header
    const origin = req.headers.get('origin') || '';

    const isProduction = process.env.VERCEL_ENV === 'production';
    const isPreview = process.env.VERCEL_ENV === 'preview';

    if (isProduction) {
      const allowed = ['https://www.davidriva.dev', 'https://davidriva.dev'];

      // Allow missing origin for same-origin browser requests
      const isAllowed = !origin || allowed.includes(origin);
      if (!isAllowed) {
        console.warn('Origin not allowed in production:', origin);
        return new Response(JSON.stringify({ error: 'Origin not allowed' }), { status: 403 });
      }
    } else if (isPreview) {
      const allowedPreview = [`https://${process.env.VERCEL_URL}`, '']; // allow requests where origin header is missing

      if (!allowedPreview.includes(origin)) {
        console.warn('Origin not allowed in preview:', origin);
        return new Response(JSON.stringify({ error: 'Origin not allowed (preview)' }), { status: 403 });
      }
    } else {
      const isAllowedDev = !origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:');

      if (!isAllowedDev) {
        console.warn('Origin not allowed in dev:', origin);
        return new Response(JSON.stringify({ error: 'Origin not allowed (dev)' }), { status: 403 });
      }
    }

    const sessionId = uuidv4();
    const payload = { sid: sessionId, role: 'frontend' };
    const token = jwt.sign(payload, process.env.FRONTEND_JWT_SECRET, { expiresIn: TOKEN_TTL });

    return new Response(JSON.stringify({ token, expiresIn: 60 * 5, sessionId }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error issuing token:', err);
    return new Response(JSON.stringify({ error: 'Could not create token' }), { status: 500 });
  }
}
