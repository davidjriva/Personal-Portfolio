'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';
import SendIcon from '@mui/icons-material/Send';

const inputSx = {
  mb: 2,
  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.35)', fontSize: '0.9rem' },
  '& .MuiOutlinedInput-root': {
    color: '#fafafa',
    fontSize: '0.9rem',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.025)',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.08)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.18)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(129, 140, 248, 0.5)' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#818cf8' },
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
        maxWidth: '640px',
        background: 'rgba(255, 255, 255, 0.025)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        color: '#fafafa',
        p: { xs: 3, sm: 4, md: 5 },
        borderRadius: '20px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required sx={inputSx} />
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
        <TextField fullWidth label="Subject" name="subject" value={formData.subject} onChange={handleChange} required sx={inputSx} />
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
          endIcon={<SendIcon sx={{ fontSize: '1rem !important' }} />}
          sx={{
            width: '100%',
            py: 1.5,
            fontSize: '0.9rem',
            fontWeight: 600,
            background: '#818cf8',
            color: '#fff',
            borderRadius: '12px',
            textTransform: 'none',
            boxShadow: 'none',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: '#6366f1',
              boxShadow: '0 4px 20px rgba(129, 140, 248, 0.25)',
            },
            '&.Mui-disabled': {
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'rgba(255, 255, 255, 0.25)',
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
            mt: 2.5,
            textAlign: 'center',
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
