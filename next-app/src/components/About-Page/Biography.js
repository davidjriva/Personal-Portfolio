import { Typography, Box } from '@mui/material';

const Biography = () => {
  return (
    <Box sx={{ mt: 2, maxWidth: '560px' }}>
      <Typography variant="body1" sx={{ color: 'rgba(232, 230, 227, 0.65)', lineHeight: 1.75 }}>
        I&apos;m a software engineer based in the Bay Area, CA, and a graduate of Colorado State University where I
        received a B.S. in Computer Science with Summa Cum Laude distinctions. I&apos;m passionate about applied AI
        engineering and building production-grade systems.
      </Typography>
      <Typography variant="body1" sx={{ color: 'rgba(232, 230, 227, 0.65)', lineHeight: 1.75, mt: 2 }}>
        My work spans full-stack development, AI orchestration, and data engineering. I take pride in elegant
        problem-solving and maintaining high standards of code quality.
      </Typography>
    </Box>
  );
};

export default Biography;
