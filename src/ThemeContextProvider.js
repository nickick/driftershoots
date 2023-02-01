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
    h4: {
      textTransform: 'none',
    },
    overline: {
      fontSize: '2rem',
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
        disableGutters: true,
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          '&.Mui-focused': {
            color: 'rgba(255, 255, 255, 0.87)',
          },
          fontSize: '2rem',
          '&:after': {
            borderBottom: '1px solid white',
          },
          '&:autofill': {
            background: 'black',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '2rem',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          '&.Mui-focused': {
            color: 'rgba(255, 255, 255, 0.87)',
            transform: 'translate(0, -10px) scale(1.1)',
          },
          fontSize: '2rem',
          transform: 'translate(0, -10px) scale(1)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
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
    primary: {
      main: '#36364B',
    },
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
