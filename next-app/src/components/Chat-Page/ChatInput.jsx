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
        backgroundColor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'none',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'rgba(255,255,255,0.15)' },
        '&:focus-within': { borderColor: 'rgba(167,139,250,0.5)' },
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
          color: '#fafafa',
          fontSize: '0.85rem',
          fontFamily: 'inherit',
          '& input::placeholder': { color: 'rgba(255,255,255,0.3)' },
        }}
      />
      <IconButton
        type="submit"
        disabled={!input.trim() || disabled}
        sx={{
          ml: 0.5,
          width: 32,
          height: 32,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
          '&:hover': { opacity: 0.85 },
          '&.Mui-disabled': { background: 'rgba(255,255,255,0.06)' },
        }}
      >
        <SendIcon sx={{ color: '#09090b', fontSize: '0.9rem' }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
