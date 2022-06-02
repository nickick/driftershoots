import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, {
  createRef, useCallback, useEffect, useRef,
} from 'react';
import { Transition } from 'react-transition-group';
import { tilesProps } from '../utils/prop-types';

const transitionStyles = {
  entering: { opacity: 0, visibility: 'visible' },
  entered: { opacity: 1, visibility: 'visible' },
  exiting: { opacity: 1, visibility: 'visible' },
  exited: { opacity: 0, visibility: 'hidden' },
};

const Text = React.forwardRef(({
  text, type, styles, state,
}, ref) => (
  <Typography
    variant={type}
    sx={{
      position: 'absolute',
      ...styles,
      ...transitionStyles[state],
    }}
    aria-hidden={state === 'exiting' || state === 'exited'}
    ref={ref}
    dangerouslySetInnerHTML={{ __html: text }}
  />
));

Text.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
};

export default function TransitionText({
  tiles, selectedTileIndex, tileKey, textType, textStyles, boxStyles,
}) {
  const refs = useRef(tiles.map(() => React.createRef()));
  const newRef = createRef();

  const windowResizeListener = useCallback(() => {
    // first unset the height of the current textbox
    // , then set the height of the parent to the child ref
    refs.current[selectedTileIndex].current.style.height = '';
    refs.current[selectedTileIndex].current.parentElement.style.height = `${refs.current[selectedTileIndex].current.offsetHeight}px`;
  }, [selectedTileIndex]);

  useEffect(() => {
    newRef.current.style.height = `${refs.current[selectedTileIndex].current.offsetHeight}px`;
  }, [newRef, selectedTileIndex]);

  useEffect(() => {
    window.addEventListener('resize', windowResizeListener);

    return () => {
      window.removeEventListener('resize', windowResizeListener);
    };
  }, [selectedTileIndex, windowResizeListener]);

  return (
    <Box
      sx={{
        position: 'relative',
        ...boxStyles,
      }}
      ref={newRef}
    >
      {tiles.map((tile, index) => (
        <Transition
          in={index === selectedTileIndex}
          timeout={0}
          key={tile.h1}
          onEntering={() => {
            newRef.current.style.height = `${refs.current[selectedTileIndex].current.offsetHeight}px`;
          }}
        >
          {(state) => (
            <Text
              key={tile.h1}
              text={tile[tileKey]}
              type={textType}
              styles={textStyles}
              state={state}
              ref={refs.current[index]}
            />
          )}
        </Transition>
      ))}
    </Box>
  );
}

TransitionText.propTypes = {
  tiles: tilesProps.isRequired,
  selectedTileIndex: PropTypes.number.isRequired,
  tileKey: PropTypes.string.isRequired,
  textType: PropTypes.string.isRequired,
  textStyles: PropTypes.object.isRequired,
  boxStyles: PropTypes.object.isRequired,
};
