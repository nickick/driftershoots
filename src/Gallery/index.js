/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  Box,
  CircularProgress,
  Container,
  keyframes,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useWindowSize } from "@react-hook/window-size";
import {
  MasonryScroller,
  useContainerPosition,
  usePositioner,
  useResizeObserver,
} from "masonic";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { entranceAnimationDuration } from "../constants";
import { GalleryContext } from "../GalleryContextProvider";
import { LoadedContext } from "../LoadedContextProvider";
import GalleryModal from "./GalleryModal";
import GalleryPiece from "./GalleryPiece";
import Traits from "./Traits";

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
  const [galleryFilters, setGalleryFilters] = useState([]);
  const [pieces, setPieces] = useState([]);
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const wmvgSorted = wmvgPieces
    .sort((a, b) => {
      const aAsInt = parseInt(a.name.slice(18), 10);
      const bAsInt = parseInt(b.name.slice(18), 10);

      if (Number.isNaN(aAsInt) || Number.isNaN(bAsInt)) {
        return a.name > b.name ? 1 : -1;
      }

      return parseInt(a.name.slice(18), 10) > parseInt(b.name.slice(18), 10)
        ? 1
        : -1;
    })
    .map((piece) => {
      piece.setModalOpen = setModalOpen;
      return piece;
    });

  useEffect(() => {
    const filteredPieces = wmvgSorted.filter((piece) => {
      if (!galleryFilters.length) {
        return true;
      }
      return galleryFilters.filter((filter) =>
        piece.traits.map((trait) => trait.value).includes(filter)
      ).length;
    });

    setPieces(filteredPieces);
  }, [wmvgPieces, galleryFilters]);

  const containerRef = useRef(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight,
  ]);

  const theme = useTheme();
  const matchesLg = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));

  let columns;

  if (matchesLg) {
    columns = 4;
  } else if (matchesMd) {
    columns = 3;
  } else if (matchesSm) {
    columns = 2;
  } else {
    columns = 1;
  }

  const positioner = usePositioner(
    {
      width,
      columnWidth: 220,
      columnGutter: 40,
      columnCount: columns,
    },
    [pieces]
  );

  const resizeObserver = useResizeObserver(positioner);

  const handleClose = useCallback(() => {
    setModalOpen(false);

    router.push(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { scroll: false }
    );
  }, [router]);

  const pieceQueryToInt = parseInt(router.query.gallery, 10);
  const pieceQueryIdentifier = Number.isNaN(pieceQueryToInt)
    ? router.query.gallery
    : pieceQueryToInt;
  const piece = wmvgPieces.find((p) => p.id === pieceQueryIdentifier);

  useEffect(() => {
    setModalOpen(!!router.query.gallery);
    if (piece) {
      const index = wmvgSorted.indexOf(piece);
      const pieceElement = document.getElementById(`wmvg-${index}`);
      if (pieceElement) {
        window.scrollTo({
          top: pieceElement.pageYOffset,
          behavior: "smooth",
        });
      }
    }
  }, [router.query.gallery, wmvgSorted, piece]);

  const traits = new Set(
    wmvgSorted.map((wmvg) => wmvg.traits.map((trait) => trait.value)).flat()
  );

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        zIndex: 3,
        minHeight: "80vh",
        overflowX: "hidden",
        px: {
          xs: 0,
          md: 10,
        },
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 6,
          animation: `${fadeFromBelow} ${entranceAnimationDuration}s both ${animationDelay}s`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              justifyContent: "space-between",
              alignSelf: "flex-start",
              width: "100%",
              px: {
                xs: 0,
                md: 4,
              },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                flex: "3",
                px: {
                  xs: 4,
                  md: 0,
                },
              }}
            >
              Gallery
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifySelf: "flex-end",
                alignItems: "center",
                flex: "9",
              }}
            >
              <Traits traits={traits} setGalleryFilters={setGalleryFilters} />
            </Box>
          </Box>
          <Box
            sx={{
              overflow: "hidden",
              width: {
                xs: "90%",
                md: "100%",
              },
              px: {
                xs: 0,
                md: 4,
              },
              textAlign: "center",
            }}
          >
            {!pieces.length && (
              <CircularProgress
                size={90}
                sx={{
                  color: "white",
                  width: "100%",
                  m: 20,
                }}
              />
            )}
            <MasonryScroller
              positioner={positioner}
              resizeObserver={resizeObserver}
              containerRef={containerRef}
              items={pieces}
              height={windowHeight}
              offset={offset}
              overscanBy={6}
              render={GalleryPiece}
              key={galleryFilters.concat()}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
