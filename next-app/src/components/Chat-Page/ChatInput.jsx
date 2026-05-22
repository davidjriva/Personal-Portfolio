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
        p: '4px 6px 4px 16px',
        borderRadius: '14px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'rgba(255, 255, 255, 0.12)' },
        '&:focus-within': { borderColor: 'rgba(56, 192, 242, 0.3)' },
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
          fontFamily: 'inherit',
          fontSize: '0.9rem',
          '& input::placeholder': { color: '#52525b' },
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
          background: 'linear-gradient(135deg, #38c0f2, #8b5cf6)',
          transition: 'opacity 0.2s ease',
          '&:hover': { opacity: 0.85 },
          '&.Mui-disabled': { background: 'rgba(255, 255, 255, 0.05)', opacity: 0.5 },
        }}
      >
        <ArrowUpwardIcon sx={{ color: '#fff', fontSize: '1rem' }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
