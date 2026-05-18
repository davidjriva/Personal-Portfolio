'use client';

const ClickableLink = ({ link, text }) => {
  return (
    <a
      href={link}
      target="_blank"
      style={{
        color: '#818cf8',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
      }}
      onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
      onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
    >
      {text}
    </a>
  );
};

export default ClickableLink;
