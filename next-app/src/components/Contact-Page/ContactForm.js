'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const inputSx = {
  mb: 2,
  '& .MuiInputLabel-root': {
    color: 'rgba(240,240,245,0.35)',
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  '& .MuiOutlinedInput-root': {
    color: '#f0f0f5',
    fontSize: '0.9rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.06)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.12)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(56,192,242,0.4)', borderWidth: '1px' },
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
        bgcolor: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        color: '#f0f0f5',
        p: { xs: 3, sm: 4 },
        borderRadius: '20px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
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
          endIcon={<SendIcon sx={{ fontSize: '0.95rem !important' }} />}
          sx={{
            width: '100%',
            py: 1.4,
            fontSize: '0.85rem',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #38c0f2, #8b5cf6)',
            color: '#fff',
            borderRadius: '12px',
            border: 'none',
            textTransform: 'none',
            letterSpacing: '0.01em',
            transition: 'all 0.25s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #5ed0f7, #a78bfa)',
              transform: 'translateY(-1px)',
              boxShadow: '0 8px 24px rgba(56,192,242,0.15)',
            },
            '&.Mui-disabled': {
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          Send Message
        </Button>
      </form>

      {status && (
        <Box
          sx={{
            mt: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.75,
            py: 1,
            borderRadius: '10px',
            bgcolor: status.includes('success') ? 'rgba(52,211,153,0.06)' : 'rgba(244,63,94,0.06)',
            border: status.includes('success') ? '1px solid rgba(52,211,153,0.15)' : '1px solid rgba(244,63,94,0.15)',
          }}
        >
          {status.includes('success') && <CheckCircleOutlineIcon sx={{ fontSize: '1rem', color: '#6ee7b7' }} />}
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: status.includes('success') ? '#6ee7b7' : '#fca5a5',
              fontSize: '0.82rem',
              fontWeight: 500,
            }}
          >
            {status}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ContactForm;
