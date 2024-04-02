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
        {assets.map((asset) => {
          return(<Box key={`${asset.name}-mobile`} sx={{
            display: {
              xs: "block",
              md: "none",
            }
          }}>
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
      {assets.map((asset) => {
        return(<Box key={asset.name} sx={{
          display: {
            xs: "none",
            md: "block",
          }
        }}>
          <img
            src={`gallery/thumbnails/${reduceName(asset.name)}.png`}
            alt={asset.name}
            style={{
              width: "auto",
              height: "100px",
              objectFit: "cover",
            }}
          />
        </Box>)
      })}
      </Box>

    </Container>
  )
}

export { GalleryV2 };