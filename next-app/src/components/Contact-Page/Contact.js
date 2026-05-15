import { Box, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';

const Contact = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        pt: { xs: 10, md: 14 },
        pb: { xs: 8, md: 12 },
        px: { xs: 3, md: 6 },
      }}
    >
      <SectionHeading sectionName="Contact" subtitle="Let's connect" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 8 },
          alignItems: 'flex-start',
        }}
      >
        {/* Left — info */}
        <Box sx={{ flex: 1, maxWidth: { md: 360 } }}>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(232, 230, 227, 0.55)',
              lineHeight: 1.75,
              mb: 3,
            }}
          >
            I&apos;m always open to discussing new opportunities, interesting projects, or just connecting. Feel free
            to reach out.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <EmailOutlinedIcon sx={{ color: '#d4a053', fontSize: '1.1rem' }} />
            <Link
              href="mailto:davidjriva@gmail.com"
              sx={{
                color: '#e8e6e3',
                textDecoration: 'none',
                fontSize: '0.9rem',
                '&:hover': { color: '#d4a053' },
              }}
            >
              davidjriva@gmail.com
            </Link>
          </Box>

          <Box sx={{ display: 'flex', gap: 0.5, mt: 2 }}>
            <Link href="https://github.com/davidjriva" target="_blank" rel="noopener" color="inherit">
              <IconButton
                aria-label="GitHub"
                sx={{
                  color: 'rgba(232, 230, 227, 0.35)',
                  '&:hover': { color: '#e8e6e3', bgcolor: 'rgba(232, 230, 227, 0.06)' },
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Link>
            <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener" color="inherit">
              <IconButton
                aria-label="LinkedIn"
                sx={{
                  color: 'rgba(232, 230, 227, 0.35)',
                  '&:hover': { color: '#e8e6e3', bgcolor: 'rgba(232, 230, 227, 0.06)' },
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Link>
          </Box>
        </Box>

        {/* Right — form */}
        <Box sx={{ flex: 1, width: '100%' }}>
          <ContactForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
