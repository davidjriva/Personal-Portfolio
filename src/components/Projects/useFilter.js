export const useFilter = () => {
  const filterByUniqueProjects = ({ sortedProjectData }) => {
    const allTools = sortedProjectData.flatMap((project) => project.technologies.flatMap((tech) => tech.tools));
    const uniqueTools = [...new Set(allTools)];

    return uniqueTools;
  };

  const filterBySelectedChips = ({ selectedChips, sortedProjectData }) => {
    return sortedProjectData.filter((project) => {
      if (selectedChips.size === 0) return true; // Show all projects if no chips are selected
      return Array.from(selectedChips).some(
        (selectedChip) => project.technologies.flatMap((tech) => tech.tools).includes(selectedChip) // Assuming project.technologies is an array of technology objects containing tools
      );
    });
  };

  return {
    filterByUniqueProjects,
    filterBySelectedChips,
  };
};

export default useFilter;
