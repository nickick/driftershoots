import { Box, Button } from "@mui/material";
import { Footer, Main, Navbar } from '../src';

function App({toggleTheme, selectedTheme}) {
  return (
    <main>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary'
        }}
      >
        This app is using the {selectedTheme} mode
        <Button 
          onClick={toggleTheme}
        >
          Toggle Theme
        </Button>
        <Navbar />
        <Main />
        <Footer />
      </Box>
    </main> 
  );
}

export default App;