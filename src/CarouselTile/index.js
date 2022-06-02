import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import tiles from '../tiles.json';
import DesktopTiles from './DesktopTiles';

export default function CarouselTile({ selectedTileIndex }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
      }}
    >
      <DesktopTiles selectedTileIndex={selectedTileIndex} tiles={tiles} />
    </Box>
  );
}

CarouselTile.propTypes = {
  selectedTileIndex: PropTypes.number.isRequired,
};
