/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */

import PropTypes from 'prop-types';
import React from 'react';
import { ThemeContext } from '../src';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <ThemeContext>
      <Component {...pageProps} />
    </ThemeContext>
  );
}

App.propTypes = {
  Component: PropTypes.instanceOf(React.Component).isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
