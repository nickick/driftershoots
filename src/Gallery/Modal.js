import {
  Box, Dialog, Paper, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { openseaPieceProps } from '../utils/prop-types';
import LazyImage from './LazyImage';

export default function GalleryModal({ piece, open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
    >
      <Paper
        sx={{
          p: 3,
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
                flex: 1,
                position: 'relative',
              }}
            >
              <LazyImage
                src={piece.image_url}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Typography
                variant="h2"
              >

                {piece.description}
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
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
