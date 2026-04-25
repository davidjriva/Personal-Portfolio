'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';
import SendIcon from '@mui/icons-material/Send';

const inputSx = {
  mb: 2,
  '& .MuiInputLabel-root': {
    color: '#52525b',
    fontSize: '0.875rem',
  },
  '& .MuiOutlinedInput-root': {
    color: '#fafafa',
    fontSize: '0.9rem',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.06)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(56,189,248,0.4)' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#38bdf8' },
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
        bgcolor: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px',
        p: { xs: 3, md: 4 },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required sx={inputSx} />
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required sx={inputSx} />
        </Box>
        <TextField fullWidth label="Subject" name="subject" value={formData.subject} onChange={handleChange} required sx={inputSx} />
        <TextField fullWidth label="Message" name="message" multiline rows={4} value={formData.message} onChange={handleChange} required sx={inputSx} />

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
          endIcon={<SendIcon sx={{ fontSize: '0.9rem !important' }} />}
          sx={{
            width: '100%',
            py: 1.5,
            fontSize: '0.875rem',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #38bdf8, #a78bfa)',
            color: '#fff',
            borderRadius: '12px',
            textTransform: 'none',
            boxShadow: 'none',
            transition: 'all 0.2s ease',
            '&:hover': {
              boxShadow: '0 8px 24px rgba(56,189,248,0.15)',
              opacity: 0.9,
            },
            '&.Mui-disabled': {
              background: 'rgba(255,255,255,0.06)',
              color: '#52525b',
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
            fontSize: '0.85rem',
            color: status.includes('success') ? '#22c55e' : '#ef4444',
          }}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default ContactForm;
