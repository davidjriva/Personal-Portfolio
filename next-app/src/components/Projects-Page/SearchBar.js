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
                borderColor: 'lightgray',
              },
              '&:hover fieldset': {
                borderColor: 'lightgray',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'lightgray',
              },
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white',
              '&.Mui-focused': {
                color: 'white',
              },
            },
          }}
        />
      )}
      PaperComponent={(props) => <Paper {...props} sx={{ backgroundColor: '#282829', color: 'lightgray' }} />}
    />
  );
};

export default SearchBar;
