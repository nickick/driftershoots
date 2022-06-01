async function getWMVGEvents(contractId, wallet) {
  const options = {
    method: 'GET',
    headers: { Accept: 'application/json', 'X-API-KEY': process.env.OPENSEA_API_KEY },
  };

  const results = await fetch(
    `https://api.opensea.io/api/v1/events?asset_contract_address=${contractId}&account_address=${wallet}&limit=200`,
    options,
  );

  const events = await results.json();

  return events;
}

export default async function handler(req, res) {
  return new Promise((resolve) => {
    const { contractId, wallet } = req.query;

    getWMVGEvents(contractId, wallet)
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
