/* eslint-disable react/jsx-props-no-spreading */

import { Button } from '@mui/material';
import { PropTypes } from 'prop-types';
import { childrenProps } from './utils/prop-types';

export default function WhiteButton({ children, sx, ...props }) {
  return (
    <Button
      sx={{
        color: 'text.primary',
        mx: '0.5rem',
        fontSize: '1.5rem',
        lineHeight: '2rem',
        letterSpacing: '0.1rem',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

WhiteButton.propTypes = {
  children: childrenProps.isRequired,
  sx: PropTypes.object.isRequired,
};
