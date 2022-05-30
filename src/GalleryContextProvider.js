import PropTypes from 'prop-types';
import {
  createContext, useEffect, useMemo, useState,
} from 'react';

export const GalleryContext = createContext();

export default function GalleryProvider({ children }) {
  const [wmvgPieces, setWMVGPieces] = useState([]);

  async function getWMVGPieces() {
    const results = await fetch('/api/where-my-vans-go');
    const pieces = await results.json();
    setWMVGPieces(pieces);
  }

  useEffect(() => {
    getWMVGPieces();
  }, []);

  const providerValue = useMemo(() => ({
    wmvgPieces,
  }), [wmvgPieces]);

  return (
    <GalleryContext.Provider value={providerValue}>
      {children}
    </GalleryContext.Provider>
  );
}

GalleryProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
