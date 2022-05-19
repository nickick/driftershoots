import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

const themeShared = {
  typography: {
    fontFamily: ['Karla', 'sans-serif'].join(','),
    h1: {
      fontFamily: ['Rawgly', 'serif'].join(',')
    },
  },
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  ...themeShared
});

const darkTheme = createTheme({
  palette: {
    background: {
      default: '#080809'
    },
    mode: 'dark',
  },
  ...themeShared
});

function getActiveTheme(themeMode) {
  return themeMode == 'light' ? lightTheme : darkTheme;
}

export default function ThemeProvider ({children}) {
  const [activeTheme, setActiveTheme] = useState(darkTheme);
  const [selectedTheme, setSelectedTheme] = useState('dark');

  const toggleTheme = () => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light';

    setSelectedTheme(desiredTheme);
  };

  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme))
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider value={{
      toggleTheme,
      selectedTheme
    }}>
      <MUIThemeProvider theme={activeTheme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  )
}