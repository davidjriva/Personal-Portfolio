import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import BouncingDotsLoadingAnimation from '@/components/Chat-Page/BouncingDotsLoadingAnimation';

const MessageItem = ({ msg }) => {
  const isUser = msg.role === 'user';
  const showDots = msg.role === 'assistant' && (!msg.text || msg.text.length === 0);

  const mdStyles = {
    fontFamily: 'inherit',
    fontWeight: 400,
    lineHeight: 1.6,
    fontSize: '0.85rem',
    color: '#fafafa',
    marginBottom: '4px',
  };

  return (
    <Box
      sx={{
        mb: 1.5,
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      <Box
        sx={{
          maxWidth: '85%',
          px: 2,
          py: 1.25,
          borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          background: isUser ? 'rgba(167,139,250,0.12)' : 'rgba(255,255,255,0.04)',
          border: isUser ? '1px solid rgba(167,139,250,0.2)' : '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {msg.role === 'assistant' ? (
          showDots ? (
            <Box sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
              <BouncingDotsLoadingAnimation dotSize={6} dotColor="#a78bfa" spacing={3} />
            </Box>
          ) : (
            <ReactMarkdown
              components={{
                p: (props) => <Typography sx={mdStyles} {...props} />,
                li: (props) => <li style={{ ...mdStyles, marginBottom: '4px' }} {...props} />,
                strong: (props) => <strong style={{ ...mdStyles, fontWeight: 700 }} {...props} />,
                em: (props) => <em style={mdStyles} {...props} />,
                h1: (props) => <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.2rem', mt: 1.5, mb: 0.5 }} {...props} />,
                h2: (props) => <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.05rem', mt: 1, mb: 0.5 }} {...props} />,
                h3: (props) => <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '0.95rem', mt: 0.8, mb: 0.4 }} {...props} />,
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
                      fontSize: '0.8rem',
                    }}
                    {...props}
                  />
                ),
                pre: (props) => (
                  <Box
                    component="pre"
                    sx={{ backgroundColor: 'rgba(0,0,0,0.3)', color: '#fafafa', p: 1.5, borderRadius: '8px', overflowX: 'auto', fontSize: '0.8rem' }}
                    {...props}
                  />
                ),
                a: (props) => <a style={{ color: '#a78bfa', textDecoration: 'none' }} target="_blank" rel="noopener" {...props} />,
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
