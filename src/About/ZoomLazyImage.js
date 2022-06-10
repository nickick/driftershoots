/*
Image component that zooms on hover and
loads and animates in based on when the
page scrolls over it
*/

import { Box, keyframes } from '@mui/material';
import { bool, object, string } from 'prop-types';
import { useCallback, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

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
  src, alt, style, fadeInOnload,
}) {
  const [mouseOver, setMouseOver] = useState(false);
  const boxRef = useRef();

  const onMouseOver = useCallback(() => {
    setMouseOver(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setMouseOver(false);
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <Box
      sx={{
        animation: (fadeInOnload || inView) ? `${fadeFromBelow} 0.3s both` : 'none',
        opacity: 0,
        width: '100%',
        overflow: 'hidden',
        ...style,
      }}
      ref={boxRef}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        ref={ref}
        style={{
          transform: mouseOver ? 'scale(1.2)' : 'scale(1.0)',
          transition: 'transform 0.5s ease-out',
          width: '100%',
        }}
      />
    </Box>
  );
}

ZoomLazyImage.propTypes = {
  src: string.isRequired,
  alt: string.isRequired,
  style: object,
  fadeInOnload: bool,
};

ZoomLazyImage.defaultProps = {
  style: {},
  fadeInOnload: false,
};
