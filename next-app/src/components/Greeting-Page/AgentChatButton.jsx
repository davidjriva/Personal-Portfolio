import { redirect } from 'next/navigation';

import { Button, Typography } from '@mui/material';
import AssistantIcon from '@mui/icons-material/Assistant';

const AgentChatButton = () => {
  return (
    <Button
      onClick={() => redirect("/chat")}
      sx={{
        marginTop: '20px',
        backgroundColor: 'rgba(10, 115, 201, 0.25)',
        border: '2px solid #38c0f2',
        borderRadius: '30px',
        padding: '10px 20px',
        color: '#38c0f2',
        display: 'flex',
        alignItems: 'center',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'rgba(10, 115, 201, 0.5)',
        },
      }}
    >
      <Typography
        sx={{
          color: '#38c0f2',
          fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
        }}
      >
        Chat with my agent
      </Typography>
      <AssistantIcon sx={{ marginLeft: '8px', fontSize: '20px' }} />
    </Button>
  );
}

export default AgentChatButton;