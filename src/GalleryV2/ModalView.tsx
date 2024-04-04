import { Box, Typography } from "@mui/material";
import { Nft } from "alchemy-sdk";
import { useState } from "react";
import { fadeInLeftToCenter, fadeInRightToCenter, fadeOutLeftFromCenter, fadeOutRightFromCenter } from "./animations";

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

  return (
    <Box sx={{
      position: 'fixed',
      inset: 0,
      height: '100vh',
      width: '100vw',
      zIndex: asset ? 100 : -1,
      backgroundColor: asset ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
      backdropFilter: asset ? 'blur(10px) saturate(70%)' : 'none',
      transition: 'all 1s',
    }}
    >
      {asset ? (
      <Box sx={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        }}>
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
            onClick={() => {
              setFadingDir('right');
              setTimeout(() => {
                setSelectedAssetIndex((selectedAssetIndex || 0) - 1);
                setTimeout(() => setFadingDir(null), 200);
              }, 200);
            }}
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
            onClick={() => {
              setFadingDir('left');
              setTimeout(() => {
                setSelectedAssetIndex((selectedAssetIndex || 0) + 1);
                setTimeout(() => setFadingDir(null), 200);
              }, 200);
            }}
          />
          <Box
            sx={{
              animation: fadingDir ? `0.2s ease-out 0s ${fadingDir === 'left' ? fadeOutLeftFromCenter : fadeOutRightFromCenter}, 0.2s ease-in 0.2s ${fadingDir === 'left' ? fadeInRightToCenter: fadeInLeftToCenter}` : 'none',
            }}
          >
            <img src={asset.image.originalUrl} alt={asset.name} style={{
              height: '70vh',
              width: 'auto',
            }}/>
          </Box>
        <Typography
          variant="body2"
          sx={{
            position: 'absolute',
            top: {
              xs: 60,
              md: 0,
            },
            right: 12,
            padding: 4,
            cursor: 'pointer',
            color: 'white',
            borderBottomLeftRadius: 2,
            fontSize: 16,
            zIndex: 10,
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