import { Box, Typography } from '@mui/material';
import ClickableLink from '@/components/About-Page/ClickableLink';

const Biography = () => {
  return (
    <Box
      sx={{
        marginTop: 2,
        maxWidth: '600px',
        textAlign: 'left',
      }}
    >
      <Typography variant="body1">
        Hi, I&apos;m David. I&apos;m a software engineer based in the Bay Area, CA, and a graduate of Colorado State
        University, where I received a B.S. in Computer Science with Summa Cum Laude distinctions. I&apos;m incredibly
        passionate about software engineering &amp; UI / UX design.
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        I&apos;m experienced in full-stack development, data engineering, and big data visualization.
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        I have a strong background in data structures, algorithms, and mathematical applications. I pride myself on
        elegant problem-solving and my dedication to maintaining high standards of excellence.
      </Typography>
    </Box>
  );
};

export default Biography;
