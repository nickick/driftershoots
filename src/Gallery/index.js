import { Box, Container, Typography } from '@mui/material';
import { useContext } from 'react';
import { GalleryContext } from '../GalleryContextProvider';
import GalleryPiece from './GalleryPiece';

export default function Gallery() {
  const { wmvgPieces } = useContext(GalleryContext);
  const wmvgSorted = wmvgPieces.sort(
    (a, b) => (parseInt(a.name.slice(18), 10) > parseInt(b.name.slice(18), 10) ? 1 : -1),
  );

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mt: 6,
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
            {wmvgSorted.map((piece) => (
              <GalleryPiece piece={piece} />
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
