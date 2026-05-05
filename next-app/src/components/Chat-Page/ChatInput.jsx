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
        p: '6px 10px',
        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'rgba(255, 255, 255, 0.14)' },
        '&:focus-within': { borderColor: 'rgba(232, 168, 56, 0.4)' },
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
          color: '#f0ede8',
          fontSize: '0.9rem',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          '& input::placeholder': { color: 'rgba(240, 237, 232, 0.3)' },
        }}
      />
      <IconButton
        type="submit"
        disabled={!input.trim() || disabled}
        sx={{
          ml: 1,
          width: 32,
          height: 32,
          background: '#e8a838',
          borderRadius: '8px',
          '&:hover': { background: '#d4922a' },
          '&.Mui-disabled': { background: 'rgba(255, 255, 255, 0.04)' },
        }}
      >
        <SendIcon sx={{ color: '#0a0a0b', fontSize: '0.95rem' }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
