import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TOKEN_TTL = '5m'; // short-lived token

export async function GET(req) {
  try {
    // Verify origin

    const origin = req.headers.get('origin') || '';

    console.log('Origin = ', origin);

    if (process.env.NODE_ENV !== 'development') {
      const allowed = ['https://www.davidriva.dev', `https://${process.env.VERCEL_URL}`];

      console.log('Allowed = ', allowed);
      if (!allowed.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Origin not allowed' }), { status: 403 });
      }
    }

    console.log('Generating session ID and JWT token...');
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
