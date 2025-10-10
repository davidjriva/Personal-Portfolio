import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'nodejs';

const TOKEN_TTL = '5m'; // short-lived token

export async function GET(req) {
  try {
    // Verify origin

    const origin = req.headers.get('origin') || '';

    if (process.env.NODE_ENV !== 'development') {
      const allowed = ['https://www.davidriva.dev'];
      if (!allowed.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Origin not allowed' }), { status: 403 });
      }
    } else {
      // In dev, allow localhost
      // Also allow Vercel previews
      if (
        !['http://localhost:3000', 'http://127.0.0.1:3000'].includes(origin) ||
        process.env.VERCEL_ENV === 'preview'
      ) {
        console.warn(`Dev: ignoring unknown origin: ${origin}`);
      }
    }

    // Generate session ID and JWT token

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
