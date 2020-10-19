export default function concatPath(...pathParts) {
  return pathParts.join('/').replace(/([^:])\/\//g, '$1/');
}
