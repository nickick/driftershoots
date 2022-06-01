import { ExpandMore } from '@mui/icons-material';
import {
  AccordionSummary, Accordion, AccordionDetails,
  Box, Link, Typography,
} from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { shortenAddress } from '../utils/parsers';

export default function Owner({ address, profileImageUrl, username }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          variant="body"
          sx={{
            my: 1,
          }}
        >
          Owner:
          {' '}
          {shortenAddress(address)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          maxHeight: '300px',
          maxWidth: '40vw',
          overflowX: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            my: 1,
          }}
        >
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
                  height="40"
                  width="40"
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
                {username || 'Unknown'}
              </Typography>
            </Box>
            {username !== 'NullAddress' && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
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
            )}
          </Box>

        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

Owner.propTypes = {
  address: PropTypes.string.isRequired,
  profileImageUrl: PropTypes.string.isRequired,
  username: PropTypes.string,
};

Owner.defaultProps = {
  username: 'Unknown',
};
