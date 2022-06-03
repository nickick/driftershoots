import {
  Box, Container, keyframes, Typography,
} from '@mui/material';
import { useContext } from 'react';
import NextLink from 'next/link';
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
        p: 4,
        animation: `${fadeFromBelow} ${entranceAnimationDuration}s both ${1 + animationDelay}s`,
        zIndex: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 2,
          }}
        >
          <Typography
            variant="h3"
          >
            To the moon and never back.
          </Typography>
          <Typography
            variant="quote"
          >
            Email
          </Typography>
          <Typography
            variant="body"
          >
            <NextLink
              href="mailto: driftershoots@gmail.com"
            >
              driftershoots@gmail.com
            </NextLink>
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Typography
            variant="quote"
          >
            Sitemap
          </Typography>
          <Typography
            variant="body"
          >
            <NextLink
              href="/"
            >
              Home
            </NextLink>
          </Typography>
          <Typography
            variant="body"
          >
            <NextLink
              href="/publications"
            >
              Publications
            </NextLink>
          </Typography>
          <Typography
            variant="body"
          >
            <NextLink
              href="/gallery"
            >
              Gallery
            </NextLink>
          </Typography>
          <Typography
            variant="body"
          >
            <NextLink
              href="/about"
            >
              About
            </NextLink>
          </Typography>
          <Typography
            variant="body"
          >
            <NextLink
              href="/contact"
            >
              Contact
            </NextLink>
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Typography
            variant="h4"
          >
            Information
          </Typography>
          <Typography
            variant="body"
          >
            <NextLink
              href="privacy-policy"
            >
              Privacy Policy
            </NextLink>
          </Typography>
        </Box>
      </Box>
      <ThemeToggle />
    </Container>
  );
}
