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
    fontSize: '0.9rem',
    color: '#e8e6e3',
    marginBottom: '4px',
  };

  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <Box
        sx={{
          maxWidth: '80%',
          px: 2.5,
          py: 1.5,
          borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          background: isUser ? 'rgba(167,139,250,0.1)' : 'rgba(255,255,255,0.03)',
          border: isUser ? '1px solid rgba(167,139,250,0.18)' : '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {msg.role === 'assistant' ? (
          showDots ? (
            <Box sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
              <BouncingDotsLoadingAnimation dotSize={7} dotColor="#a78bfa" spacing={4} />
            </Box>
          ) : (
            <ReactMarkdown
              components={{
                p: (props) => <Typography sx={mdStyles} {...props} />,
                li: (props) => <li style={{ ...mdStyles, marginBottom: '6px' }} {...props} />,
                strong: (props) => <strong style={{ ...mdStyles, fontWeight: 700 }} {...props} />,
                em: (props) => <em style={mdStyles} {...props} />,
                h1: (props) => <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.3rem', mt: 2, mb: 1 }} {...props} />,
                h2: (props) => <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.15rem', mt: 1.5, mb: 0.8 }} {...props} />,
                h3: (props) => <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '1rem', mt: 1.2, mb: 0.6 }} {...props} />,
                code: (props) => (
                  <Box
                    component="code"
                    sx={{
                      fontFamily: 'monospace',
                      color: '#a78bfa',
                      backgroundColor: 'rgba(167,139,250,0.08)',
                      p: '0 4px',
                      borderRadius: '4px',
                      display: 'inline',
                    }}
                    {...props}
                  />
                ),
                pre: (props) => (
                  <Box
                    component="pre"
                    sx={{ backgroundColor: 'rgba(0,0,0,0.3)', color: '#e8e6e3', p: 1.5, borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem' }}
                    {...props}
                  />
                ),
                a: (props) => <a style={{ color: '#a78bfa', textDecoration: 'none' }} {...props} />,
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
