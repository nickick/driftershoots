import {
  Box, Link, Typography,
} from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { shortenAddress } from '../utils/parsers';

export default function Owner({ address, profileImageUrl, username }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        my: 1,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          my: 1,
        }}
      >
        Owner
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            mr: 2,
          }}
        >
          {profileImageUrl && (
            <Image
              src={profileImageUrl}
              height="50"
              width="50"
              style={{
                borderRadius: '50%',
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Typography
            variant="body"
          >
            <b>Address</b>
            :
            {shortenAddress(address, 15)}
          </Typography>
          <Typography
            variant="body"
          >
            <b>Username</b>
            :
            {username}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
          }}
        >
          <Link
            href={`https://opensea.io/${address}`}
            target="_blank"
          >
            <img
              src="/icons/opensea-logo.svg"
              style={{
                height: '40px',
                marginRight: '3rem',
              }}
              alt="Opensea link to owner address"
            />
          </Link>
          <Link
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
          >
            <img
              src="/icons/etherscan-logo.svg"
              style={{
                height: '40px',
              }}
              alt="Etherscan link to owner address"
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

Owner.propTypes = {
  address: PropTypes.string.isRequired,
  profileImageUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
