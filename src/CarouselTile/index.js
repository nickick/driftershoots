import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import tiles from '../tiles.json';
import DesktopTiles from './DesktopTiles';
import MobileTiles from './MobileTiles';

export default function CarouselTile({ selectedTileIndex }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        width: '100%',
      }}
    >
      <DesktopTiles selectedTileIndex={selectedTileIndex} tiles={tiles} />
      <MobileTiles tiles={tiles} />
    </Box>
  );
}

CarouselTile.propTypes = {
  selectedTileIndex: PropTypes.number.isRequired,
};
