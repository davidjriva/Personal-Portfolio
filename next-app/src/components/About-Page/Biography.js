import { Box, Typography } from '@mui/material';
import ClickableLink from '@/components/About-Page/ClickableLink';

const biographyTypographyStyles = { 
  fontSize: '1rem'
};

const Biography = () => {
  return (
    <Box
      sx={{
        marginTop: 2,
        maxWidth: '600px',
        textAlign: 'left',
      }}
    >
      <Typography variant="body1" sx={...biographyTypographyStyles}>
        Hi, I'm David. I'm a Technical Trainer @ <ClickableLink link="https://c3.ai" company="C3 AI" /> based in the Bay
        Area, CA, and a graduate of Colorado State University, where I received a B.S. in Computer Science with Summa
        Cum Laude distinctions. I'm incredibly passionate about software engineering & UI / UX design.
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2, ...biographyTypographyStyles }}>
        I'm experienced in full-stack development, data engineering, and big data visualization.
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2, ...biographyTypographyStyles }}>
        I have a strong background in data structures, algorithms, and mathematical applications. I pride myself on
        elegant problem-solving and my dedication to maintaining high standards of excellence.
      </Typography>
    </Box>
  );
};

export default Biography;
