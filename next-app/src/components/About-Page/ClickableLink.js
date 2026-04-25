'use client';

const ClickableLink = ({ link, text }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#38bdf8',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
      }}
      onMouseOver={(e) => (e.currentTarget.style.color = '#7dd3fc')}
      onMouseOut={(e) => (e.currentTarget.style.color = '#38bdf8')}
    >
      {text}
    </a>
  );
};

export default ClickableLink;
