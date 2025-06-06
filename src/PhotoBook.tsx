import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { fadeIn } from './GalleryV2/animations';
import { OrderButton } from './OrderButton';
import { entranceAnimationDelay, entranceAnimationDuration } from './constants';

const PhotoBook = () => {
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
          md: 10,
        },
        width: '100%',
        maxWidth: '1024px',
        margin: 'auto',
        animation: `${fadeIn} ${entranceAnimationDuration}s both ${entranceAnimationDelay}s`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Typography variant="h1">It Was Never Dark</Typography>
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '100%',
            },
            my: {
              xs: 4,
              md: 4,
            },
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr 1fr',
              md: '1fr 1fr 1fr 1fr',
            },
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Image
            src="/book/after-the-storm.jpg"
            alt="It Was Never Dark"
            width={1000}
            height={1500}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
          <Image
            src="/book/and-when-we-die-it-will-feel-like-this.jpg"
            alt="And When We Die It Will Feel Like This"
            width={1500}
            height={1000}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '500px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
          <Image
            src="/book/heartbeat.jpg"
            alt="Heartbeat"
            width={1000}
            height={1500}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
          <Image
            src="/book/foreshadowing-small.jpg"
            alt="Foreshadowing"
            width={1500}
            height={1000}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '500px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: '2rem',
              lineHeight: '2rem',
              letterSpacing: '0.1rem',
              maxWidth: '800px',
              mt: 3,
            }}
          >
            &quot;It Was Never Dark&quot; is the culmination of seven years of
            Drift&apos;s photographic career spanning five different continents.
            The book contains written excerpts and multimedia evidence from his
            incarceration and details his journey from there to contemporary
            artist.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: {
              xs: 'flex-end',
              md: 'flex-start',
            },
            mt: {
              xs: 4,
              md: 4,
            },
            justifyContent: 'center',
            zIndex: 1000,
            position: 'relative',
          }}
        >
          <OrderButton>
            <Typography variant="h4">Preorder</Typography>
          </OrderButton>
        </Box>
      </Box>
    </Box>
  );
};

export { PhotoBook };
