export const getName = (wmvgDescription) => {
  const quoteRegex = /(?:"[^"]*"|^[^"]*$)/;
  return wmvgDescription.match(quoteRegex)[0];
};

export const shortenAddress = (address, length) => {
  if (!address) return '';
  const pre = length ? Math.round(length / 2) : 5;
  const post = length ? Math.round(length / 2) : 4;
  return `${address.slice(0, pre)}...${address.slice(address.length - post)}`;
};
