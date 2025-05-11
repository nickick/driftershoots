import { Box, Typography } from '@mui/material';
import { OrderButton } from './OrderButton';

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
        <Typography variant="h1">It Was Never Dark</Typography>

        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: '2rem',
              lineHeight: '2rem',
              letterSpacing: '0.1rem',
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
              xs: 'center',
              md: 'flex-end',
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
