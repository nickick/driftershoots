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
  return pieces.assets;
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
