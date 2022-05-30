import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { childrenProps } from './utils/prop-types';

export const ThemeContext = createContext();

const themeShared = {
  typography: {
    fontFamily: ['Karla', 'sans-serif'].join(','),
    h1: {
      fontFamily: ['Rawgly', 'serif'].join(','),
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
        disableGutters: true,
      },
    },
  },
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  ...themeShared,
});

const darkTheme = createTheme({
  palette: {
    background: {
      default: '#080808',
    },
    mode: 'dark',
  },
  ...themeShared,
});

function getActiveTheme(themeMode) {
  return themeMode === 'light' ? lightTheme : darkTheme;
}

export default function ThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState(darkTheme);
  const [selectedTheme, setSelectedTheme] = useState('dark');

  const toggleTheme = useCallback(() => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light';

    setSelectedTheme(desiredTheme);
  }, [selectedTheme]);

  const providerValue = useMemo(() => ({
    toggleTheme,
    selectedTheme,
  }), [toggleTheme, selectedTheme]);

  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme));
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider value={providerValue}>
      <MUIThemeProvider theme={activeTheme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: childrenProps.isRequired,
};
