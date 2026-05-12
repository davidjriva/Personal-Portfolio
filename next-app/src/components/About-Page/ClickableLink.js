'use client';

const ClickableLink = ({ link, text }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener"
      style={{
        color: '#3b82f6',
        textDecoration: 'none',
        transition: 'opacity 0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
      onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
    >
      {text}
    </a>
  );
};

export default ClickableLink;
