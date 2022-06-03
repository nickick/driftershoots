import scraper from 'open-graph-scraper';
import publications from './publications.json';

async function getPublicationMetadata() {
  const publicationResults = await Promise.all(publications.map(async (publication) => {
    const results = await scraper({ url: publication.link });
    return {
      ...publication,
      ...results.result,
    };
  }));

  return publicationResults;
}

export default async function handler(req, res) {
  return new Promise((resolve) => {
    getPublicationMetadata()
      .then((pubs) => {
        res.status(200).send(pubs);
        resolve();
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
        resolve();
      });
  });
}
