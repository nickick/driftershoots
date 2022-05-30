import {
  Box, Button, Container, keyframes,
} from '@mui/material';
import PropTypes from 'prop-types';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link from 'next/link';
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

const initialHeight = 35;

const fadeInLogo = keyframes`
  0% {
    -webkit-transform: scale(1.2) translateY(${initialHeight}vh);;
    transform: scale(1.2) translateY(${initialHeight}vh);
    opacity: 0;
  }

  70% {
    -webkit-transform: scale(1.2) translateY(${initialHeight}vh);
    transform: scale(1.2) translateY(${initialHeight}vh);
    opacity: 1;
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
    <Link href={href} passHref>
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
        target={(icon || href[0] !== '/') ? '_blank' : ''}
      >
        {text}
        {icon || ''}
      </Button>
    </Link>
  );
}

NavButton.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.node,
  index: PropTypes.number.isRequired,
};

NavButton.defaultProps = {
  text: '',
  href: '',
  icon: '',
};

const leftNav = [
  {
    text: 'Prints',
    href: 'https://www.millergallery.com/featured-artists#/isaac-wright',
    icon: '',
  },
  {
    text: 'Gallery',
    href: '/gallery',
    icon: '',
  },
  {
    text: 'Publications',
    href: '/publications',
    icon: '',
  },
];

const rightNav = [
  {
    text: '',
    href: 'https://discord.com/invite/kr65XUgPYw',
    icon: <DiscordIcon />,
  },
  {
    text: '',
    href: 'https://twitter.com/driftershoots',
    icon: <TwitterIcon sx={{ fontSize: 20 }} />,
  },
  {
    text: 'Contact',
    href: '/contact',
    icon: '',
  },
  {
    text: 'About',
    href: '/about',
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
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        {
          leftNav.map(({ text, href, icon }, index) => (
            <NavButton
              key={text + href}
              text={text}
              href={href}
              icon={icon}
              index={index}
            />
          ))
        }
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: '1',
          justifyContent: 'center',
          alignItems: 'center',
          animation: `${fadeInLogo} ${entranceAnimationDuration}s both`,
          zIndex: 15,
        }}
      >
        <Link href="/">
          <img
            src="/icons/Drift-Logo-w.png"
            style={{
              height: '24px',
              aspectRatio: '116 / 38',
              cursor: 'pointer',
            }}
            alt="Drifter Shoots logo"
          />
        </Link>
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
          rightNav.map(({ text, href, icon }, index) => (
            <NavButton
              key={text + href}
              text={text}
              href={href}
              icon={icon}
              index={index}
            />
          ))
        }
      </Box>
    </Container>
  );
}
