import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

export default function MobileImage({
  src,
  alt,
  overlay,
  overlayAlt,
  zoom,
  zoomStart,
}) {
  const imageZoom = useCallback((zoomProp) => `scale(${zoomProp.scale * 0.9}) translate(${zoomProp.translateX + -5}%, ${zoomProp.translateY}%)`, []);
  const { ref, inView } = useInView({
    rootMargin: '-400px 0px',
  });

  return (
    <Box
      sx={{
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
      }}
    >
      <img
        src={src}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transition: 'transform 1s ease',
          transformOrigin: 'center',
          transform: inView ? imageZoom(zoom) : imageZoom(zoomStart),
        }}
        alt={alt}
        ref={ref}
      />
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
  );
}

MobileImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  overlay: PropTypes.string.isRequired,
  overlayAlt: PropTypes.string.isRequired,
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
