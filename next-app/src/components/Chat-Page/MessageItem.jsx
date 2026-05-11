import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import BouncingDotsLoadingAnimation from '@/components/Chat-Page/BouncingDotsLoadingAnimation';

const MessageItem = ({ msg }) => {
  const isUser = msg.role === 'user';
  const showDots = msg.role === 'assistant' && (!msg.text || msg.text.length === 0);

  const mdStyles = {
    fontFamily: 'var(--font-inter), var(--font-montserrat), Arial, sans-serif',
    fontWeight: 400,
    lineHeight: 1.65,
    fontSize: '0.92rem',
    color: '#f5f5f7',
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
          background: isUser ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.04)',
          border: isUser ? '1px solid rgba(139,92,246,0.2)' : '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {msg.role === 'assistant' ? (
          showDots ? (
            <Box sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
              <BouncingDotsLoadingAnimation dotSize={8} dotColor="#8b5cf6" spacing={4} />
            </Box>
          ) : (
            <ReactMarkdown
              components={{
                p: (props) => <Typography sx={mdStyles} {...props} />,
                li: (props) => <li style={{ ...mdStyles, marginBottom: '6px' }} {...props} />,
                strong: (props) => <strong style={{ ...mdStyles, fontWeight: 700 }} {...props} />,
                em: (props) => <em style={mdStyles} {...props} />,
                h1: (props) => (
                  <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.4rem', mt: 2, mb: 1 }} {...props} />
                ),
                h2: (props) => (
                  <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.2rem', mt: 1.5, mb: 0.8 }} {...props} />
                ),
                h3: (props) => (
                  <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.05rem', mt: 1.2, mb: 0.6 }} {...props} />
                ),
                code: (props) => (
                  <Box
                    component="code"
                    sx={{
                      fontFamily: 'monospace',
                      color: '#a78bfa',
                      backgroundColor: 'rgba(139,92,246,0.08)',
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
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      color: '#f5f5f7',
                      p: 1.5,
                      borderRadius: '8px',
                      overflowX: 'auto',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    {...props}
                  />
                ),
                a: (props) => (
                  <a style={{ color: '#a78bfa', textDecoration: 'none' }} target="_blank" rel="noopener" {...props} />
                ),
              }}
            >
              {msg.text}
            </ReactMarkdown>
          )
        ) : (
          <Typography sx={{ ...mdStyles, color: '#f5f5f7' }}>{msg.text}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MessageItem;
