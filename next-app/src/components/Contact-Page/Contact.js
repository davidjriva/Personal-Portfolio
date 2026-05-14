import { Box } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';
import FadeInSection from '@/components/FadeInSection';

const Contact = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 6 },
        maxWidth: 900,
        mx: 'auto',
      }}
    >
      <FadeInSection>
        <SectionHeading sectionName="Contact" subtitle="Have a question or want to work together? Drop me a message." />
      </FadeInSection>

      <FadeInSection delay={0.15}>
        <ContactForm />
      </FadeInSection>
    </Box>
  );
};

export default Contact;
