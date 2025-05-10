import { Button, keyframes } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { entranceAnimationDelay, entranceAnimationDuration } from './constants';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export function NavButton({ text, href, icon, index, animation }) {
  return (
    <Link href={href} passHref>
      <Button
        variant="text"
        sx={{
          color: 'text.primary',
          minWidth: icon ? '1rem' : 'inherit',
          mx: '0.5rem',
          fontSize: '1.5rem',
          lineHeight: '2rem',
          letterSpacing: '0.1rem',
          animation: animation
            ? `${fadeIn} ${entranceAnimationDuration}s both ${
                entranceAnimationDelay + index * 0.2
              }s`
            : 'none',
          whiteSpace: 'nowrap',
        }}
        target={icon || href[0] !== '/' ? '_blank' : ''}
      >
        {text}
        {icon || ''}
      </Button>
    </Link>
  );
}

NavButton.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.node,
  index: PropTypes.number.isRequired,
  animation: PropTypes.bool,
};

NavButton.defaultProps = {
  text: '',
  href: '',
  icon: null,
  animation: true,
};
