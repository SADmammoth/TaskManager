import React from 'react';
import DraggableList from '../Draggable/DraggableList';
import TaskList from './TaskList';

class DraggableTaskList extends TaskList {
  constructor(props) {
    super(Object.assign(props, {draggable: true}));
  }
  render() {
    return <DraggableList>{super.render()}</DraggableList>;
  }
}

export default DraggableTaskList;
