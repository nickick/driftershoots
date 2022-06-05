import {
  Box, keyframes, Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import pubs from '../pages/api/publications/publications.json';
import { entranceAnimationDuration } from './constants';
import { LoadedContext } from './LoadedContextProvider';
import Button from './Button';

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

function PubTile({ publication, index }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid white',
        m: 1,
        width: {
          xs: '100%',
          md: publication.highlight ? '100%' : 'calc(50% - 2rem)',
        },
        animation: (index === 0 || inView) ? `${fadeFromBelow} 0.3s both` : 'none',
        opacity: 0,
      }}
      ref={ref}
    >
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'flex',
          },
          flexDirection: 'column',
          flex: 1,
          backgroundImage: `url(${(publication.ogImage || {}).url})`,
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
            backgroundImage: `url(${(publication.ogImage || {}).url})`,
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
          }}
        >
          <Typography
            variant="h4"
            mb={2}
          >
            {publication.source}
          </Typography>
          <Typography
            variant="h3"
            mb={2}
          >
            {publication.title}
          </Typography>
          <Button
            href={publication.link}
            target="_blank"
            sx={{
              p: 3,
              m: 3,
              width: '50%',
              alignSelf: 'center',
            }}
          >
            Read More
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

PubTile.propTypes = {
  publication: PropTypes.shape({
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
    <Box
      sx={{
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          animation: `${fadeFromBelow} ${entranceAnimationDuration}s both ${animationDelay}s`,
          minHeight: '70vh',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 1,
          }}
        >
          Drifter Shoots in the News
        </Typography>
        <Typography
          variant="h1"
          sx={{
            textAlign: 'center',
            mb: 3,
          }}
        >
          Publications
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mx: {
            xs: 4,
            md: 14,
          },
        }}
      >
        {
          publications.map((publication, index) => (
            <PubTile
              key={publication.title}
              publication={publication}
              index={index}
            />
          ))
        }
      </Box>
    </Box>
  );
}
