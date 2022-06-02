import {
  Box, Button, keyframes, Typography,
} from '@mui/material';
import { useContext } from 'react';
import { entranceAnimationDuration } from '../constants';
import { LoadedContext } from '../LoadedContextProvider';
import { tilesProps } from '../utils/prop-types';
import Divider from './Divider';
import MobileImage from './MobileImage';

const fadeIn = keyframes`
  0% {
    -webkit-transform: scale(1.1);
            transform: scale(1.1);
            opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
  }
`;

export default function MobileTiles({ tiles }) {
  const { animationDelay } = useContext(LoadedContext);

  return (
    <Box
      sx={{
        display: {
          xs: 'flex',
          md: 'none',
          width: '100%',
        },
        flexDirection: 'column',
        p: 4,
        textAlign: {
          xs: 'center',
          sm: 'left',
        },
      }}
    >
      {tiles.map((tile, index) => (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: {
              xs: 'column',
              sm: index % 2 === 0 ? 'row' : 'row-reverse',
            },
            mb: index === tiles.length - 1 ? 0 : 14,
            alignItems: 'center',
            animation: `${fadeIn} ${entranceAnimationDuration}s both ${animationDelay + 0.2 * index}s`,
          }}
          key={tile.title}
        >
          <MobileImage
            src={tile['main-image']}
            alt={tile['main-image-alt']}
            overlay={tile['main-image-overlay']}
            overlayAlt={tile['main-image-overlay-alt']}
            zoom={tile['main-image-zoom']}
            zoomStart={tile['main-image-zoom-start']}
          />
          {/* Right box */}
          <Box
            sx={{
              display: 'flex',
              flex: 3,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 4,
                fontSize: '6rem',
              }}
            >
              {tile.h1}
            </Typography>
            <Divider />
            { tile.logo && (
              <Box
                sx={{
                  mx: {
                    xs: 6,
                    sm: 0,
                  },
                  mt: 1,
                  mb: {
                    xs: 3,
                    sm: 4,
                  },
                }}
              >
                <img
                  src={tile.logo}
                  style={{
                    width: '100%',
                  }}
                  alt={tile['logo-alt']}
                />
              </Box>
            )}
            <Typography
              variant="h2"
              sx={{
                fontSize: '3rem',
                lineHeight: '4rem',
                fontWeight: 700,
                mb: 1,
              }}
            >
              {tile['right-title']}
            </Typography>
            <Typography
              variant="body"
              sx={{
                fontSize: '1.75rem',
                lineHeight: '3rem',
                mb: 3,
              }}
              dangerouslySetInnerHTML={{ __html: tile['right-description'] }}
            />
            <Button
              variant="outlined"
              sx={[
                {
                  position: 'relative',
                  borderRadius: 0,
                  borderColor: 'text.primary',
                  height: '64px',
                  transition: 'max-width 0.2s ease-out',
                  overflow: 'hidden',
                },
              ]}
              href={tile['right-button-href']}
              target="_blank"
            >
              <Typography
                variant="body"
                sx={{
                  position: 'absolute',
                  color: 'text.primary',
                  textTransform: 'capitalize',
                  fontSize: '1.75rem',
                  lineHeight: '3rem',
                }}
              >
                {tile['right-button-text']}
              </Typography>
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

MobileTiles.propTypes = {
  tiles: tilesProps.isRequired,
};
