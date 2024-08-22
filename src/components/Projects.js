import React from 'react';

const Projects = () => {
  return (
    <section id="projects">
      <h2>My Projects</h2>
      <div className="project">
        <h3>Nature Nomads</h3>
        <p>An e-commerce platform for booking nature tours. Built with Node.js, Express, MongoDB, and more.</p>
        <a href="https://github.com/davidjriva/nodejs_projects/tree/main/nature-nomads" target="_blank" rel="noopener noreferrer">
          View Project
        </a>
      </div>
      {/* Add more projects as needed */}
    </section>
  );
};

export default Projects;
