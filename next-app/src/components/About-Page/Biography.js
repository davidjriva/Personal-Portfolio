import { Box, Typography } from '@mui/material';

const Biography = () => {
  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="body1" sx={{ color: '#a1a1aa', lineHeight: 1.75, fontSize: '0.925rem' }}>
        Hi, I&apos;m David. I&apos;m a software engineer based in the Bay Area, CA, and a graduate of Colorado State
        University, where I received a B.S. in Computer Science with Summa Cum Laude distinctions. I&apos;m incredibly
        passionate about software &amp; applied AI engineering.
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, color: '#a1a1aa', lineHeight: 1.75, fontSize: '0.925rem' }}>
        I&apos;m experienced in full-stack development, data engineering, and big data visualization. I have a strong
        background in data structures, algorithms, and mathematical applications.
      </Typography>
    </Box>
  );
};

export default Biography;
