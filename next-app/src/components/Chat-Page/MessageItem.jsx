import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import BouncingDotsLoadingAnimation from '@/components/Chat-Page/BouncingDotsLoadingAnimation';

const MessageItem = ({ msg }) => {
  const isUser = msg.role === 'user';
  const showDots = msg.role === 'assistant' && (!msg.text || msg.text.length === 0);

  const mdStyles = {
    fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
    fontWeight: 400,
    lineHeight: 1.65,
    fontSize: '0.88rem',
    color: '#d4d4d8',
    marginBottom: '4px',
  };

  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <Box
        sx={{
          maxWidth: '82%',
          px: 2,
          py: 1.25,
          borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          background: isUser ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.03)',
          border: isUser ? '1px solid rgba(59,130,246,0.2)' : '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {msg.role === 'assistant' ? (
          showDots ? (
            <Box sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
              <BouncingDotsLoadingAnimation dotSize={6} dotColor="#3b82f6" spacing={3} />
            </Box>
          ) : (
            <ReactMarkdown
              components={{
                p: (props) => <Typography sx={mdStyles} {...props} />,
                li: (props) => <li style={{ ...mdStyles, marginBottom: '4px' }} {...props} />,
                strong: (props) => <strong style={{ ...mdStyles, fontWeight: 600, color: '#fafafa' }} {...props} />,
                em: (props) => <em style={mdStyles} {...props} />,
                h1: (props) => (
                  <Typography sx={{ ...mdStyles, fontWeight: 600, fontSize: '1.2rem', color: '#fafafa', mt: 1.5, mb: 0.5 }} {...props} />
                ),
                h2: (props) => (
                  <Typography sx={{ ...mdStyles, fontWeight: 600, fontSize: '1.05rem', color: '#fafafa', mt: 1, mb: 0.5 }} {...props} />
                ),
                h3: (props) => (
                  <Typography sx={{ ...mdStyles, fontWeight: 600, fontSize: '0.95rem', color: '#fafafa', mt: 1, mb: 0.5 }} {...props} />
                ),
                code: (props) => (
                  <Box
                    component="code"
                    sx={{
                      fontFamily: 'monospace',
                      color: '#3b82f6',
                      backgroundColor: 'rgba(59,130,246,0.08)',
                      p: '1px 5px',
                      borderRadius: '4px',
                      fontSize: '0.82rem',
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
                      color: '#d4d4d8',
                      p: 1.5,
                      borderRadius: '8px',
                      overflowX: 'auto',
                      fontSize: '0.82rem',
                    }}
                    {...props}
                  />
                ),
                a: (props) => (
                  <a
                    style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}
                    target="_blank"
                    rel="noopener noreferrer"
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
