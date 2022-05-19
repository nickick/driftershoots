import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';

export default function Main () {
  const [zoomed, setZoomed] = useState(false);

  return (
    <Container
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        flex: 1,
        overflow: 'auto',
        px: 4,
        maxWidth: '1440px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '100%',
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
              Recent News
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
          justifyContent: 'flex-end'
        }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '280px',
            }}
          >
            <img 
              src='/news-images/thenewyorktimes.svg'
              style={{
                width: '176px',
                marginBottom: '3rem',
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: '3rem',
                lineHeight: '4rem',
                mb: 1,
              }}
            >
              A Rogue Climber <br/> Running From the Law Was Fleeing His Own Trauma
            </Typography>
            <Typography
              variant="body"
              sx={{
                fontSize: '1.75rem',
                lineHeight: '3rem',
                mb: 3,
              }}
            >
              A former paratrooper became an “urban explorer,” scaling the tops of bridges and buildings to help ease his PTSD. He now faces criminal charges in several states.
            </Typography>
            <Box sx={{
              border: 0,
              height: 0,
              borderTop: '1px solid #36364B',
              mb: 3,
            }} />
            <Button 
              variant="outlined"
              sx={{
                borderRadius: 0,
                borderColor: 'text.primary',
                height: '60px',
                width: 'initial'
              }}
            >
              <Typography
                variant="body"
                sx={{
                  color: 'text.primary',
                  textTransform: 'capitalize',
                  fontSize: '1.75rem',
                  lineHeight: '3rem'
                }}
              >
                Read Article
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}