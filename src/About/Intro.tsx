import { Box, Typography } from '@mui/material';
import FadeInAboutSection from './FadeInAboutSection';
import ZoomLazyImage from './ZoomLazyImage';

export default function Intro(): JSX.Element {
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
            height: {
              xs: '50rem',
              md: 'unset',
            },
          }}
        >
          <ZoomLazyImage
            src="/about/1.jpeg"
            alt="Empire State Builiding in clouds"
            style={{
              marginBottom: '3rem',
              height: '70%',
            }}
          />
          <ZoomLazyImage
            src="/about/3.jpeg"
            alt="Drifter Shoots looking over city"
            style={{
              height: '40%',
            }}
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
            style={{
              height: '60%',
            }}
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
        <Typography variant="overline">About</Typography>
        <Typography variant="h2">
          Isaac "Drift" Wright is a multidisciplinary artist and a United States
          Army veteran. After serving his country, he found solace and purpose
          in urban exploring and photography, illegally and clandestinely
          capturing cities from unique and unseen perspectives. Through his
          lens, he found a way to cope with displacement, PTSD, and Bipolar
          Disorder, finding peace in the presence of the moment.
        </Typography>
      </FadeInAboutSection>
    </Box>
  );
}
