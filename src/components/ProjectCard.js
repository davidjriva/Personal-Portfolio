import CardContent from '@mui/material/CardContent';
import { Typography, Box, Card, CardMedia, Button } from '@mui/material';

const ProjectCard = ({ coverImage, title, author, dateStarted, dateCompleted, description, technologies, link }) => {
  return (
    <Card
      sx={{
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: '0.3s',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', 
        height: '100%', 
      }}
    >
      {coverImage && (
        <CardMedia
          component="img"
          src={`/images/${coverImage}`}
          alt={`${title} cover`}
          sx={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            height: '200px',
            objectFit: 'cover',
          }}
        />
      )}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
            {title}
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Author: {author}
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            {dateStarted} - {dateCompleted}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {description}
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            padding: '1rem', 
            borderRadius: '4px', 
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Technologies:
          </Typography>
          <Box>
            {technologies.map((technology, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography variant="body2">
                  {technology.location}: {technology.tools.join(', ')}
                </Typography>
              </Box>
            ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mt: 2 }}
          >
            View Project
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
