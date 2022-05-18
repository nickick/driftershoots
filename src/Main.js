import { Container } from '@mui/material';

export default function Main () {
  return (
    <main>
      <Container
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary'
        }}
      >
        Main
      </Container>
    </main>
  )
}