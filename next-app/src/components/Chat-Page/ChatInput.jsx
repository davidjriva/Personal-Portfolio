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
        p: '6px 6px 6px 16px',
        borderRadius: '14px',
        backgroundColor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'rgba(255,255,255,0.15)' },
        '&:focus-within': { borderColor: 'rgba(56,189,248,0.4)' },
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
          flex: 1,
          color: '#fafafa',
          fontSize: '0.9rem',
          '& input::placeholder': { color: '#52525b', opacity: 1 },
        }}
      />
      <IconButton
        type="submit"
        disabled={!input.trim() || disabled}
        sx={{
          width: 32,
          height: 32,
          borderRadius: '10px',
          background: 'rgba(56,189,248,0.15)',
          border: '1px solid rgba(56,189,248,0.25)',
          transition: 'all 0.2s ease',
          '&:hover': { background: 'rgba(56,189,248,0.25)' },
          '&.Mui-disabled': { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' },
        }}
      >
        <ArrowUpwardIcon sx={{ color: '#38bdf8', fontSize: '1rem' }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
