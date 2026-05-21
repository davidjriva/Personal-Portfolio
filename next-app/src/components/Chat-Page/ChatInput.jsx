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
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'none',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'rgba(255,255,255,0.12)' },
        '&:focus-within': { borderColor: 'rgba(167,139,250,0.4)' },
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
          color: '#e8e6e3',
          fontSize: '0.9rem',
          fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
          '& input::placeholder': { color: 'rgba(255,255,255,0.25)' },
        }}
      />
      <IconButton
        type="submit"
        disabled={!input.trim() || disabled}
        sx={{
          ml: 0.5,
          width: 34,
          height: 34,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
          '&:hover': { opacity: 0.85 },
          '&.Mui-disabled': { background: 'rgba(255,255,255,0.04)' },
        }}
      >
        <SendIcon sx={{ color: '#fff', fontSize: '0.95rem' }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
