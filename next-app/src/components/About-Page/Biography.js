import { Box, Typography, Chip, Stack } from '@mui/material';

const KEY_SKILLS = ['Python', 'TypeScript', 'React', 'Next.js', 'LangChain', 'RAG', 'Node.js', 'PostgreSQL'];

const Biography = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.65)', mb: 2 }}>
        Software engineer specializing in applied AI and full-stack development. Colorado State University graduate (B.S.
        Computer Science, Summa Cum Laude) with hands-on experience building production RAG systems, agentic workflows,
        and scalable web applications.
      </Typography>
      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.65)', mb: 3 }}>
        Experienced in data engineering, big data visualization, and ML pipeline development. Focused on building
        thoughtful, high-quality software that solves real problems.
      </Typography>

      <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
        {KEY_SKILLS.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: '0.75rem',
              height: '26px',
              fontWeight: 500,
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Biography;
