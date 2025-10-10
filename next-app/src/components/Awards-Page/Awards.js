import React from 'react';
import { Box, Divider } from '@mui/material';
import AwardCard from './AwardCard';
import SectionHeading from '@/components/SectionHeading';

export const metadata = {
  title: 'David Riva | Awards',
};

const Awards = () => {
  const [awardsData, setAwardsData] = useState([]);

  useEffect(() => {
    fetch('/data/awards.json')
      .then((res) => res.json())
      .then((data) => setAwardsData(data));
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem',
        position: 'relative',
        borderTop: '8px solid rgba(0,0,0,0.1)',
        boxShadow: '0px 1px 0px rgba(255,255,255,0.2)',
      }}
    >
      <SectionHeading sectionName="Awards" />

      <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.6 }}>
        {awardsData.map((award, index) => (
          <React.Fragment key={award.title}>
            <AwardCard {...award} />
            {index < awardsData.length - 1 && <Divider sx={{ backgroundColor: 'lightgray' }} />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Awards;
