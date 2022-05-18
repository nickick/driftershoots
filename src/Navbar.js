import { Button, Container } from "@mui/material";

function NavButton ({text, href}) {
  return (
    <Button
      variant='text'
      sx={{
        color: 'text.primary'
      }}
      href={href}
    >
      {text}
    </Button>
  )
}

export default function Navbar () {
  return (
    <Container>
      <NavButton text='Prints' />
    </Container>
  )
}
