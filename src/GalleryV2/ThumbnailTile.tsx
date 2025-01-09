import { Box } from '@mui/material';
import { Nft } from 'alchemy-sdk';
import type { RandomSeed } from 'random-seed';
import { useEffect, useState } from 'react';
import { reduceName } from '../../scripts/helpers';
import { entranceAnimationDuration } from '../constants';

type ThumbnailTileProps = {
  animationDelay: number;
  asset: Nft;
  filters: string[];
  height: number;
  index: number;
  mobile: boolean;
  randomSeed: RandomSeed;
  selectAsset: (asset: Nft, index: number) => void;
};

const ThumbnailTile = ({
  animationDelay,
  asset,
  filters,
  height,
  index,
  selectAsset,
  randomSeed,
  mobile,
}: ThumbnailTileProps) => {
  const additionalDelay = randomSeed.floatBetween(0, 0.5);
  const entryDelay =
    animationDelay > 0 ? entranceAnimationDuration : animationDelay;

  const [hasFadedIn, setHasFadedIn] = useState(false);
  useEffect(() => {
    setTimeout(
      () => setHasFadedIn(true),
      (entryDelay + additionalDelay) * 1000
    );
  }, []);
  useEffect(() => {
    setHasFadedIn(false);
    setTimeout(
      () => setHasFadedIn(true),
      (entryDelay + additionalDelay) * 1000
    );
  }, [filters]);

  return (
    <Box
      key={`${reduceName(asset.name)}-${asset.image.originalUrl}-${
        mobile ? 'mobile' : 'desktop'
      }`}
      sx={{
        display: {
          xs: mobile ? 'block' : 'none',
          md: mobile ? 'none' : 'block',
        },
        ':hover': {
          cursor: 'pointer',
          opacity: 0.7,
        },
        transition: 'all 0.3s ease-in-out',
        transform: hasFadedIn ? 'translateY(0)' : 'translateY(-10%)',
        opacity: hasFadedIn ? 1 : 0,
      }}
      onClick={() => selectAsset(asset, index)}
    >
      <img
        src={`${reduceName(asset.image.thumbnailUrl)}`}
        alt={asset.name}
        style={{
          width: 'auto',
          height: `${height}px`,
          objectFit: 'cover',
          transition: 'all 1s ease-in-out',
        }}
      />
    </Box>
  );
};

export default ThumbnailTile;
