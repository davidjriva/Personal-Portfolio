import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import BouncingDotsLoadingAnimation from '@/components/Chat-Page/BouncingDotsLoadingAnimation';

const MessageItem = ({ msg }) => {
  const isUser = msg.role === 'user';
  const showDots = msg.role === 'assistant' && (!msg.text || msg.text.length === 0);

  const mdStyles = {
    fontFamily: 'inherit',
    fontWeight: 400,
    lineHeight: 1.65,
    fontSize: '0.9rem',
    color: '#e8e6e3',
    marginBottom: '4px',
  };

  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <Box
        sx={{
          maxWidth: '80%',
          px: 2,
          py: 1.5,
          borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          background: isUser ? 'rgba(110, 182, 240, 0.08)' : 'rgba(255,255,255,0.03)',
          border: isUser ? '1px solid rgba(110, 182, 240, 0.12)' : '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {msg.role === 'assistant' ? (
          showDots ? (
            <Box sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
              <BouncingDotsLoadingAnimation dotSize={6} dotColor="rgba(255,255,255,0.3)" spacing={3} />
            </Box>
          ) : (
            <ReactMarkdown
              components={{
                p: (props) => <Typography sx={mdStyles} {...props} />,
                li: (props) => <li style={{ ...mdStyles, marginBottom: '4px' }} {...props} />,
                strong: (props) => <strong style={{ ...mdStyles, fontWeight: 600 }} {...props} />,
                em: (props) => <em style={mdStyles} {...props} />,
                h1: (props) => (
                  <Typography sx={{ ...mdStyles, fontWeight: 600, fontSize: '1.2rem', mt: 1.5, mb: 0.5 }} {...props} />
                ),
                h2: (props) => (
                  <Typography sx={{ ...mdStyles, fontWeight: 600, fontSize: '1.05rem', mt: 1, mb: 0.5 }} {...props} />
                ),
                h3: (props) => (
                  <Typography sx={{ ...mdStyles, fontWeight: 600, fontSize: '0.95rem', mt: 1, mb: 0.5 }} {...props} />
                ),
                code: (props) => (
                  <Box
                    component="code"
                    sx={{
                      fontFamily: 'monospace',
                      color: '#6eb6f0',
                      backgroundColor: 'rgba(110, 182, 240, 0.08)',
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
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      color: '#e8e6e3',
                      p: 1.5,
                      borderRadius: '8px',
                      overflowX: 'auto',
                      fontSize: '0.85rem',
                    }}
                    {...props}
                  />
                ),
                a: (props) => (
                  <a
                    style={{
                      color: '#6eb6f0',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(110, 182, 240, 0.3)',
                    }}
                    {...props}
                  />
                ),
              }}
            >
              {msg.text}
            </ReactMarkdown>
          )
        ) : (
          <Typography sx={{ ...mdStyles, color: '#e8e6e3' }}>{msg.text}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MessageItem;
