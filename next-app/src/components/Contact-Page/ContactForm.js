'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState(''); // For success or error messages

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
        body: JSON.stringify(formData),
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
        margin: 'auto',
        backgroundColor: '#ffffff', // Light background for form
        padding: 4,
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
              color: '#333', // Lighter text color for label
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#aaa', // Lighter border color
              },
              '&:hover fieldset': {
                borderColor: '#888', // Darker border on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5f6368', // Focused border color
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
              color: '#333',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#aaa',
              },
              '&:hover fieldset': {
                borderColor: '#888',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5f6368',
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
              color: '#333',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#aaa',
              },
              '&:hover fieldset': {
                borderColor: '#888',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5f6368',
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
              color: '#333',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#aaa',
              },
              '&:hover fieldset': {
                borderColor: '#888',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5f6368',
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: '100%',
            padding: '12px 0',
            fontSize: '16px',
            backgroundColor: '#1976d2',
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
