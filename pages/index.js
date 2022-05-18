import { Box } from '@mui/material';
import { Footer, Main, Navbar } from '../src';

function App() {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Navbar />
      <Main />
      <Footer />
    </Box>
  );
}

export default App;
