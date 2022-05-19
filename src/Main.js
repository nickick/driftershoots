import { Container } from '@mui/material';
import { useState } from 'react';

import CarouselTile from './CarouselTile';
import tiles from './tiles.json';

export default function Main ({selectedTileIndex}) {
  return (
    <Container
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        flex: 1,
        overflow: 'auto',
        px: 4,
        maxWidth: '1440px'
      }}
    >
      <CarouselTile tile={tiles[selectedTileIndex]} />
    </Container>
  )
}