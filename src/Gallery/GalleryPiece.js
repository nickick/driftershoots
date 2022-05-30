import { Box, Link, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { childrenProps } from '../utils/prop-types';

function contractName(address) {
  return address === '0x495f947276749ce646f68ac8c248420045cb7b5e' ? 'Opensea Storefront Contract' : 'Where My Vans Go Contract';
}

function Divider() {
  return (
    <Box
      sx={{
        height: 0,
        borderTop: '1px solid #36364B',
        mb: 3,
      }}
    />
  );
}

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

export default function GalleryPiece({ piece }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        border: '1px solid white',
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <img
          src={piece.image_preview_url}
          alt={piece.name}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          p: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 3,
          }}
        >
          <b>Name</b>
          :
          {piece.name}
        </Typography>
        <Divider />
        <TextSection
          title="Contract"
        >
          <Link
            href={`https://etherscan.io/token/${piece.asset_contract.address}`}
            target="_blank"
          >
            {contractName(piece.asset_contract.address)}
          </Link>
        </TextSection>
        <Divider />
        <TextSection
          title="Test"
        >
          <Link
            href={`https://etherscan.io/token/${piece.asset_contract.address}`}
            target="_blank"
          >
            {contractName(piece.asset_contract.address)}
          </Link>
        </TextSection>
      </Box>
    </Box>
  );
}

GalleryPiece.propTypes = {
  piece: PropTypes.shape({
    asset_contract: PropTypes.shape({
      address: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    image_preview_url: PropTypes.string.isRequired,
  }).isRequired,
};

/*
animation_original_url: null
  animation_url: null
  asset_contract: {address: '0x509a050f573be0d5e01a73c3726e17161729558b',
   asset_contract_type: 'non-fungible',
   created_date: '2022-02-25T21:44:20.377663', name: 'Where My Vans Go', nft_version: '3.0', …}
  background_color: null
  collection: {banner_image_url: 'https://lh3.googleusercontent.com/KFqkP5VYQNsW4R5P…zjd1sGcPDEb8dRUbya5JML0pCD5osgyfM2kXjb3LDmC=s2500', chat_url: null, created_date: '2021-08-07T06:05:22.726722', default_to_fiat: false, description: 'Where My Vans Go is a collection comprised of 123 …akes.  These are the shoes that made me. Welcome.', …}
  creator: {user: {…}, profile_img_url: 'https://storage.googleapis.com/opensea-static/opensea-profile/17.png', address: '0xd63f506b8f0a421c4b00ea43a419d674173eaad8', config: ''}
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
  owner: {user: {…}, profile_img_url: 'https://storage.googleapis.com/opensea-static/opensea-profile/24.png', address: '0xbb8fafa8a629c4dce022d95e098ccccee1acd942', config: ''}
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
