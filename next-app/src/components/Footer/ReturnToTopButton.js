import { IconButton, Box } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const ReturnToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        display: 'flex', // Use flexbox to center content
        justifyContent: 'center', // Center the button horizontally
        alignItems: 'center', // Center the button vertically
        backgroundColor: '#38c0f2',
        borderRadius: '8px', // Optional: add rounded corners
        padding: '4px', // Reduce padding for less width
        maxWidth: '50px', // Set a maximum width for the box
        margin: '0 auto',
        '&:hover': {
          animation: 'jump 1s infinite', // Increase duration for slower jump
        },
      }}
    >
      <IconButton
        onClick={scrollToTop}
        sx={{
          color: 'white',
          fontSize: '1.5rem', // Adjust font size to reduce button size
          padding: '4px', // Reduce padding for the icon button
        }}
      >
        <KeyboardDoubleArrowUpIcon sx={{ fontSize: 'inherit' }} />
      </IconButton>
      <style jsx>{`
        @keyframes jump {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px); // Adjust height of the jump
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};

export default ReturnToTopButton;
