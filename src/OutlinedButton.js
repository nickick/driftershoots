import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { childrenProps } from './utils/prop-types';

export default function OutlinedButton({ href, text, children }) {
  return (
    <Button
      variant="outlined"
      href={href}
      target="_blank"
      sx={[
        {
          position: 'relative',
          borderRadius: 0,
          borderColor: 'text.primary',
          height: '60px',
          maxWidth: text.length * 8 + 100,
          transition: 'max-width 0.2s ease-out',
          overflow: 'hidden',
          color: 'white',
        },
        {
          '&:hover': {
            border: '1px solid white',
          },
        },
        {
          '&:hover > span, &:hover > h4': {
            color: 'black',
            zIndex: 10,
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
      { children }
    </Button>
  );
}

OutlinedButton.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
  children: childrenProps.isRequired,
};

OutlinedButton.defaultProps = {
  href: '',
  text: '',
};
