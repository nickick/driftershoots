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
        fontSize: '1.5rem',
        lineHeight: '2rem',
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
        mt: '4rem',
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
          flex: '1',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src="/icons/Drift-Logo-w.png" style={{
          height: '38px',
          aspectRatio: '116 / 38'
        }} />
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
        <NavButton icon={<TwitterIcon sx={{fontSize: 20}} />}/>
        <NavButton icon={<DiscordIcon />}/>
      </Box>
    </Container>
  )
}
