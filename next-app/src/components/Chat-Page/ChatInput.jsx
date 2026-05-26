import { InputBase, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = ({ input, setInput, sendMessage, disabled = false, placeholder = 'Ask anything...' }) => {
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
        borderRadius: '14px',
        bgcolor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        '&:hover': { borderColor: 'rgba(255,255,255,0.12)' },
        '&:focus-within': { borderColor: 'rgba(99, 102, 241, 0.4)' },
        transition: 'border-color 0.2s ease',
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
          color: '#ededf0',
          fontSize: '0.9rem',
          '& input::placeholder': { color: 'rgba(255,255,255,0.3)' },
        }}
      />
      <IconButton
        type="submit"
        disabled={!input.trim() || disabled}
        sx={{
          ml: 1,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          width: 34,
          height: 34,
          '&:hover': { opacity: 0.85 },
          '&.Mui-disabled': { background: 'rgba(255,255,255,0.06)' },
        }}
      >
        <SendIcon sx={{ color: '#fff', fontSize: '1rem' }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
