import {
  Box, Button, Container, keyframes,
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import DiscordIcon from './DiscordIcon';
import { entranceAnimationDelay, entranceAnimationDuration } from './constants';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeInLogo = keyframes`
  0% {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
`;

function NavButton({
  text, href, icon, index,
}) {
  return (
    <Button
      variant="text"
      sx={{
        color: 'text.primary',
        minWidth: icon ? '1rem' : 'inherit',
        mx: '0.5rem',
        fontSize: '1.5rem',
        lineHeight: '2rem',
        letterSpacing: '0.1rem',
        animation: `${fadeIn} ${entranceAnimationDuration}s both ${entranceAnimationDelay + index * 0.2}s`,
      }}
      href={href}
    >
      {text}
      {icon || ''}
    </Button>
  );
}

const leftNav = [
  {
    text: 'Prints',
    href: '',
    icon: '',
  },
  {
    text: 'Gallery',
    href: '',
    icon: '',
  },
  {
    text: 'Publications',
    href: '',
    icon: '',
  },
];

const rightNav = [
  {
    text: '',
    href: '',
    icon: <DiscordIcon />,
  },
  {
    text: '',
    href: '',
    icon: <TwitterIcon sx={{ fontSize: 20 }} />,
  },
  {
    text: 'Contact',
    href: '',
    icon: '',
  },
  {
    text: 'About',
    href: '',
    icon: '',
  },
];

export default function Navbar() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        mt: '6.5rem',
        px: '4rem',
        maxWidth: '1440px',
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        {
          leftNav.map(({ text, href, icon }, index) => <NavButton key={index} text={text} href={href} icon={icon} index={index} />)
        }
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: '1',
          justifyContent: 'center',
          alignItems: 'center',
          animation: `${fadeInLogo} ${entranceAnimationDuration}s both`,
        }}
      >
        <img
          src="/icons/Drift-Logo-w.png"
          style={{
            height: '24px',
            aspectRatio: '116 / 38',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          flex: 1,
          flexWrap: 'nowrap',
          justifyContent: 'flex-start',
        }}
      >
        {
          rightNav.map(({ text, href, icon }, index) => <NavButton key={index} text={text} href={href} icon={icon} index={index} />)
        }
      </Box>
    </Container>
  );
}
