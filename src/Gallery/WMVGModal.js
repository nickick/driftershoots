import { Close } from '@mui/icons-material';
import {
  Box, CircularProgress, Dialog,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { openseaPieceProps } from '../utils/prop-types';
import WhereMyVansGoPiece from '../WhereMyVansGoPiece';

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
          minHeight: '80vh',
          minWidth: '80vw',
          display: isLandscape ? 'block' : 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Close
          sx={{
            position: 'fixed',
            right: 0,
            top: 0,
            zIndex: 1300,
            fontSize: 60,
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
              flexDirection: isLandscape ? 'column' : 'row',
            }}
          >
            <img
              src={piece.image_original_url || piece.image_url}
              alt={piece.name}
              style={{
                transition: 'transform 0.5s ease-out',
                height: isLandscape ? 'unset' : '90vh',
              }}
              onLoad={onImageLoad}
            />
            {loaded && (
              <WhereMyVansGoPiece piece={piece} isLandscape={isLandscape} />
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
