import { Box, Button, Typography } from '@mui/material';
import React, { createRef, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';

const transitionStyles = {
  entering: { opacity: 0 , visibility: 'visible' },
  entered:  { opacity: 1 , visibility: 'visible' },
  exiting:  { opacity: 1 , visibility: 'visible' },
  exited:  { opacity: 0 , visibility: 'hidden'},
};

const RightText = React.forwardRef(({text, state}, ref) => {
  return (
    <Typography
      variant="body"
      sx={{
        position: 'absolute',
        fontSize: '1.75rem',
        lineHeight: '3rem',
        ...transitionStyles[state]
      }}
      aria-hidden={state == 'exiting' || state == 'exited'}
      ref={ref}
    >
      {text}
    </Typography>
  )
});
            

export default function RightDescription ({tiles, selectedTileIndex, previousIndex}) {
  const refs = useRef(tiles.map(() => React.createRef()));
  const newRef = createRef();

  useEffect(() => {
    newRef.current.style.height = refs.current[selectedTileIndex].current.offsetHeight + 'px'
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        mb: 3,
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
              return <RightText key={index} text={tile["right-title"]} state={state} ref={refs.current[index]} />
            }}
          </Transition>
        )}
      )}
    </Box>
  )
}