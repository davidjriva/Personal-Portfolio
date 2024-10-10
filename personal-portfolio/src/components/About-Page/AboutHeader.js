import { Typography } from '@mui/material';

const AboutHeader = () => {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          marginBottom: 1, // Optional: space below the title
        }}
      >
        David Riva
      </Typography>

      <Typography
        variant="h5"
        sx={{
          color: '#38c0f2',
          marginBottom: 1,
        }}
      >
        Technical Trainer
      </Typography>

      <Typography
        sx={{
          color: '#757474',
          marginBottom: 2,
        }}
      >
        Bay Area, CA. |{' '}
        <a
          href="mailto:davidjriva@gmail.com"
          style={{
            color: '#0a73c9',
            textDecoration: 'none',
          }}
        >
          davidjriva@gmail.com
        </a>
      </Typography>
    </>
  );
};

export default AboutHeader;
