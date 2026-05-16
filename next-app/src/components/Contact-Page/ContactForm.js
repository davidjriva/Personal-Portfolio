'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';

const inputSx = {
  marginBottom: 3,
  '& .MuiInputLabel-root': {
    color: 'rgba(240, 237, 230, 0.4)',
    fontSize: '0.9rem',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#f59e0b',
  },
  '& .MuiInput-root': {
    color: '#f0ede6',
    fontSize: '1rem',
    '&::before': {
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    '&:hover::before': {
      borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
    },
    '&::after': {
      borderBottom: '2px solid #f59e0b',
    },
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
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
        maxWidth: '700px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Your Name"
          name="name"
          variant="standard"
          value={formData.name}
          onChange={handleChange}
          required
          sx={inputSx}
        />
        <TextField
          fullWidth
          label="Your Email"
          name="email"
          type="email"
          variant="standard"
          value={formData.email}
          onChange={handleChange}
          required
          sx={inputSx}
        />
        <TextField
          fullWidth
          label="Subject"
          name="subject"
          variant="standard"
          value={formData.subject}
          onChange={handleChange}
          required
          sx={inputSx}
        />
        <TextField
          fullWidth
          label="Message"
          name="message"
          variant="standard"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          sx={inputSx}
        />

        {!captchaToken && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3, mt: 1 }}>
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
          sx={{
            width: '100%',
            padding: '14px 0',
            fontSize: '0.95rem',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            color: '#ffffff',
            borderRadius: '12px',
            border: 'none',
            textTransform: 'none',
            letterSpacing: '0.01em',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #fbbf24 0%, #f87171 100%)',
              transform: 'translateY(-1px)',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.2)',
            },
            '&.Mui-disabled': {
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'rgba(240, 237, 230, 0.25)',
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
            marginTop: 2.5,
            textAlign: 'center',
            color: status.includes('success') ? '#4caf50' : '#ef4444',
            fontWeight: 500,
          }}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default ContactForm;
