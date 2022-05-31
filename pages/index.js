import { Box } from '@mui/material';
import { useState } from 'react';
import { Main, Selector } from '../src';

function App() {
  const [selectedTileIndex, setSelectedTileIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Main
        selectedTileIndex={selectedTileIndex}
        transitioning={transitioning}
        setTransitioning={setTransitioning}
      />
      <Selector
        setTransitioning={setTransitioning}
        selectedTileIndex={selectedTileIndex}
        setSelectedTileIndex={setSelectedTileIndex}
      />
    </Box>
  );
}

export default App;
