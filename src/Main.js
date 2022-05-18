import { Container, Typography } from '@mui/material';

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
      <Typography variant="h1">
        Title test
      </Typography>
    </Container>
  )
}