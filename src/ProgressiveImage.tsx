import Image, { ImageProps } from 'next/image';
import { useProgressiveImg } from './hooks/useProgressiveImg';

const ProgressiveImage = ({
  src: imgSrc,
  lowResSrc,
  ...props
}: ImageProps & {
  lowResSrc: string;
}) => {
  const { src: currentSrc, blur } = useProgressiveImg(
    lowResSrc as string,
    imgSrc as string
  );
  return (
    <Image
      {...props}
      src={currentSrc}
      alt={props.alt}
      style={{
        filter: blur ? 'blur(10px)' : 'none',
        transition: blur ? 'none' : 'filter 0.3s ease-in-out',
      }}
    />
  );
};

export { ProgressiveImage };
