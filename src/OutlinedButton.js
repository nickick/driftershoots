import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { childrenProps } from './utils/prop-types';

export default function OutlinedButton({
  href, text, children, clientside, fullWidth, onClick, scrollToTop,
}) {
  const router = useRouter();

  const handleClick = useCallback((e) => {
    if (onClick) {
      onClick(e);
    }

    e.preventDefault();

    if (clientside) {
      router.push({
        pathname: href,
      }, undefined, { scroll: scrollToTop });
    } else {
      window.open(href);
    }
  }, [clientside, href, router, onClick, scrollToTop]);

  return (
    <Button
      variant="outlined"
      href={clientside ? '' : href}
      target={clientside ? '' : '_blank'}
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderRadius: 0,
          borderColor: 'text.primary',
          height: '60px',
          maxWidth: fullWidth ? 'unset' : text.length * 8 + 100,
          width: fullWidth ? '100%' : 'unset',
          transition: 'max-width 0.2s ease-out',
          overflow: 'hidden',
          color: 'white',
          px: 5,
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
      onClick={handleClick}
    >
      { children }
    </Button>
  );
}

OutlinedButton.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
  clientside: PropTypes.bool,
  fullWidth: PropTypes.bool,
  children: childrenProps.isRequired,
  onClick: PropTypes.func,
  scrollToTop: PropTypes.bool,
};

OutlinedButton.defaultProps = {
  href: '',
  text: '',
  clientside: false,
  fullWidth: false,
  scrollToTop: false,
  onClick: () => {},
};
