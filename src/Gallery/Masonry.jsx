import { useWindowSize } from "@react-hook/window-size";
import {
  MasonryScroller,
  useContainerPosition,
  usePositioner,
  useResizeObserver,
} from "masonic";
import React, { useRef } from "react";
import GalleryPiece from "./GalleryPiece";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

const Masonry = ({ key, pieces }) => {
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

  return (
    <MasonryScroller
      positioner={positioner}
      resizeObserver={resizeObserver}
      containerRef={containerRef}
      items={pieces}
      height={windowHeight}
      offset={offset}
      overscanBy={6}
      render={GalleryPiece}
      key={key}
    />
  );
};

export default Masonry;
