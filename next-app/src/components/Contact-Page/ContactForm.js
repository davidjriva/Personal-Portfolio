'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';

const inputSx = {
  mb: 2.5,
  '& .MuiInputLabel-root': {
    color: 'rgba(240, 237, 232, 0.35)',
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  '& .MuiOutlinedInput-root': {
    color: '#f0ede8',
    fontSize: '0.9rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '10px',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.06)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.12)' },
    '&.Mui-focused fieldset': { borderColor: '#e8a838', borderWidth: '1px' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#e8a838' },
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
    <Box
      sx={{
        width: '100%',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '16px',
        p: { xs: 3, md: 4 },
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required sx={inputSx} />
        <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required sx={inputSx} />
        <TextField fullWidth label="Subject" name="subject" value={formData.subject} onChange={handleChange} required sx={inputSx} />
        <TextField fullWidth label="Message" name="message" multiline rows={5} value={formData.message} onChange={handleChange} required sx={inputSx} />

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
          disabled={!captchaToken}
          fullWidth
          sx={{
            py: 1.5,
            fontSize: '0.85rem',
            fontWeight: 600,
            background: '#e8a838',
            color: '#0a0a0b',
            borderRadius: '10px',
            textTransform: 'none',
            letterSpacing: '-0.01em',
            '&:hover': {
              background: '#f0b64e',
            },
            '&.Mui-disabled': {
              background: 'rgba(255, 255, 255, 0.04)',
              color: 'rgba(240, 237, 232, 0.2)',
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
            fontSize: '0.8rem',
            color: status.includes('success') ? '#4ade80' : '#ef4444',
          }}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default ContactForm;
