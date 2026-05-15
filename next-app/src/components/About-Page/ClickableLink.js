'use client';

const ClickableLink = ({ link, text }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#d4a053',
        textDecoration: 'none',
        borderBottom: '1px solid transparent',
        transition: 'border-color 0.2s ease',
      }}
      onMouseOver={(e) => (e.currentTarget.style.borderBottomColor = '#d4a053')}
      onMouseOut={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
    >
      {text}
    </a>
  );
};

export default ClickableLink;
