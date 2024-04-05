import { Box } from "@mui/material";
import { Nft } from "alchemy-sdk"
import { reduceName } from "../../scripts/helpers";
import type { RandomSeed } from 'random-seed'
import { entranceAnimationDuration } from "../constants";
import { useEffect, useState } from "react";

type ThumbnailTileProps = {
  asset: Nft;
  index: number;
  mobile: boolean;
  randomSeed: RandomSeed;
  selectAsset: (asset: Nft, index: number) => void;
}

const ThumbnailTile = ({ asset, index, selectAsset, randomSeed, mobile }: ThumbnailTileProps) => {
  const additionalDelay = randomSeed.floatBetween(0, 0.5);

  const [hasFadedIn, setHasFadedIn] = useState(false);
  useEffect(() => {
    setTimeout(() => setHasFadedIn(true), (entranceAnimationDuration + additionalDelay) * 1000);
  }, []);

  return (
    <Box
      key={`${reduceName(asset.name)}-${asset.image.originalUrl}`}
      sx={{
        display: {
          xs: mobile ? "block" : "none",
          md: mobile ? "none" : "block",
        },
        ":hover": {
          cursor: "pointer",
          opacity: 0.7,
        },
        transition: "all 0.3s ease-in-out",
        transform: hasFadedIn ? "translateY(0)" : "translateY(-10%)",
        opacity: hasFadedIn ? 1 : 0,
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
}

export default ThumbnailTile