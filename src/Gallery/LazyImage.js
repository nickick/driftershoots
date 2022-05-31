import Image from 'next/image';
import PropTypes from 'prop-types';

export default function LazyImage({
  src, priority, onLoadingComplete, mouseOver,
}) {
  return (
    <Image
      src={src}
      layout="fill"
      objectFit="contain"
      priority={priority}
      onLoadingComplete={onLoadingComplete}
      style={{
        transform: mouseOver ? 'scale(1.2)' : 'scale(1.0)',
        transition: 'transform 0.5s ease-out',
      }}
    />
  );
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  priority: PropTypes.bool,
  onLoadingComplete: PropTypes.func.isRequired,
  mouseOver: PropTypes.bool.isRequired,
};

LazyImage.defaultProps = {
  priority: false,
};
