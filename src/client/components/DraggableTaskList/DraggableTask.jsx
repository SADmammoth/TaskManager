import React from 'react';
import PropTypes from 'prop-types';
import { DraggableElement } from '../Draggable';
import TaskCard from './TaskCard';
import TaskAvatar from './TaskAvatar';

const DraggableTask = (props) => {
  let {
    taskId,
    listId,
    duration,
    title,
    content,
    style,
    className,
    onDragStart,
    onDragReject,
  } = props;

  return (
    <DraggableElement
      data={{
        taskId,
        listId,
        height: duration,
        title,
      }}
      className={'task-card ' + (className || '')}
      style={style}
      height={duration}
      datatype="application/json"
      avatar={
        <TaskAvatar
          className={className}
          listId={listId}
          taskId={taskId}
          height={duration}
          title={title}
          content={content}
          style={style}
        />
      }
      dropEffect="assign"
      onDragStart={onDragStart}
      onReject={onDragReject}
    >
      <TaskCard
        listId={listId}
        taskId={taskId}
        className={className}
        duration={duration}
        title={title}
        content={content}
        style={style}
      ></TaskCard>
    </DraggableElement>
  );
};

DraggableTask.propTypes = {
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  listId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  duration: PropTypes.number,
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  className: PropTypes.string,
  onDragStart: PropTypes.func.isRequired,
  onDragReject: PropTypes.func.isRequired,
};

DraggableTask.defaultProps = {
  duration: 1,
};

export default DraggableTask;
