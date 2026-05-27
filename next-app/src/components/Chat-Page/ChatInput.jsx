import { InputBase, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = ({ input, setInput, sendMessage, disabled = false, placeholder = 'Ask anything…' }) => {
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
        border: '1px solid rgba(129,140,248,0.25)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        '&:hover': { borderColor: 'rgba(129,140,248,0.5)' },
        '&:focus-within': { borderColor: '#818cf8' },
      }}
    >
      <InputBase
        placeholder={placeholder}
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
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          '& input::placeholder': { color: 'rgba(255,255,255,0.35)' },
        }}
      />
      <IconButton
        type="submit"
        disabled={!input.trim() || disabled}
        sx={{
          ml: 1,
          background: 'linear-gradient(135deg, #6366f1, #818cf8)',
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
