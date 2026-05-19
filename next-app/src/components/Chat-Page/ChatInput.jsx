import { InputBase, IconButton, Paper } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
        p: '6px 8px',
        borderRadius: '14px',
        backgroundColor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: 'none',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'rgba(255,255,255,0.2)' },
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
          fontSize: '0.9rem',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          '& input::placeholder': { color: 'rgba(255,255,255,0.3)' },
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
          background: '#818cf8',
          transition: 'all 0.15s ease',
          '&:hover': { background: '#6366f1' },
          '&.Mui-disabled': { background: 'rgba(255,255,255,0.06)' },
        }}
      >
        <ArrowUpwardIcon sx={{ color: '#fff', fontSize: '1rem' }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
