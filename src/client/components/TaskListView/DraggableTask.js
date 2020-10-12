import React from 'react';
import { DraggableElement } from '../Draggable';
import TaskCard from './TaskCard';
import TaskAvatar from './TaskAvatar';

class DraggableTask extends React.Component {
  render() {
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
    } = this.props;

    return (
      <DraggableElement
        data={{
          taskId,
          listId,
          height: duration,
          title,
        }}
        className={'task-card ' + (this.props.className || '')}
        style={this.props.style}
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
  }
}

export default DraggableTask;
