import { Box, Typography } from '@mui/material';
import OutlinedButton from '../OutlinedButton';
import ZoomLazyImage from './ZoomLazyImage';

export default function UniversalFreedom2(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column-reverse',
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
          flex: 7,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <ZoomLazyImage
            src="/about/9.jpeg"
            alt="Chrysler building top"
            style={{
              marginRight: 3,
            }}
            fadeInOnload
          />
          <ZoomLazyImage
            src="/about/10.jpeg"
            alt="Chrysler building top"
            style={{
              mt: 8,
              mr: 3,
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
            src="/about/11.jpeg"
            alt="Chrysler building top"
            style={{
              mt: 8,
              mr: 3,
              width: '70%',
            }}
            fadeInOnload
          />
        </Box>
      </Box>
      <Box
        sx={{
          flex: 5,
          display: 'flex',
          flexDirection: 'column',
          pl: {
            xs: 0,
            md: 3,
          },
          mb: {
            xs: 6,
            md: 0,
          },
        }}
      >
        <Typography variant="overline" sx={{}}>
          Universal Freedom
        </Typography>
        <Typography
          variant="h2"
          sx={{
            mb: 6,
          }}
        >
          We call to mind how infinitesimally small we felt, our shortness of
          breath and fullness of heart in the shadow of <br /> "greater things."
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '2.5rem',
            mb: 4,
          }}
        >
          But there are no greater things, only one Great Soul from which all
          things and elements are interwoven and have their life and being. In
          understanding this, we become cognizant of the intricate inner
          workings of the spiritual world in even the most menial and minute
          details of life; granting our souls the liberty and jubilance of this
          "deeper reality" in every passing moment.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '2.5rem',
            mb: 4,
          }}
        >
          Therefore, when asked about the feeling of freedom on the other side
          of this momentary trial, I dare say that same freedom is native to me
          rather than foreign in this very hour. In retrospect, I see it has
          never departed; in shackles or behind bars, through nights of hunger,
          cold and restlessness, it was always present holding residency in the
          soul and never in the body.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '2.5rem',
            mb: 6,
          }}
        >
          I see now this soul manifests in all things, everything I was prepared
          me for who I now am, and who I am to be, I am now becoming.
          Today&apos;s prison bars are tomorrow&apos;s open roads. Hunger and
          cold turn to fullness and warmth, and restlessness becomes peace.
          Space and time shine forth from that Universal Soul giving me moment
          by moment, an abundance of supply, everything in its perfect power.
        </Typography>
        <OutlinedButton
          href="/contact"
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
            Contact
          </Typography>
        </OutlinedButton>
      </Box>
    </Box>
  );
}
