import { Box, Container } from '@mui/material';
import { Nft } from 'alchemy-sdk';
import random from 'random-seed';
import { useContext, useEffect, useState } from 'react';
import assetsJson from '../../public/gallery/assets.json';
import { LoadedContext } from '../LoadedContextProvider';
import Filter from './Filter';
import ModalView from './ModalView';
import ThumbnailTile from './ThumbnailTile';
import GridSizer, { GRID_SIZES } from './GridSizer';

const randomSeed = random.create('tothemoon');

const assets = assetsJson as Nft[];

const GalleryV2 = () => {
  const [selectedAsset, setSelectedAsset] = useState<Nft | null>(null);
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | null>(
    null
  );
  const { animationDelay, isLoaded } = useContext(LoadedContext);

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

  const [gridSize, setGridSize] = useState<keyof typeof GRID_SIZES>("LARGE");
  const gridGap = gridSize === 'LARGE' ? 10 : gridSize === 'MEDIUM' ? 5 : 5;
  const tileHeight = gridSize === 'LARGE' ? 100 : gridSize === 'MEDIUM' ? 75 : 50;
  const mobileTileHeight = gridSize === 'LARGE' ? 60 : gridSize === 'MEDIUM' ? 50 : 42;

  useEffect(() => {
    if (filters.length === 0) {
      setFilteredAssets(assets);
    } else {
      setFilteredAssets(
        assets.filter((asset) => {
          return asset.raw.metadata.attributes?.some(
            (attr: { value: string }) => filters.includes(attr.value)
          );
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
      <Box
        sx={{
          opacity: isLoaded ? 1 : 0,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Filter activeFilters={filters} setFilters={setFilters} />
        <GridSizer gridSize={gridSize} setGridSize={setGridSize} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          transition: 'gap 0.3s ease-in-out',
          gap: {
            xs: `${gridGap / 2}px`,
            md: `${gridGap}px`,
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
              height={mobileTileHeight}
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
              height={tileHeight}
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
