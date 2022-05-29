import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Navbar />
        {children}
        <Footer />
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
