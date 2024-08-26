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

  console.log(selectedChips);
  
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
            color={selectedChips.has(tool) ? 'primary' : 'default'}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default FilteringBox;
