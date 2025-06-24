'use client';

import { ArrowBack, ArrowForward, Close } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useState } from 'react';
import { ProgressiveImage } from '../ProgressiveImage';
const images = [
  '/book/gallery/IWND ECOM_17.webp',
  '/book/gallery/IWND-IG-_05.webp',
  '/book/gallery/IWND-IG-_02.webp',
  '/book/gallery/IWND-IG-_03.webp',
  '/book/gallery/IWND-IG-_04.webp',
  '/book/gallery/IWND-IG-_08.webp',
  '/book/gallery/IWND-IG-_09.webp',
  '/book/gallery/IWND ECOM_18.webp',
  '/book/gallery/IWND ECOM_34.webp',
  '/book/gallery/IWND ECOM_37.webp',
  '/book/gallery/IWND ECOM_60.webp',
  '/book/gallery/IWND ECOM_70.webp',
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(images[0]);

  const getThumbnailPath = (imagePath: string) => {
    const match = imagePath.match(/\/book\/gallery\/(.+)\.webp$/);
    if (match) {
      return `/book/gallery/${match[1]}-thumbnail.webp`;
    }
    return '';
  };

  const selectNextImage = () => {
    const currentIndex = images.indexOf(mainImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setMainImage(images[nextIndex]);
    setSelectedImage(images[nextIndex]);
  };

  const selectPreviousImage = () => {
    const currentIndex = images.indexOf(mainImage);
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setMainImage(images[previousIndex]);
    setSelectedImage(images[previousIndex]);
  };

  return (
    <Box sx={{ mt: 4, position: 'relative' }}>
      {/* Modal for full-size image */}
      {selectedImage && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.9)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: { xs: 10, md: '10%' },
                top: { xs: '15%', md: '50%' },
                width: { xs: 50, md: 40 },
                height: { xs: 50, md: 40 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                padding: 1,
                zIndex: 1000,
              }}
            >
              <ArrowBack
                sx={{
                  height: { xs: 20, md: 40 },
                  width: '100%',
                }}
                onClick={selectPreviousImage}
              />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                right: { xs: '50%', md: '10%' },
                transform: { xs: 'translateX(50%)', md: 'none' },
                top: { xs: '15%', md: 'unset' },
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                padding: 1,
                width: { xs: 50, md: 40 },
                height: { xs: 50, md: 40 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
              }}
              onClick={() => setSelectedImage(null)}
            >
              <Close
                sx={{
                  height: { xs: 20, md: 40 },
                  width: '100%',
                }}
              />
            </Box>
            <ProgressiveImage
              src={selectedImage}
              lowResSrc={getThumbnailPath(selectedImage)}
              alt="Selected gallery image"
              layout="fill"
              objectFit="contain"
              style={{
                maxHeight: '90vh',
                maxWidth: '90vw',
                objectFit: 'contain',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                right: { xs: 10, md: '10%' },
                top: { xs: '15%', md: '50%' },
                width: { xs: 50, md: 40 },
                height: { xs: 50, md: 40 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                padding: 1,
                zIndex: 1000,
              }}
            >
              <ArrowForward
                sx={{ height: { xs: 20, md: 40 }, width: '100%' }}
                onClick={selectNextImage}
              />
            </Box>
          </Box>
        </Box>
      )}

      {/* Main large image */}
      <Box
        sx={{
          width: '100%',
          height: { xs: '40vh', md: '60vh' },
          position: 'relative',
          cursor: 'pointer',
          mb: { xs: 10, md: 0 },
          '&:hover': {
            opacity: 0.95,
          },
        }}
        onClick={() => setSelectedImage(mainImage)}
      >
        <ProgressiveImage
          src={mainImage}
          lowResSrc={getThumbnailPath(mainImage)}
          key={mainImage}
          alt="Main gallery image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </Box>

      {/* Thumbnail row/column */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', md: 'row' },
          gap: 1,
          mt: 2,
          justifyContent: 'center',
          flexWrap: 'wrap',
          position: {
            xs: 'absolute',
            md: 'relative',
          },
          bottom: {
            xs: 0,
            md: 'auto',
          },
          left: {
            xs: 3,
            md: 'auto',
          },
        }}
      >
        {images.map((image, i) => (
          <Box
            key={image}
            sx={{
              cursor: 'pointer',
              width: { xs: 30, md: 40 },
              height: { xs: 30, md: 40 },
              border:
                mainImage === image
                  ? '3px solid white'
                  : '3px solid transparent',
              borderRadius: 1,
              overflow: 'hidden',
              position: 'relative',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.7)',
              },
            }}
            onClick={() => setMainImage(image)}
          >
            <ProgressiveImage
              src={image}
              lowResSrc={getThumbnailPath(image)}
              alt={`Gallery thumbnail ${i + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { Gallery };
