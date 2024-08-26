import { useState, useEffect } from 'react';
import { Divider, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import FilteringBox from './FilteringChips';
import { useFilter } from './useFilter';
import ProjectCards from './ProjectCards';

const FilteringMenu = ({ projectData }) => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedChips, setSelectedChips] = useState(new Set());

  const { filterByUniqueProjects, filterBySelectedChips } = useFilter();

  // Extract project names
  const projectNames = projectData.map((project) => project.title);

  // Extracts the unique tools used across all projects
  const uniqueTools = filterByUniqueProjects({ projectData });

  // Filter projects based on selected chips
  const chipFilteredProjects = filterBySelectedChips({ selectedChips, projectData });

  // Update filtered projects whenever search text or selected chips change
  useEffect(() => {
    const searchedProjects = chipFilteredProjects.filter((project) =>
      project.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProjects(searchedProjects);
  }, [searchText, selectedChips, chipFilteredProjects]);

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

      <ProjectCards filteredProjects={filteredProjects} />
    </>
  );
};

export default FilteringMenu;
