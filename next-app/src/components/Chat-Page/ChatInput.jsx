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
        p: '5px 8px',
        borderRadius: '999px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(16px)',
        boxShadow: 'none',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'rgba(255, 255, 255, 0.14)' },
        '&:focus-within': { borderColor: 'rgba(99, 102, 241, 0.5)' },
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
          ml: 1.5,
          flex: 1,
          color: '#f4f4f5',
          fontSize: '0.9rem',
          fontFamily: 'var(--font-montserrat), Arial, sans-serif',
          '& input::placeholder': { color: 'rgba(255, 255, 255, 0.3)' },
        }}
      />
      <IconButton
        type="submit"
        disabled={!input.trim() || disabled}
        sx={{
          ml: 0.5,
          width: 36,
          height: 36,
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          transition: 'opacity 0.2s',
          '&:hover': { opacity: 0.85 },
          '&.Mui-disabled': { background: 'rgba(255, 255, 255, 0.06)' },
        }}
      >
        <SendIcon sx={{ color: '#fff', fontSize: '1rem' }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
