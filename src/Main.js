import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';

export default function Main () {
  const [zoomed, setZoomed] = useState(false);

  return (
    <Container
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        flex: 1,
        overflow: 'auto'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          mx: 8,
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
          <Box
            sx={{
              position: 'relative'
            }}
          >
            <Typography 
              variant="h1" 
              sx={{
                fontSize: '16rem',
                position: 'absolute',
                top: '50%',
                left: '0',
                transform: 'translate(0%, -50%)',
                width: '488px',
                zIndex: 12,
              }}
            >
              Title test 123
            </Typography>
          </Box>
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
              onClick={() => {
                setZoomed(!zoomed);
              }}
            />
            <img
              src='/news-images/Drifter1.jpeg'
              style={{
                transition: 'transform 0.2s ease',
                transform: zoomed ? 'scale(1.6) translate(52px, -90px)' : 'scale(1) translate(0,0)',
              }}
            />
          </Box>
        </Box>
        <Box
        sx={{
          display: 'flex',
          flex: '1',
          alignItems: 'center',
        }}
        >
          Right side
        </Box>
      </Box>
    </Container>
  )
}