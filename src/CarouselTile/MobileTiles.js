import { Box, Button, Typography } from '@mui/material';
import { tilesProps } from '../utils/prop-types';
import Divider from './Divider';

export default function MobileTiles({ tiles }) {
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
            mb: 14,
            alignItems: 'center',
          }}
          key={tile.title}
        >
          <Box
            sx={{
              display: 'flex',
              flex: {
                xs: 'unset',
                sm: 5,
              },
              position: 'relative',
              mask: {
                xs: 'none',
                sm: 'url(/cutout.svg)',
              },
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              height: {
                xs: '100vw',
                sm: '568px',
              },
              width: {
                xs: '100vw',
                sm: 'inherit',
              },
              borderRadius: {
                xs: '50%',
                sm: 'none',
              },
              overflow: 'hidden',
              mb: {
                xs: 4,
                sm: 0,
              },
            }}
          >
            <img
              src={tile['main-image']}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transition: 'transform 1s ease',
                transformOrigin: 'center',
                transform: true ? tile['main-image-zoom'] : tile['main-image-zoom-start'],
              }}
              alt={tile['main-image-alt']}
            />
            {tile['main-image-overlay'] && (
              <img
                src={tile['main-image-overlay']}
                style={{
                  position: 'absolute',
                  zIndex: 12,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                alt={tile['main-image-overlay-alt']}
              />
            )}
          </Box>
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
                  height: '60px',
                  transition: 'max-width 0.2s ease-out',
                  overflow: 'hidden',
                },
              ]}
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
