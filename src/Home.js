import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import CarouselTile from './CarouselTile';
import { LoadedContext } from './LoadedContextProvider';

export default function Main({ selectedTileIndex, transitioning, setTransitioning }) {
  const { setBackgroundImage, setBackgroundOpacity } = useContext(LoadedContext);

  useEffect(() => {
    setBackgroundOpacity(0);
    setTimeout(() => {
      setBackgroundImage('');
    }, 1000);
  }, [setBackgroundImage, setBackgroundOpacity]);

  return (
    <Container
      sx={{
        color: 'text.primary',
        flex: 1,
        overflow: 'auto',
        px: 4,
        maxWidth: '1400px',
        position: 'relative',
        zIndex: 3,
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
