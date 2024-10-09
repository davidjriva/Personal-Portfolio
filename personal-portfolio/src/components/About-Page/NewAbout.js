import { Typography, Box } from '@mui/material';
import PersonSVG from '../../../public/images/person-outline.svg';

const NewAbout = () => {
  console.log(PersonSVG);
  return (
    <Box
      id="about-section"
      sx={{
        marginTop: 10, // Increase this value for a stronger top margin
        display: 'flex',
        height: '100vh',
        width: '100vw',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: 'white', // Set the color of the text to white
          mb: 2, // Optional: add margin below the heading
        }}
      >
        About
      </Typography>

      <img
        src="/images/person-outline.svg"
        alt="Person"
        style={{
          width: '25vw',
          height: 'auto',
          color: 'white',
        }}
      />
    </Box>
  );
};

export default NewAbout;
