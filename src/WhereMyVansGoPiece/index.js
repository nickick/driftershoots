import {
  Box, Link, Paper, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getName } from '../utils/parsers';
import { openseaPieceProps } from '../utils/prop-types';
import { Content } from './Content';
import Owner from './Owner';
import { RawJson } from './RawJson';

function contractName(address) {
  return address === '0x495f947276749ce646f68ac8c248420045cb7b5e' ? 'Opensea Storefront Contract' : 'Where My Vans Go Contract';
}

export default function WhereMyVansGoPiece({ piece }) {
  const [events, setEvents] = useState([]);
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    fetch(`/api/where-my-vans-go/${piece.asset_contract.address}/events/${piece.token_id}`)
      .then((response) => response.json())
      .then((response) => {
        setEvents(response);
      });
  }, [piece.token_id, piece.asset_contract.address]);

  useEffect(() => {
    // fetch metadata, either listed on token_metadata or fetched through api endpoint
    const metadataEndpoint = piece.token_metadata || `/api/where-my-vans-go/${piece.asset_contract.address}/metadata/${piece.token_id}`;
    fetch(metadataEndpoint)
      .then((response) => response.json())
      .then((response) => {
        setMetadata(response);
      });
  }, [piece.token_metadata, piece.asset_contract.address, piece.token_id]);

  const { traits } = piece;
  let { owner } = piece;

  // if the username is NullAddress then for whatever reason Opensea's API is just not returning
  // the owner, so use the last transfer event to get the current owner
  if (owner.user.username === 'NullAddress') {
    if (events.length) {
      const transferEvents = events.filter((event) => event.event_type === 'transfer');
      if (transferEvents.length) {
        const latestTransfer = transferEvents.sort(
          (a, b) => (a.event_timestamp < b.event_timestamp ? 1 : -1),
        )[0];
        owner = latestTransfer.to_account;
      }
    }
  }

  return (
    <Paper
      sx={{
        flex: 1,
        p: 3,
        ml: 3,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Typography
          variant="h2"
        >

          {getName(piece.description)}
        </Typography>
        <Link
          href={piece.permalink}
          target="_blank"
        >
          <img
            src="/icons/opensea-logo.svg"
            style={{
              height: '40px',
              marginRight: '3rem',
            }}
            alt="Opensea link to NFT"
          />
        </Link>
      </Box>
      {traits.map((trait) => (
        <Content
          key={trait.trait_type}
          title={trait.trait_type}
          value={trait.value}
        />
      ))}
      <Content
        title="Contract"
      >

        <Link
          href={`https://etherscan.io/token/${piece.asset_contract.address}`}
          target="_blank"
        >
          {contractName(piece.asset_contract.address)}
        </Link>
      </Content>
      <Owner
        address={owner.address}
        profileImageUrl={owner.profile_img_url}
        username={owner.user.username}
      />
      <RawJson title="Metadata" json={metadata} />
      <RawJson title="Raw events" json={events} />
    </Paper>
  );
}

WhereMyVansGoPiece.propTypes = {
  piece: openseaPieceProps.isRequired,
};
