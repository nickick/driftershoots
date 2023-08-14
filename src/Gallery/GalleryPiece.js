import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { getName } from "../utils/parsers";
import { childrenProps, openseaPieceProps } from "../utils/prop-types";

function TextSection({ title, children }) {
  return (
    <>
      <Typography variant="h4">{title}</Typography>
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

export default function GalleryPiece({ data = {}, index }) {
  const boxRef = useRef();
  const router = useRouter();

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-200px 0px",
  });

  const selectPiece = useCallback(
    (e) => {
      e.preventDefault();
      const { pathname } = router;
      data.setModalOpen(true);

      router.push(
        {
          pathname,
          query: {
            gallery: data.id,
          },
        },
        undefined,
        { scroll: false }
      );
    },
    [data, router]
  );

  return (
    <Box
      sx={[
        {
          opacity: inView ? 1 : 0,
          position: "relative",
          width: "100%",
        },
        {
          "&:hover > div > img": {
            transform: "scale(1.2)",
          },
        },
      ]}
      ref={boxRef}
      onClick={selectPiece}
      id={`wmvg-${index}`}
    >
      <Box
        sx={[
          {
            display: "flex",
            flex: "1 1",
            justifyContent: "flex-start",
            position: "relative",
            overflow: "hidden",
          },
        ]}
        ref={ref}
      >
        <img
          src={data.image_preview_url}
          alt={data.name}
          style={{
            transition: "transform 0.5s ease-out",
            width: "100%",
            height: "auto",
            cursor: "pointer",
          }}
        />
      </Box>
      {getName(data.description) !== "Other" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 3,
            cursor: "pointer",
            opacity: 1,
            background: "#23222B",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "1.25rem",
              lineHeight: "2rem",
              textTransform: "uppercase",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textAlign: "left",
            }}
          >
            {data.name}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: "2rem",
              lineHeight: "3rem",
              textAlign: "left",
            }}
          >
            {getName(data.description)}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

GalleryPiece.propTypes = {
  data: openseaPieceProps.isRequired,
  index: PropTypes.number.isRequired,
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
    description: 'Where My Vans Go is a collection comprised of 124 …akes.
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
