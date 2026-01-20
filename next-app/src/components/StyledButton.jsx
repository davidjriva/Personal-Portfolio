import { Button, Typography } from '@mui/material';

const StyledButton = ({ href, onClick, text, icon, component }) => {
  return (
    <Button
      onClick={onClick}
      href={href}
      component={component}
      sx={{
        marginTop: '20px',
        backgroundColor: 'rgba(10, 115, 201, 0.15)',
        border: '2px solid #38c0f2',
        borderRadius: '50px',
        padding: '12px 24px',
        color: '#38c0f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontWeight: 'bold',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'rgba(10, 115, 201, 0.3)',
          transform: 'scale(1.05)',
          boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Typography
        sx={{
          color: '#38c0f2',
          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
          fontWeight: '500',
        }}
      >
        {text}
      </Typography>
      {icon}
    </Button>
  );
};

export default StyledButton;