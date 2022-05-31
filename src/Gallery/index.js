import {
  Box, Container, keyframes, Typography,
} from '@mui/material';
import {
  Masonry,
} from '@mui/lab';
import { useContext, useEffect } from 'react';
import { entranceAnimationDuration } from '../constants';
import { GalleryContext } from '../GalleryContextProvider';
import { LoadedContext } from '../LoadedContextProvider';
import GalleryPiece from './GalleryPiece';

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

export default function Gallery() {
  const { wmvgPieces } = useContext(GalleryContext);
  const { animationDelay, setBackgroundImage, setBackgroundOpacity } = useContext(LoadedContext);

  const wmvgSorted = wmvgPieces.sort(
    (a, b) => (parseInt(a.name.slice(18), 10) > parseInt(b.name.slice(18), 10) ? 1 : -1),
  );

  useEffect(() => {
    setBackgroundImage('/gallery-background.jpeg');
    setBackgroundOpacity(1);
  }, [setBackgroundImage, setBackgroundOpacity]);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        zIndex: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mt: 6,
          animation: `${fadeFromBelow} ${entranceAnimationDuration}s both ${animationDelay}s`,
        }}
      >
        <Box
          sx={{
            flex: 1,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 6,
          }}
        >
          <Box
            sx={{
              height: '70vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 1,
              }}
            >
              Drifter Shoots
            </Typography>
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
                mb: 3,
              }}
            >
              Gallery
            </Typography>
          </Box>
          <Masonry
            columns={2}
          >
            {wmvgSorted.map((piece, index) => (
              <GalleryPiece piece={piece} key={piece.name} index={index} />
            ))}
          </Masonry>
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        />
      </Box>
    </Container>
  );
}
