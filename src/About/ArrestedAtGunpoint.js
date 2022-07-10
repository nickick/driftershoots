import {
  Box, Typography,
} from '@mui/material';
import Link from 'next/link';
import FadeInAboutSection from './FadeInAboutSection';
import ZoomLazyImage from './ZoomLazyImage';
import OutlinedButton from '../OutlinedButton';

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
        <Typography
          variant="overline"
        >
          December 17, 2020
        </Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: '3rem',
            mb: 2.5,
          }}
        >
          Isaac was arrested unarmed at gunpoint.
        </Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: '2.5rem',
            mb: 2.5,
          }}
        >
          outside flagstaff Arizona on nationwide warrant all for the
          alleged crimes of entering areas in Cincinnati unlawfully and
          taking pictures. Using a picture of Isaac holding a handgun while
          in the service and with his military training police perpetuated
          a narrative that Isaac was a PTSD ridden threat to society and
          arrested him with 15 officers and an attack helicopter.
        </Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: '2.5rem',
            mb: 12,
          }}
        >
          Isaac has no criminal record and served honorably in the Army.
          He was the incarcerated without bond for two months in Arizona
          awaiting extradition to Cincinnati. Using his seized footage,
          the lead detective on his case sought to get him charged anywhere
          possible including Kentucky, Louisiana and Ohio. He was charged
          with three counts of F2 Burglary &#40;one step below murder,
          an F1&#41; all for the alleged crime of trespassing to
          take photos in Cincinnati, OH. The lead detective and
          prosecution stated on the record in court that
          “Nothing was stolen and nobody was hurt.”
        </Typography>
        <Typography
          variant="overline"
        >
          APRIL 9, 2021
        </Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: '3rem',
            mb: 2.5,
          }}
        >
          Released on bond after more than 100 days in jail.
        </Typography>
        <Typography
          variant="body"
          sx={{
            fontSize: '2.5rem',
            mb: 6,
          }}
        >
          When he was finally taken back to Ohio, he posted bond and then
          an emergency hearing was called, raising his bond to $400,000
          before he could be released.  After two months of fighting bond
          was finally lowered and Isaac was released.  Isaac is still
          fighting the egregious wrongful imprisonment and over-charging by
          the Cincinnati Police Department and the case is an ongoing battle.
          Police also seized his new phone and car only a week after he was
          released when he was traveling back from Louisiana on the Ohio
          Court&apos;s orders.  His case is now reaching national news as
          he seeks justice.  With mounting legal fees and court costs
          he needs your help.
        </Typography>
        <OutlinedButton
          text="News on Driftershoots"
          href="/publications"
          fullWidth
          clientside
          scrollToTop
        >
          <Typography
            variant="h4"
          >
            News on Driftershoots
          </Typography>
        </OutlinedButton>
      </Box>
    </FadeInAboutSection>
  );
}
