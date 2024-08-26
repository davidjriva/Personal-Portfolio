import { useState, useEffect } from 'react';

const filterByUniqueProjects = ({ projectData }) => {
  const allTools = projectData.flatMap((project) => project.technologies.flatMap((tech) => tech.tools));
  const uniqueTools = [...new Set(allTools)];

  return uniqueTools;
};

const filterBySelectedChips = ({ selectedChips, projectData }) => {
  return projectData.filter((project) => {
    if (selectedChips.size === 0) return true; // Show all projects if no chips are selected
    return Array.from(selectedChips).some(
      (selectedChip) => project.technologies.flatMap((tech) => tech.tools).includes(selectedChip) // Assuming project.technologies is an array of technology objects containing tools
    );
  });
};

const useProjectFilter = (projectData, setFilteredProjects) => {
  const [searchText, setSearchText] = useState('');
  const [selectedChips, setSelectedChips] = useState(new Set());

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
