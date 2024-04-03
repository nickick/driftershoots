import { Alchemy, Network, Nft, NftTokenType } from "alchemy-sdk";
import fs from "fs";
import imagemagick from "imagemagick";
import {
  MISC_COLLECTION_SLUGS,
  OPENSEA_STOREFRONT_CONTRACT_ADDRESS,
  WMVG_CONTRACT_ADDRESS,
  WMVG_STOREFRONT_IDS,
} from "./constants";
import { reduceName } from "./helpers";
import { PromisePool } from "@supercharge/promise-pool";

/**
 * Script to download images from WMVG collection and various works to convert into thumbnail images.
 * Thumbnail images will save into public/gallery dir and original images will ref those thumbnails while pulling from original url in runtime.
 * A json file will be created in public/gallery dir to store all the metadata of the images for easy iteration in the Gallery component.
 * This script assumes localhost:3000 is running so that it can pull locally stored images for thumbnail generation.
 */

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

/**
 * Combines WMVG from 2 different sources with uncollected works stored locally
 * @returns {Promise<Nft[]>} - List of NFTs from WMVG collection and other works
 */
const gatherImages = async () => {
  // 80 out of 125 assets are in the new WMVG collection
  const alchemy = new Alchemy(config);
  const wmvgPieces = await alchemy.nft.getNftsForContract(
    WMVG_CONTRACT_ADDRESS
  );

  const { nfts: assets } = wmvgPieces;

  // Still need to get 45 old ones from original Opensea shared storefront collection
  const additionalPieces = await PromisePool.for(WMVG_STOREFRONT_IDS)
    .withConcurrency(5)
    .process(async (nftId) => {
      return await alchemy.nft.getNftMetadata(
        OPENSEA_STOREFRONT_CONTRACT_ADDRESS,
        nftId
      );
    });
  assets.push(...additionalPieces.results);

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

  return assets;
};

/**
 * Generates thumbnails for all images in the assets list
 * @param assets - List of NFTs from WMVG collection and other works
 */
const createThumbnailsInDir = async (assets: Nft[]) => {
  // Create (fresh) thumbnails directory
  fs.rmSync("public/gallery/thumbnails", { recursive: true, force: true });
  fs.mkdirSync("public/gallery/thumbnails");

  const generateImageFns = assets.map((asset) => {
    const imageUrl = asset.image.originalUrl;
    // use imagemagick to create thumbnail images
    const thumbnailPath = `public/gallery/thumbnails/${reduceName(
      asset.name
    )}.png`;

    return new Promise((resolve, reject) => {
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

  await Promise.all(generateImageFns);
};

const writeAssetsJson = (assets: Nft[]) => {
  fs.writeFileSync(
    "public/gallery/assets.json",
    JSON.stringify(assets, null, 2)
  );
};

const main = async () => {
  const assets = await gatherImages();
  writeAssetsJson(assets);
  await createThumbnailsInDir(assets);
};

main()
  .then(() => {
    console.log("Script completed successfully.");
  })
  .catch((error) => {
    console.error("Script failed with error: ", error);
  });
