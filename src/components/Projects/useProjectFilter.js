import { useState, useEffect } from 'react';
import { useFilter } from './useFilter';

const useProjectFilter = (projectData, setFilteredProjects) => {
  const [searchText, setSearchText] = useState('');
  const [selectedChips, setSelectedChips] = useState(new Set());

  const { filterByUniqueProjects, filterBySelectedChips } = useFilter();

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
  }, [searchText, selectedChips, chipFilteredProjects, setFilteredProjects]);

  return {
    searchText,
    setSearchText,
    selectedChips,
    setSelectedChips,
    uniqueTools,
  };
};

export default useProjectFilter;
