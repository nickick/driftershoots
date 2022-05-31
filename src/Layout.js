import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { LoadedContext } from './LoadedContextProvider';

export default function Layout({ children }) {
  const { backgroundImage, backgroundOpacity } = useContext(LoadedContext);

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '90vh',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 80%, #080808 100%)',
          backgroundSize: 'cover',
          transition: 'opacity 1s ease-out',
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '90vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          opacity: backgroundOpacity,
          transition: 'opacity 1s ease-out',
          zIndex: 1,
        }}
      />
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
