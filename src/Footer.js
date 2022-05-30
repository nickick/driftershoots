import { Container, keyframes } from '@mui/material';
import { useContext } from 'react';
import { entranceAnimationDuration } from './constants';
import { LoadedContext } from './LoadedContextProvider';
import ThemeToggle from './ThemeToggle';

const fadeFromBelow = keyframes`
  0% {
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
  }
`;

export default function Footer() {
  const { animationDelay } = useContext(LoadedContext);

  return (
    <Container
      sx={{
        maxWidth: '1440px',
        px: 4,
        animation: `${fadeFromBelow} ${entranceAnimationDuration}s both ${animationDelay}s`,
        zIndex: 3,
      }}
    >
      <ThemeToggle />
    </Container>
  );
}
