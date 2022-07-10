import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { useInView } from 'react-intersection-observer';
import { LoadedContext } from '../LoadedContextProvider';

export default function MobileImage({
  src,
  alt,
  overlay,
  overlayAlt,
  zoom,
  zoomStart,
}) {
  const imageZoom = useCallback((zoomProp) => `scale(${zoomProp.scale * 0.9}) translate(${zoomProp.translateX + -5}%, ${zoomProp.translateY}%)`, []);
  const [loadedInView, setLoadedInView] = useState(false);

  const { ref, inView } = useInView({
    rootMargin: '0px 0px',
    threshold: 0.1,
  });

  const { isLoaded } = useContext(LoadedContext);

  useEffect(() => {
    if (inView && !isLoaded) {
      setTimeout(() => {
        setLoadedInView(true);
      }, 1000);
    } else if (inView) {
      setLoadedInView(true);
    } else {
      setLoadedInView(inView);
    }
  }, [isLoaded, inView]);

  return (
    <Box
      sx={
        [
          {
            display: 'flex',
            flex: {
              xs: 'unset',
              sm: 5,
            },
            position: 'relative',
            mask: {
              xs: 'none',
              sm: 'url(/cutout.svg) no-repeat',
            },
            WebkitMaskImage: {
              xs: '-webkit-radial-gradient(white, black)',
              sm: 'url(/cutout.svg) no-repeat',
            },
            maskPosition: {
              xs: 'inherit',
              sm: 'center',
            },
            height: {
              xs: '100vw',
              sm: '568px',
            },
            width: {
              xs: '100vw',
              sm: 'inherit',
            },
            borderRadius: {
              xs: '50%',
              sm: '0',
            },
            overflow: 'hidden',
            mb: {
              xs: 4,
              sm: 0,
            },
          },
          {
            '& > img': {
              borderRadius: {
                xs: '0%',
                sm: 0,
              },
              WebkitMaskImage: '-webkit-radial-gradient(white, black)',
            },
          },
        ]
    }
    >
      <img
        src={src}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transition: 'transform 1s ease',
          transformOrigin: 'center',
          transform: loadedInView ? imageZoom(zoom) : imageZoom(zoomStart),
        }}
        alt={alt}
        ref={ref}
      />
      <Box>
        {overlay && (
          <img
            src={overlay}
            style={{
              position: 'absolute',
              zIndex: 12,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            alt={overlayAlt}
          />
        )}
      </Box>
    </Box>
  );
}

MobileImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  overlay: PropTypes.string,
  overlayAlt: PropTypes.string,
  zoom: PropTypes.shape({
    scale: PropTypes.number.isRequired,
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
  }).isRequired,
  zoomStart: PropTypes.shape({
    scale: PropTypes.number.isRequired,
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
  }).isRequired,
};

MobileImage.defaultProps = {
  overlay: '',
  overlayAlt: '',
};
