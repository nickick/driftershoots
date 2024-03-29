/* eslint-disable react/jsx-props-no-spreading */

import {
  Box, Container, FormControl, keyframes, Link, Typography,
} from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { entranceAnimationDuration } from './constants';
import InputField from './InputField';
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

export default function Contact() {
  const { animationDelay } = useContext(LoadedContext);

  const [name, setName] = useState('');
  const setNewName = useCallback((e) => {
    setName(e.target.value);
  }, [setName]);

  const [email, setEmail] = useState('');
  const setNewEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, [setEmail]);

  const [phoneNumber, setNumber] = useState('');
  const setNewNumber = useCallback((e) => {
    setNumber(e.target.value);
  }, [setNumber]);

  const [message, setMessage] = useState('');
  const setNewMessage = useCallback((e) => {
    setMessage(e.target.value);
  }, [setMessage]);

  const [statusMessage, setStatusMessage] = useState({});

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      phoneNumber,
      message,
    };

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          setStatusMessage({
            type: 'success',
            text: 'Message sent!',
          });
        } else {
          setStatusMessage({
            type: 'error',
            text: 'Something went wrong. Please try again later.',
          });
        }
      });
  }, [email, message, phoneNumber, name]);

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
      <form
        onSubmit={handleSubmit}
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
          { statusMessage.text && (
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '2rem',
                }}
              >
                {statusMessage.text}
              </Typography>
            </Box>
          )}
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
              <InputField label="Name" value={name} onChange={setNewName} required />
              <InputField label="Email Address" value={email} onChange={setNewEmail} required />
              <InputField label="Phone Number" value={phoneNumber} onChange={setNewNumber} required />
            </Box>
            <InputField
              label="Message (Optional)"
              multiline
              rows={5}
              value={message}
              onChange={setNewMessage}
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
            onClick={handleSubmit}
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
      </form>
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
