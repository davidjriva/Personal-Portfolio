'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Stack } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';
import SendIcon from '@mui/icons-material/Send';
import SectionWrapper from '@/components/shared/SectionWrapper';
import FadeInView from '@/components/shared/FadeInView';

const inputSx = {
  mb: 2,
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem' },
  '& .MuiOutlinedInput-root': {
    color: '#fafafa',
    fontSize: '0.9rem',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&.Mui-focused fieldset': { borderColor: '#a78bfa' },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <SectionWrapper
      label="Contact"
      title="Get in touch"
      subtitle="Have a question or want to work together? Drop me a message."
      maxWidth="600px"
      sx={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <FadeInView delay={0.1}>
        <Box
          sx={{
            bgcolor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            p: { xs: 3, md: 4 },
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 0 }}>
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
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              sx={inputSx}
            />

            {!captchaToken && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                  onSuccess={(token) => setCaptchaToken(token)}
                />
              </Box>
            )}

            <Button
              type="submit"
              fullWidth
              disabled={!captchaToken}
              endIcon={<SendIcon sx={{ fontSize: '0.9rem !important' }} />}
              sx={{
                py: 1.5,
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
                color: '#09090b',
                '&:hover': {
                  background: 'linear-gradient(135deg, #b59cfc, #5dcdfb)',
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
              variant="body2"
              sx={{
                mt: 2,
                textAlign: 'center',
                fontSize: '0.8rem',
                color: status.includes('success') ? '#4ade80' : '#f87171',
              }}
            >
              {status}
            </Typography>
          )}
        </Box>
      </FadeInView>
    </SectionWrapper>
  );
};

export default Contact;
