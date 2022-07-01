import { Box } from '@mui/material';
import Head from 'next/head';
import Contact from '../src/Contact';

export default function ContactPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: {
          xs: 'inherit',
          md: '70vh',
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
        <meta name="description" content="Contact Driftershoots" />
        <meta property="og:title" content="Driftershoots.com" />
        <meta property="og:description" content="Contact Driftershoots" />
        <meta property="og:url" content="https://driftershoots.com/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@driftershoots" />
        <meta name="twitter:creator" content="@pepperonick" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Contact />
    </Box>
  );
}
