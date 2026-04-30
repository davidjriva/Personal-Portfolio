import { Box } from '@mui/material';

const BouncingDotsLoadingAnimation = ({ dotSize = 5, dotColor = '#38bdf8', spacing = 3 }) => {
  const dot = (delay) => ({
    width: dotSize,
    height: dotSize,
    margin: `0 ${spacing}px`,
    borderRadius: '50%',
    backgroundColor: dotColor,
    animation: `pulse 1.2s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    '@keyframes pulse': {
      '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
      '50%': { opacity: 1, transform: 'scale(1)' },
    },
  });

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={dot(0)} />
      <Box sx={dot(0.2)} />
      <Box sx={dot(0.4)} />
    </Box>
  );
};

export default BouncingDotsLoadingAnimation;
