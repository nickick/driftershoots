import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import '../styles/globals.css';

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

function MyApp({ Component, pageProps }) {
  const [activeTheme, setActiveTheme] = useState(lightTheme);
  const [selectedTheme, setSelectedTheme] = useState('dark');

  const toggleTheme = () => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light';

    setSelectedTheme(desiredTheme);
  };

  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme))
  }, [selectedTheme]);

  return (
    <ThemeProvider theme={activeTheme}>
      <Component {...pageProps} toggleTheme={toggleTheme} selectedTheme={selectedTheme} />
    </ThemeProvider>
  )
}

export default MyApp
