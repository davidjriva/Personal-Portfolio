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
        borderRadius: '999px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'rgba(129, 140, 248, 0.3)' },
        '&:focus-within': { borderColor: 'rgba(129, 140, 248, 0.5)' },
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
          color: '#fafafa',
          fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
          fontSize: '0.9rem',
          '& input::placeholder': { color: 'rgba(255, 255, 255, 0.25)' },
        }}
      />
      <IconButton
        type="submit"
        disabled={!input.trim() || disabled}
        sx={{
          ml: 0.5,
          width: 34,
          height: 34,
          background: 'linear-gradient(135deg, #818cf8, #c084fc)',
          borderRadius: '50%',
          '&:hover': { opacity: 0.85 },
          '&.Mui-disabled': { background: 'rgba(255, 255, 255, 0.05)' },
        }}
      >
        <SendIcon sx={{ color: '#fff', fontSize: '0.95rem' }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
