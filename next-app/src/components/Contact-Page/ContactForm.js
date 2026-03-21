'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState(''); // For success or error messages
  const [captchaToken, setCaptchaToken] = useState(null);

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
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
        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.08)',
        color: 'inherit',
        padding: { xs: 2, sm: 3, md: 4 },
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          sx={{
            marginBottom: 2,
            '& .MuiInputLabel-root': {
              color: 'text.secondary',
            },
            '& .MuiOutlinedInput-root': {
              color: 'inherit',
              '& fieldset': {
                borderColor: 'text.secondary',
              },
              '&:hover fieldset': {
                borderColor: 'inherit',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Your Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{
            marginBottom: 2,
            '& .MuiInputLabel-root': {
              color: 'text.secondary',
            },
            '& .MuiOutlinedInput-root': {
              color: 'inherit',
              '& fieldset': {
                borderColor: 'text.secondary',
              },
              '&:hover fieldset': {
                borderColor: 'inherit',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          sx={{
            marginBottom: 2,
            '& .MuiInputLabel-root': {
              color: 'text.secondary',
            },
            '& .MuiOutlinedInput-root': {
              color: 'inherit',
              '& fieldset': {
                borderColor: 'text.secondary',
              },
              '&:hover fieldset': {
                borderColor: 'inherit',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
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
          sx={{
            marginBottom: 2,
            '& .MuiInputLabel-root': {
              color: 'text.secondary',
            },
            '& .MuiOutlinedInput-root': {
              color: 'inherit',
              '& fieldset': {
                borderColor: 'text.secondary',
              },
              '&:hover fieldset': {
                borderColor: 'inherit',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
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
          sx={{
            width: '100%',
            padding: '12px 0',
            fontSize: '16px',
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1565c0',
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
            color: status.includes('success') ? '#4caf50' : '#f44336', // Green for success, red for error
          }}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default ContactForm;
