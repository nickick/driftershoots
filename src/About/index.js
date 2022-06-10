import {
  Box,
} from '@mui/material';
import ArrestedAtGunpoint from './ArrestedAtGunpoint';
import InNews from './InNews';
import Intro from './Intro';

export default function About() {
  return (
    <Box
      sx={{
        zIndex: 3,
        px: {
          xs: 3,
          md: 14,
        },
        mt: {
          xs: 4,
          md: 14,
        },
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Intro />
        <ArrestedAtGunpoint />
        <InNews />
      </Box>
    </Box>
  );
}
