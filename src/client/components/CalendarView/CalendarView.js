import React, { Fragment, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { DragMap } from '../Draggable';
import Client from '../../helpers/Client.ts';
import createCell from '../../helpers/createCell';
import getBody from './getBody';
import moveDate from './moveDate';
import calendarStyle from './calendarStyle';

function CalendarView(props) {
  const [id] = useState(shortid.generate());
  const [startDate, setStartDate] = useState(new Date());
  const [tasks, setTasks] = useState(null);
  const [draggingTask, setDraggingTask] = useState(null);
  const [body, setBody] = useState([]);

  const { style, className, rows, columns } = props;

  const renderHeader = useCallback(() => {
    let array = [<div key={`${id}-header-0`}></div>];
    let currentDate = new Date(startDate);

    for (let i = 1; i < columns + 1; i++) {
      array.push(
        <div key={`${id}-header-${i}`}>
          {currentDate.toLocaleDateString('ru-RU')}
        </div>
      );
      currentDate.setDate(startDate.getDate() + 1);
    }

    return array;
  }, [startDate]);

  const arrangeTask = (data) => {
    let { index, listId, taskId } = data;

    let arrangeDate = moveDate(startDate, index.x, index.y, props.timeStep);

    Client.changeTask({ assignedTo: arrangeDate }, listId, taskId);
  };

  const onDragStart = ({ index: { x, y }, height }) => {
    const newBody = { ...body };
    newBody[x - 1].splice(
      y + 1,
      0,
      createCell(id + 'temp', 'droparea', 'calendar-cell', { x, y })
    );

    for (let i = x + 1; i < x + height; i++) {
      newBody[i - 1][y].type = 'droparea';
    }

    let arrangeDate = moveDate(startDate, x, y, props.timeStep);

    const { taskId } = tasks[arrangeDate.getTime()];

    setBody(newBody);
    setDraggingTask(taskId);
  };

  const onDelete = ({ index: { x, y }, height }) => {
    const newBody = { ...body };
    const newTasks = { ...body };

    for (let i = x; i < x + height; i++) {
      newBody[i][y].type = 'droparea';
    }

    let arrangeDate = moveDate(startDate, x, y, props.timeStep);

    delete newTasks[arrangeDate.getTime()];

    setBody(newBody);
    setTasks(newTasks);
  };

  const rejectDrag = ({ index: { x, y }, height }) => {
    const newBody = { ...body };

    newBody[x - 1].splice(y + 1, 1);

    for (let xDiff = x + 1; xDiff < x + height; xDiff++) {
      newBody[xDiff - 1][y].type = 'hidden';
    }

    setBody(newBody);
    setDraggingTask(null);
  };

  const createAvatar = useCallback(
    (attributes, height) => {
      return createAvatar(
        onDelete,
        onDragStart,
        rejectDrag,
        id,
        attributes,
        height
      );
    },
    [onDelete, onDragStart, rejectDrag]
  );

  const reassignAvatar = (originalIndex, destinationIndex, height) => {
    let arrangeDate = moveDate(
      startDate,
      originalIndex.x,
      originalIndex.y,
      props.timeStep
    );
    let dest = destinationIndex;

    let { title, content, listId, taskId } = tasks[arrangeDate.getTime()];
    let newAvatar = createCell(
      id,
      'avatar',
      'calendar-cell',
      { x: dest.x, y: dest.y },
      this.createAvatar({ title, content, index: dest, listId, taskId }, height)
    );

    const newBody = { ...body };
    newBody[originalIndex.x - 1].splice(originalIndex.y + 1, 1);

    for (let xDiff = 0; xDiff < height; xDiff++) {
      newBody[originalIndex.x - 1 + xDiff][originalIndex.y] = createCell(
        id,
        'droparea',
        'calendar-cell',
        { x: originalIndex.x + xDiff, y: originalIndex.y }
      );

      if (!xDiff) {
        newBody[dest.x - 1][dest.y] = newAvatar;
      } else {
        newBody[dest.x - 1 + xDiff][dest.y] = createCell(
          id,
          'hidden',
          'calendar-cell',
          {
            x: dest.x + xDiff,
            y: dest.y,
          }
        );
      }
    }

    setBody(newBody);
    setDraggingTask(null);
  };

  useEffect(() => {
    setStartDate(props.startDate);
  }, [props.startDate]);

  useEffect(() => {
    if (props.tasks) {
      setTasks(props.tasks);
      setBody(getBody(props, id, props.tasks, draggingTask, createAvatar));
    }
  }, [JSON.stringify(props.tasks)]);

  return (
    <div
      className={'calendar ' + (className || '')}
      style={{
        ...style,
        ...calendarStyle(rows, columns),
      }}
    >
      {!tasks ? (
        <p>Loading...</p>
      ) : (
        <>
          {startDate && renderHeader()}
          <DragMap
            rows={rows}
            columns={columns + 1}
            createAvatar={createAvatar}
            reassignAvatar={reassignAvatar}
            onDataUpdate={arrangeTask}
            map={body}
          />
        </>
      )}
    </div>
  );
}

CalendarView.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  tasks: PropTypes.objectOf(PropTypes.object),
  startDate: PropTypes.instanceOf(Date).isRequired,
  timeStep: PropTypes.number.isRequired,
};

export default CalendarView;
