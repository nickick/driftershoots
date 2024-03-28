import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const WMVG_CONTRACT_ADDRESS = "0x509a050f573be0d5e01a73c3726e17161729558b";

async function getWMVGPieces() {
  const alchemy = new Alchemy(config);

  const pieces = await alchemy.nft.getNftsForContract(WMVG_CONTRACT_ADDRESS);

  const { nfts: assets } = pieces;

  assets.forEach((asset) => {
    asset.raw.metadata.attributes.push({
      trait_type: "Collection",
      value: "Where My Vans Go",
    });
  });

  const additionalPhotos = [
    "drift10",
    "drift21",
    "drift27",
    "drift32",
    "drift38",
    "drift42",
    "drift6",
    "drift11",
    "drift22",
    "drift28",
    "drift33",
    "drift39",
    "drift43",
    "drift7",
    "drift16",
    "drift23",
    "drift29",
    "drift34",
    "drift4",
    "drift47",
    "drift9",
    "drift17",
    "drift25",
    "drift30",
    "drift35",
    "drift40",
    "drift48",
    "drift18",
    "drift26",
    "drift31",
    "drift36",
    "drift41",
    "drift5",
  ];

  additionalPhotos.forEach((photoName) => {
    assets.unshift({
      name: photoName,
      description: "Other",
      image: {
        originalUrl: `/gallery/${photoName}.jpeg`,
        thumbnailUrl: `/gallery/${photoName}.jpeg`,
        cachedUrl: `/gallery/${photoName}.jpeg`,
      },
      contract: {
        address: "",
      },
      raw: {
        metadata: {
          attributes: [
            {
              trait_type: "Collection",
              value: "Other",
            },
          ],
        },
      },
      tokenId: photoName,
    });
  });

  return assets;
}

export default async function handler(req, res) {
  return new Promise((resolve) => {
    getWMVGPieces()
      .then((pieces) => {
        res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
        res.status(200).send(pieces);
        resolve();
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
        resolve();
      });
  });
}
