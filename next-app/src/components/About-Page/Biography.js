import { Box, Typography } from '@mui/material';

const Biography = () => {
  return (
    <Box sx={{ mt: 2.5 }}>
      <Typography variant="body1" sx={{ color: '#A1A1AA', lineHeight: 1.75 }}>
        Hi, I&apos;m David. I&apos;m a software engineer based in the Bay Area, CA, and a graduate of Colorado State
        University, where I received a B.S. in Computer Science with Summa Cum Laude distinctions. I&apos;m incredibly
        passionate about software &amp; applied AI engineering.
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, color: '#A1A1AA', lineHeight: 1.75 }}>
        I&apos;m experienced in full-stack development, data engineering, and big data visualization.
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, color: '#A1A1AA', lineHeight: 1.75 }}>
        I have a strong background in data structures, algorithms, and mathematical applications. I pride myself on
        elegant problem-solving and my dedication to maintaining high standards of excellence.
      </Typography>
    </Box>
  );
};

export default Biography;
