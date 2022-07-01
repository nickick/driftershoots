import { Close } from '@mui/icons-material';
import {
  Box, CircularProgress, Dialog, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { getName } from '../utils/parsers';
import { openseaPieceProps } from '../utils/prop-types';

export default function GalleryModal({ piece, open, handleClose }) {
  const [loaded, setLoaded] = useState(false);
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    if (!open) {
      setLoaded(false);
    }
  }, [open]);

  const onImageLoad = useCallback((e) => {
    const { naturalHeight, naturalWidth } = e.target;
    if (naturalHeight > naturalWidth) {
      setIsLandscape(false);
    }
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      PaperProps={{
        sx: {
          bgcolor: 'transparent',
          backgroundImage: 'none',
          boxShadow: 'none',
          overflowX: 'hidden',
          p: 0,
          m: 0,
        },
      }}
      BackdropProps={{
        bgcolor: 'rgba(0,0,0,0.7)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Close
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            zIndex: 1300,
            fontSize: {
              xs: 30,
              md: 60,
            },
            background: 'rgba(0,0,0,0.2)',
            cursor: 'pointer',
          }}
          onClick={() => {
            handleClose();
          }}
        />
        <Box
          sx={{
            opacity: !loaded ? 1 : 0,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress
            size={90}
            sx={{
              color: 'white',
            }}
          />
        </Box>
        {piece && (
          <Box
            sx={{
              display: 'flex',
              opacity: loaded ? 1 : 0,
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <img
              src={piece.image_original_url || piece.image_url}
              alt={piece.name}
              style={{
                transition: 'transform 0.5s ease-out',
                maxHeight: '100%',
                maxWidth: '100%',
                width: isLandscape ? '68vw' : 'auto',
                height: isLandscape ? 'auto' : 'calc(85vh - 10rem)',
              }}
              onLoad={onImageLoad}
            />
            {getName(piece.description) !== 'Other' && (
              <Box
                sx={{
                  p: 3,
                  bgcolor: '#23222B',
                }}
              >
                <Typography
                  variant="h4"
                >
                  {piece.name}
                </Typography>
                <Typography
                  variant="h3"
                >
                  {getName(piece.description)}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Dialog>
  );
}

GalleryModal.propTypes = {
  piece: openseaPieceProps,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

GalleryModal.defaultProps = {
  piece: {},
};
