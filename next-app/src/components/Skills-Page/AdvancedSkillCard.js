import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const AdvancedSkillCard = ({ item, parent }) => {
  return (
    <Box
      sx={{
        border: '2px solid #D3D3D3', // Outline with 2px gray border
        borderRadius: '8px', // Optional: Rounded corners
        padding: 2, // Inner padding for content spacing
        textAlign: 'center', // Center align text and image
      }}
    >
      <Image
        src={`/images/skills-logos/${parent.toLowerCase().replace("/", ":")}/${item.toLowerCase().replace("/", ":")}-logo.png`} // Use the imageName prop to specify the image source
        alt={item}
        width={80}
        height={80}
      />
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        {item}
      </Typography>
    </Box>
  );
};

export default AdvancedSkillCard;
