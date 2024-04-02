import { Container, Box } from "@mui/material";
import assetsJson from "../../public/gallery/assets.json";
import { reduceName } from "../../scripts/helpers";
import { Nft } from "alchemy-sdk";

const assets = assetsJson as Nft[];

type GalleryV2Props = {
}

const GalleryV2 = (params:GalleryV2Props) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        zIndex: 3,
        minHeight: "80vh",
        overflowX: "hidden",
        px: {
          xs: 0,
          md: 0,
        },
        pt: {
          xs: 5,
        }
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "20px",
      }}>
      {assets.map((asset) => {
        return(<div key={asset.name}>
          <img
            src={`gallery/thumbnails/${reduceName(asset.name)}.png`}
            alt={asset.name}
            style={{
              width: "auto",
              height: "100px",
              objectFit: "cover",
            }}
          />
        </div>)
      })}
      </Box>

    </Container>
  )
}

export { GalleryV2 };