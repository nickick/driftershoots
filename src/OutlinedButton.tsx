import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

interface OutlinedButtonProps {
  href: string;
  text: string;
  children: React.ReactNode;
  clientside: boolean;
  fullWidth: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  scrollToTop?: boolean;
  target?: string;
}

export default function OutlinedButton({
  href,
  text,
  children,
  clientside,
  fullWidth,
  onClick,
  scrollToTop,
  target,
}: OutlinedButtonProps) {
  const router = useRouter();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(e);
      }

      e.preventDefault();

      if (clientside) {
        router.push(
          {
            pathname: href,
          },
          undefined,
          { scroll: scrollToTop }
        );
      } else if (href) {
        window.open(href, target);
      }
    },
    [clientside, href, router, onClick, scrollToTop]
  );

  return (
    <Button
      component={clientside ? 'button' : 'a'}
      variant="outlined"
      href={clientside ? undefined : href}
      target={clientside ? undefined : target}
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
          '&:hover > span, &:hover > h4, &:hover > p': {
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
      {children}
    </Button>
  );
}
