import { useState } from 'react';
import FilteringMenu from './Filtering/FilteringMenu';
import ProjectCards from './ProjectCards';
import useProjectFilter from './Filtering/useProjectFilter';

const ProjectsContainer = ({ projectData }) => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { searchText, setSearchText, selectedChips, setSelectedChips, uniqueTools } = useProjectFilter(
    projectData,
    setFilteredProjects
  );

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
