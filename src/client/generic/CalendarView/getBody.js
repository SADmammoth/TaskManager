import React from 'react';
import createCell from '../../helpers/createCell';
import key from '../../helpers/getBodyKey';
import moveDate from './moveDate';
import createAvatar from './createAvatar';

const skip = {
  array: [],
  push: (r, c) => {
    skip.array.push(r.toString() + ',' + c.toString());
  },
  indexOf: (r, c) => {
    return skip.array.indexOf(r.toString() + ',' + c.toString());
  },
  get: (i) => {
    return skip.array[i];
  },
  removeAt: (i) => {
    skip.array.splice(i, 1);
  },
};

export default function getBody(
  { startDate, rows, columns, timeStep },
  { mapId, tasks, draggingTask },
  createAvatar
) {
  let array = [];
  let row;
  let arrangeDate;
  let task;

  function createCustomCell(type, index, avatar) {
    return createCell(mapId, type, 'calendar-cell', index, avatar);
  }

  for (let r = 1; r < rows + 1; r++) {
    row = [];

    row.push(
      <div key={key(r, 0, mapId)}>
        {startDate.getHours() + timeStep * r - 1}
      </div>
    );

    for (let c = 1; c < columns + 1; c++) {
      let index = skip.indexOf(r, c);

      if (index >= 0) {
        row.push(createCustomCell('hidden', { x: r, y: c }));
        skip.removeAt(index);
        continue;
      }

      arrangeDate = moveDate(startDate, r, c, timeStep);
      task = tasks[arrangeDate.getTime()];

      if (task) {
        let { title, duration, listId, taskId } = task;

        for (let i = 0; i < task.duration; i++) {
          if (draggingTask === taskId && i > 0) {
            row.push(createCustomCell('droparea', { x: r + i, y: c }));
          } else {
            skip.push(r + i, c);
          }
        }
        console.log(
          createAvatar(
            {
              index: { x: r, y: c },
              title,
              listId,
              taskId,
            },
            duration
          )
        );

        row.push(
          createCustomCell(
            'avatar',
            { x: r, y: c },
            createAvatar(
              {
                index: { x: r, y: c },
                title,
                listId,
                taskId,
              },
              duration
            )
          )
        );
      } else {
        row.push(createCustomCell('droparea', { x: r, y: c }));
      }
    }

    array.push(row);
  }

  return array;
}
