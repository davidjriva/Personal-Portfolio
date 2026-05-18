import { Button, Typography } from '@mui/material';

const StyledButton = ({ href, onClick, text, icon, component, ...props }) => {
  return (
    <Button
      onClick={onClick}
      href={href}
      component={component}
      {...props}
      sx={{
        mt: 2,
        backgroundColor: 'rgba(129, 140, 248, 0.08)',
        border: '1px solid rgba(129, 140, 248, 0.3)',
        borderRadius: '12px',
        padding: '10px 24px',
        color: '#818cf8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 600,
        textTransform: 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(129, 140, 248, 0.12)',
          borderColor: 'rgba(129, 140, 248, 0.5)',
        },
      }}
    >
      <Typography
        sx={{
          color: '#818cf8',
          fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
          fontWeight: 500,
        }}
      >
        {text}
      </Typography>
      {icon}
    </Button>
  );
};

export default StyledButton;
