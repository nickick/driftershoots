import {
  Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenProps } from '../utils/prop-types';

export function Content({ title, value, children }) {
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
      {value && (
        <Typography
          variant="h5"
          sx={{
            ml: 1,
          }}
        >
          {value}
        </Typography>
      )}
      {children && (
        <Box
          sx={{
            ml: 1,
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

Content.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  children: childrenProps,
};

Content.defaultProps = {
  value: '',
  children: null,
};
