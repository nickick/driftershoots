import scraper from 'open-graph-scraper';
import publications from './publications.json';

async function getPublicationMetadata(skipmetadata) {
  if (skipmetadata === 'true') {
    return publications.map((publication) => ({
      ...publication,
      ogImage: {},
    }));
  }

  const publicationResults = await Promise.all(publications.map(async (publication) => {
    const results = await new Promise((resolve) => {
      scraper({ url: publication.link })
        .then((result) => resolve(result))
        .catch(() => resolve({
          result: { ogImage: {} },
        }));
    });

    return {
      ...publication,
      ...results.result,
    };
  }));

  return publicationResults;
}

export default async function handler(req, res) {
  const { skipmetadata } = req.query;

  return new Promise((resolve) => {
    getPublicationMetadata(skipmetadata)
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
