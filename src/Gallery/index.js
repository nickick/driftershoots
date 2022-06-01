import {
  Masonry,
} from '@mui/lab';
import {
  Box, Container, keyframes, Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { entranceAnimationDuration } from '../constants';
import { GalleryContext } from '../GalleryContextProvider';
import { LoadedContext } from '../LoadedContextProvider';
import GalleryPiece from './GalleryPiece';
import GalleryModal from './WMVGModal';

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
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const wmvgSorted = wmvgPieces.sort(
    (a, b) => (parseInt(a.name.slice(18), 10) > parseInt(b.name.slice(18), 10) ? 1 : -1),
  );

  useEffect(() => {
    setBackgroundImage('/gallery-background.jpeg');
    setBackgroundOpacity(1);
  }, [setBackgroundImage, setBackgroundOpacity]);

  const handleClose = useCallback(() => {
    setModalOpen(false);

    setTimeout(() => {
      router.push({
        pathname: router.pathname,
        query: {},
      }, undefined, { scroll: false });
    }, 200);
  }, [router]);

  const piece = wmvgPieces.find((p) => p.id === parseInt(router.query.gallery, 10));

  useEffect(() => {
    setModalOpen(!!router.query.gallery);
    if (piece) {
      const index = wmvgSorted.indexOf(piece);
      const pieceElement = document.getElementById(`wmvg-${index}`);
      window.scrollTo({
        top: pieceElement.pageYOffset,
        behavior: 'smooth',
      });
    }
  }, [router.query.gallery, wmvgSorted, piece]);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        zIndex: 3,
      }}
    >
      {piece && (
        <GalleryModal
          open={modalOpen}
          handleClose={handleClose}
          piece={piece}
        />
      )}

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
            flex: 0,
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
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '70vh',
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
            {wmvgSorted.map((wmvgPiece, index) => (
              <GalleryPiece
                key={wmvgPiece.name}
                piece={wmvgPiece}
                index={index}
                setModalOpen={setModalOpen}
              />
            ))}
          </Masonry>
        </Box>
        <Box
          sx={{
            flex: 0,
          }}
        />
      </Box>
    </Container>
  );
}
