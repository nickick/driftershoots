import PropTypes from 'prop-types';

export default function LazyImage({
  src, alt, priority,
}) {
  return (
    <img
      src={src}
      alt={alt}
      priority={priority}
      style={{
        transition: 'transform 0.5s ease-out',
      }}
    />
  );
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  priority: PropTypes.bool,
};

LazyImage.defaultProps = {
  priority: false,
};
