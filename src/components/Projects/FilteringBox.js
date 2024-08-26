import { Box, Chip, Stack } from '@mui/material';
import { useState } from 'react';

const FilteringBox = ({ uniqueTools }) => {
  const [selectedChips, setSelectedChips] = useState(new Set());

  const handleChipClick = (chip) => {
    const updatedChips = new Set(selectedChips);
    if (updatedChips.has(chip)) {
      updatedChips.delete(chip);
    } else {
      updatedChips.add(chip);
    }
    setSelectedChips(updatedChips);
  };

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
      <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" alignItems="center" gap={1}>
        {uniqueTools.map((tool) => (
          <Chip
            key={tool}
            label={tool}
            onClick={() => handleChipClick(tool)}
            sx={{
              backgroundColor: selectedChips.has(tool) ? '#0a73c9' : 'transparent',
              color: selectedChips.has(tool) ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: selectedChips.has(tool) ? '#0a73c9' : '#e0e0e0',
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default FilteringBox;
