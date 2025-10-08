import { Box, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';

const MessageItem = ({ msg }) => {
    const isUser = msg.role === 'user';
    return (
      <Box sx={{ mb: 1, backgroundColor: isUser ? '#3a3a3a' : '#444', p: 1, borderRadius: 1 }}>
        <Typography variant="subtitle2" sx={{ color: isUser ? '#90caf9' : '#f48fb1', mb: 0.5 }}>
          {msg.role}:
        </Typography>
        {msg.role === 'assistant' ? (
          <ReactMarkdown
            children={msg.text}
            components={{
              p: ({ node, ...props }) => <Typography variant="body1" sx={{ color: '#fff', mb: 0.5 }} {...props} />,
              li: ({ node, ...props }) => <li style={{ color: '#fff', marginBottom: '4px' }} {...props} />,
              strong: ({ node, ...props }) => <strong style={{ color: '#fff' }} {...props} />,
              em: ({ node, ...props }) => <em style={{ color: '#fff' }} {...props} />,
            }}
          />
        ) : (
          <Typography variant="body1" sx={{ color: '#fff' }}>
            {msg.text}
          </Typography>
        )}
      </Box>
    );
}

export default MessageItem;