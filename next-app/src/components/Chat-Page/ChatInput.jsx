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
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'none',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'rgba(255,255,255,0.12)' },
        '&:focus-within': { borderColor: 'rgba(110, 182, 240, 0.3)' },
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
          fontFamily: 'inherit',
          '& input::placeholder': { color: 'rgba(255,255,255,0.25)' },
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
          background: input.trim() && !disabled ? '#e8e6e3' : 'rgba(255,255,255,0.06)',
          transition: 'all 0.2s ease',
          '&:hover': { background: '#fff' },
          '&.Mui-disabled': { background: 'rgba(255,255,255,0.04)' },
        }}
      >
        <ArrowUpwardIcon
          sx={{
            color: input.trim() && !disabled ? '#0a0a0f' : 'rgba(255,255,255,0.15)',
            fontSize: '1rem',
          }}
        />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
