import toLinearIndex from '../../../helpers/toLinearIndex';

export default function checkSnap(
  index,
  height,
  body,
  columns,
  hovered,
  useHeight = true
) {
  if (!useHeight) {
    return hovered;
  }
  let indBuff;
  let curr;
  for (let i = index.x; i < index.x + height; i++) {
    indBuff = toLinearIndex({ x: i, y: index.y }, columns);

    curr = body[indBuff];
    if (!curr || curr.type !== 'droparea') {
      return false;
    }
  }
  return true;
}
