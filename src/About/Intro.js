import {
  Box, Typography,
} from '@mui/material';
import FadeInAboutSection from './FadeInAboutSection';
import ZoomLazyImage from './ZoomLazyImage';

export default function Intro() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        width: '100%',
      }}
    >
      <FadeInAboutSection
        fadeInOnload
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flex: 7,
          width: {
            xs: '100%',
            md: '50%',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            width: '50%',
            justifyContent: 'center',
            pr: 3,
          }}
        >
          <ZoomLazyImage
            src="/about/1.jpeg"
            alt="Empire State Builiding in clouds"
            style={{
              marginBottom: '3rem',
            }}
          />
          <ZoomLazyImage
            src="/about/3.jpeg"
            alt="Drifter Shoots looking over city"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            width: '50%',
            justifyContent: 'center',
            pr: {
              xs: 0,
              md: 3,
            },
          }}
        >
          <ZoomLazyImage
            src="/about/2.jpeg"
            alt="Brooklyn Bridge at night"
          />
        </Box>

      </FadeInAboutSection>
      <FadeInAboutSection
        fadeInOnload
        animationStyle="fadeFromRight"
        sx={{
          flex: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pl: {
            xs: 0,
            md: 3,
          },
          mt: {
            xs: 1,
            md: 0,
          },
        }}
      >
        <Typography
          variant="overline"
        >
          About
        </Typography>
        <Typography
          variant="h2"
        >
          Isaac Wright is an honorably retired Army special operations veteran of six years
          who began shooting photography to cope with mental illness, specifically PTSD
          and depression. His work involves capturing the world from never before
          seen perspectives.
        </Typography>
      </FadeInAboutSection>
    </Box>

  );
}
