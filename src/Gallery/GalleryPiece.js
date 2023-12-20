import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { getName } from "../utils/parsers";
import { childrenProps, openseaPieceProps } from "../utils/prop-types";

function TextSection({ title, children }) {
  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <Typography
        variant="body"
        sx={{
          mb: 3,
        }}
      >
        {children}
      </Typography>
    </>
  );
}

TextSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: childrenProps.isRequired,
};

export default function GalleryPiece({ data = {}, index }) {
  const boxRef = useRef();
  const router = useRouter();

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-200px 0px",
  });

  const selectPiece = useCallback(
    (e) => {
      e.preventDefault();
      const { pathname } = router;
      data.setModalOpen(true);

      router.push(
        {
          pathname,
          query: {
            gallery: data.tokenId,
          },
        },
        undefined,
        { scroll: false }
      );
    },
    [data, router]
  );

  return (
    <Box
      sx={[
        {
          opacity: inView ? 1 : 0,
          position: "relative",
          width: "100%",
        },
        {
          "&:hover > div > img": {
            transform: "scale(1.2)",
          },
        },
      ]}
      ref={boxRef}
      onClick={selectPiece}
      id={`wmvg-${index}`}
    >
      <Box
        sx={[
          {
            display: "flex",
            flex: "1 1",
            justifyContent: "flex-start",
            position: "relative",
            overflow: "hidden",
          },
        ]}
        ref={ref}
      >
        <img
          src={data.image.cachedUrl}
          alt={data.name}
          style={{
            transition: "transform 0.5s ease-out",
            width: "100%",
            height: "auto",
            cursor: "pointer",
          }}
        />
      </Box>
      {getName(data.description) !== "Other" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 3,
            cursor: "pointer",
            opacity: 1,
            background: "#23222B",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "1.25rem",
              lineHeight: "2rem",
              textTransform: "uppercase",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textAlign: "left",
            }}
          >
            {data.name}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: "2rem",
              lineHeight: "3rem",
              textAlign: "left",
            }}
          >
            {getName(data.description)}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

GalleryPiece.propTypes = {
  data: openseaPieceProps.isRequired,
  index: PropTypes.number.isRequired,
};
