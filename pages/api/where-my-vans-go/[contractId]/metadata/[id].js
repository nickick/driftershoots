/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

async function getWMVGEvents(contractId, id) {
  const options = {
    method: 'GET',
    headers: { Accept: 'application/json', 'X-API-KEY': process.env.OPENSEA_API_KEY },
  };

  const metadataFetch = await fetch(
    `https://api.opensea.io/api/v1/asset/${contractId}/${id}/validate`,
    options,
  );

  const { token_uri } = await metadataFetch.json();

  const metadataActual = await fetch(
    token_uri,
    options,
  );

  const metadataJson = await metadataActual.json();

  return metadataJson;
}

export default async function handler(req, res) {
  return new Promise((resolve) => {
    const { contractId, id } = req.query;

    getWMVGEvents(contractId, id)
      .then((events) => {
        res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
        res.status(200).send(events);
        resolve();
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
        resolve();
      });
  });
}

// https://api.opensea.io/api/v1/metadata/0x495f947276749ce646f68ac8c248420045cb7b5e/71349417930267003648058267821921373972951788320258492784107927357604755406849/validate
// https://api.opensea.io/api/v1/asset/0x495f947276749ce646f68ac8c248420045cb7b5e/71349417930267003648058267821921373972951788320258492784107927357604755406849/validate
