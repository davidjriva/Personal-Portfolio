'use client';

import { Box, Typography, TextField, Button, Stack, IconButton } from '@mui/material';
import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FadeIn from '@/components/shared/FadeIn';

const inputSx = {
  mb: 2.5,
  '& .MuiInputLabel-root': { color: 'rgba(122, 122, 142, 0.8)' },
  '& .MuiOutlinedInput-root': {
    color: '#ededf0',
    bgcolor: 'rgba(255,255,255,0.02)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&.Mui-focused fieldset': { borderColor: '#6366f1' },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken }),
      });
      if (res.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch {
      setStatus('Error sending message.');
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: 700,
        mx: 'auto',
      }}
    >
      <FadeIn>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2, textAlign: 'center' }}>
          Get in Touch
        </Typography>
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 8, maxWidth: 500, mx: 'auto' }}>
          Have a question or want to work together? Drop me a message.
        </Typography>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Box
          sx={{
            bgcolor: 'rgba(17, 17, 22, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '24px',
            p: { xs: 3, md: 5 },
            backdropFilter: 'blur(20px)',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                sx={inputSx}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={inputSx}
              />
            </Stack>
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              sx={inputSx}
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
              sx={inputSx}
            />

            {!captchaToken && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2.5 }}>
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
              disabled={!captchaToken}
              endIcon={<SendIcon />}
              sx={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                py: 1.5,
                fontSize: '0.95rem',
                fontWeight: 600,
                borderRadius: '12px',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
                },
                '&.Mui-disabled': {
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.2)',
                },
              }}
            >
              Send Message
            </Button>
          </form>

          {status && (
            <Typography
              sx={{
                mt: 2,
                textAlign: 'center',
                fontSize: '0.875rem',
                color: status.includes('success') ? '#4ade80' : '#f87171',
              }}
            >
              {status}
            </Typography>
          )}
        </Box>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 2 }}>Or reach me directly</Typography>
          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton
              href="mailto:davidjriva@gmail.com"
              aria-label="Email"
              sx={{
                color: 'text.secondary',
                border: '1px solid rgba(255,255,255,0.08)',
                '&:hover': { color: 'primary.main', borderColor: 'rgba(99,102,241,0.3)' },
              }}
            >
              <EmailIcon />
            </IconButton>
            <IconButton
              href="https://github.com/davidjriva"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{
                color: 'text.secondary',
                border: '1px solid rgba(255,255,255,0.08)',
                '&:hover': { color: 'text.primary', borderColor: 'rgba(255,255,255,0.2)' },
              }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://linkedin.com/in/davidjriva"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{
                color: 'text.secondary',
                border: '1px solid rgba(255,255,255,0.08)',
                '&:hover': { color: '#0a66c2', borderColor: 'rgba(10,102,194,0.3)' },
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </FadeIn>
    </Box>
  );
};

export default Contact;
