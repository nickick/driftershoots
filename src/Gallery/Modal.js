import {
  Box, Dialog,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { openseaPieceProps } from '../utils/prop-types';
import WhereMyVansGoPiece from '../WhereMyVansGoPiece';
import LazyImage from './LazyImage';

export default function GalleryModal({ piece, open, handleClose }) {
  const boxRef = useRef();
  const onImageLoad = useCallback(({ naturalHeight, naturalWidth }) => {
    if (!boxRef.current) return;
    const proportionalHeight = (boxRef.current.offsetWidth * naturalHeight) / naturalWidth;
    boxRef.current.style.height = `${proportionalHeight}px`;
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
        }}
      >
        {piece && (
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-start',
                position: 'relative',
                overflow: 'hidden',
              }}
              ref={boxRef}
            >
              <LazyImage
                src={piece.image_url}
                onLoadingComplete={onImageLoad}
              />
            </Box>
            <WhereMyVansGoPiece piece={piece} />
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
