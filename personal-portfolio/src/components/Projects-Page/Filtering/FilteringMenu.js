import { Divider, Typography } from '@mui/material';
import SearchBar from '../SearchBar';
import FilteringBox from './FilteringChips';

const FilteringMenu = ({ projectData, searchText, setSearchText, selectedChips, setSelectedChips, uniqueTools }) => {
  return (
    <>
      <Divider sx={{ margin: '2rem', backgroundColor: 'lightgray' }} />

      <SearchBar
        projectNames={projectData.map((project) => project.title)}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <Divider sx={{ margin: '2rem', backgroundColor: 'lightgray' }} />

      <Typography variant="h6" sx={{ color: 'lightgray' }}>
        Filter by technology
      </Typography>

      <FilteringBox uniqueTools={uniqueTools} selectedChips={selectedChips} setSelectedChips={setSelectedChips} />

      <Divider sx={{ margin: '2rem', backgroundColor: 'lightgray' }} />
    </>
  );
};

export default FilteringMenu;
