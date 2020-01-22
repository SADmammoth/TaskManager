import React from 'react';
import {DraggableElement} from '../Draggable';
import Task from './Task';

class DraggableTask extends Task {
  render() {
    return (
      <div
        {...this.props}
        className={'task-card ' + (this.props.className || '')}
        style={this.props.style}
      >
        <DraggableElement>
          <p>{this.props.title}</p>
        </DraggableElement>
      </div>
    );
  }
}

export default DraggableTask;
