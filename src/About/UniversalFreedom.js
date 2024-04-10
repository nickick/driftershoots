import { Box, Typography } from "@mui/material";
import OutlinedButton from "../OutlinedButton";
import ZoomLazyImage from "./ZoomLazyImage";

export default function UniversalFreedom() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        my: {
          xs: 7,
          md: 14,
        },
      }}
    >
      <Box
        sx={{
          flex: 5,
          display: "flex",
          flexDirection: "column",
          pr: {
            xs: 0,
            md: 3,
          },
          mb: {
            xs: 6,
            md: 0,
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 6,
          }}
        >
          Despite the adversity he faced, Drift's work has since flourished. He
          has become one of the most sought-after photographers in the industry,
          emerging in the fine arts world and as a pioneer in photography. He
          has been featured in Rolling Stone, TIME, The New York Times, and many
          other notable publications.
        </Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: "2.5rem",
            mb: 4,
          }}
        >
          Drift reflects on his process over the last few years, “I've come to
          realize each is a snapshot not just of the world but of who I was at
          that point in time. They are living, breathing documentations of
          change, including the changes that have been brought forth in myself.”
          His work explores themes of self-authorization in the face of mass
          surveillance, race and the reclamation of bodily agency and
          surrealism, creating imagery on the absolute fringes of reality in an
          everlasting deeper dive into the divine.
        </Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: "2.5rem",
            mb: 6,
          }}
        >
          Drift's photography embodies the true essence of fine art, merging
          captivating visuals with a deep sense of emotion and purpose. His
          unique perspective and unbridled passion have earned him accolades and
          recognition from the most discerning art collectors and curators
          worldwide.
        </Typography>
        <OutlinedButton
          href="/gallery"
          text="View Gallery"
          fullWidth
          clientside
        >
          <Typography
            variant="h4"
            sx={{
              textTransform: "none",
            }}
          >
            View Gallery
          </Typography>
        </OutlinedButton>
      </Box>
      <Box
        sx={{
          flex: 7,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <ZoomLazyImage
            src="/about/6.jpeg"
            alt="Chrysler building top"
            style={{
              ml: {
                xs: 0,
                md: 3,
              },
            }}
            fadeInOnload
          />
          <ZoomLazyImage
            src="/about/7.jpeg"
            alt="Chrysler building top"
            style={{
              mt: {
                xs: 2,
                md: 8,
              },
              ml: {
                xs: 0,
                md: 3,
              },
            }}
            fadeInOnload
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ZoomLazyImage
            src="/about/8.jpeg"
            alt="Chrysler building top"
            style={{
              mt: 3,
              ml: {
                xs: 0,
                md: 3,
              },
              width: "70%",
            }}
            fadeInOnload
          />
        </Box>
      </Box>
    </Box>
  );
}
