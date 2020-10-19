module.exports = function getDocument(mongoDbResponse) {
  return JSON.parse(JSON.stringify(mongoDbResponse));
};
