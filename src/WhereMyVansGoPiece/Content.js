import {
  Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export function Content({ title, value }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        my: 1,
      }}
    >
      <Typography
        variant="h4"
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          ml: 1,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

Content.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
