'use client';

import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SendIcon from '@mui/icons-material/Send';

gsap.registerPlugin(ScrollTrigger);

const inputSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'rgba(255,255,255,0.02)',
    borderRadius: '12px',
    fontFamily: 'var(--font-inter)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
  },
  '& .MuiInputLabel-root': {
    fontFamily: 'var(--font-inter)',
    fontSize: '0.9rem',
  },
};

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const el = sectionRef.current?.querySelector('.contact-inner');
    if (el) {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setStatus({ type: 'error', message: 'Please complete the CAPTCHA.' });
      return;
    }
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, captchaToken }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Message sent! I\'ll get back to you soon.' });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message || 'Something went wrong.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 10, md: 16 },
        px: { xs: 2, sm: 4, md: 6, lg: 12 },
        maxWidth: '1200px',
        mx: 'auto',
      }}
    >
      <Box
        className="contact-inner"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 5, md: 8 },
          alignItems: 'start',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'primary.main',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              mb: 1,
            }}
          >
            Contact
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 3 }}>
            Let&apos;s work together
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 440 }}>
            Have a project in mind or want to discuss an opportunity? I&apos;d love to hear from you.
            Fill out the form and I&apos;ll get back to you as soon as possible.
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            bgcolor: '#18181b',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.06)',
            p: { xs: 3, md: 4 },
          }}
        >
          {status && (
            <Alert
              severity={status.type}
              sx={{ mb: 3, borderRadius: '12px' }}
              onClose={() => setStatus(null)}
            >
              {status.message}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
              sx={inputSx}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
              sx={inputSx}
            />
            <TextField
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              fullWidth
              sx={inputSx}
            />
            <TextField
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={4}
              sx={inputSx}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                onSuccess={(token) => setCaptchaToken(token)}
                options={{ theme: 'dark', size: 'normal' }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
              sx={{
                py: 1.5,
                borderRadius: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                bgcolor: 'primary.main',
                color: '#09090b',
                fontWeight: 600,
                '&:hover': { bgcolor: '#7dd3fc' },
                '&:disabled': { bgcolor: 'rgba(56, 189, 248, 0.3)', color: 'rgba(9,9,11,0.5)' },
              }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
