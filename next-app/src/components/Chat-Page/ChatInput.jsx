import { Box, TextField, Button } from '@mui/material';

const ChatInput = ({ input, setInput, sendMessage }) => {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          sx={{
            input: { color: '#fff' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#555' },
              '&:hover fieldset': { borderColor: '#888' },
              '&.Mui-focused fieldset': { borderColor: '#90caf9' },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          disabled={!input.trim()}
          sx={{ backgroundColor: '#90caf9', color: '#000', '&:hover': { backgroundColor: '#64b5f6' } }}
        >
          Send
        </Button>
      </Box>
    );
};

export default ChatInput;