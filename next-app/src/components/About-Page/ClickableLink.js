"use client";

const ClickableLink = ({link, company}) => {
  return (
    <a
      href={link}
      target="_blank"
      style={{ color: '#38c0f2', textDecoration: 'none' }}
      onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
      onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
    >
      {company}
    </a>
  );
};

export default ClickableLink;
