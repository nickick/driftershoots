import { number, PropTypes, string } from "prop-types";

export const tilesProps = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    h1: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    "logo-alt": PropTypes.string.isRequired,
    "main-image": PropTypes.string.isRequired,
    "main-image-zoom": PropTypes.shape({
      scale: PropTypes.number.isRequired,
      translateX: PropTypes.number.isRequired,
      translateY: PropTypes.number.isRequired,
    }).isRequired,
    "main-image-zoom-start": PropTypes.shape({
      scale: PropTypes.number.isRequired,
      translateX: PropTypes.number.isRequired,
      translateY: PropTypes.number.isRequired,
    }).isRequired,
    "right-title": PropTypes.string.isRequired,
    "right-description": PropTypes.string.isRequired,
    "right-button-text": PropTypes.string.isRequired,
    "right-button-href": PropTypes.string.isRequired,
  })
);

export const childrenProps = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

export const openseaPieceProps = PropTypes.shape({
  contract: PropTypes.shape({
    address: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tokenId: PropTypes.oneOfType([number, string]).isRequired,
  image: PropTypes.shape({
    originalUrl: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
  }),
});
