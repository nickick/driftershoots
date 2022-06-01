import { Link, Paper, Typography } from '@mui/material';
import React from 'react';
import { getName } from '../utils/parsers';
import { openseaPieceProps } from '../utils/prop-types';
import { Content } from './Content';
import Owner from './Owner';

function contractName(address) {
  return address === '0x495f947276749ce646f68ac8c248420045cb7b5e' ? 'Opensea Storefront Contract' : 'Where My Vans Go Contract';
}

export default function WhereMyVansGoPiece({ piece }) {
  const { traits, owner } = piece;
  return (
    <Paper
      sx={{
        flex: 1,
        p: 3,
        ml: 3,
      }}
    >
      <Typography
        variant="h2"
      >

        {getName(piece.description)}
      </Typography>
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
    </Paper>
  );
}

WhereMyVansGoPiece.propTypes = {
  piece: openseaPieceProps.isRequired,
};
