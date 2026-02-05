import { Autocomplete, TextField, Paper } from '@mui/material';

const SearchBar = ({ projectNames, searchText, setSearchText }) => {
  return (
    <Autocomplete
      options={projectNames}
      onInputChange={(_, value) => setSearchText(value)}
      value={searchText || null}
      isOptionEqualToValue={(option, value) => option.toLowerCase().includes(value.toLowerCase())}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter A Project Name..."
          sx={{
            borderRadius: '200px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '200px',
              backgroundColor: 'transparent',
              '& fieldset': {
                borderColor: 'text.secondary',
              },
              '&:hover fieldset': {
                borderColor: 'text.primary',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'text.primary',
              },
            },
            '& .MuiInputBase-input': {
              color: 'text.primary',
            },
            '& .MuiInputLabel-root': {
              color: 'text.secondary',
              '&.Mui-focused': {
                color: 'text.primary',
              },
            },
          }}
        />
      )}
      PaperComponent={(props) => <Paper {...props} sx={{ bgcolor: 'background.paper', color: 'text.primary' }} />}
    />
  );
};

export default SearchBar;
