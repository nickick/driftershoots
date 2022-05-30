import { Gallery, GalleryContextProvider } from '../../src';

export default function GalleryPage() {
  return (
    <GalleryContextProvider>
      <Gallery />
    </GalleryContextProvider>
  );
}
