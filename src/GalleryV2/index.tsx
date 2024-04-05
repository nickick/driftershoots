import { Box, Container } from '@mui/material';
import { Nft } from 'alchemy-sdk';
import random from 'random-seed';
import { useContext, useEffect, useState } from 'react';
import assetsJson from '../../public/gallery/assets.json';
import { LoadedContext } from '../LoadedContextProvider';
import ModalView from './ModalView';
import ThumbnailTile from './ThumbnailTile';
import Filter from './Filter';

const randomSeed = random.create('tothemoon');

const assets = assetsJson as Nft[];

type GalleryV2Props = {};

const GalleryV2 = (params: GalleryV2Props) => {
  const [selectedAsset, setSelectedAsset] = useState<Nft | null>(null);
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | null>(
    null
  );
  const { animationDelay } = useContext(LoadedContext);

  const selectAsset = (asset: Nft, index: number) => {
    setSelectedAsset(asset);
    setSelectedAssetIndex(index);
  };
  const deselectAsset = () => {
    setSelectedAsset(null);
    setSelectedAssetIndex(null);
  };

  const setNextIndex = (nextIndex: number) => {
    const newIndex =
      nextIndex < 0
        ? assets.length - 1
        : nextIndex >= assets.length
        ? 0
        : nextIndex;
    setSelectedAsset(assets[newIndex]);
    setSelectedAssetIndex(newIndex);
  };

  const [filteredAssets, setFilteredAssets] = useState<Nft[]>(assets);
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    console.log(filters)
    if (filters.length === 0) {
      setFilteredAssets(assets);
    } else {
      setFilteredAssets(
        assets.filter((asset) => {
          return asset.raw.metadata.attributes?.some((attr: {value: string}) => filters.includes(attr.value));
        })
      );
    }
  }, [filters]);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        zIndex: 3,
        minHeight: '80vh',
        overflowX: 'hidden',
        px: {
          xs: 2,
          md: 5,
        },
        pt: {
          xs: 3,
          md: 5,
        },
      }}
    >
      <Filter activeFilters={filters} setFilters={setFilters} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: {
            xs: '10px',
            md: '20px',
          },
        }}
      >
        {filteredAssets.map((asset, index) => {
          return (
            <ThumbnailTile
              asset={asset}
              index={index}
              selectAsset={selectAsset}
              randomSeed={randomSeed}
              animationDelay={animationDelay}
              filters={filters}
              mobile
            />
          );
        })}
        {filteredAssets.map((asset, index) => {
          return (
            <ThumbnailTile
              asset={asset}
              index={index}
              selectAsset={selectAsset}
              randomSeed={randomSeed}
              animationDelay={animationDelay}
              filters={filters}
              mobile={false}
            />
          );
        })}
      </Box>
      <ModalView
        asset={selectedAsset}
        selectedAssetIndex={selectedAssetIndex}
        setSelectedAssetIndex={setNextIndex}
        deselectAsset={deselectAsset}
      />
    </Container>
  );
};

export { GalleryV2 };
