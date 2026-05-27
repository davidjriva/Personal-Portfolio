'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Collapse } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Turnstile } from '@marsidev/react-turnstile';
import FadeIn from '@/components/sections/FadeIn';

const fieldSx = {
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
  '& .MuiOutlinedInput-root': {
    color: '#fafafa',
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&.Mui-focused fieldset': { borderColor: '#818cf8' },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 3, sm: 4, md: 6 },
        maxWidth: 700,
        mx: 'auto',
      }}
    >
      <FadeIn>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', mb: 1, display: 'block' }}>
            CONTACT
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 2 }}>
            Get in touch
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 480, mx: 'auto' }}>
            Have a question or want to work together? Drop me a message and I&apos;ll get back to you.
          </Typography>
        </Box>
      </FadeIn>

      <FadeIn delay={0.15}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.06)',
            bgcolor: 'rgba(255,255,255,0.02)',
          }}
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5, mb: 2.5 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={fieldSx}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={fieldSx}
            />
          </Box>
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            sx={{ ...fieldSx, mb: 2.5 }}
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            sx={{ ...fieldSx, mb: 3 }}
          />

          {!captchaToken && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                onSuccess={(token) => setCaptchaToken(token)}
              />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!captchaToken || sending}
            endIcon={<SendIcon />}
            sx={{
              py: 1.5,
              fontSize: '0.95rem',
              fontWeight: 600,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1, #818cf8)',
              boxShadow: '0 4px 20px rgba(99,102,241,0.2)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                boxShadow: '0 4px 28px rgba(99,102,241,0.3)',
              },
              '&.Mui-disabled': {
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.25)',
              },
            }}
          >
            {sending ? 'Sending...' : 'Send Message'}
          </Button>

          <Collapse in={!!status}>
            <Alert
              severity={status === 'success' ? 'success' : 'error'}
              sx={{
                mt: 2.5,
                borderRadius: '12px',
                bgcolor: status === 'success' ? 'rgba(52,211,153,0.08)' : 'rgba(239,68,68,0.08)',
                color: status === 'success' ? '#34d399' : '#ef4444',
                border: `1px solid ${status === 'success' ? 'rgba(52,211,153,0.15)' : 'rgba(239,68,68,0.15)'}`,
                '& .MuiAlert-icon': {
                  color: status === 'success' ? '#34d399' : '#ef4444',
                },
              }}
            >
              {status === 'success' ? 'Message sent successfully!' : 'Failed to send message. Please try again.'}
            </Alert>
          </Collapse>
        </Box>
      </FadeIn>
    </Box>
  );
};

export default Contact;
