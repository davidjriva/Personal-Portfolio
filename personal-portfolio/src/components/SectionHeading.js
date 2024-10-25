'use client';

const SectionHeading = ({ sectionName }) => {
  return (
    <h2
      style={{
        marginTop: '0px',
        marginBottom: '8px',
        textShadow: '3px 3px #011627',
        fontFamily: 'sans-serif',
        color: '#FFF',
        fontSize: '8rem',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          backgroundSize: '100% 1.2em',
          backgroundPosition: '0.5em 0px',
          backgroundRepeat: 'no-repeat space',
          paddingRight: '.8em',
          marginRight: '-0.5em',
          backgroundImage: 'linear-gradient(transparent 55%, #38c0f2  55%, #38c0f2 95%, transparent 95%)',
        }}
      >
        {sectionName}
      </span>
    </h2>
  );
};

export default SectionHeading;
