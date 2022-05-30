import PropTypes from 'prop-types';
import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { entranceAnimationDelay } from './constants';

export const LoadedContext = createContext();

export default function LoadedProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  const animationDelay = isLoaded ? 0 : entranceAnimationDelay;

  const providerValue = useMemo(() => ({
    isLoaded,
    animationDelay,
    backgroundImage,
    setBackgroundImage,
    backgroundOpacity,
    setBackgroundOpacity,
  }), [isLoaded, animationDelay, backgroundImage, setBackgroundImage, backgroundOpacity, setBackgroundOpacity]);

  return (
    <LoadedContext.Provider value={providerValue}>
      {children}
    </LoadedContext.Provider>
  );
}

LoadedProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
