'use client';

import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { fadeIn } from '../GalleryV2/animations';
import { OrderButton } from '../OrderButton';
import {
  entranceAnimationDelay,
  entranceAnimationDuration,
} from '../constants';
import { Gallery } from './Gallery';

const PhotoBook = () => {
  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(Math.max(1, quantity - 1));

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
        <Gallery />
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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: { xs: '100%', md: '50%' },
            gap: 3,
            mt: {
              xs: 4,
              md: 4,
            },
            zIndex: 1000,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: {
                xs: 'space-between',
                md: 'flex-start',
              },
              gap: 2,
              border: '1px solid #666',
              px: 1,
              py: 1,
              width: {
                xs: '100%',
                md: 'auto',
              },
            }}
          >
            <IconButton
              onClick={decrement}
              sx={{
                borderColor: 'primary.main',
                fontSize: '3rem',
                px: 2,
                borderRadius: 0,
              }}
            >
              -
            </IconButton>
            <Typography
              variant="h5"
              sx={{
                fontSize: '3rem',
                fontWeight: 600,
                width: '2rem',
                textAlign: 'center',
              }}
            >
              {quantity}
            </Typography>
            <IconButton
              onClick={increment}
              sx={{
                borderColor: 'primary.main',
                fontSize: '3rem',
                px: 2,
                borderRadius: 0,
              }}
            >
              +
            </IconButton>
          </Box>
          <OrderButton quantity={quantity} fullWidth>
            <Typography variant="h4">Preorder</Typography>
          </OrderButton>
        </Box>
      </Box>
    </Box>
  );
};

export { PhotoBook };
