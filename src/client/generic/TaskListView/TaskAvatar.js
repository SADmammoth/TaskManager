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
      index,
    } = this.props;

    return (
      <DraggableElement
        className={'task-avatar ' + (className || '')}
        style={Object.assign({ '--height': height }, style)}
        data={{
          taskId,
          listId,
          height,
          title,
          originalIndex: index,
        }}
        datatype="application/json"
        onDragStart={onDragStart}
        onReject={onReject}
        height={height}
        dropEffect="reassign"
      >
        {<p className="title">{title}</p>}
      </DraggableElement>
    );
  }
}

export default TaskAvatar;
