/* eslint-disable no-param-reassign */

import {
  Masonry,
} from 'masonic';
import {
  Box, Container, keyframes, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { entranceAnimationDuration } from '../constants';
import { GalleryContext } from '../GalleryContextProvider';
import { LoadedContext } from '../LoadedContextProvider';
import GalleryPiece from './GalleryPiece';
import GalleryModal from './GalleryModal';

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
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const wmvgSorted = wmvgPieces.sort((a, b) => {
    const aAsInt = parseInt(a.name.slice(18), 10);
    const bAsInt = parseInt(b.name.slice(18), 10);

    if (Number.isNaN(aAsInt) || Number.isNaN(bAsInt)) {
      return a.name > b.name ? 1 : -1;
    }

    return parseInt(a.name.slice(18), 10) > parseInt(b.name.slice(18), 10) ? 1 : -1;
  }).map((piece) => {
    piece.setModalOpen = setModalOpen;
    return piece;
  });

  const handleClose = useCallback(() => {
    setModalOpen(false);

    router.push({
      pathname: router.pathname,
      query: {},
    }, undefined, { scroll: false });
  }, [router]);

  const pieceQueryToInt = parseInt(router.query.gallery, 10);
  const pieceQueryIdentifier = Number.isNaN(pieceQueryToInt)
    ? router.query.gallery : pieceQueryToInt;
  const piece = wmvgPieces.find((p) => p.id === pieceQueryIdentifier);

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

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  let masonryColumns;

  if (isDesktop) {
    masonryColumns = 4;
  } else if (isTablet) {
    masonryColumns = 3;
  } else {
    masonryColumns = 2;
  }

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
          justifyContent: 'center',
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
            alignItems: 'center',
            flex: 6,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
              ml: 2,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 3,
              }}
            >
              Gallery
            </Typography>
          </Box>
          <Masonry
            items={wmvgSorted}
            render={GalleryPiece}
            columnGutter={40}
            columnCount={masonryColumns}
          />
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
