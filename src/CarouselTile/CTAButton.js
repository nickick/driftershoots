import { Button, Typography } from '@mui/material';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

const transitionStyles = {
  entering: { opacity: 0, visibility: 'visible' },
  entered: { opacity: 1, visibility: 'visible' },
  exiting: { opacity: 1, visibility: 'visible' },
  exited: { opacity: 0, visibility: 'hidden' },
};

function CTAButtonText({
  text, state, childkey,
}) {
  return (
    <Typography
      key={childkey}
      variant="body"
      sx={[
        {
          position: 'absolute',
          color: 'text.primary',
          textTransform: 'capitalize',
          fontSize: '1.75rem',
          lineHeight: '3rem',
          ...transitionStyles[state],
        },
      ]}
      aria-hidden={state === 'exiting' || state === 'exited'}
    >
      {text}
    </Typography>
  );
}

CTAButtonText.propTypes = {
  text: PropTypes.string.isRequired,
  state: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited']).isRequired,
  childkey: PropTypes.number.isRequired,
};

export default function CTAButton({ tiles, selectedTileIndex }) {
  return (
    <Button
      variant="outlined"
      sx={[
        {
          position: 'relative',
          borderRadius: 0,
          borderColor: 'text.primary',
          height: '60px',
          maxWidth: tiles[selectedTileIndex]['right-button-text'].length * 8 + 100,
          transition: 'max-width 0.2s ease-out',
          overflow: 'hidden',
        },
        {
          '&:hover': {
            border: '1px solid white',
          },
        },
        {
          '&:hover > span': {
            color: 'black',
          },
        },
        {
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: '0',
            top: '0',
            backgroundColor: 'white',
            transform: 'translate(-100%, 0)',
            transformOrigin: 'left',
            transition: '0.2s transform ease-out',
            willChange: 'transform',
          },
        },
        {
          '&:hover::before': {
            transform: 'translate(0, 0)',
          },
        },
      ]}
    >
      {tiles.map((tile, index) => (
        <Transition
          in={index === selectedTileIndex}
          timeout={0}
          key={tile.title}
        >
          {(state) => <CTAButtonText childkey={index} text={tile['right-button-text']} state={state} />}
        </Transition>
      ))}
    </Button>
  );
}

CTAButton.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    h1: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    'logo-alt': PropTypes.string.isRequired,
    'main-image': PropTypes.string.isRequired,
    'main-image-zoom': PropTypes.string.isRequired,
    'main-image-zoom-start': PropTypes.string.isRequired,
    'right-title': PropTypes.string.isRequired,
    'right-description': PropTypes.string.isRequired,
    'right-button-text': PropTypes.string.isRequired,
  })).isRequired,
  selectedTileIndex: PropTypes.number.isRequired,
};
