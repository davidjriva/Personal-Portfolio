import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import BouncingDotsLoadingAnimation from '@/components/Chat-Page/BouncingDotsLoadingAnimation';

const MessageItem = ({ msg }) => {
  const isUser = msg.role === 'user';
  const showDots = msg.role === 'assistant' && (!msg.text || msg.text.length === 0);

  const mdStyles = {
    fontWeight: 400,
    lineHeight: 1.65,
    fontSize: '0.9rem',
    color: '#fafafa',
    marginBottom: '4px',
  };

  return (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      <Box
        sx={{
          maxWidth: '80%',
          px: 2.5,
          py: 1.5,
          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          background: isUser ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.04)',
          border: isUser ? '1px solid rgba(59,130,246,0.18)' : '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {msg.role === 'assistant' ? (
          showDots ? (
            <Box sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
              <BouncingDotsLoadingAnimation dotSize={8} dotColor="#3b82f6" spacing={4} />
            </Box>
          ) : (
            <ReactMarkdown
              components={{
                p: (props) => <Typography sx={mdStyles} {...props} />,
                li: (props) => <li style={{ ...mdStyles, marginBottom: '6px' }} {...props} />,
                strong: (props) => <strong style={{ ...mdStyles, fontWeight: 600 }} {...props} />,
                em: (props) => <em style={mdStyles} {...props} />,
                h1: (props) => (
                  <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.3rem', mt: 2, mb: 1 }} {...props} />
                ),
                h2: (props) => (
                  <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.15rem', mt: 1.5, mb: 0.8 }} {...props} />
                ),
                h3: (props) => (
                  <Typography sx={{ ...mdStyles, fontWeight: 600, fontSize: '1rem', mt: 1.2, mb: 0.6 }} {...props} />
                ),
                code: (props) => (
                  <Box
                    component="code"
                    sx={{
                      fontFamily: 'monospace',
                      color: '#60a5fa',
                      backgroundColor: 'rgba(59,130,246,0.08)',
                      p: '1px 5px',
                      borderRadius: '4px',
                      fontSize: '0.85em',
                      display: 'inline',
                    }}
                    {...props}
                  />
                ),
                pre: (props) => (
                  <Box
                    component="pre"
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      color: '#fafafa',
                      p: 1.5,
                      borderRadius: '8px',
                      overflowX: 'auto',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    {...props}
                  />
                ),
                a: (props) => (
                  <a style={{ color: '#60a5fa', textDecoration: 'none' }} target="_blank" rel="noopener" {...props} />
                ),
              }}
            >
              {msg.text}
            </ReactMarkdown>
          )
        ) : (
          <Typography sx={{ ...mdStyles, color: '#fafafa' }}>{msg.text}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MessageItem;
