import { Box } from '@mui/material';
import { useState } from 'react';
import {
  Footer, Main, Navbar, Selector,
} from '../src';

function App() {
  const [selectedTileIndex, setSelectedTileIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Navbar />
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
      <Footer />
    </Box>
  );
}

export default App;
