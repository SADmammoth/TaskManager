import React from 'react';
import DraggableList from '../Draggable/DraggableList';
import TaskList from './TaskList';

class DraggableTaskList extends TaskList {
  constructor(props) {
    super(props);
  }
  render() {
    return <DraggableList>{super.render()}</DraggableList>;
  }
}

export default DraggableTaskList;
