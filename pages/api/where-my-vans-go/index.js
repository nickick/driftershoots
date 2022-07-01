async function getWMVGPieces() {
  const options = {
    method: 'GET',
    headers: { Accept: 'application/json', 'X-API-KEY': process.env.OPENSEA_API_KEY },
  };

  const results = await fetch(
    'https://api.opensea.io/api/v1/assets?collection_slug=where-my-vans-go&order_direction=desc&limit=200&include_orders=false',
    options,
  );

  const pieces = await results.json();

  const { assets } = pieces;

  assets.forEach((asset) => {
    asset.traits.push({
      trait_type: 'Collection',
      value: 'Where My Vans Go',
    });
  });

  const additionalPhotos = [
    'drift10',
    'drift21',
    'drift27',
    'drift32',
    'drift38',
    'drift42',
    'drift6',
    'drift11',
    'drift22',
    'drift28',
    'drift33',
    'drift39',
    'drift43',
    'drift7',
    'drift16',
    'drift23',
    'drift29',
    'drift34',
    'drift4',
    'drift47',
    'drift9',
    'drift17',
    'drift25',
    'drift30',
    'drift35',
    'drift40',
    'drift48',
    'drift18',
    'drift26',
    'drift31',
    'drift36',
    'drift41',
    'drift5',
  ];

  additionalPhotos.forEach((photoName) => {
    assets.unshift({
      name: photoName,
      description: 'Other',
      traits: [{
        trait_type: 'Collection',
        value: 'Other',
      }],
      image_url: `/gallery/${photoName}.jpeg`,
      image_preview_url: `/gallery/${photoName}.jpeg`,
      asset_contract: {
        address: '',
      },
      id: photoName,
    });
  });

  return assets;
}

export default async function handler(req, res) {
  return new Promise((resolve) => {
    getWMVGPieces()
      .then((pieces) => {
        res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
        res.status(200).send(pieces);
        resolve();
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
        resolve();
      });
  });
}
