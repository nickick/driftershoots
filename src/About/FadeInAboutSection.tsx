import { Box, keyframes } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import { LoadedContext } from '../LoadedContextProvider';

interface FadeInAboutSectionProps {
  children: React.ReactNode;
  fadeInOnload?: boolean;
  animationStyle?: 'fadeFromBelow' | 'fadeFromRight';
  sx?: SxProps<Theme>;
}

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

const fadeFromRight = keyframes`
  0% {
    -webkit-transform: translateX(20px);
            transform: translateX(20px);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
            opacity: 1;
  }
`;

export default function FadeInAboutSection({
  children,
  fadeInOnload,
  animationStyle,
  sx,
}: FadeInAboutSectionProps): JSX.Element {
  const { animationDelay } = useContext(LoadedContext);

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const animationStyleObj =
    animationStyle === 'fadeFromBelow' ? fadeFromBelow : fadeFromRight;

  return (
    <Box
      ref={ref}
      sx={{
        animation:
          fadeInOnload || inView
            ? `${animationStyleObj} 1s both ${animationDelay}s`
            : 'none',
        transition: 'opacity 1s ease-out',
        opacity: 0,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
