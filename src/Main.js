import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import CarouselTile from './CarouselTile';

export default function Main({ selectedTileIndex, transitioning, setTransitioning }) {
  return (
    <Container
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        flex: 1,
        overflow: 'auto',
        px: 4,
        maxWidth: '1400px',
        position: 'relative',
      }}
    >
      <CarouselTile
        selectedTileIndex={selectedTileIndex}
        transitioning={transitioning}
        setTransitioning={setTransitioning}
      />
    </Container>
  );
}

Main.propTypes = {
  selectedTileIndex: PropTypes.number.isRequired,
  transitioning: PropTypes.bool.isRequired,
  setTransitioning: PropTypes.func.isRequired,
};
