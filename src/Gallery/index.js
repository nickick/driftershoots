/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */

import { TabContext } from "@mui/lab";
import {
  Box,
  CircularProgress,
  Container,
  keyframes,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { entranceAnimationDuration } from "../constants";
import { GalleryContext } from "../GalleryContextProvider";
import { LoadedContext } from "../LoadedContextProvider";
import GalleryModal from "./GalleryModal";
import Masonry from "./Masonry";
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Gallery() {
  const { wmvgPieces } = useContext(GalleryContext);
  const { animationDelay } = useContext(LoadedContext);
  const [galleryFilters, setGalleryFilters] = useState([]);
  const [pieces, setPieces] = useState([]);
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
  const piece = wmvgPieces.find(
    (p) => p.tokenId.toString() === pieceQueryIdentifier?.toString()
  );

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
    wmvgSorted
      .map((wmvg) => wmvg.raw.metadata.attributes.map((trait) => trait.value))
      .flat()
  );

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const wmvgGalleryPieces = pieces.filter(
    (piece) => piece.description !== "Other"
  );

  const otherGalleryPieces = pieces.filter(
    (piece) => piece.description === "Other"
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
      <TabContext value={value.toString()}>
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
                {/* <Traits traits={traits} setGalleryFilters={setGalleryFilters} /> */}
              </Box>
            </Box>
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                textColor="secondary"
              >
                <Tab
                  label={
                    <Typography variant="h4">Uncollected Works</Typography>
                  }
                  {...a11yProps(0)}
                />
                <Tab
                  label={<Typography variant="h4">Where My Vans Go</Typography>}
                  {...a11yProps(1)}
                />
              </Tabs>
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
              <TabPanel value={value} index={0}>
                <Masonry
                  key={galleryFilters.concat()}
                  pieces={otherGalleryPieces}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Masonry
                  key={galleryFilters.concat() + 1}
                  pieces={wmvgGalleryPieces}
                />
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </TabContext>
    </Container>
  );
}
