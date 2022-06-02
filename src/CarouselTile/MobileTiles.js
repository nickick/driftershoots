import { Box } from '@mui/material';
import { tilesProps } from '../utils/prop-types';

export default function MobileTiles({ tiles }) {
  return (
    <Box
      sx={{
        display: {
          xs: 'flex',
          md: 'none',
          width: '100%',
        },
        flexDirection: 'column',
        m: 4,
      }}
    >
      {tiles.map((tile) => (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
          }}
          key={tile.title}
        >
          <Box
            sx={{
              display: 'flex',
              flex: 5,
              position: 'relative',
              mask: 'url(/cutout.svg)',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
            }}
          >
            <img
              src={tile['main-image']}
              style={{
                width: '100%',
              }}
              alt={tile['main-image-alt']}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flex: 3,
            }}
          >
            Text
          </Box>
        </Box>
      ))}
    </Box>
  );
}

MobileTiles.propTypes = {
  tiles: tilesProps.isRequired,
};
