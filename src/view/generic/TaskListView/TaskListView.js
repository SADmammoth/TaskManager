import React from "react";
import propTypes from "prop-types";
import { Redirect } from "react-router-dom";
import DraggableTask from "./DraggableTask";
import Client from "../../../helpers/Client.ts";
import CreateTaskWidget from "./CreateTaskWidget";

class TaskListView extends React.Component {
  state = {
    tasks: [],
    interval: null
  };

  componentDidMount() {
    this.requestTaskList();
    Client.SubscribeOnDataUpdate(
      document.location.pathname,
      this.requestTaskList
    );
  }

  componentDidUnmount() {
    Client.Unsubscribe(document.location.pathname);
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
  // tasks: propTypes.arrayOf(propTypes.shape({ name: propTypes.string, content: propTypes.string }))
  //   .isRequired
};

export default TaskListView;
