import PropTypes from 'prop-types';

export default function LazyImage({
  src, alt, priority, onLoad,
}) {
  return (
    <img
      src={src}
      alt={alt}
      priority={priority}
      style={{
        transition: 'transform 0.5s ease-out',
        maxHeight: '80vh',
      }}
      onLoad={onLoad}
    />
  );
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onLoad: PropTypes.func,
  priority: PropTypes.bool,
};

LazyImage.defaultProps = {
  priority: false,
  onLoad: () => {},
};
