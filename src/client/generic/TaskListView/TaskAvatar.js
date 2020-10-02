import React from 'react';
import { DraggableElement } from '../Draggable';

class TaskAvatar extends React.Component {
  render() {
    let {
      taskId,
      listId,
      height,
      title,
      content,
      style,
      className,
      onDragStart,
      onReject,
    } = this.props;

    let avatarContent = (
      <div
        className={'task-avatar ' + (className || '')}
        style={Object.assign({ '--height': height }, style)}
      >
        <p className="title">{title}</p>
      </div>
    );

    return (
      <DraggableElement
        className={'task-avatar ' + (className || '')}
        style={Object.assign({ '--height': height }, style)}
        data={{
          taskId,
          listId,
          height,
          title,
        }}
        datatype="application/json"
        avatar={avatarContent}
        onDragStart={onDragStart}
        onReject={onReject}
      >
        {<p className="title">{title}</p>}
      </DraggableElement>
    );
  }
}

export default TaskAvatar;
