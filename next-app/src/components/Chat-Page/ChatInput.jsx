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
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'rgba(255,255,255,0.15)' },
        '&:focus-within': { borderColor: 'rgba(59,130,246,0.4)' },
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
          fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
          '& input::placeholder': { color: '#52525b' },
        }}
      />
      <IconButton
        type="submit"
        disabled={!input.trim() || disabled}
        sx={{
          width: 32,
          height: 32,
          borderRadius: '10px',
          background: input.trim() && !disabled ? '#3b82f6' : 'rgba(255,255,255,0.06)',
          transition: 'all 0.2s ease',
          '&:hover': { background: '#2563eb' },
          '&.Mui-disabled': { background: 'rgba(255,255,255,0.04)' },
        }}
      >
        <ArrowUpwardIcon sx={{ color: input.trim() && !disabled ? '#fff' : '#52525b', fontSize: '1rem' }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
