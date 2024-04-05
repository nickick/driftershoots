import { Box, CircularProgress } from "@mui/material";
import { Nft } from "alchemy-sdk";
import { reduceName } from "../../scripts/helpers";

type ModalImageProps = {
  asset: Nft;
  imgLoaded: boolean;
  imgLoadedDelayed: boolean;
  mobile: boolean;
  setImgLoaded: (loaded: boolean) => void;
}
const ModalImage = ({
  asset,
  imgLoaded,
  imgLoadedDelayed,
  mobile,
  setImgLoaded,
}: ModalImageProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: {
          xs: mobile ? 'flex' : 'none',
          md: !mobile ? 'flex' : 'none',
        },
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: 'fit-content',
        width: '100%',
      }}
    >
      <img
        src={imgLoaded ? asset.image.cachedUrl || asset.image.originalUrl || '' : `/gallery/thumbnails/${reduceName(asset.name)}.png`}
        alt={asset.name || ''}
        key={`${asset.name}-${asset.image.originalUrl}`}
        style={{
          objectFit: 'contain',
          width: '100%',
          maxHeight: mobile ? '50vh' : '80vh',
        }}
        onLoad={() => {
          setImgLoaded(true);
        }}
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