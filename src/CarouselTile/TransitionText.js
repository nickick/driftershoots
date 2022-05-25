import { Box, Typography } from '@mui/material';
import React, { createRef, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';

const transitionStyles = {
  entering: { opacity: 0 , visibility: 'visible' },
  entered:  { opacity: 1 , visibility: 'visible' },
  exiting:  { opacity: 1 , visibility: 'visible' },
  exited:  { opacity: 0 , visibility: 'hidden'},
};

const Text = React.forwardRef(({text, type, styles, state}, ref) => {
  return (
    <Typography
      variant={type}
      sx={{
        position: 'absolute',
        ...styles,
        ...transitionStyles[state]
      }}
      aria-hidden={state == 'exiting' || state == 'exited'}
      ref={ref}
      dangerouslySetInnerHTML={{__html: text}}
    >
    </Typography>
  )
});
            

export default function TransitionText ({tiles, selectedTileIndex, tileKey, textType, textStyles, boxStyles}) {
  const refs = useRef(tiles.map(() => React.createRef()));
  const newRef = createRef();

  useEffect(() => {
    newRef.current.style.height = refs.current[selectedTileIndex].current.offsetHeight + 'px'
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        ...boxStyles
      }}
      ref={newRef}
    >
      {tiles.map((tile, index) => {
        return (
          <Transition
            in={index == selectedTileIndex}
            timeout={0}
            key={index}
            onEntering={() => {
              newRef.current.style.height = refs.current[selectedTileIndex].current.offsetHeight + 'px'
            }}
            onEntered={() => {
              console.log(refs.current)
              console.log(newRef)
            }}
            onExited={() => {

            }}
          >
            {state => {
              return <Text key={index} text={tile[tileKey]} type={textType} styles={textStyles} state={state} ref={refs.current[index]} />
            }}
          </Transition>
        )}
      )}
    </Box>
  )
}