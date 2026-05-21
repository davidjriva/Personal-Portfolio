'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';
import SendIcon from '@mui/icons-material/Send';

const inputSx = {
  mb: 2,
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.3)', fontSize: '0.88rem' },
  '& .MuiOutlinedInput-root': {
    color: '#e8e6e3',
    fontSize: '0.92rem',
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.06)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
    '&.Mui-focused fieldset': { borderColor: '#a78bfa', borderWidth: '1px' },
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
    <Box
      sx={{
        width: '100%',
        bgcolor: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: { xs: 3, md: 4 },
        borderRadius: '16px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required sx={inputSx} />
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required sx={inputSx} />
        </Box>
        <TextField fullWidth label="Subject" name="subject" value={formData.subject} onChange={handleChange} required sx={inputSx} />
        <TextField fullWidth label="Message" name="message" multiline rows={5} value={formData.message} onChange={handleChange} required sx={inputSx} />

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
            py: 1.4,
            fontSize: '0.88rem',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
            borderRadius: '12px',
            textTransform: 'none',
            letterSpacing: '0.02em',
            '&:hover': {
              background: 'linear-gradient(135deg, #b89cfc, #5fc8f8)',
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
            fontSize: '0.85rem',
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
