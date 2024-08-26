import { useState, useEffect } from 'react';
import FilteringMenu from './FilteringMenu';
import ProjectCards from './ProjectCards';
import { useFilter } from './useFilter';

const ProjectsContainer = ({ projectData }) => {
  const [filteredProjects, setFilteredProjects] = useState([]);
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
  }, [searchText, selectedChips, chipFilteredProjects]);

  return (
    <>
      <FilteringMenu
        projectData={projectData}
        searchText={searchText}
        setSearchText={setSearchText}
        selectedChips={selectedChips}
        setSelectedChips={setSelectedChips}
        uniqueTools={uniqueTools}
      />

      <ProjectCards filteredProjects={filteredProjects} />
    </>
  );
};

export default ProjectsContainer;
