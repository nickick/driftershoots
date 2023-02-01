/* eslint-disable react/jsx-props-no-spreading */
import { TextField } from '@mui/material';

import {
  func, number, object, oneOfType, string,
} from 'prop-types';

export default function InputField({
  label, sx, value, onChange, ...props
}) {
  return (
    <TextField
      variant="standard"
      label={label}
      value={value}
      onChange={onChange}
      InputProps={{
        sx: [
          {
            fontSize: '2rem',
            width: '100%',
            height: '100%',
          },
        ],
      }}
      InputLabelProps={{
        shrink: true,
        style: {
          fontSize: '2rem',
          color: 'white',
        },
      }}
      sx={{
        mb: 4,
        ...sx,
      }}
      {...props}
    />
  );
}

InputField.propTypes = {
  label: string.isRequired,
  sx: object,
  props: object,
  value: oneOfType(string, number).isRequired,
  onChange: func.isRequired,
};

InputField.defaultProps = {
  sx: {},
  props: {},
};
