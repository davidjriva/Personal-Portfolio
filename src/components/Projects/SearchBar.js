import { Autocomplete, TextField } from '@mui/material';

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
            },
          }}
        />
      )}
    />
  );
};

export default SearchBar;
