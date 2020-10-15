import React from 'react';
import key from '../../helpers/getBodyKey';
import TaskAvatar from '../DraggableTaskList/TaskAvatar';

export default function createAvatar(
  onDelete,
  onDragStart,
  rejectDrag,
  mapId,
  attributes,
  height
) {
  let style = attributes.style || {};
  const { index } = attributes;

  if (index) {
    style = {
      ...style,
      gridColumn: index.y + 1,
      gridRow: index.x + 1 + '/span ' + height,
    };
  }
  return (
    <TaskAvatar
      {...attributes}
      key={key(index.x, index.y, mapId)}
      height={height}
      style={style}
      onDragStart={() => onDragStart({ ...attributes, height })}
      onReject={() => rejectDrag({ ...attributes, height })}
      onDelete={() => onDelete({ ...attributes, height })}
    />
  );
}
