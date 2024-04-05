import { Box, Typography } from "@mui/material";
import { Nft } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { fadeIn, fadeInLeftToCenter, fadeInRightToCenter, fadeOutLeftFromCenter, fadeOutRightFromCenter } from "./animations";

type ModalViewProps = {
  asset: Nft | null;
  deselectAsset: () => void;
  selectedAssetIndex: number | null;
  setSelectedAssetIndex: (index: number) => void;
}

const ModalView = ({
  asset,
  deselectAsset,
  selectedAssetIndex,
  setSelectedAssetIndex,
}: ModalViewProps) => {
  const [fadingDir, setFadingDir] = useState<'left' | 'right' | null>(null);

  const goNext = () => {
    setFadingDir('left');
    setTimeout(() => {
      setSelectedAssetIndex((selectedAssetIndex || 0) + 1);
      setTimeout(() => setFadingDir(null), 200);
    }, 200);
  };

  const goPrev = () => {
    setFadingDir('right');
    setTimeout(() => {
      setSelectedAssetIndex((selectedAssetIndex || 0) - 1);
      setTimeout(() => setFadingDir(null), 200);
    }, 200);
  }

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          deselectAsset();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "ArrowLeft":
          goPrev();
          break;
      }
    }

    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [selectedAssetIndex])

  const handlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
  })

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

  return (
    <Box sx={{
      position: 'fixed',
      inset: 0,
      height: '100vh',
      width: '100vw',
      zIndex: showOverlay ? 100 : -1,
      display: showOverlay ?  'block' : 'none',
      backgroundColor: fadeInOverlay ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
      backdropFilter: fadeInOverlay ? 'blur(10px) saturate(70%)' : 'none',
      transition: 'all ease-out 1s',
    }}
    >
      {asset ? (
      <Box sx={{
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
              ":hover": {
                cursor: 'url("/gallery/prev.png"), pointer'
              },
              position: 'absolute',
              zIndex: 2,
              top: 0,
              bottom: 0,
              left: 0,
              right: '70%',
            }}
            onClick={goPrev}
          />
          <Box
            sx={{
              ":hover": {
                cursor: 'url("/gallery/next.png"), pointer'
              },
              position: 'absolute',
              zIndex: 2,
              top: 0,
              bottom: 0,
              right: 0,
              left: '70%',
            }}
            onClick={goNext}
          />
          <Box
            sx={{
              position: 'relative',
              height: '80vh',
              width: '80vw',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              animation: fadingDir ? `0.2s ease-out 0s ${fadingDir === 'left' ? fadeOutLeftFromCenter : fadeOutRightFromCenter}, 0.2s ease-in 0.2s ${fadingDir === 'left' ? fadeInRightToCenter: fadeInLeftToCenter}` : 'none',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                height: '90%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <img
                src={asset.image.cachedUrl || asset.image.originalUrl || ''}
                alt={asset.name || ''}
                key={`${asset.name}-${asset.image.originalUrl}`}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  maxHeight: '70vh',
                }}
              />
              <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: 2,
              }}>
                <Typography variant="h4">
                  {asset.name}
                </Typography>
                <Typography
                  variant="body2"
                  onClick={deselectAsset}
                  fontSize={16}
                  sx={{
                    mt: 2,
                    p: 1,
                    border: '1px solid white',
                    display: {
                      xs: 'block',
                      md: 'none',
                    }
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
            top: 0,
            right: 12,
            padding: 4,
            cursor: 'pointer',
            color: 'white',
            borderBottomLeftRadius: 2,
            fontSize: 16,
            zIndex: 10,
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
          onClick={deselectAsset}
        >
          Close
        </Typography>
        </Box>
      ) : null}
    </Box>
  )
}

export default ModalView