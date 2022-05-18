import { Box, Button, Container } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import DiscordIcon from './DiscordIcon';

function NavButton ({text, href, icon}) {
  return (
    <Button
      variant='text'
      sx={{
        color: 'text.primary',
        minWidth: icon ? '1rem' : 'inherit',
        mx: '0.5rem',
      }}
      href={href}
    >
      {text}
      {icon ? icon: ''}
    </Button>
  )
}

export default function Navbar () {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box 
        sx={{
          flex: 1
        }}
      >
        <NavButton text='Prints' />
        <NavButton text='Gallery' />
        <NavButton text='Publications' />
      </Box>
      <Box 
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center'

        }}
      >
        <img src="/icons/Drift-Logo-w.png" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexWrap: 'nowrap',
          justifyContent: 'flex-end',
        }}
      >
        <NavButton text='About' />
        <NavButton text='Contact' />
        <NavButton icon={<DiscordIcon />}/>
        <NavButton icon={<TwitterIcon />}/>
      </Box>
    </Container>
  )
}
