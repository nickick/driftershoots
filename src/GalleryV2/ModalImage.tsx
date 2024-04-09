import { Box, CircularProgress } from "@mui/material";
import { Nft } from "alchemy-sdk";
import { reduceName } from "../../scripts/helpers";
import { useEffect, useRef } from "react";

type ModalImageProps = {
  asset: Nft;
  coordinates: { x: number; y: number };
  imageContainerRef: React.RefObject<HTMLDivElement>;
  imgLoaded: boolean;
  imgLoadedDelayed: boolean;
  mobile: boolean;
  setImgLoaded: (loaded: boolean) => void;
  setZoomed: (zoomed: boolean) => void;
  zoomed: boolean;
}
const ModalImage = ({
  asset,
  coordinates,
  imageContainerRef,
  imgLoaded,
  imgLoadedDelayed,
  mobile,
  setImgLoaded,
  zoomed,
}: ModalImageProps) => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (zoomed) {
      const body = document.querySelector('body')!;
      const { x, y } = coordinates;
      setTimeout(() => {
        const image = imageRef.current! as HTMLImageElement;
        (imageContainerRef.current! as HTMLDivElement).scrollTo({left: (x / body.clientWidth * image.width) / 2, top: (y / body.clientHeight * image.height) / 2, behavior: 'smooth'});
      }, 250);
    }
  }, [coordinates.x, coordinates.y]);

  return (
    <Box
      sx={{
        position: zoomed ? 'absolute' : 'relative',
        top: zoomed ? 0 : 'unset',
        left: zoomed ? 0 : 'unset',
        display: {
          xs: mobile ? 'flex' : 'none',
          md: !mobile ? 'flex' : 'none',
        },
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: 'fit-content',
        width: zoomed ? '200%' : '100%',
      }}
      onClick={(e) => {
        const image = imageRef.current! as HTMLImageElement;
      }}
    >
      <img
        src={imgLoaded ? asset.image.cachedUrl || asset.image.originalUrl || '' : `/gallery/thumbnails/${reduceName(asset.name)}.png`}
        alt={asset.name || ''}
        key={`${asset.name}-${asset.image.originalUrl}`}
        style={{
          objectFit: zoomed ? 'cover' : 'contain',
          width: '100%',
          maxHeight: mobile ? '50vh' : zoomed ? 'unset' : '80vh',
        }}
        onLoad={() => {
          setImgLoaded(true);
        }}
        ref={imageRef}
      />
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 1,
          zIndex: 20,
        }}
      >
        <CircularProgress color="info" sx={{
          opacity: !imgLoadedDelayed ? 1 : 0,
        }}
        />
      </Box>
    </Box>
  );
}

export default ModalImage