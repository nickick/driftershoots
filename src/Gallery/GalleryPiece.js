import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useCallback, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getName } from '../utils/parsers';
import { childrenProps, openseaPieceProps } from '../utils/prop-types';
import LazyImage from './LazyImage';

function TextSection({ title, children }) {
  return (
    <>
      <Typography
        variant="h4"
      >
        {title}
      </Typography>
      <Typography
        variant="body"
        sx={{
          mb: 3,
        }}
      >
        {children}
      </Typography>
    </>
  );
}

TextSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: childrenProps.isRequired,
};

export default function GalleryPiece({ piece, index, setModalOpen }) {
  const [imageDimensions, setImageDimensions] = useState([0, 0]);
  const [mouseOver, setMouseOver] = useState(false);
  const boxRef = useRef();
  const router = useRouter();

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '-200px 0px',
  });

  const onImageLoaded = useCallback(({ naturalWidth, naturalHeight }) => {
    if (!boxRef.current) return;
    setImageDimensions([naturalWidth, naturalHeight]);
    const proportionalHeight = (boxRef.current.offsetWidth * naturalHeight) / naturalWidth;
    boxRef.current.style.height = `${proportionalHeight}px`;
  }, []);

  const onMouseOver = useCallback(() => {
    setMouseOver(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setMouseOver(false);
  }, []);

  const selectPiece = useCallback((e) => {
    e.preventDefault();
    const { pathname } = router;
    setModalOpen(true);

    router.push({
      pathname,
      query: {
        gallery: piece.id,
      },
    }, undefined, { scroll: false });
  }, [piece.id, router, setModalOpen]);

  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: 'row',
          opacity: inView ? 1 : 0,
          position: 'relative',
        },
      ]}
      ref={boxRef}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={selectPiece}
      id={`wmvg-${index}`}
    >
      <Box
        sx={[
          {
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-start',
            position: 'relative',
            paddingBottom: imageDimensions[0] ? `${(imageDimensions[1] / imageDimensions[0]) * 100}%` : 0,
            overflow: 'hidden',
          },
        ]}
        ref={ref}
      >
        <LazyImage
          src={piece.image_url}
          alt={piece.name}
          priority={index === 1}
          onLoadingComplete={onImageLoaded}
          mouseOver={mouseOver}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          flex: 1,
          p: 3,
          cursor: 'pointer',
          opacity: mouseOver ? 1 : 0,
          background: 'rgba(0,0,0,0.5)',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 1,
          }}
        >
          {getName(piece.description)}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
          }}
        >
          {piece.name}
        </Typography>
      </Box>
    </Box>
  );
}

GalleryPiece.propTypes = {
  piece: openseaPieceProps.isRequired,
  index: PropTypes.number.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

/*
animation_original_url: null
  animation_url: null
  asset_contract: {address: '0x509a050f573be0d5e01a73c3726e17161729558b',
   asset_contract_type: 'non-fungible',
   created_date: '2022-02-25T21:44:20.377663',
   name: 'Where My Vans Go', nft_version: '3.0', …}
  background_color: null
  collection: {
    banner_image_url: 'https://lh3.googleusercontent.com/KFqkP5VYQNsW4R5P…zjd1sGcPDEb8dRUbya5JML0pCD5osgyfM2kXjb3LDmC=s2500',
    chat_url: null,
    created_date: '2021-08-07T06:05:22.726722',
    default_to_fiat: false,
    description: 'Where My Vans Go is a collection comprised of 123 …akes.
    These are the shoes that made me. Welcome.', …
  }
  creator: {
    user: {…},
    profile_img_url: 'https://storage.googleapis.com/opensea-static/opensea-profile/17.png',
    address: '0xd63f506b8f0a421c4b00ea43a419d674173eaad8',
    config: ''
  }
  decimals: 0
  description: "\"Trilogy\"\n\nArtist: Isaac Wright"
  external_link: null
  id: 417104117
  image_original_url: "https://arweave.net/5q5_PSGJmqskyrGv1uNA_iyylKk7OtpV0rPsIFp3vGs"
  image_preview_url: "https://lh3.googleusercontent.com/fS0TbxcW4Atb2ZCXjmVE7famo8W7mlygvpRVmBK3eSS6luddp7tPXLYFAJHanLNk-wJtFEiiv9egS6rIhOT6mPLhv183PC6UdX1a=s250"
  image_thumbnail_url: "https://lh3.googleusercontent.com/fS0TbxcW4Atb2ZCXjmVE7famo8W7mlygvpRVmBK3eSS6luddp7tPXLYFAJHanLNk-wJtFEiiv9egS6rIhOT6mPLhv183PC6UdX1a=s128"
  image_url: "https://lh3.googleusercontent.com/fS0TbxcW4Atb2ZCXjmVE7famo8W7mlygvpRVmBK3eSS6luddp7tPXLYFAJHanLNk-wJtFEiiv9egS6rIhOT6mPLhv183PC6UdX1a"
  is_nsfw: false
  is_presale: false
  last_sale: null
  listing_date: null
  name: "Where My Vans Go #79"
  num_sales: 0
  owner: {
    user: {…},
    profile_img_url: 'https://storage.googleapis.com/opensea-static/opensea-profile/24.png',
    address: '0xbb8fafa8a629c4dce022d95e098ccccee1acd942', config: ''
  }
  permalink: "https://opensea.io/assets/ethereum/0x509a050f573be0d5e01a73c3726e17161729558b/79"
  seaport_sell_orders: null
  sell_orders: null
  token_id: "79"
  token_metadata: "https://arweave.net/mvZn6B3zjLcCl-ZBJAXLsDKxhNsi3-mqAcZvUiVSANs/"
  top_bid: null
  traits: [{…}]
  transfer_fee: null
  transfer_fee_payment_token: null
  [[Prototype]]: Object
*/
