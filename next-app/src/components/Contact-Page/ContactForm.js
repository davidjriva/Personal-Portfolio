'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';

const inputSx = {
  marginBottom: 2,
  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.55)' },
  '& .MuiOutlinedInput-root': {
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.25)' },
    '&.Mui-focused fieldset': { borderColor: '#38c0f2' },
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
        height: 'fit-content',
        maxWidth: '800px',
        bgcolor: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        color: '#ffffff',
        padding: { xs: 2, sm: 3, md: 4 },
        borderRadius: '16px',
        backdropFilter: 'blur(12px)',
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Your Name" name="name" value={formData.name} onChange={handleChange} required sx={inputSx} />
        <TextField fullWidth label="Your Email" name="email" type="email" value={formData.email} onChange={handleChange} required sx={inputSx} />
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
          sx={{
            width: '100%',
            padding: '12px 0',
            fontSize: '16px',
            background: 'linear-gradient(135deg, #38c0f2, #6e40c9)',
            color: '#ffffff',
            borderRadius: '8px',
            border: 'none',
            '&:hover': {
              background: 'linear-gradient(135deg, #5bcff5, #8660d4)',
            },
            '&.Mui-disabled': {
              background: 'rgba(255, 255, 255, 0.12)',
              color: 'rgba(255, 255, 255, 0.3)',
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
            marginTop: 2,
            textAlign: 'center',
            color: status.includes('success') ? '#4caf50' : '#f44336',
          }}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default ContactForm;
