import getBodyKey from './getBodyKey';

export default function createCell(mapId, type, className, index, avatar) {
  if (type === 'avatar') {
    return {
      type,
      className,
      index,
      key: getBodyKey(index.x, index.y, mapId),
      avatar,
    };
  }
  return { type, className, index, key: getBodyKey(index.x, index.y, mapId) };
}
