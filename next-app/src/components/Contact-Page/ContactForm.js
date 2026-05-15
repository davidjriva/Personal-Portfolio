'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';

const inputSx = {
  mb: 2,
  '& .MuiInputLabel-root': { color: 'rgba(232, 230, 227, 0.35)', fontSize: '0.9rem' },
  '& .MuiOutlinedInput-root': {
    color: '#e8e6e3',
    fontSize: '0.9rem',
    backgroundColor: 'rgba(232, 230, 227, 0.02)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(232, 230, 227, 0.08)' },
    '&:hover fieldset': { borderColor: 'rgba(232, 230, 227, 0.15)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(212, 160, 83, 0.5)' },
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
        maxWidth: '600px',
        bgcolor: 'rgba(232, 230, 227, 0.02)',
        border: '1px solid rgba(232, 230, 227, 0.06)',
        p: { xs: 3, md: 4 },
        borderRadius: '16px',
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
          fullWidth
          sx={{
            bgcolor: '#d4a053',
            color: '#0c0c0e',
            borderRadius: '12px',
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            py: 1.25,
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#e8c07a',
              boxShadow: 'none',
            },
            '&.Mui-disabled': {
              bgcolor: 'rgba(232, 230, 227, 0.06)',
              color: 'rgba(232, 230, 227, 0.2)',
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
            color: status.includes('success') ? '#6ec87a' : '#e07070',
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
