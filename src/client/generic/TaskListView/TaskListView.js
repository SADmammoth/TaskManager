import React from 'react';
import propTypes from 'prop-types';
import DraggableTask from './DraggableTask';
import Task from './TaskCard';
import DraggableList from '../Draggable/DraggableList';
import Client from '../../helpers/Client.ts';

class TaskListView extends React.Component {
  state = {
    tasks: [],
    interval: null,
    location: '',
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
    if (tasks.tasks) this.setState({ tasks: tasks.tasks });
  };

  createTask = (task, taskId, listId) => {
    if (!task) {
      return task;
    }
    return this.props.draggable ? (
      <DraggableTask taskId={taskId} listId={listId} {...task} />
    ) : (
      <Task taskId={taskId} listId={listId} {...task} />
    );
  };

  insertTask = ({ index, id }) => {
    // this.setState;
  };

  render() {
    const unassignedTasks = this.state.tasks
      .map((el, i) => {
        return this.createTask(el, i, this.props.listId);
      })
      .filter((el) => !el.props.assignedTo);
    return (
      <ul
        className={'no-type-list ' + this.props.className || ''}
        style={this.props.style}
      >
        <DraggableList
          onOrderChange={({ taskId, index }) => {
            let sourceIndex = unassignedTasks.find(
              ({ taskId: candidateId }) => candidateId === taskId
            );
            const { tasks } = this.state;
            tasks.splice(index.x - 1, 0, tasks.splice(sourceIndex, 1)[0]);
            this.setState({
              tasks,
            });
          }}
          list={unassignedTasks}
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
