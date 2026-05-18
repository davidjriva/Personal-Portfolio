import { Box, Typography } from '@mui/material';

const Biography = () => {
  return (
    <Box sx={{ mt: 2.5 }}>
      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem' }}>
        Hi, I&apos;m David. I&apos;m a software engineer based in the Bay Area, CA, and a graduate of Colorado State
        University, where I received a B.S. in Computer Science with Summa Cum Laude distinctions. I&apos;m incredibly
        passionate about software &amp; applied AI engineering.
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem' }}>
        I&apos;m experienced in full-stack development, data engineering, and big data visualization. I have a strong
        background in data structures, algorithms, and mathematical applications.
      </Typography>
    </Box>
  );
};

export default Biography;
