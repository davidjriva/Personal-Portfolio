'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const inputSx = {
  mb: 2,
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.35)',
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  '& .MuiOutlinedInput-root': {
    color: '#e8e6e3',
    fontSize: '0.9rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '10px',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.06)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(110, 182, 240, 0.3)', borderWidth: '1px' },
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
    } catch (error) {
      setStatus('Error sending message.');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required sx={inputSx} />
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required sx={inputSx} />
        </Box>
        <TextField fullWidth label="Subject" name="subject" value={formData.subject} onChange={handleChange} required sx={inputSx} />
        <TextField fullWidth label="Message" name="message" multiline rows={4} value={formData.message} onChange={handleChange} required sx={inputSx} />

        {!captchaToken && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
              onSuccess={(token) => setCaptchaToken(token)}
            />
          </Box>
        )}

        <Button
          type="submit"
          disabled={!captchaToken}
          endIcon={<ArrowOutwardIcon sx={{ fontSize: '0.85rem !important' }} />}
          sx={{
            color: '#0a0a0f',
            bgcolor: '#e8e6e3',
            borderRadius: '10px',
            textTransform: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            px: 3,
            py: 1,
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: '#fff',
            },
            '&.Mui-disabled': {
              bgcolor: 'rgba(255, 255, 255, 0.06)',
              color: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          Send message
        </Button>
      </form>

      {status && (
        <Typography
          sx={{
            mt: 2,
            fontSize: '0.8rem',
            fontWeight: 500,
            color: status.includes('success') ? 'rgba(110, 220, 150, 0.8)' : 'rgba(255, 120, 120, 0.8)',
          }}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default ContactForm;
