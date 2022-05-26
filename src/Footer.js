import { Box, Container } from '@mui/material';
import ThemeToggle from './ThemeToggle';

export default function Footer() {
  return (
    <Container
      sx={{
        maxWidth: '1440px',
        px: 4,
      }}
    >
      <ThemeToggle />
    </Container>
  );
}
