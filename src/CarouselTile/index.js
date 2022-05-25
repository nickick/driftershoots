import { Box } from '@mui/material';
import tiles from '../tiles.json';
import CTAButton from './CTAButton';
import Title from './Title';
import TransitionText from './TransitionText';

const transitionStyles = {
  entering: { opacity: 0 , visibility: 'visible' },
  entered:  { opacity: 1 , visibility: 'visible' },
  exiting:  { opacity: 1 , visibility: 'visible' },
  exited:  { opacity: 0 , visibility: 'hidden'},
};

export default function CarouselTile ({selectedTileIndex}) {
  const selected = true;
  const tile = tiles[selectedTileIndex];

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        position: 'absolute',
        top: 0, 
        left: 0,
        width: '100%',
        px: 10,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Title tiles={tiles} selectedTileIndex={selectedTileIndex} />
      </Box>
      <Box
      sx={{
        display: 'flex',
        flex: '1',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
      >
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            width: '352px',
            height: '576px',
            overflow: 'hidden',
          }}
        >
          <img 
            src='/cutout.png'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 11,
              width: '100%',
              height: '100%'
            }}
          />
          <img
            src={tile["main-image"]}
            style={{
              transition: 'transform 1s ease',
              transform: selected ? tile["main-image-zoom"] : tile["main-image-zoom-start"],
            }}
          />
          {tile["main-image-overlay"]} && }
          <img
            src={tile["main-image-overlay"]}
            style={{
              position: 'absolute',
              zIndex: 12,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Box>
      </Box>
      <Box
      sx={{
        display: 'flex',
        flex: '1',
        alignItems: 'center',
        justifyContent: 'flex-end',
        transition: '* 1s ease',
      }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '280px',
          }}
        >
          { tile.logo && (
            <img 
              src={tile.logo}
              style={{
                width: '176px',
                marginBottom: '3rem',
              }}
              alt={tile["logo-alt"]}
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
              mb: 1
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
              mb: 3
            }}
          />
          
          <Box sx={{
            border: 0,
            height: 0,
            borderTop: '1px solid #36364B',
            mb: 3,
          }} />
          <CTAButton tiles={tiles} selectedTileIndex={selectedTileIndex} />
        </Box>
      </Box>
    </Box>
  )
}