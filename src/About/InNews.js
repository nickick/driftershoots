import {
  Box, Typography,
} from '@mui/material';
import Link from 'next/link';
import FadeInAboutSection from './FadeInAboutSection';

export default function InNews() {
  return (
    <FadeInAboutSection
      sx={{
        my: {
          xs: 0,
          md: 14,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          pl: {
            xs: 0,
            md: 3,
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: {
              xs: '4rem',
              md: '6rem',
            },
            flex: 7,
            mb: {
              xs: 3,
              md: 0,
            },
          }}
        >
          To the moon, &amp; never back.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 3,
            mb: {
              xs: 3,
              md: 0,
            },
          }}
        >
          <Box
            sx={{
              width: '3rem',
              borderTop: '1px solid gray',
              mb: 2,
            }}
          />
          <Typography
            variant="overline"
            sx={{
              mb: 2,
            }}
          >
            News
          </Typography>
          <Typography
            variant="body"
            sx={[
              {
                fontSize: '2.5rem',
              },
              {
                '& > a': {
                  textDecoration: 'underline',
                },
              },
            ]}
          >
            Isaac has been featured in
            {' '}
            <Link href="/publications">many news articles</Link>
            {' '}
            about his daring photography.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 2,
          }}
        />
      </Box>
    </FadeInAboutSection>
  );
}
