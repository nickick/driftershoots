import Head from 'next/head';
import { About } from '../src';

export default function AboutPage() {
  return (
    <>
      <Head>
        <meta property="og:image" content="https://driftershoots.com/open-graph.png" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="About Driftershoots" />
        <meta property="og:type" content="website" />
        <meta name="description" content="About Driftershoots" />
        <meta property="og:title" content="Driftershoots.com" />
        <meta property="og:description" content="About Driftershoots" />
        <meta property="og:url" content="https://driftershoots.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@driftershoots" />
        <meta name="twitter:creator" content="@pepperonick" />
        <meta name="twitter:description" content="About Driftershoots, retired Army special operations veteran and NFT photgrapher" />
        <meta name="twitter:image" content="https://driftershoots.com/open-graph.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <About />
    </>
  );
}
