import { Box, Typography } from '@mui/material';
import OutlinedButton from '../OutlinedButton';
import ZoomLazyImage from './ZoomLazyImage';

export default function UniversalFreedom() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
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
          display: 'flex',
          flexDirection: 'column',
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
          variant="overline"
          sx={{
          }}
        >
          Universal Freedom
        </Typography>
        <Typography
          variant="h2"
          sx={{
            mb: 6,
          }}
        >
          What I want people to know is I&apos;m overwhelmed with gratitude by everyone&apos;s
          support. I&apos;m incredibly thankful. There&apos;s a lot of work ahead, but with
          everyone&apos;s love and support, I&apos;m ready to fight it all head on.
        </Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: '2.5rem',
            mb: 4,
          }}
        >
          In a myriad of phone calls with friends, I have been asked if I can imagine what it
          will feel like to take a picture again or taste freedom once more. Instantly, memories
          flash on a highlight reel behind my eyes as I recollect moments of immeasurable bliss
          along the journey of walking in my purpose.
        </Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: '2.5rem',
            mb: 6,
          }}
        >
          We all share moments like these as they are universal in their nature rather than
          soteric.
          We so freely attribute a sort of divine greatness to these memories as we recall how our
          souls were lifted from one plane into another, and we existed, for but a moment, in what
          appears to be a more comprehensive, fuller and deeper reality.
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
              textTransform: 'none',
            }}
          >
            View Gallery
          </Typography>
        </OutlinedButton>
      </Box>
      <Box
        sx={{
          flex: 7,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
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
            display: 'flex',
            justifyContent: 'center',
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
              width: '70%',
            }}
            fadeInOnload
          />
        </Box>
      </Box>

    </Box>
  );
}
