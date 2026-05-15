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
        backgroundColor: 'rgba(232, 230, 227, 0.03)',
        border: '1px solid rgba(232, 230, 227, 0.08)',
        boxShadow: 'none',
        transition: 'border-color 0.25s ease',
        '&:hover': { borderColor: 'rgba(232, 230, 227, 0.14)' },
        '&:focus-within': { borderColor: 'rgba(212, 160, 83, 0.4)' },
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
          color: '#e8e6e3',
          fontSize: '0.9rem',
          fontFamily: 'var(--font-inter), sans-serif',
          '& input::placeholder': { color: 'rgba(232, 230, 227, 0.25)', opacity: 1 },
        }}
      />
      <IconButton
        type="submit"
        disabled={!input.trim() || disabled}
        sx={{
          width: 32,
          height: 32,
          borderRadius: '10px',
          bgcolor: '#d4a053',
          ml: 1,
          '&:hover': { bgcolor: '#e8c07a' },
          '&.Mui-disabled': { bgcolor: 'rgba(232, 230, 227, 0.05)' },
        }}
      >
        <ArrowUpwardIcon sx={{ color: '#0c0c0e', fontSize: '1rem' }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
