import { Box } from '@mui/material';
import Image from 'next/image';

const HeadShotImage = ({ width, height }) => {
  return (
    <Box
      sx={{
        width,
        height,
        overflow: 'hidden',
        borderRadius: '50%',
        boxShadow: '0 0 20px 5px rgba(211, 211, 211, 0.8)',
        border: '4px light gray',
        marginRight: 10,
      }}
    >
      <Image
        alt="Photo of David Riva"
        src="/images/headshot.jpeg"
        width={width}
        height={height}
        style={{
          objectFit: 'cover',
        }}
        priority={true}
      />
    </Box>
  );
};

export default HeadShotImage;
