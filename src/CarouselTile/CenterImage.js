import { Box, keyframes } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { entranceAnimationDuration } from '../constants';
import isSafari from '../utils/isSafari';
import { tilesProps } from '../utils/prop-types';

const transitionStyles = {
  entering: { opacity: 1, visibility: 'visible' },
  entered: { opacity: 1, visibility: 'visible' },
  exiting: { opacity: 0, visibility: 'visible' },
  exited: { opacity: 0, visibility: 'hidden' },
};

const fadeIn = keyframes`
  0% {
    -webkit-transform: scale(1.1);
            transform: scale(1.1);
            opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
  }
`;

function FadeableImage({
  src,
  alt,
  overlay,
  overlayAlt,
  state,
  selected,
  zoom,
  startingZoom,
  offset,
  transitioning,
  animationDelay,
}) {
  let transformStyle = `translate(${offset[0]}px, ${offset[1]}px) translateZ(0)`;
  if (isSafari() || transitioning) {
    transformStyle = 'translateZ(0)';
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        position: 'absolute',
        left: 0,
        top: 0,
        transform: transformStyle,
        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
        animation: `${fadeIn} ${entranceAnimationDuration}s both ${animationDelay + 0.2}s`,
        ...transitionStyles[state],
      }}
      key={src}
    >
      <img
        src={src}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transition: 'transform 1s ease',
          transformOrigin: 'center',
          transform: selected ? zoom : startingZoom,
        }}
        alt={alt}
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
            ...transformStyle[state],
          }}
          alt={overlayAlt}
        />
      )}
    </Box>
  );
}

FadeableImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  overlay: PropTypes.string.isRequired,
  overlayAlt: PropTypes.string.isRequired,
  state: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited']).isRequired,
  selected: PropTypes.bool.isRequired,
  zoom: PropTypes.string.isRequired,
  startingZoom: PropTypes.string.isRequired,
  offset: PropTypes.array.isRequired,
  transitioning: PropTypes.bool.isRequired,
  animationDelay: PropTypes.number.isRequired,
};

function calculateOffset(parameter, offsetConstant) {
  return parameter * offsetConstant;
}

export default function CenterImage({
  tiles, selectedTileIndex, transitioning, animationDelay,
}) {
  const [imageOffset, setImageOffset] = useState([0, 0]);
  const cutoutRef = useRef();

  useEffect(() => {
    // disable mouse movement for 4 seconds to prevent weird svg clipping issues on load
    let enableCall = false;
    setTimeout(() => { enableCall = true; }, 4000);

    document.body.addEventListener('mousemove', (e) => {
      if (!enableCall) return;
      enableCall = false;
      const offsetConstant = -10;

      const documentMidpointY = document.body.offsetHeight / 2;
      const documentMidpointX = document.body.offsetWidth / 2;

      const percentX = ((e.pageX - documentMidpointX) / documentMidpointX);
      const percentY = ((e.pageY - documentMidpointY) / documentMidpointY);

      setImageOffset(
        [calculateOffset(percentX, offsetConstant),
          calculateOffset(percentY, offsetConstant)],
      );

      setTimeout(() => { enableCall = true; }, 100);
    });
  }, []);

  useEffect(() => {
    // add hack to fix random not displaying of cutout images ¯\_(ツ)_/¯
    cutoutRef.current.style['mask-size'] = 'contain';
    cutoutRef.current.style['-webkit-mask-size'] = 'contain';
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flex: '4 4',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        m: '3rem',
        zIndex: '1',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          height: '100%',
          overflow: 'hidden',
          maxHeight: '800px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            position: 'relative',
            mask: 'url(/cutout.svg)',
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
          }}
          ref={cutoutRef}
        >
          {tiles.map((tile, index) => (
            <Transition
              in={index === selectedTileIndex}
              timeout={0}
              key={tile.title}
            >
              {(state) => (
                <FadeableImage
                  src={tile['main-image']}
                  alt={tile['main-image-alt']}
                  overlay={tile['main-image-overlay']}
                  overlayAlt={tile['main-image-overlay-alt']}
                  zoom={tile['main-image-zoom']}
                  startingZoom={tile['main-image-zoom-start']}
                  state={state}
                  index={index}
                  selected={selectedTileIndex === index}
                  offset={imageOffset}
                  transitioning={transitioning}
                  animationDelay={animationDelay}
                />
              )}
            </Transition>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

CenterImage.propTypes = {
  animationDelay: PropTypes.number.isRequired,
  tiles: tilesProps.isRequired,
  transitioning: PropTypes.bool.isRequired,
  selectedTileIndex: PropTypes.number.isRequired,
};
