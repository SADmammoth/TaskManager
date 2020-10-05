import React from 'react';
import key from '../../../helpers/getBodyKey';
import TaskAvatar from '../../../client/generic/TaskListView/TaskAvatar';

export default function createAvatar(
  onDragStart,
  rejectDrag,
  mapId,
  attributes,
  count
) {
  let style = attributes.style || {};
  const { index } = attributes;

  if (index) {
    style = {
      ...style,
      gridColumn: index.y + 1,
      gridRow: index.x + 1 + '/span ' + count,
    };
  }
  return (
    <TaskAvatar
      {...attributes}
      key={key(index.x, index.y, mapId)}
      height={count}
      style={style}
      onDragStart={() => onDragStart(attributes)}
      onReject={() => rejectDrag(attributes)}
    />
  );
}
