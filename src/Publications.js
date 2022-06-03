import { Box, keyframes, Typography } from '@mui/material';
import { useContext } from 'react';
import { entranceAnimationDuration } from './constants';
import { LoadedContext } from './LoadedContextProvider';

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

export default function Publications() {
  const { animationDelay } = useContext(LoadedContext);

  return (
    <Box
      sx={{
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          animation: `${fadeFromBelow} ${entranceAnimationDuration}s both ${animationDelay}s`,
          minHeight: '70vh',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 1,
          }}
        >
          Drifter Shoots in the News
        </Typography>
        <Typography
          variant="h1"
          sx={{
            textAlign: 'center',
            mb: 3,
          }}
        >
          Publications
        </Typography>
      </Box>
    </Box>
  );
}
