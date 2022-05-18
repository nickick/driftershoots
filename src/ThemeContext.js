import { useEffect, useState } from 'react';
import { createContext } from "react";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";

export const ThemeContext = createContext();

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
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