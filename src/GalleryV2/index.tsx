import { Container, Box } from "@mui/material";
import assetsJson from "../../public/gallery/assets.json";
import { reduceName } from "../../scripts/helpers";
import { Nft } from "alchemy-sdk";
import ModalView from "./ModalView";
import { useEffect, useState } from "react";
import random from 'random-seed'
import { fadeIn } from "./animations";
import { entranceAnimationDuration, entranceAnimationDelay } from '../../src/constants'
import ThumbnailTile from "./ThumbnailTile";

const randomSeed = random.create('tothemoon');

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

  const [hasFadedIn, setHasFadedIn] = useState(false);
  useEffect(() => {
    setTimeout(() => setHasFadedIn(true), entranceAnimationDuration * 1000);
  }, []);

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
        },
        opacity: hasFadedIn ? 1 : 0,
        animation: `${entranceAnimationDuration}s ease-in-out ${entranceAnimationDelay}s ${fadeIn}`
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
          <ThumbnailTile asset={asset} index={index} selectAsset={selectAsset} randomSeed={randomSeed} mobile />)
        })}
      {assets.map((asset, index) => {
        return(
          <ThumbnailTile asset={asset} index={index} selectAsset={selectAsset} randomSeed={randomSeed} mobile={false} />
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