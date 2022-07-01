import { Box } from '@mui/material';
import Head from 'next/head';
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
        height: {
          xs: 'inherit',
          md: '90vh',
        },
      }}
    >
      <Head>
        <meta property="og:image" content="https://driftershoots.com/open-graph.png" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Site for Driftershoots" />
        <meta property="og:type" content="website" />
        <meta name="description" content="Site for Driftershoots" />
        <meta property="og:title" content="Driftershoots.com" />
        <meta property="og:description" content="Site for Driftershoots" />
        <meta property="og:url" content="https://driftershoots.com/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@driftershoots" />
        <meta name="twitter:creator" content="@pepperonick" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
