import { Box } from '@mui/material';
import { useState } from 'react';
import {
  Footer, Main, Navbar, Selector,
} from '../src';

function App() {
  const [selectedTileIndex, setSelectedTileIndex] = useState(0);

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
        <Main selectedTileIndex={selectedTileIndex} />
        <Selector
          selectedTileIndex={selectedTileIndex}
          setSelectedTileIndex={setSelectedTileIndex}
        />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
