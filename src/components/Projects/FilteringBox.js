import { Box, Chip, Stack } from '@mui/material';

const TechnologyChip = ({ tool, selectedChips, setSelectedChips }) => {
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
    <Chip
      key={tool}
      label={tool}
      onClick={() => handleChipClick(tool)}
      sx={{
        backgroundColor: selectedChips.has(tool) ? '#0a73c9' : 'transparent',
        color: selectedChips.has(tool) ? 'white' : 'inherit',
        border: '1px solid lightgray',
        '&:hover': {
          backgroundColor: selectedChips.has(tool) ? '#0a73c9' : '#e0e0e0',
        },
      }}
    />
  );
};

const ClearAllChip = ({ setSelectedChips }) => {
  const handleClearChips = () => {
    setSelectedChips(new Set());
  };

  return (
    <Chip
      label="Clear All"
      onClick={handleClearChips}
      sx={{
        marginTop: '1rem',
        backgroundColor: '#f44336',
        color: 'white',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#d32f2f',
        },
      }}
    />
  );
};

const FilteringBox = ({ uniqueTools, selectedChips, setSelectedChips }) => {
  const props = { uniqueTools, selectedChips, setSelectedChips };

  return (
    <Box
      sx={{
        padding: '1rem',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" alignItems="center" gap={1}>
        {uniqueTools.map((tool) => (
          <TechnologyChip key={tool} tool={tool} {...props} />
        ))}
      </Stack>

      {selectedChips.size > 0 && <ClearAllChip {...props} />}
    </Box>
  );
};

export default FilteringBox;
