import nodemailer from 'nodemailer';
import { Redis } from '@upstash/redis';
import sanitizeHtml from 'sanitize-html';

const redis = new Redis({
  url: process.env.REDISUPSTASH_REDIS_REDIS_KV_REST_API_URL,
  token: process.env.REDISUPSTASH_REDIS_REDIS_KV_REST_API_TOKEN,
});

const MAX_REQUESTS = 2; // 2 emails per IP per hour
const WINDOW_MS = 60 * 60 * 1000;

async function checkRateLimit(ip) {
  const key = `rate:contact:${ip}`;
  const now = Date.now();

  let entry = await redis.get(key);
  if (!entry) entry = { count: 0, timestamp: now };

  if (now - entry.timestamp > WINDOW_MS) {
    entry.count = 0;
    entry.timestamp = now;
  }

  entry.count += 1;
  await redis.set(key, entry, { ex: WINDOW_MS / 1000 });
  return entry.count <= MAX_REQUESTS;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    let ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown';
    
    if (!(await checkRateLimit(ip))) {
      return new Response(JSON.stringify({ message: 'Rate limit exceeded. Try again later.' }), { status: 429 });
    }

    const formData = await req.json(); 

    const { name, email, subject, message, captchaToken } = formData;

    if (!captchaToken) {
      return new Response(JSON.stringify({ message: 'Missing CAPTCHA token.' }), { status: 400 });
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
      return new Response(JSON.stringify({ message: 'Invalid CAPTCHA token.' }), { status: 403 });
    }

    if (!name || !email || !subject || !message) {
      console.error(
        'Missing name, email, subject, or message. These fields are required so please fill them out in the form.'
      );
      return new Response(JSON.stringify({ message: 'Missing name, email, subject, or message body.' }), {
        status: 400,
      });
    }

    const sanitizeOpts = { allowedTags: [], allowedAttributes: {} };
    const safeName = sanitizeHtml(name, sanitizeOpts);
    const safeEmail = sanitizeHtml(email, sanitizeOpts);
    const safeSubject = sanitizeHtml(subject, sanitizeOpts);
    const safeMessage = sanitizeHtml(message, sanitizeOpts);

    const mailOptions = {
      from: safeEmail,
      to: process.env.EMAIL_USER,
      subject: `Message from ${safeName} - ${safeSubject}`,
      text: safeMessage,
      html: `
          <h1>Message from ${safeName}</h1>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
    };

    await transporter.sendMail(mailOptions);
    
    return new Response(JSON.stringify({ message: 'Message sent successfully!' }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error sending message.' }), {
      status: 500,
    });
  }
}
