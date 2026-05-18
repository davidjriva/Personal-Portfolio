'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';
import SendIcon from '@mui/icons-material/Send';

const inputSx = {
  mb: 2.5,
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: '0.9rem',
    '&.Mui-focused': { color: '#818cf8' },
  },
  '& .MuiOutlinedInput-root': {
    color: '#fafafa',
    fontSize: '0.9rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.06)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.12)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(129, 140, 248, 0.5)' },
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
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
            px: 4,
            py: 1.25,
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'none',
            background: 'linear-gradient(135deg, #818cf8, #c084fc)',
            color: '#fff',
            borderRadius: '12px',
            border: 'none',
            boxShadow: 'none',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #9098fc, #cc96fd)',
              boxShadow: '0 8px 24px rgba(129, 140, 248, 0.2)',
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
            color: status.includes('success') ? '#34d399' : '#f87171',
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
