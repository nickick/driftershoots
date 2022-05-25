import { Container } from '@mui/material';
import CarouselTile from './CarouselTile';

export default function Main ({selectedTileIndex, transitioning, setTransitioning}) {
  return (
    <Container
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        flex: 1,
        overflow: 'auto',
        px: 4,
        maxWidth: '1440px',
        position: 'relative',
      }}
    >
      <CarouselTile 
        selectedTileIndex={selectedTileIndex} 
        transitioning={transitioning}
        setTransitioning={setTransitioning}
      />
    </Container>
  )
}