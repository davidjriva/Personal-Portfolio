import { Typography } from '@mui/material';

const Biography = () => {
  return (
    <>
      <Typography variant="body1" sx={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.75 }}>
        Hi, I&apos;m David. I&apos;m a software engineer based in the Bay Area, CA, and a graduate of Colorado State
        University, where I received a B.S. in Computer Science with Summa Cum Laude distinctions.
      </Typography>
      <Typography variant="body1" sx={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.75, mt: 2 }}>
        I&apos;m incredibly passionate about applied AI engineering and full-stack development. I&apos;m experienced in
        building production-grade AI systems, data engineering pipelines, and interactive web applications.
      </Typography>
      <Typography variant="body1" sx={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.75, mt: 2 }}>
        I have a strong background in data structures, algorithms, and mathematical applications. I pride myself on
        elegant problem-solving and my dedication to maintaining high standards of excellence.
      </Typography>
    </>
  );
};

export default Biography;
