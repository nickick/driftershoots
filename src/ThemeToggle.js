import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContextProvider';

export default function ThemeToggle() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Box>
      CLICK IT. DO IT.
      <Button
        onClick={toggleTheme}
      >
        BUTTON
      </Button>
    </Box>
  );
}
