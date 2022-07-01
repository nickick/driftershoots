/* eslint-disable react/jsx-props-no-spreading */

import {
  Box, Container, FormControl, keyframes, Link, TextField, Typography,
} from '@mui/material';
import { object, string } from 'prop-types';
import { useContext } from 'react';
import { entranceAnimationDuration } from './constants';
import { LoadedContext } from './LoadedContextProvider';
import OutlinedButton from './OutlinedButton';

const fadeFromBelow = keyframes`
  0% {
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
  }
`;

function InputField({ label, sx, ...props }) {
  return (
    <TextField
      variant="standard"
      label={label}
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
};

InputField.defaultProps = {
  sx: {},
  props: {},
};

export default function Contact() {
  const { animationDelay } = useContext(LoadedContext);

  return (
    <Container
      sx={{
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        mt: 6,
        px: {
          xs: 4,
          md: 14,
        },
      }}
    >
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          animation: `${fadeFromBelow} ${entranceAnimationDuration}s both ${animationDelay}s`,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            mb: 3,
            flex: '3',
          }}
        >
          Get in Touch
        </Typography>
        <Box
          sx={{
            display: 'flex',
            mt: 8,
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: '4 4',
            }}
          >
            <InputField label="Name" required />
            <InputField label="Email Address" required />
            <InputField label="Phone Number" required />
          </Box>
          <InputField
            label="Message (Optional)"
            multiline
            rows={5}
            sx={{
              flex: '8 8',
              ml: {
                xs: 0,
                md: 4,
              },
            }}
          />
        </Box>
        <OutlinedButton
          text="Send Message     "
        >
          <Typography
            variant="h4"
            sx={{
              textTransform: 'none',
            }}
          >
            Send Message
          </Typography>
        </OutlinedButton>
      </FormControl>
      <Box
        sx={{
          pt: {
            xs: 10,
            md: 8,
          },
          mt: {
            xs: 10,
            md: 8,
          },
          borderTop: '1px solid #23222B',
        }}
      >
        <Typography
          variant="overline"
        >
          Email
        </Typography>
        <Link
          href="mailto:management@driftershoots.com"
        >
          <Typography
            variant="h5"
            color="white"
            sx={{
              fontSize: '2.25rem',
              lineHeight: '4rem',
            }}
          >
            management@driftershoots.com
          </Typography>
        </Link>
      </Box>
    </Container>
  );
}
