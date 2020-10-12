export default function checkSnap(index, height, body) {
  let indBuff;
  let curr;
  for (let i = index.x; i < index.x + height; i++) {
    indBuff = toLinearIndex({ x: i, y: index.y }, props.columns);

    curr = body[indBuff];
    if (!curr || curr.type !== 'droparea') {
      return false;
    }
  }
  return true;
}
