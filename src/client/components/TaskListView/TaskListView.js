import React from 'react';
import propTypes from 'prop-types';
import DraggableTask from './DraggableTask';
import Task from './TaskCard';
import DraggableList from '../Draggable/DraggableList';
import Client from '../../helpers/Client.ts';
import { createFalse } from 'typescript';

class TaskListView extends React.Component {
  state = {
    tasks: [],
    taskIds: [],
    interval: null,
    location: '',
    needUpdate: createFalse,
    dragging: null,
  };

  componentDidMount() {
    this.requestTaskList();
    this.setState({ location: document.location.pathname });
    Client.SubscribeOnDataUpdate(
      document.location.pathname,
      this.requestTaskList
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listId !== this.props.listId) {
      this.requestTaskList();
      this.setState({ location: document.location.pathname });
      Client.SubscribeOnDataUpdate(
        document.location.pathname,
        this.requestTaskList
      );
    }
  }

  componentWillUnmount() {
    Client.Unsubscribe(this.state.location);
  }

  requestTaskList = async () => {
    let tasks = await Client.getTasks(this.props.listId);

    if (tasks.tasks)
      this.setState({
        tasks: tasks.tasks
          .map((el, i) => ({ ...el, taskId: i }))
          .filter((el) => !el.assignedTo),
        taskIds: tasks.tasks.map((task, index) => index),
      });
  };

  createTask = (task, taskId, listId, unassignedIndex) => {
    if (!task) {
      return task;
    }
    return this.props.draggable ? (
      <DraggableTask
        taskId={taskId}
        listId={listId}
        {...task}
        onDragStart={() => {
          this.setState({ dragging: unassignedIndex });
        }}
        onDragReject={() => {
          this.setState({ dragging: null });
        }}
      />
    ) : (
      <Task taskId={taskId} listId={listId} {...task} />
    );
  };

  insertTask = ({ index, id }) => {
    // this.setState;
  };

  render() {
    return (
      <ul
        className={'no-type-list ' + this.props.className || ''}
        style={this.props.style}
      >
        <DraggableList
          onOrderChange={({ taskId, index }) => {
            let sourceIndex = this.state.tasks.findIndex(
              ({ taskId: candidateId }) => candidateId === taskId
            );
            const { tasks } = this.state;
            tasks.splice(index.x, 0, tasks.splice(sourceIndex, 1)[0]);

            let sorted = this.state.tasks.map((task) => task.taskId);
            let notSorted = this.state.taskIds.filter(
              (taskId) => !sorted.includes(taskId)
            );
            Client.changeListOrder(this.props.listId, [
              ...sorted,
              ...notSorted,
            ]);
            this.setState({
              tasks,
              dragging: null,
            });
          }}
          dragging={this.state.dragging}
          list={this.state.tasks.map((el, i) => {
            return this.createTask(el, el.taskId, this.props.listId, i);
          })}
          insert={() => {}}
        />
      </ul>
    );
  }
}

TaskListView.propTypes = {
  listId: propTypes.number,
};

export default TaskListView;
