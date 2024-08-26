import React from 'react';
import FilteringMenu from './FilteringMenu';
import ProjectCards from './ProjectCards';
import useProjectFilter from './useProjectFilter';

const ProjectsContainer = ({ projectData }) => {
  const { filteredProjects, searchText, setSearchText, selectedChips, setSelectedChips, uniqueTools } =
    useProjectFilter(projectData);

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
