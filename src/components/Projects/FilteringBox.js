import { Box, Chip, Stack } from '@mui/material';

const FilteringBox = ({ uniqueTools }) => {
  return (
    <Box
      sx={{
        margin: '2rem',
        padding: '1rem',
        border: '1px solid lightgray',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap={1} 
      >
        {uniqueTools.map((tool) => (
          <Chip key={tool} label={tool} />
        ))}
      </Stack>
    </Box>
  );
};

export default FilteringBox;
