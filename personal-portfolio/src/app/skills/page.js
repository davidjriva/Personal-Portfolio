import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import SkillCard from '../../components/Skills/SkillCard';
import skillsData from '../../data/skills.json';

const Skills = () => {
  return (
    <Box sx={{ padding: '2rem', color: '#757474' }}>
      <Typography variant="h4" sx={{ marginBottom: 6, color: '#000', textAlign: 'center' }}>
        Skills
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.6 }}>
        {skillsData.map((skill, index) => (
          <React.Fragment key={skill.title}>
            <SkillCard {...skill} />
            {index < skillsData.length - 1 && <Divider sx={{ margin: '1rem 0' }} />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Skills;
