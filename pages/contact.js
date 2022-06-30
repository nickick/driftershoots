import { Box } from '@mui/material';
import Contact from '../src/Contact';

export default function ContactPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: {
          xs: 'inherit',
          md: '70vh',
        },
      }}
    >
      <Contact />
    </Box>
  );
}
