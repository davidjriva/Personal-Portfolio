import { Box, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';

const MessageItem = ({ msg }) => {
    const isUser = msg.role === 'user';

    const typographyStyles = {
      fontFamily: 'var(--font-montserrat), Arial, sans-serif',
      fontWeight: 400,
      lineHeight: 1.6,
      fontSize: '1rem !important',
      color: '#fff',
      marginBottom: '4px',
    };

    return (
      <Box sx={{ mb: 1, backgroundColor: isUser ? '#3a3a3a' : '#444', p: 1, borderRadius: 1 }}>
        <Typography variant="subtitle2" sx={{ color: isUser ? '#90caf9' : '#f48fb1', mb: 0.5 }}>
          {msg.role}:
        </Typography>
        {msg.role === 'assistant' ? (
          <ReactMarkdown
          children={msg.text}
          components={{
            p: ({ node, ...props }) => <Typography variant="body1" sx={typographyStyles} {...props} />,
            li: ({ node, ...props }) => <li style={{ ...typographyStyles, marginBottom: '6px' }} {...props} />,
            strong: ({ node, ...props }) => <strong style={{ ...typographyStyles, fontWeight: 700 }} {...props} />,
            em: ({ node, ...props }) => <em style={typographyStyles} {...props} />,
            h1: ({ node, ...props }) => (
              <Typography variant="h3" sx={{ ...typographyStyles, fontWeight: 700, fontSize: '1.8rem', mt: 2, mb: 1 }} {...props} />
            ),
            h2: ({ node, ...props }) => (
              <Typography variant="h4" sx={{ ...typographyStyles, fontWeight: 700, fontSize: '1.6rem', mt: 2, mb: 1 }} {...props} />
            ),
            h3: ({ node, ...props }) => (
              <Typography variant="h5" sx={{ ...typographyStyles, fontWeight: 700, fontSize: '1.4rem', mt: 1.5, mb: 1 }} {...props} />
            ),
            h4: ({ node, ...props }) => (
              <Typography variant="h6" sx={{ ...typographyStyles, fontWeight: 700, fontSize: '1.2rem', mt: 1, mb: 0.8 }} {...props} />
            ),
            h5: ({ node, ...props }) => (
              <Typography sx={{ ...typographyStyles, fontWeight: 700, fontSize: '1.1rem', mt: 1, mb: 0.6 }} {...props} />
            ),
            h6: ({ node, ...props }) => (
              <Typography sx={{ ...typographyStyles, fontWeight: 700, fontSize: '1rem', mt: 1, mb: 0.5 }} {...props} />
            ),
            code: ({ node, inline, className, ...props }) => (
              <Box
                component="code"
                sx={{
                  fontFamily: 'monospace',
                  color: '#fff',
                  backgroundColor: '#333',
                  p: inline ? '0 4px' : 1,
                  borderRadius: 1,
                  display: inline ? 'inline' : 'block',
                  overflowX: 'auto',
                }}
                {...props}
              />
            ),
            pre: ({ node, ...props }) => (
              <Box
                component="pre"
                sx={{
                  backgroundColor: '#333',
                  color: '#fff',
                  p: 1,
                  borderRadius: 1,
                  overflowX: 'auto',
                }}
                {...props}
              />
            ),
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