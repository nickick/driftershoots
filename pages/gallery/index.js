import Head from 'next/head';
import { Gallery, GalleryContextProvider } from '../../src';

export default function GalleryPage() {
  return (
    <GalleryContextProvider>
      <Head>
        <meta property="og:image" content="https://driftershoots.com/open-graph.png" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Gallery for Driftershoots" />
        <meta property="og:type" content="website" />
        <meta name="description" content="Gallery for Driftershoots" />
        <meta property="og:title" content="Driftershoots.com" />
        <meta property="og:description" content="Gallery for Driftershoots" />
        <meta property="og:url" content="https://driftershoots.com/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@driftershoots" />
        <meta name="twitter:creator" content="@pepperonick" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Gallery />
    </GalleryContextProvider>
  );
}
