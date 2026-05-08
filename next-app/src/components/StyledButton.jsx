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
        border: '1px solid rgba(129, 140, 248, 0.25)',
        borderRadius: '10px',
        padding: '10px 24px',
        color: '#A5B4FC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 500,
        transition: 'all 0.25s ease',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'rgba(129, 140, 248, 0.15)',
          borderColor: 'rgba(129, 140, 248, 0.5)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Typography
        sx={{
          color: 'inherit',
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
