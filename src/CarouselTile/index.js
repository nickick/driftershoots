import { Box, keyframes } from '@mui/material';
import tiles from '../tiles.json';
import CTAButton from './CTAButton';
import Title from './Title';
import TransitionText from './TransitionText';
import CenterImage from './CenterImage';
import { entranceAnimationDelay, entranceAnimationDuration } from '../constants';

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
  return (
    <Box>
      {/* Text container */}
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          px: 10,
          zIndex: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: '5',
            alignItems: 'center',
            justifyContent: 'flex-start',
            animation: `${fadeFromLeft} ${entranceAnimationDuration}s both ${entranceAnimationDelay}s`,
          }}
        >
          <Title tiles={tiles} selectedTileIndex={selectedTileIndex} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flex: '4',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flex: '3',
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
              animation: `${fadeFromRight} ${entranceAnimationDuration}s both ${entranceAnimationDelay + 0.4}s`,
            }}
          >
            { tiles[selectedTileIndex].logo && (
              <img
                src={tiles[selectedTileIndex].logo}
                style={{
                  width: '176px',
                  marginBottom: '3rem',
                }}
                alt={tiles[selectedTileIndex]['logo-alt']}
              />
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
      {/* Image container */}
      <Box
        sx={{
          display: 'flex',
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
            flex: '4',
          }}
        />
        <CenterImage tiles={tiles} selectedTileIndex={selectedTileIndex} />
        <Box
          sx={{
            display: 'flex',
            flex: '4',
          }}
        />
      </Box>
    </Box>
  );
}
