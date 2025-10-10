import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TOKEN_TTL = '5m'; // short-lived token

export async function GET(req) {
  try {
    // Get origin header
    const origin = req.headers.get('origin') || '';
    console.log('Request origin:', origin);
    console.log('VERCEL_ENV:', process.env.VERCEL_ENV);
    console.log('VERCEL_URL:', process.env.VERCEL_URL);

    const isProduction = process.env.VERCEL_ENV === 'production';
    const isPreview = process.env.VERCEL_ENV === 'preview';

    if (isProduction) {
      console.log('Environment: Production');
      const allowed = ['https://www.davidriva.dev'];
      console.log('Allowed origins:', allowed);
      if (!allowed.includes(origin)) {
        console.warn('Origin not allowed in production:', origin);
        return new Response(JSON.stringify({ error: 'Origin not allowed' }), { status: 403 });
      }
    } else if (isPreview) {
      console.log('Environment: Preview');
      const allowedPreview = [`https://${process.env.VERCEL_URL}`, '']; // allow requests where origin header is missing
      console.log('Allowed preview origins:', allowedPreview);
      if (!allowedPreview.includes(origin)) {
        console.warn('Origin not allowed in preview:', origin);
        return new Response(JSON.stringify({ error: 'Origin not allowed (preview)' }), { status: 403 });
      }
    } else {
      console.log('Environment: Development');
      const allowedDev = ['http://localhost:3000', 'http://127.0.0.1:3000', ''];
      console.log('Allowed dev origins:', allowedDev);
      if (!allowedDev.includes(origin)) {
        console.warn('Origin not allowed in dev:', origin);
        return new Response(JSON.stringify({ error: 'Origin not allowed (dev)' }), { status: 403 });
      }
    }

    console.log('Generating session ID and JWT token...');
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
