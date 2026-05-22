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
    color: '#e4e4e7',
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
          borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          background: isUser ? 'rgba(56, 192, 242, 0.08)' : 'rgba(255, 255, 255, 0.03)',
          border: isUser ? '1px solid rgba(56, 192, 242, 0.12)' : '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {msg.role === 'assistant' ? (
          showDots ? (
            <Box sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
              <BouncingDotsLoadingAnimation dotSize={7} dotColor="#38c0f2" spacing={4} />
            </Box>
          ) : (
            <ReactMarkdown
              components={{
                p: (props) => <Typography sx={mdStyles} {...props} />,
                li: (props) => <li style={{ ...mdStyles, marginBottom: '6px' }} {...props} />,
                strong: (props) => <strong style={{ ...mdStyles, fontWeight: 600, color: '#fafafa' }} {...props} />,
                em: (props) => <em style={mdStyles} {...props} />,
                h1: (props) => (
                  <Typography
                    sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.3rem', mt: 2, mb: 1, color: '#fafafa' }}
                    {...props}
                  />
                ),
                h2: (props) => (
                  <Typography
                    sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.15rem', mt: 1.5, mb: 0.8, color: '#fafafa' }}
                    {...props}
                  />
                ),
                h3: (props) => (
                  <Typography
                    sx={{ ...mdStyles, fontWeight: 600, fontSize: '1rem', mt: 1.2, mb: 0.6, color: '#fafafa' }}
                    {...props}
                  />
                ),
                code: (props) => (
                  <Box
                    component="code"
                    sx={{
                      fontFamily: 'monospace',
                      color: '#38c0f2',
                      backgroundColor: 'rgba(56, 192, 242, 0.06)',
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
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      color: '#e4e4e7',
                      p: 1.5,
                      borderRadius: '8px',
                      overflowX: 'auto',
                      fontSize: '0.85rem',
                      border: '1px solid rgba(255, 255, 255, 0.04)',
                    }}
                    {...props}
                  />
                ),
                a: (props) => (
                  <a
                    style={{
                      color: '#38c0f2',
                      textDecoration: 'none',
                      fontWeight: 500,
                      borderBottom: '1px solid rgba(56, 192, 242, 0.3)',
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
          <Typography sx={{ ...mdStyles, color: '#fafafa' }}>{msg.text}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MessageItem;
