import { Box } from '@mui/material';
import tiles from '../tiles.json';
import CTAButton from './CTAButton';
import Title from './Title';
import TransitionText from './TransitionText';
import CenterImage from './CenterImage';

export default function CarouselTile ({selectedTileIndex}) {
  
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
      <CenterImage tiles={tiles} selectedTileIndex={selectedTileIndex} />
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