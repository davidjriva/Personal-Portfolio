'use client';

import { Box } from '@mui/material';
import Image from 'next/image';

const HeadShotImage = ({ width, height }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        display: { xs: 'none', sm: 'block' },
      }}
    >
      <Image
        alt="Photo of David Riva"
        src="/images/headshot.webp"
        width={width}
        height={height}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        priority={true}
      />
    </Box>
  );
};

export default HeadShotImage;
