import { Button, Typography } from '@mui/material';
import { Transition } from 'react-transition-group';

const transitionStyles = {
  entering: { opacity: 0 , visibility: 'visible' },
  entered:  { opacity: 1 , visibility: 'visible' },
  exiting:  { opacity: 1 , visibility: 'visible' },
  exited:  { opacity: 0 , visibility: 'hidden'},
};

function CTAButtonText ({text, link, state, childkey}) {
  return (
    <Typography
      key={childkey}
      variant="body"
      sx={{
        position: 'absolute',
        color: 'text.primary',
        textTransform: 'capitalize',
        fontSize: '1.75rem',
        lineHeight: '3rem',
        ...transitionStyles[state]
      }}
      aria-hidden={state == 'exiting' || state == 'exited'}
    >
      {text}
    </Typography>
  )
}

export default function CTAButton ({tiles, selectedTileIndex}) {
  return (
    <Button 
      variant="outlined"
      sx={{
        position: 'relative',
        borderRadius: 0,
        borderColor: 'text.primary',
        height: '60px',
        maxWidth: tiles[selectedTileIndex]["right-button-text"].length * 8 + 60,
        transition: 'max-width 0.2s ease-out'
      }}
    >
      {tiles.map((tile, index) => {
        return (
          <Transition
            in={index == selectedTileIndex}
            timeout={0}
            key={index}
            onEntering={() => {

            }}
            onExited={() => {

            }}
          >
            {state => {
              return <CTAButtonText childkey={index} text={tile["right-button-text"]} state={state} />
            }}
          </Transition>
        )
      })}
    </Button>
  )
}