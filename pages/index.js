import { useState } from 'react';
import { Main, Selector } from '../src';

function App() {
  const [selectedTileIndex, setSelectedTileIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  return (
    <>
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
    </>
  );
}

export default App;
