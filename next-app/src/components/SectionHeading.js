import { Typography } from '@mui/material';

const SectionHeading = ({ sectionName }) => {
  return (
    <Typography
      variant="h2"
      sx={{
        marginTop: 0,
        marginBottom: '80px',
        textShadow: '3px 3px #011627',
        color: '#FFF',
        fontSize: '3rem',
        '& span': {
          display: 'inline-block',
          backgroundSize: '100% 1.2em',
          backgroundPosition: '0.5em 0px',
          backgroundRepeat: 'no-repeat space',
          paddingRight: '.8em',
          marginRight: '-0.5em',
          backgroundImage: 'linear-gradient(transparent 55%, #38c0f2 55%, #38c0f2 95%, transparent 95%)',
        },
      }}
    >
      <span>{sectionName}</span>
    </Typography>
  );
};

export default SectionHeading;
