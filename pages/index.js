import { Box } from "@mui/material";
import { Footer, Main, Navbar } from '../src';

function App() {
  return (
    <main>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary'
        }}
      >
        <Navbar />
        <Main />
        <Footer />
      </Box>
    </main> 
  );
}

export default App;