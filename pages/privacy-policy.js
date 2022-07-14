import { Box } from '@mui/material';
import Head from 'next/head';
import PrivacyPolicy from '../src/PrivacyPolicy';

export default function PrivacyPolicyPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: {
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
        <meta property="og:image:alt" content="Privacy Policy for Driftershoots's site" />
        <meta property="og:type" content="website" />
        <meta name="description" content="Privacy Policy for Driftershoots's site" />
        <meta property="og:title" content="Driftershoots.com" />
        <meta property="og:description" content="Privacy Policy for Driftershoots's site" />
        <meta property="og:url" content="https://driftershoots.com/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@driftershoots" />
        <meta name="twitter:creator" content="@pepperonick" />
        <meta name="twitter:description" content="Privacy Policy for Driftershoots, retired Army special operations veteran and NFT photgrapher" />
        <meta name="twitter:image" content="https://driftershoots.com/open-graph.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PrivacyPolicy />
    </Box>
  );
}
