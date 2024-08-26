import { Divider, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import FilteringBox from './FilteringChips';

const FilteringMenu = ({ projectNames, searchText, setSearchText, uniqueTools, selectedChips, setSelectedChips }) => {
  return (
    <>
      <Divider sx={{ margin: '2rem' }} />

      <SearchBar projectNames={projectNames} searchText={searchText} setSearchText={setSearchText} />

      <Divider sx={{ margin: '2rem' }} />

      <Typography variant="h6" sx={{ color: '#333' }}>
        Filter by technology
      </Typography>

      <FilteringBox uniqueTools={uniqueTools} selectedChips={selectedChips} setSelectedChips={setSelectedChips} />

      <Divider sx={{ margin: '2rem' }} />
    </>
  );
};

export default FilteringMenu;
