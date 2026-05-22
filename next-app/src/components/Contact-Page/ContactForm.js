'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const inputSx = {
  mb: 2,
  '& .MuiInputLabel-root': { color: '#52525b', fontSize: '0.85rem', fontWeight: 500 },
  '& .MuiOutlinedInput-root': {
    color: '#fafafa',
    fontSize: '0.9rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.06)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(56, 192, 242, 0.4)', borderWidth: '1px' },
  },
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken }),
      });
      if (response.ok) {
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
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '16px',
        p: { xs: 2.5, md: 3.5 },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 0 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required sx={inputSx} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
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
          </Grid>
        </Grid>
        <TextField fullWidth label="Subject" name="subject" value={formData.subject} onChange={handleChange} required sx={inputSx} />
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
          variant="contained"
          disabled={!captchaToken}
          endIcon={<ArrowUpwardIcon sx={{ fontSize: '1rem !important', transform: 'rotate(45deg)' }} />}
          sx={{
            width: '100%',
            py: 1.5,
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            background: 'linear-gradient(135deg, #38c0f2, #8b5cf6)',
            color: '#fff',
            borderRadius: '12px',
            border: 'none',
            textTransform: 'none',
            transition: 'opacity 0.2s ease',
            '&:hover': { opacity: 0.9, background: 'linear-gradient(135deg, #38c0f2, #8b5cf6)' },
            '&.Mui-disabled': {
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'rgba(255, 255, 255, 0.2)',
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
            fontSize: '0.85rem',
            fontWeight: 500,
            color: status.includes('success') ? '#4ade80' : '#f87171',
          }}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default ContactForm;
