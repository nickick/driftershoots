/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */

import { CssBaseline } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { ThemeContext } from '../src';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <ThemeContext>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeContext>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
