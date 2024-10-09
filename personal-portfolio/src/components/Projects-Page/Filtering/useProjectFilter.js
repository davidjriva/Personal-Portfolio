'use client';

import { useState, useEffect, useMemo } from 'react';

const filterByUniqueProjects = ({ projectData }) => {
  const allTools = projectData.flatMap((project) => project.technologies.flatMap((tech) => tech.tools));
  const uniqueTools = [...new Set(allTools)];
  return uniqueTools;
};

const filterBySelectedChips = ({ selectedChips, projectData }) => {
  return projectData.filter((project) => {
    if (selectedChips.size === 0) return true;
    return Array.from(selectedChips).some((selectedChip) =>
      project.technologies.flatMap((tech) => tech.tools).includes(selectedChip)
    );
  });
};

const useProjectFilter = (projectData, setFilteredProjects) => {
  const [searchText, setSearchText] = useState('');
  const [selectedChips, setSelectedChips] = useState(new Set());

  const uniqueTools = filterByUniqueProjects({ projectData });

  const chipFilteredProjects = useMemo(
    () => filterBySelectedChips({ selectedChips, projectData }),
    [selectedChips, projectData]
  );

  useEffect(() => {
    const searchedProjects = chipFilteredProjects.filter((project) =>
      project.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProjects(searchedProjects);
  }, [searchText, chipFilteredProjects, setFilteredProjects]);

  return {
    searchText,
    setSearchText,
    selectedChips,
    setSelectedChips,
    uniqueTools,
  };
};

export default useProjectFilter;
