import { Nft as AlchemyNft } from 'alchemy-sdk';
export type Nft = Omit<AlchemyNft, 'tokenId'> & { tokenId?: string };
