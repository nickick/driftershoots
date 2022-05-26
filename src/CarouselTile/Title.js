import { Box, Typography } from '@mui/material';
import { Transition } from 'react-transition-group';

const transitionStyles = {
  entering: { opacity: 0, visibility: 'visible' },
  entered: { opacity: 1, visibility: 'visible' },
  exiting: { opacity: 1, visibility: 'visible' },
  exited: { opacity: 0, visibility: 'hidden' },
};

function Title({ text, state }) {
  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: '16rem',
        position: 'absolute',
        top: '50%',
        left: '0',
        transform: 'translate(0%, -50%)',
        width: '488px',
        zIndex: 12,
        ...transitionStyles[state],
      }}
      aria-hidden={state === 'exiting' || state === 'exited'}
    >
      {text}
    </Typography>
  );
}

export default function TileTitle({ tiles, selectedTileIndex }) {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {tiles.map((tile, index) => (
        <Transition
          in={index === selectedTileIndex}
          timeout={0}
          key={index}
        >
          {(state) => <Title key={index} text={tile.h1} state={state} />}
        </Transition>
      ))}
    </Box>
  );
}
