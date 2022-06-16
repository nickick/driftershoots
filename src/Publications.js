import {
  Box, Container, keyframes, Link, Typography,
} from '@mui/material';
import { Masonry } from 'masonic';
import PropTypes, { string } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import pubs from '../pages/api/publications/publications.json';
import { entranceAnimationDuration } from './constants';
import { LoadedContext } from './LoadedContextProvider';

const fadeFromBelow = keyframes`
  0% {
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
  }
`;

function PubTile({ data, index }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  const imageUrl = data.image || (data.ogImage || {}).url;

  return (
    <Link
      href={data.link}
      target="_blank"
      sx={[
        {
          color: 'white',
        },
        {
          '&:hover': {
            textDecoration: 'none',
          },
        },
      ]}
    >
      <Box
        sx={[
          {
            display: 'flex',
            flexDirection: 'column',
            m: 1,
            width: '100%',
            animation: (index === 0 || inView) ? `${fadeFromBelow} 0.3s both 0.5s` : 'none',
            opacity: 0,
            overflow: 'hidden',
          },
          {
            '&:hover > img': {
              transform: 'scale(1.1)',
            },
          },
        ]}
        ref={ref}
      >
        {imageUrl && (
          <img
            src={data.image || (data.ogImage || {}).url}
            style={{
              transition: 'transform 0.5s ease-out',
            }}
            alt={data.title}
          />
        )}
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
            flexDirection: 'column',
            flex: 1,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '100%',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 2,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              bgcolor: {
                xs: 'rgba(0,0,0,0.7)',
                md: 'rgba(0,0,0,0.9)',
              },
              zIndex: 2,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
          <Box
            sx={{
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              zIndex: 1,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 3,
              zIndex: 3,
              bgcolor: '#23222B',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: '1.25rem',
                lineHeight: '2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {data.source}
            </Typography>
            <Typography
              variant="h3"
              mb={2}
              sx={{
                fontSize: '2rem',
                lineHeight: '3rem',
              }}
            >
              {data.title}
            </Typography>
            <Typography
              sx={{
                p: 0,
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                fontSize: '1.75rem',
                fontWeight: 'bold',
              }}
            >
              Read More
              <img
                src="/right-arrow.svg"
                alt="right arrow"
                style={{
                  marginLeft: '1rem',
                }}
              />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

PubTile.propTypes = {
  data: PropTypes.shape({
    image: string,
    ogImage: PropTypes.shape({
      url: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    highlight: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default function Publications() {
  const { animationDelay } = useContext(LoadedContext);
  const [publications, setPublications] = useState(pubs);

  useEffect(() => {
    async function fetchPublications(skipmetadata) {
      const queryParams = skipmetadata ? 'skipmetadata=true' : '';
      const result = await fetch(`/api/publications?${queryParams}`);
      const resultJson = await result.json();
      setPublications(resultJson);
    }

    // fetch without metadata first, then fill it in with metadata with another call
    fetchPublications(false);
  }, []);

  return (
    <Container
      sx={{
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        mt: 6,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          animation: `${fadeFromBelow} ${entranceAnimationDuration}s both ${animationDelay}s`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            justifyContent: 'space-between',
            alignSelf: 'flex-start',
            width: '100%',
            px: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              mb: 3,
              flex: '3',
            }}
          >
            Publications
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mx: {
            xs: 4,
            md: 4,
          },
        }}
      >
        <Masonry
          columnGutter={40}
          columnWidth={280}
          items={publications}
          render={PubTile}
          overscanBy={6}
        />
      </Box>
    </Container>
  );
}
