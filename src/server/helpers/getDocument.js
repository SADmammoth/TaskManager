export function getDocument(mongoDbResponse) {
  return JSON.parse(JSON.stringify(mongoDbResponse));
}
