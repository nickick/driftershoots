import { Box, CircularProgress } from '@mui/material';
import { Nft } from 'alchemy-sdk';
import { reduceName } from '../../scripts/helpers';
import { useEffect, useRef } from 'react';

type ModalImageProps = {
  asset: Nft;
  coordinates: { x: number; y: number };
  imgLoaded: boolean;
  imgLoadedDelayed: boolean;
  mobile: boolean;
  setImgLoaded: (loaded: boolean) => void;
  setZoomed: (zoomed: boolean) => void;
  zoomed: boolean;
};
const ModalImage = ({
  asset,
  coordinates,
  imgLoaded,
  imgLoadedDelayed,
  mobile,
  setImgLoaded,
  zoomed,
}: ModalImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const zoomIn = zoomed && !mobile;

  useEffect(() => {
    if (zoomed) {
      const body = document.querySelector('body')!;
      const { x, y } = coordinates;
      setTimeout(() => {
        const image = imageRef.current! as HTMLImageElement;
        (imageContainerRef.current! as HTMLDivElement).scrollTo({
          left: (x / body.clientWidth) * image.width,
          top: (y / body.clientHeight) * image.height,
          behavior: 'smooth',
        });
      }, 250);
    }
  }, [coordinates.x, coordinates.y]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: {
          md: '100%',
        },
        width: '100%',
        display: {
          xs: mobile ? 'flex' : 'none',
          md: !mobile ? 'flex' : 'none',
        },
        justifyContent: 'center',
        alignItems: 'center',
        overflow: zoomIn ? 'scroll' : 'hidden',
      }}
      id="modal-relative-wrapper"
    >
      <Box
        sx={{
          position: zoomIn ? 'fixed' : 'relative',
          top: zoomIn ? (mobile ? 10 : 30) : 'unset',
          left: zoomIn ? (mobile ? 10 : 30) : 'unset',
          bottom: zoomIn ? (mobile ? 10 : 30) : 'unset',
          right: zoomIn ? (mobile ? 10 : 30) : 'unset',
          display: {
            xs: mobile ? 'flex' : 'none',
            md: !mobile ? 'flex' : 'none',
          },
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: {
            md: zoomIn && imgLoaded ? 'unset' : '100%',
          },
          width: zoomIn && imgLoaded ? 'unset' : '100%',
          overflow: zoomIn ? 'scroll' : 'hidden',
        }}
        ref={imageContainerRef}
      >
        {asset.image?.contentType?.includes('video') ? (
          <video controls autoPlay loop>
            <source
              src={asset.image.cachedUrl || asset.image.originalUrl || ''}
              type={asset.image.contentType || ''}
            />
          </video>
        ) : (
          <img
            src={
              imgLoaded
                ? asset.image.cachedUrl || asset.image.originalUrl || ''
                : `${reduceName(asset.image.thumbnailUrl)}`
            }
            alt={asset.name || ''}
            key={`${asset.name}-${asset.image.originalUrl}`}
            style={{
              objectFit: zoomIn ? 'cover' : 'contain',
              maxHeight: zoomIn ? '200vh' : mobile ? '60vh' : '80vh',
              height: zoomIn ? 'unset' : '100%',
              width: zoomIn ? 'unset' : '100%',
            }}
            onLoad={() => {
              setImgLoaded(true);
            }}
            ref={imageRef}
          />
        )}

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
          <CircularProgress
            color="info"
            sx={{
              opacity: !imgLoadedDelayed ? 1 : 0,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ModalImage;
