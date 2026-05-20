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
        backgroundColor: 'rgba(0, 212, 255, 0.08)',
        border: '1px solid rgba(0, 212, 255, 0.25)',
        borderRadius: '12px',
        padding: '10px 20px',
        color: '#00d4ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 600,
        boxShadow: 'none',
        transition: 'all 0.25s ease',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'rgba(0, 212, 255, 0.15)',
          borderColor: '#00d4ff',
        },
      }}
    >
      <Typography
        sx={{
          color: '#00d4ff',
          fontSize: { xs: '0.85rem', sm: '0.9rem' },
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
