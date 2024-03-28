import { Container } from "@mui/material";

type GalleryV2Props = {
}

const GalleryV2 = (params:GalleryV2Props) => {
  return <div>
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        zIndex: 3,
        minHeight: "80vh",
        overflowX: "hidden",
        px: {
          xs: 0,
          md: 10,
        },
      }}
    >

    </Container>
  </div>
}

export { GalleryV2 };