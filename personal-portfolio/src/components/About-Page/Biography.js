import { Box, Typography } from '@mui/material';

const Biography = () => {
  return (
    <Box sx={{ marginTop: 2, maxWidth: '600px' }}>
      <Typography variant="body1">
        Driven and accomplished software engineer and educator with a B.S. in Computer Science from Colorado State
        University, graduating summa cum laude, and a minor in Mathematics.
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Experienced in full-stack development, data engineering, and big data visualization.
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Proficient in data structures, algorithms, and mathematical applications. Passionate about elegant
        problem-solving and dedicated to maintaining high standards of excellence.
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Thrives in a collaborative environment that values innovation and rigorous quality.
      </Typography>
    </Box>
  );
};

export default Biography;
