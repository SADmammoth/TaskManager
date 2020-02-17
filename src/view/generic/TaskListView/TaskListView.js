import React from "react";
import propTypes from "prop-types";
import { Redirect } from "react-router-dom";
import DraggableTask from "./DraggableTask";
import Client from "../../../helpers/Client.ts";

class TaskListView extends React.Component {
  state = {
    tasks: [],
    interval: null,
    location: ""
  };

  componentDidMount() {
    this.requestTaskList();
    this.setState({ location: document.location.pathname });
    Client.SubscribeOnDataUpdate(
      document.location.pathname,
      this.requestTaskList
    );
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

  render() {
    return (
      <ul
        className={"no-type-list " + this.props.className || ""}
        style={this.props.style}
      >
        {this.state.tasks.map((el, i) => {
          if (!el.assignedTo) {
            return <li>{this.createTask(el, i, this.props.listId)}</li>;
          }
        })}
      </ul>
    );
  }
}

TaskListView.propTypes = {
  listId: propTypes.number
};

export default TaskListView;
