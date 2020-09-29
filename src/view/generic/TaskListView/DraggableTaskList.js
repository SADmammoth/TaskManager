import React from 'react';
import TaskListView from './TaskListView';

class DraggableTaskList extends React.Component {
  render() {
    return <TaskListView {...this.props} draggable={true} />;
  }
}

export default DraggableTaskList;
