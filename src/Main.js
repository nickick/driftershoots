import { Container } from '@mui/material';

export default function Main () {
  return (
    <Container
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        flex: 1,
        overflow: 'auto',
      }}
    >
      Main
    </Container>
  )
}