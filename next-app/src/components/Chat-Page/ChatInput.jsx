import { Box, InputBase, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = ({ input, setInput, sendMessage }) => {
  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: '4px 8px',
        borderRadius: '999px',
        backgroundColor: '#2c2c2c',
        border: '1px solid #555',
        '&:hover': { borderColor: '#90caf9' },
      }}
    >
      <InputBase
        placeholder="Ask anything"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
          }
        }}
        sx={{
          ml: 1,
          flex: 1,
          color: '#fff',
          fontFamily: 'var(--font-montserrat), Arial, sans-serif',
        }}
      />
      <IconButton
        type="submit"
        color="primary"
        disabled={!input.trim()}
        sx={{
          ml: 1,
          backgroundColor: '#90caf9',
          '&:hover': { backgroundColor: '#64b5f6' },
        }}
      >
        <SendIcon sx={{ color: '#fff' }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
