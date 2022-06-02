import { Box, keyframes } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { entranceAnimationDuration } from '../constants';
import { LoadedContext } from '../LoadedContextProvider';
import tiles from '../tiles.json';
import CenterImage from './CenterImage';
import CTAButton from './CTAButton';
import Title from './Title';
import TransitionText from './TransitionText';

const fadeFromRight = keyframes`
  0% {
    -webkit-transform: translateX(20px);
            transform: translateX(20px);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
  }
`;

const fadeFromLeft = keyframes`
  0% {
    -webkit-transform: translateX(-20px);
            transform: translateX(-20px);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
  }
`;

export default function CarouselTile({ selectedTileIndex }) {
  const [transitioning, setTransitioning] = useState(false);
  const { animationDelay } = useContext(LoadedContext);

  useEffect(() => {
    setTransitioning(true);

    setTimeout(() => {
      setTransitioning(false);
    }, 1000);
  }, [selectedTileIndex]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
      }}
    >
      {/* Dekstop text container */}
      <Box
        sx={{
          display: {
            // need to do a separate layout for mobile given animation requirements
            xs: 'none',
            md: 'flex',
          },
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          px: {
            xs: 4,
            md: 14,
          },
          zIndex: 5,
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: {
              sm: 3,
              lg: 5,
            },
            alignItems: 'center',
            justifyContent: 'flex-start',
            animation: `${fadeFromLeft} ${entranceAnimationDuration}s both ${animationDelay}s`,
          }}
        >
          <Title tiles={tiles} selectedTileIndex={selectedTileIndex} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flex: {
              sm: 3,
              lg: 4,
            },
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flex: {
              sm: 2,
              lg: 3,
            },
            alignItems: 'center',
            justifyContent: 'flex-end',
            transition: '* 1s ease',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              animation: `${fadeFromRight} ${entranceAnimationDuration}s both ${animationDelay + 0.4}s`,
            }}
          >
            { tiles[selectedTileIndex].logo && (
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <img
                  src={tiles[selectedTileIndex].logo}
                  style={{
                    flex: {
                      md: 1,
                      lg: 2,
                    },
                    marginBottom: '3rem',
                  }}
                  alt={tiles[selectedTileIndex]['logo-alt']}
                />
                <Box
                  sx={{
                    flex: {
                      md: 0,
                      lg: 1,
                    },
                  }}
                />
              </Box>
            )}
            <TransitionText
              tiles={tiles}
              selectedTileIndex={selectedTileIndex}
              tileKey="right-title"
              textType="h2"
              textStyles={{
                fontWeight: 700,
                fontSize: '3rem',
                lineHeight: '4rem',
              }}
              boxStyles={{
                mb: 1,
              }}
              animationDelay={animationDelay}
            />
            <TransitionText
              tiles={tiles}
              selectedTileIndex={selectedTileIndex}
              tileKey="right-description"
              textType="body"
              textStyles={{
                position: 'absolute',
                fontSize: '1.75rem',
                lineHeight: '3rem',
              }}
              boxStyles={{
                mb: 3,
              }}
              animationDelay={animationDelay}
            />

            <Box sx={{
              border: 0,
              height: 0,
              borderTop: '1px solid #36364B',
              mb: 3,
            }}
            />
            <CTAButton tiles={tiles} selectedTileIndex={selectedTileIndex} />
          </Box>
        </Box>
      </Box>
      {/* Desktop image container */}
      <Box
        sx={{
          display: {
            // need to do a separate layout for mobile given animation requirements
            xs: 'none',
            md: 'flex',
          },
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          px: 10,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: '4 4',
          }}
        />
        <CenterImage
          tiles={tiles}
          selectedTileIndex={selectedTileIndex}
          transitioning={transitioning}
          animationDelay={animationDelay}
        />
        <Box
          sx={{
            display: 'flex',
            flex: '4 4',
          }}
        />
      </Box>
    </Box>
  );
}

CarouselTile.propTypes = {
  selectedTileIndex: PropTypes.number.isRequired,
};
