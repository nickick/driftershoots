import { Box, Typography } from '@mui/material';
import ZoomLazyImage from './ZoomLazyImage';

export default function UniversalFreedom3() {
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
          In light of this, my freedom is never circumstantial, but constant, having its substance
          in what is internal rather than external. I find it in every fellow inmate, the swallows
          outside my window, and every daily event we so liberally label “good” or “bad.” Should
          we exist and walk steadfast in our purpose, these events are nothing more than to carry
          us to ourselves and all we are to become.
        </Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: '2.5rem',
            mb: 4,
          }}
        >
          With the great forces of space and time on our side, the same power that moves sun,
          the stars, the moon, and all the cosmos will also carry us to our manifest destiny
          in due season. And that same familiar freedom will be there to greet us,
          only sweeter than ever before.
        </Typography>
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
            src="/about/12.jpeg"
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
            src="/about/13.jpeg"
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
            src="/about/14.jpeg"
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
