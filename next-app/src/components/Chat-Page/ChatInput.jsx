import { InputBase, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = ({ input, setInput, sendMessage, disabled = false }) => {
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
        backgroundColor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(56,192,242,0.3)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        '&:hover': { borderColor: 'rgba(56,192,242,0.6)' },
        '&:focus-within': { borderColor: '#38c0f2' },
      }}
    >
      <InputBase
        placeholder="Ask anything…"
        value={input}
        disabled={disabled}
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
          '& input::placeholder': { color: 'rgba(255,255,255,0.35)' },
        }}
      />
      <IconButton
        type="submit"
        disabled={!input.trim() || disabled}
        sx={{
          ml: 1,
          background: 'linear-gradient(135deg, #38c0f2, #6e40c9)',
          '&:hover': { opacity: 0.85 },
          '&.Mui-disabled': { background: 'rgba(255,255,255,0.08)' },
        }}
      >
        <SendIcon sx={{ color: '#fff', fontSize: '1.1rem' }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
