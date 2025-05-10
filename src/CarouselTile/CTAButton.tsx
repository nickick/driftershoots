import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import OutlinedButton from '../OutlinedButton';
import { TilesProps } from '../utils/types';

const transitionStyles = {
  entering: { opacity: 0, visibility: 'visible' },
  entered: { opacity: 1, visibility: 'visible' },
  exiting: { opacity: 1, visibility: 'visible' },
  exited: { opacity: 0, visibility: 'hidden' },
};

function CTAButtonText({
  text,
  state,
  childkey,
}: {
  text: string;
  state: string;
  childkey: number;
}) {
  return (
    <Typography
      key={childkey}
      variant="body1"
      sx={[
        {
          position: 'absolute',
          color: 'text.primary',
          textTransform: 'capitalize',
          fontSize: '1.75rem',
          lineHeight: '3rem',
          ...transitionStyles[state as keyof typeof transitionStyles],
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
  state: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited'])
    .isRequired,
  childkey: PropTypes.number.isRequired,
};

export default function CTAButton({
  tiles,
  selectedTileIndex,
}: {
  tiles: TilesProps;
  selectedTileIndex: number;
}) {
  return (
    <OutlinedButton
      href={tiles[selectedTileIndex]['right-button-href']}
      clientside={
        tiles[selectedTileIndex]['right-button-href'].indexOf('/') === 0
      }
      fullWidth={false}
      text={tiles[selectedTileIndex]['right-button-text']}
    >
      {tiles.map((tile, index) => (
        <Transition
          in={index === selectedTileIndex}
          timeout={0}
          key={tile.title}
        >
          {(state) => (
            <CTAButtonText
              childkey={index}
              text={tile['right-button-text']}
              state={state}
            />
          )}
        </Transition>
      ))}
    </OutlinedButton>
  );
}
