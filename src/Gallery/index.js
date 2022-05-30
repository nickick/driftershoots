import {
  Box, Container, keyframes, Typography,
} from '@mui/material';
import { useContext } from 'react';
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
  const { animationDelay } = useContext(LoadedContext);

  const wmvgSorted = wmvgPieces.sort(
    (a, b) => (parseInt(a.name.slice(18), 10) > parseInt(b.name.slice(18), 10) ? 1 : -1),
  );

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
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
            flex: 3,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 6,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              mb: 3,
            }}
          >
            Gallery
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            {wmvgSorted.map((piece, index) => (
              <GalleryPiece piece={piece} key={piece.name} index={index} />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            flex: 3,
          }}
        />
      </Box>
    </Container>
  );
}
