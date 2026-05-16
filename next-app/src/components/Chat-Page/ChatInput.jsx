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
        border: '1px solid rgba(240,237,230,0.12)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        '&:hover': { borderColor: 'rgba(245,158,11,0.4)' },
        '&:focus-within': { borderColor: '#f59e0b' },
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
          color: '#f0ede6',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          '& input::placeholder': { color: 'rgba(240,237,230,0.35)' },
        }}
      />
      <IconButton
        type="submit"
        disabled={!input.trim() || disabled}
        sx={{
          ml: 1,
          background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
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
