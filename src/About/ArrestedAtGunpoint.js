import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import OutlinedButton from '../OutlinedButton';
import FadeInAboutSection from './FadeInAboutSection';
import ZoomLazyImage from './ZoomLazyImage';

export default function ArrestedAtGunpoint() {
  return (
    <FadeInAboutSection
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        my: 14,
        width: '100%',
      }}
    >
      <Box
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
            width: '100%',
            justifyContent: 'center',
            pr: {
              xs: 0,
              md: 9,
            },
          }}
        >
          <Box
            sx={{
              mb: 1,
              width: {
                xs: '100%',
                md: '60%',
              },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="quote"
              sx={{
                fontSize: '6rem',
                lineHeight: '6rem',
              }}
            >
              “The only thing he stole, was scenery.”
            </Typography>

            <Typography
              variant="body"
              sx={{
                fontSize: '3rem',
                mb: 6,
              }}
            >
              <Link
                href="https://www.cincinnati.com/story/news/2021/04/19/photographer-and-veteran-isaac-wright-arrested-again-kentucky/7288482002/"
                target="_blank"
              >
                Read More &#x3e;
              </Link>
            </Typography>
          </Box>

          <ZoomLazyImage
            src="/about/4.jpeg"
            alt="Drifter Shoots looking back while in NYC afternoon"
          />
        </Box>
      </Box>
      <Box
        sx={{
          flex: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pl: {
            xs: 0,
            md: 3,
          },
        }}
      >
        <Typography variant="overline">December 17, 2020</Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: '3rem',
            mb: 2.5,
          }}
        >
          In 2020, Drift&apos;s artistic passion and dedication to documenting
          the world around him led to his arrest, a heart-wrenching experience
          that resulted in four months of incarceration without bond. The
          government weaponized numerous factors including his military
          background against him, making his story a national headline, which
          landed on the front page of The New York Times on June 6th, 2021.
        </Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: '2.5rem',
            mb: 2.5,
          }}
        ></Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: '2.5rem',
            mb: 3.5,
          }}
        >
          Despite the adversity he faced, Drift&apos;s work has since
          flourished. He has become one of the most sought-after photographers
          in the industry, emerging in the fine arts world and as a pioneer in
          photography. He has been featured in Rolling Stone, TIME, The New York
          Times, and many other notable publications.
        </Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: '2.5rem',
            mb: 3.5,
          }}
        >
          Beyond photography, his work navigates the intersections of
          performance art, self-authorization, mass surveillance, and the
          reclamation of bodily agency. Blurring the boundaries between reality
          and the surreal, he crafts imagery that challenges perception,
          inviting viewers into a world at the edge of the imaginable.
        </Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: '2.5rem',
            mb: 3.5,
          }}
        >
          Drift&apos;s photography embodies the true essence of fine art,
          merging captivating visuals with a deep sense of emotion and purpose.
          His unique perspective and unbridled passion have earned him accolades
          and recognition from the most discerning art collectors and curators
          worldwide.
        </Typography>
        <OutlinedButton
          text="News on Driftershoots"
          href="/publications"
          fullWidth
          clientside
          scrollToTop
        >
          <Typography variant="h4">News on Driftershoots</Typography>
        </OutlinedButton>
      </Box>
    </FadeInAboutSection>
  );
}
