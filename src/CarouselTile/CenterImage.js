import { Box } from '@mui/material';

export default function CenterImage ({tiles, selectedTileIndex}) {
  const selected = true;
  
  const tile = tiles[selectedTileIndex];

  return(
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
  )
}