import React from "react";
import propTypes from "prop-types";
import { Redirect } from "react-router-dom";
import DraggableTask from "./DraggableTask";
import Client from "../../../helpers/Client.ts";
import CreateTaskWidget from "../../generic/TaskListView/CreateTaskWidget";

class TaskList extends React.Component {
  state = {
    tasks: [],
    interval: null
  };
  componentDidMount() {
    this.requestTaskList();
    Client.SubscribeOnDataUpdate(this.requestTaskList);
    // this.setState({ interval: setInterval(this.requestTaskList, 5000) });
  }
  //TODO Unsubscribe on unmount
  //componentWillUnmount() {
  //   clearInterval(this.state.interval);
  // }
  requestTaskList = async () => {
    let tasks = await Client.getTasks(this.props.listId);
    console.log(tasks);
    if (tasks.tasks) this.setState({ tasks: tasks.tasks });
  };
  createTask = task => {
    return this.props.draggable ? (
      <DraggableTask title={task.name} content={task.content} />
    ) : (
      <Task title={task.name} content={task.content} />
    );
  };
  render() {
    return (
      <ul className={this.props.className || ""} style={this.props.style}>
        <li>
          <CreateTaskWidget title="Hello" updateTasks={this.requestTaskList} />
        </li>
        {this.state.tasks.map(el => (
          <li>{this.createTask(el)}</li>
        ))}
      </ul>
    );
  }
}

TaskList.propTypes = {
  listId: propTypes.number
  // tasks: propTypes.arrayOf(propTypes.shape({ name: propTypes.string, content: propTypes.string }))
  //   .isRequired
};

export default TaskList;
