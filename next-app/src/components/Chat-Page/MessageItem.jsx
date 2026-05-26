import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import BouncingDotsLoadingAnimation from '@/components/Chat-Page/BouncingDotsLoadingAnimation';

const MessageItem = ({ msg }) => {
  const isUser = msg.role === 'user';
  const showDots = msg.role === 'assistant' && (!msg.text || msg.text.length === 0);

  const mdStyles = {
    fontWeight: 400,
    lineHeight: 1.7,
    fontSize: '0.9rem',
    color: '#ededf0',
    marginBottom: '4px',
  };

  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <Box
        sx={{
          maxWidth: '85%',
          px: 2.5,
          py: 1.5,
          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          bgcolor: isUser ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.04)',
          border: isUser ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {msg.role === 'assistant' ? (
          showDots ? (
            <Box sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
              <BouncingDotsLoadingAnimation dotSize={8} dotColor="#6366f1" spacing={4} />
            </Box>
          ) : (
            <ReactMarkdown
              components={{
                p: (props) => <Typography sx={mdStyles} {...props} />,
                li: (props) => <li style={{ ...mdStyles, marginBottom: '6px' }} {...props} />,
                strong: (props) => <strong style={{ ...mdStyles, fontWeight: 700 }} {...props} />,
                em: (props) => <em style={mdStyles} {...props} />,
                h1: (props) => (
                  <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.3rem', mt: 2, mb: 1 }} {...props} />
                ),
                h2: (props) => (
                  <Typography
                    sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.15rem', mt: 1.5, mb: 0.8 }}
                    {...props}
                  />
                ),
                h3: (props) => (
                  <Typography
                    sx={{ ...mdStyles, fontWeight: 700, fontSize: '1rem', mt: 1.2, mb: 0.6 }}
                    {...props}
                  />
                ),
                code: (props) => (
                  <Box
                    component="code"
                    sx={{
                      fontFamily: 'monospace',
                      color: '#818cf8',
                      bgcolor: 'rgba(99, 102, 241, 0.08)',
                      p: '0 4px',
                      borderRadius: 1,
                      display: 'inline',
                    }}
                    {...props}
                  />
                ),
                pre: (props) => (
                  <Box
                    component="pre"
                    sx={{ bgcolor: 'rgba(0,0,0,0.3)', color: '#ededf0', p: 1, borderRadius: 1, overflowX: 'auto' }}
                    {...props}
                  />
                ),
                a: (props) => <a style={{ color: '#818cf8', textDecoration: 'none' }} {...props} />,
              }}
            >
              {msg.text}
            </ReactMarkdown>
          )
        ) : (
          <Typography sx={mdStyles}>{msg.text}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MessageItem;
