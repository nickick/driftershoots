import {
  Box, Button, keyframes, Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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

function PubTile({ publication, index }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid white',
        m: 3,
        width: publication.highlight ? '100%' : 'calc(50% - 7rem)',
        animation: `${fadeFromBelow} 0.3s both ${1 + (0.2 * index)}s`,

      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          backgroundImage: `url(${publication.ogImage.url})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: '100%',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 3,
          p: 3,
        }}
      >
        <Typography
          variant="h3"
        >
          {publication.source}
        </Typography>
        <Typography
          variant="h2"
        >
          {publication.title}
        </Typography>
        <Button
          to={publication.link}
        >
          Read More
        </Button>
      </Box>
    </Box>
  );
}

PubTile.propTypes = {
  publication: PropTypes.shape({
    ogImage: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    highlight: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default function Publications() {
  const { animationDelay } = useContext(LoadedContext);
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    async function fetchPublications() {
      const result = await fetch('/api/publications');
      const resultJson = await result.json();
      setPublications(resultJson);
    }

    fetchPublications();
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
          mx: 14,
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
