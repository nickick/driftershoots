import { Box, keyframes } from '@mui/material';
import PropTypes from 'prop-types';
import { entranceAnimationDelay, entranceAnimationDuration } from '../constants';
import { tilesProps } from '../utils/prop-types';

const fadeIn = keyframes`
  0% {
    -webkit-transform: scale(1.1);
            transform: translateX(1.1);
            opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
  }
`;

export default function CenterImage({ tiles, selectedTileIndex }) {
  const selected = true;

  const tile = tiles[selectedTileIndex];

  return (
    <Box
      sx={{
        display: 'flex',
        flex: '4',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        m: '6rem',
        zIndex: '1',
        animation: `${fadeIn} ${entranceAnimationDuration}s both ${entranceAnimationDelay + 0.2}s`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          height: '100%',
          overflow: 'hidden',
          maxHeight: '800px',
        }}
      >
        <img
          src="/cutout.png"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 11,
            width: '100%',
            height: '100%',
          }}
          alt="Overlay used over other images to provide rounded edges"
        />
        <img
          src={tile['main-image']}
          style={{
            transition: 'transform 1s ease',
            transform: selected ? tile['main-image-zoom'] : tile['main-image-zoom-start'],
          }}
          alt={tile['main-image-alt']}
        />
        {tile['main-image-overlay'] && (
          <img
            src={tile['main-image-overlay']}
            style={{
              position: 'absolute',
              zIndex: 12,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            alt={tile['main-image-overlay-alt']}
          />
        )}
      </Box>
    </Box>
  );
}

CenterImage.propTypes = {
  tiles: tilesProps.isRequired,
  selectedTileIndex: PropTypes.number.isRequired,
};
