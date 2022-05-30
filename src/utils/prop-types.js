import { PropTypes } from 'prop-types';

export const tilesProps = PropTypes.arrayOf(PropTypes.shape({
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  h1: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  'logo-alt': PropTypes.string.isRequired,
  'main-image': PropTypes.string.isRequired,
  'main-image-zoom': PropTypes.string.isRequired,
  'main-image-zoom-start': PropTypes.string.isRequired,
  'right-title': PropTypes.string.isRequired,
  'right-description': PropTypes.string.isRequired,
  'right-button-text': PropTypes.string.isRequired,
}));

export const childrenProps = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);
