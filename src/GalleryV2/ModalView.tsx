import { Box, Typography } from "@mui/material";
import { Nft } from "alchemy-sdk"
import Image from "next/image";

type ModalViewProps = {
  asset: Nft | null;
  deselectAsset: () => void;
  selectedAssetIndex: number | null;
}
const ModalView = ({asset, deselectAsset, selectedAssetIndex}: ModalViewProps) => {
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
          />
          <img src={asset.image.originalUrl} alt={asset.name} style={{
            height: '70vh',
            width: 'auto',
          }}/>
        <Typography
          variant="body2"
          sx={{
            position: 'absolute',
            top: 0,
            right: 12,
            padding: 4,
            cursor: 'pointer',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderBottomLeftRadius: 2,
            fontSize: 16,
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