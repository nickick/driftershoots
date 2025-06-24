import { Instagram } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import OutlinedButton from '../OutlinedButton';
import ArrestedAtGunpoint from './ArrestedAtGunpoint';
import InNews from './InNews';
import Intro from './Intro';
import UniversalFreedom from './UniversalFreedom';
import Video from './Video';

export default function About(): JSX.Element {
  return (
    <Box
      sx={{
        zIndex: 3,
        px: {
          xs: 3,
          md: 14,
        },
        mt: {
          xs: 4,
          md: 14,
        },
        width: '100%',
        maxWidth: '1600px',
        margin: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Intro />
        <ArrestedAtGunpoint />
        <InNews />
        <Video />
        <UniversalFreedom />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 6,
            }}
          >
            Wanna see more?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '2.5rem',
              mb: 6,
              maxWidth: {
                xs: '100%',
                md: '50%',
              },
              textAlign: 'center',
            }}
          >
            Check out the stories that made the artist go from military veteran
            to urban explorer, scaling some of the worlds tallest man-made
            buildings.
          </Typography>
          <OutlinedButton
            text="Follow on IG"
            href="https://www.instagram.com/driftershoots"
            clientside={false}
            fullWidth={false}
          >
            <Typography
              variant="h4"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Follow
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pl: 2,
                }}
              >
                <Instagram fontSize="large" />
              </Box>
            </Typography>
          </OutlinedButton>
        </Box>
      </Box>
    </Box>
  );
}
