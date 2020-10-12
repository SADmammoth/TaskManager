import toLinearIndex from '../../../helpers/toLinearIndex';

export default function onDrop(
  data,
  body,
  setBody,
  { columns, reassignAvatar, onDataUpdate, createAvatar }
) {
  let { height, index, originalIndex } = data;
  let array = [...body];
  let curr = null;

  let indBuff;

  for (let i = index.x; i < index.x + height; i++) {
    indBuff = toLinearIndex({ x: i, y: index.y }, columns);

    curr = array[indBuff];

    if (!curr && curr.type !== 'droparea') {
      return;
    }

    array[indBuff] = { ...array[indBuff], type: 'hidden' };
  }

  if (data.dropEffect === 'reassign') {
    reassignAvatar(originalIndex, index, height);
    onDataUpdate(data);
    return;
  }

  array[toLinearIndex(index)] = {
    type: 'avatar',
    avatar: createAvatar(data, height),
  };

  setBody(array);
  onDataUpdate(data);
}
