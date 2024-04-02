import { Alchemy, Network, Nft, NftTokenType } from "alchemy-sdk";
import imagemagick from "imagemagick";
import fs from "fs";
import path from "path";

/**
 * Script to download images from WMVG collection and various works to convert into thumbnail images.
 * Thumbnail images will save into public/gallery dir and original images will ref those thumbnails while pulling from original url in runtime.
 * This script assumes localhost:3000 is running so that it can pull locally stored images for thumbnail generation.
 */

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const WMVG_CONTRACT_ADDRESS = "0x509a050f573be0d5e01a73c3726e17161729558b";
const OPENSEA_STOREFRONT_CONTRACT_ADDRESS =
  "0x495f947276749ce646f68ac8c248420045cb7b5e";
const WMVG_STOREFRONT_IDS = [
  "71349417930267003648058267821921373972951788320258492784107927487347127484417",
];

const MISC_COLLECTION_SLUGS = [
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

const reduceName = (name?: string) =>
  (name || "").replace(/ /g, "_").replace(/\#/, "").toLowerCase();

const main = async () => {
  // 80 out of 125 assets are in the new WMVG collection
  const alchemy = new Alchemy(config);
  const wmvgPieces = await alchemy.nft.getNftsForContract(
    WMVG_CONTRACT_ADDRESS
  );

  const { nfts: assets } = wmvgPieces;

  // Still need to get 45 old ones from original Opensea shared storefront collection
  const piecesAsyncFns: Promise<Nft>[] = WMVG_STOREFRONT_IDS.map((id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const openseaPieces = await alchemy.nft.getNftMetadata(
          OPENSEA_STOREFRONT_CONTRACT_ADDRESS,
          id
        );
        resolve(openseaPieces);
      } catch (err) {
        reject(err);
      }
    });
  });

  const additionalPieces = await Promise.all(piecesAsyncFns);
  assets.push(...additionalPieces);

  assets.forEach((asset) => {
    asset.raw.metadata.attributes?.push({
      trait_type: "Collection",
      value: "Where My Vans Go",
    });
  });

  MISC_COLLECTION_SLUGS.forEach((photoName) => {
    assets.unshift({
      name: photoName,
      description: "Other",
      image: {
        originalUrl: `http://localhost:3000/gallery/${photoName}.jpeg`,
        thumbnailUrl: `/gallery/${photoName}.jpeg`,
        cachedUrl: `/gallery/${photoName}.jpeg`,
      },
      tokenType: NftTokenType.ERC721,
      timeLastUpdated: new Date().toISOString(),
      contract: {
        address: "",
        spamClassifications: [],
        tokenType: NftTokenType.ERC721,
        openSeaMetadata: {
          lastIngestedAt: new Date().toISOString(),
        },
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

  // Create (fresh) thumbnails directory
  fs.rmSync("public/gallery/thumbnails", { recursive: true, force: true });
  fs.mkdirSync("public/gallery/thumbnails");

  assets.forEach(async (asset) => {
    const imageUrl = asset.image.originalUrl;
    // use imagemagick to create thumbnail images
    const thumbnailPath = `public/gallery/thumbnails/${reduceName(
      asset.name
    )}.png`;

    await new Promise((resolve, reject) => {
      imagemagick.resize(
        {
          srcPath: imageUrl,
          dstPath: thumbnailPath,
          height: 100,
        },
        (err) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(0);
          }
        }
      );
    });
  });
};

main()
  .then(() => {
    console.log("Script completed successfully.");
  })
  .catch((error) => {
    console.error("Script failed with error: ", error);
  });
