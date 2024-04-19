import { Box, Typography } from '@mui/material';
import { Nft } from 'alchemy-sdk';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import ModalImage from './ModalImage';
import {
  fadeInLeftToCenter,
  fadeInRightToCenter,
  fadeOutLeftFromCenter,
  fadeOutRightFromCenter,
} from './animations';

type ModalViewProps = {
  asset: Nft | null;
  deselectAsset: () => void;
  selectedAssetIndex: number | null;
  setSelectedAssetIndex: (index: number) => void;
};

const ModalView = ({
  asset,
  deselectAsset,
  selectedAssetIndex,
  setSelectedAssetIndex,
}: ModalViewProps) => {
  const [fadingDir, setFadingDir] = useState<'left' | 'right' | null>(null);

  const goNext = () => {
    if (zoomed) return;
    setFadingDir('left');
    setTimeout(() => {
      setSelectedAssetIndex((selectedAssetIndex || 0) + 1);
      setZoomed(false);
      setTimeout(() => setFadingDir(null), 200);
    }, 200);
  };

  const goPrev = () => {
    if (zoomed) return;
    setFadingDir('right');
    setTimeout(() => {
      setSelectedAssetIndex((selectedAssetIndex || 0) - 1);
      setZoomed(false);
      setTimeout(() => setFadingDir(null), 200);
    }, 200);
  };

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          close();
          break;
        case 'ArrowRight':
          setZoomed(false);
          goNext();
          break;
        case 'ArrowLeft':
          setZoomed(false);
          goPrev();
          break;
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [selectedAssetIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
  });

  const [showOverlay, setShowOverlay] = useState(false);
  const [fadeInOverlay, setFadeInOverlay] = useState(false);
  useEffect(() => {
    if (asset) {
      setShowOverlay(true);
      setTimeout(() => setFadeInOverlay(true), 100);
    } else {
      setFadeInOverlay(false);
      setTimeout(() => {
        setShowOverlay(false);
      }, 1000);
    }
  }, [asset]);

  const scrollRef = useRef<Element>();
  useEffect(() => {
    if (asset) {
      disableBodyScroll(scrollRef.current!);
    } else {
      clearAllBodyScrollLocks();
    }
  }, [asset]);

  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgLoadedDelayed, setImageLoadedDelayed] = useState(false);
  useEffect(() => {
    setImgLoaded(false);

    // add 5 second delay to removing loading spinner no matter what
    setTimeout(() => {
      setImageLoadedDelayed(true);
    }, 5000);
  }, [asset]);

  useEffect(() => {
    if (!imgLoaded) {
      setImageLoadedDelayed(false);
    } else {
      setTimeout(() => {
        setImageLoadedDelayed(true);
      }, 1000);
    }
  }, [imgLoaded]);

  const [zoomed, setZoomed] = useState(false);
  const close = () => {
    setZoomed(false);
    deselectAsset();
  };
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        height: '100vh',
        width: '100vw',
        zIndex: showOverlay ? 100 : -1,
        display: showOverlay ? 'block' : 'none',
        backgroundColor: fadeInOverlay
          ? 'rgba(0, 0, 0, 0.5)'
          : 'rgba(0, 0, 0, 0)',
        backdropFilter: fadeInOverlay ? 'blur(10px) saturate(70%)' : 'none',
        transition: 'all ease-out 1s',
      }}
      ref={scrollRef}
    >
      {asset ? (
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            opacity: fadeInOverlay ? 1 : 0,
            transform: fadeInOverlay ? 'translateY(0)' : 'translateY(-10%)',
            transition: 'all 0.2s ease-out',
          }}
          {...handlers}
        >
          <Box
            sx={{
              ':hover': {
                cursor: 'url("/gallery/prev.png"), pointer',
              },
              position: 'absolute',
              zIndex: 21,
              top: 0,
              bottom: 0,
              left: 0,
              right: '70%',
            }}
            onClick={() => {
              goPrev();
            }}
          />
          <Box
            sx={{
              ':hover': {
                cursor: 'url("/gallery/next.png"), pointer',
              },
              position: 'absolute',
              zIndex: 21,
              top: 0,
              bottom: 0,
              right: 0,
              left: '70%',
            }}
            onClick={() => {
              goNext();
            }}
          />
          <Box
            sx={{
              position: 'relative',
              height: {
                xs: '80vh',
                md: zoomed ? '100vh' : '90vh',
              },
              width: {
                xs: '90vw',
                md: zoomed ? '100vw' : '80vw',
              },
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              animation: fadingDir
                ? `0.2s ease-out 0s ${
                    fadingDir === 'left'
                      ? fadeOutLeftFromCenter
                      : fadeOutRightFromCenter
                  }, 0.2s ease-in 0.2s ${
                    fadingDir === 'left'
                      ? fadeInRightToCenter
                      : fadeInLeftToCenter
                  }`
                : 'none',
              transition: 'height 0.2s ease-out, width 0.2s ease-out',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                cursor: zoomed ? 'zoom-out' : 'zoom-in',
                maxWidth: '100vw',
                overflow: zoomed ? 'scroll' : 'hidden',
                zIndex: zoomed ? 30 : 20,
              }}
              onClick={(e) => {
                setMouseCoordinates({ x: e.pageX, y: e.pageY });
                setZoomed(!zoomed);
              }}
            >
              <ModalImage
                asset={asset}
                coordinates={mouseCoordinates}
                imgLoaded={imgLoaded}
                imgLoadedDelayed={imgLoadedDelayed}
                setImgLoaded={setImgLoaded}
                setZoomed={setZoomed}
                zoomed={zoomed}
                mobile
              />
              <ModalImage
                asset={asset}
                coordinates={mouseCoordinates}
                imgLoaded={imgLoaded}
                imgLoadedDelayed={imgLoadedDelayed}
                setImgLoaded={setImgLoaded}
                setZoomed={setZoomed}
                zoomed={zoomed}
                mobile={false}
              />
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    display: zoomed ? 'none' : 'block',
                  }}
                >
                  {asset.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: {
                      xs: 'block',
                      md: 'none',
                    },
                    mt: 1,
                    fontSize: 12,
                  }}
                >
                  Tap to zoom
                </Typography>
                <Typography
                  variant="body2"
                  onClick={close}
                  fontSize={16}
                  sx={{
                    mt: 2,
                    p: 1,
                    border: '1px solid white',
                    display: {
                      xs: 'block',
                      md: 'none',
                    },
                  }}
                >
                  Close
                </Typography>
              </Box>
            </Box>
          </Box>
          <Typography
            variant="body2"
            sx={{
              position: 'absolute',
              top: 35,
              right: 35,
              padding: 2,
              cursor: 'pointer',
              color: 'white',
              borderBottomLeftRadius: 2,
              border: '1px solid white',
              background: 'rgba(0, 0, 0, 0.2)',
              fontSize: 16,
              zIndex: 31,
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
            onClick={close}
          >
            Close
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default ModalView;
