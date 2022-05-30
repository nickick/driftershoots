import Image from 'next/image';
import PropTypes from 'prop-types';

export default function LazyImage({ src, priority }) {
  return (
    <Image
      src={src}
      layout="fill"
      objectFit="contain"
      priority={priority}
    />
  );
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  priority: PropTypes.bool,
};

LazyImage.defaultProps = {
  priority: false,
};
