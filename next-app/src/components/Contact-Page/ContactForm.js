'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';
import SendIcon from '@mui/icons-material/Send';

const inputSx = {
  mb: 2,
  '& .MuiInputLabel-root': {
    color: '#6b7280',
    fontSize: '0.85rem',
    '&.Mui-focused': { color: '#818cf8' },
  },
  '& .MuiOutlinedInput-root': {
    color: '#f4f4f5',
    fontSize: '0.9rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.07)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(99, 102, 241, 0.5)', borderWidth: '1px' },
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
        bgcolor: '#131316',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '20px',
        p: { xs: 3, sm: 4 },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 0 }}>
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
          endIcon={<SendIcon sx={{ fontSize: '0.9rem !important' }} />}
          sx={{
            width: '100%',
            py: 1.5,
            fontSize: '0.85rem',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            color: '#fff',
            borderRadius: '12px',
            border: 'none',
            textTransform: 'none',
            boxShadow: 'none',
            transition: 'opacity 0.2s',
            '&:hover': {
              background: 'linear-gradient(135deg, #818cf8, #c084fc)',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
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
