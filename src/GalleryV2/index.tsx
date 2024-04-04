import { Container, Box } from "@mui/material";
import assetsJson from "../../public/gallery/assets.json";
import { reduceName } from "../../scripts/helpers";
import { Nft } from "alchemy-sdk";
import ModalView from "./ModalView";
import { useState } from "react";

const assets = assetsJson as Nft[];

type GalleryV2Props = {
}

const GalleryV2 = (params:GalleryV2Props) => {
  const [selectedAsset, setSelectedAsset] = useState<Nft | null>(null);
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | null>(null);
  const selectAsset = (asset: Nft, index: number) => {
    setSelectedAsset(asset);
    setSelectedAssetIndex(index);
  }
  const deselectAsset = () => {
    setSelectedAsset(null);
    setSelectedAssetIndex(null);
  }

  const setNextIndex = (nextIndex: number) => {
    const newIndex = nextIndex < 0 ? assets.length - 1 : nextIndex >= assets.length ? 0 : nextIndex;
    setSelectedAsset(assets[newIndex]);
    setSelectedAssetIndex(newIndex);
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        zIndex: 3,
        minHeight: "80vh",
        overflowX: "hidden",
        px: {
          xs: 2,
          md: 5,
        },
        pt: {
          xs: 3,
          md: 5,
        }
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: {
          xs: "10px",
          md: "20px",
        },
      }}>
        {assets.map((asset, index) => {
          return(
          <Box key={`${reduceName(asset.name)}-${asset.image.originalUrl}-mobile`}
            sx={{
              display: {
                xs: "block",
                md: "none"
              }
            }}
            onClick={() => selectAsset(asset, index)}
          >
            <img
              src={`gallery/thumbnails/${reduceName(asset.name)}.png`}
              alt={asset.name}
              style={{
                width: "auto",
                height: "50px",
                objectFit: "cover",
              }}
            />
          </Box>)
        })}
      {assets.map((asset, index) => {
        return(
          <Box
            key={`${reduceName(asset.name)}-${asset.image.originalUrl}`}
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
              ":hover": {
                cursor: "pointer",
                opacity: 0.7,
              },
              transition: "all 0.3s ease-in-out",
            }}
            onClick={() => selectAsset(asset, index)}
          >
            <img
              src={`gallery/thumbnails/${reduceName(asset.name)}.png`}
              alt={asset.name}
              style={{
                width: "auto",
                height: "100px",
                objectFit: "cover",
              }}
            />
          </Box>
        )
      })}
      </Box>
      <ModalView
        asset={selectedAsset}
        selectedAssetIndex={selectedAssetIndex}
        setSelectedAssetIndex={setNextIndex}
        deselectAsset={deselectAsset}
      />
    </Container>
  )
}

export { GalleryV2 };