/*
Image component that zooms on hover and
loads and animates in based on when the
page scrolls over it
*/

import { Box, keyframes, SxProps, Theme } from '@mui/material';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ProgressiveImage } from '../ProgressiveImage';

interface ZoomLazyImageProps {
  src: string;
  alt: string;
  style?: SxProps<Theme>;
  fadeInOnload?: boolean;
}

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

export default function ZoomLazyImage({
  src,
  alt,
  style,
  fadeInOnload,
}: ZoomLazyImageProps): JSX.Element {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const [scale, setScale] = useState(1);

  // Derive the thumbnail path from the src
  // e.g. /about/7.jpeg => /about/thumbnails/7.jpg
  const match = src.match(/\/about\/(.+)\.(jpe?g|png)$/i);
  let lowResSrc = '';
  if (match) {
    lowResSrc = `/about/thumbnails/${match[1]}.jpg`;
  }

  return (
    <Box
      ref={ref}
      sx={{
        width: '100%',
        height: '100%',
        animation:
          fadeInOnload || inView ? `${fadeFromBelow} 0.3s both` : 'none',
        opacity: inView ? 1 : 0,
        overflow: 'hidden',
        ...style,
      }}
      onMouseOver={() => {
        setScale(1.2);
      }}
      onMouseOut={() => {
        setScale(1);
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          scale: `${scale}`,
          transition: 'scale 0.3s ease-in-out',
        }}
      >
        <ProgressiveImage
          src={src}
          lowResSrc={lowResSrc}
          alt={alt}
          layout="fill"
          objectFit="cover"
        />
      </Box>
    </Box>
  );
}
