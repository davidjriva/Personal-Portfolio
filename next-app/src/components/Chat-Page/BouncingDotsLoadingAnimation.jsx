import { Box } from '@mui/material';

const BouncingDotsLoadingAnimation = ({ dotSize = 4, dotColor = '#d4a053', spacing = 4 }) => {
  const dotStyle = (delay) => ({
    width: dotSize,
    height: dotSize,
    margin: `2px ${spacing}px`,
    borderRadius: '50%',
    backgroundColor: dotColor,
    animation: `bouncing-loader 0.6s infinite alternate`,
    animationDelay: `${delay}s`,
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box sx={dotStyle(0)} />
      <Box sx={dotStyle(0.2)} />
      <Box sx={dotStyle(0.4)} />
      <style>
        {`@keyframes bouncing-loader {
          to { opacity: 0.15; transform: translateY(-4px); }
        }`}
      </style>
    </Box>
  );
};

export default BouncingDotsLoadingAnimation;
