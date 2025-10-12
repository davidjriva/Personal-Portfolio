import React from 'react';
import { Box, Divider } from '@mui/material';
import SkillCard from './SkillCard';
import SkillCardContainer from '@/components/Skills-Page/SkillCardContainer';
import SectionHeading from '@/components/SectionHeading';

export const metadata = {
  title: 'David Riva | Skills',
};

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    fetch('/data/skills.json')
      .then((res) => res.json())
      .then((data) => setSkillsData(data));
  }, []);

  return (
    <Box
      sx={{
        marginTop: 10,
        padding: '5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#565859',
        borderTop: '8px solid rgba(0,0,0,0.1)',
        boxShadow: '0px 1px 0px rgba(255,255,255,0.2)',
      }}
    >
      <SectionHeading sectionName="Skills" />

      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
        {skillsData.map((skill, index) => (
          <React.Fragment key={skill.title}>
            <SkillCardContainer {...skill} />
            {index < skillsData.length - 1 && <Divider sx={{ margin: '1rem 0', backgroundColor: 'lightgray' }} />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Skills;
