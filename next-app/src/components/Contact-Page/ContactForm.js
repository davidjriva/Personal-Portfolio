'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';
import SendIcon from '@mui/icons-material/Send';

const inputSx = {
  mb: 2.5,
  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.9rem' },
  '& .MuiOutlinedInput-root': {
    color: '#fafafa',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    fontSize: '0.9rem',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.08)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(56,192,242,0.5)' },
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
        maxWidth: 640,
        mx: 'auto',
        bgcolor: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        p: { xs: 3, sm: 4 },
        borderRadius: '20px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
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
        </Box>
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
          endIcon={<SendIcon sx={{ fontSize: '1rem' }} />}
          fullWidth
          sx={{
            py: 1.5,
            fontSize: '0.9rem',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #38c0f2, #a78bfa)',
            color: '#fff',
            borderRadius: '12px',
            textTransform: 'none',
            boxShadow: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #5bcff5, #b89dfc)',
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
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            textAlign: 'center',
            color: status.includes('success') ? '#4ade80' : '#f87171',
            fontSize: '0.85rem',
          }}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default ContactForm;
