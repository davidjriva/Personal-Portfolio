import { Button } from '@mui/material';

const StyledButton = ({ href, onClick, text, icon, component, ...props }) => {
  return (
    <Button
      onClick={onClick}
      href={href}
      component={component}
      {...props}
      sx={{
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        border: '1px solid rgba(59, 130, 246, 0.25)',
        borderRadius: '10px',
        padding: '10px 20px',
        color: '#3b82f6',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: 600,
        fontSize: '0.85rem',
        letterSpacing: '0.02em',
        transition: 'all 0.2s ease',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'rgba(59, 130, 246, 0.15)',
          borderColor: 'rgba(59, 130, 246, 0.5)',
        },
      }}
    >
      {text}
      {icon}
    </Button>
  );
};

export default StyledButton;
